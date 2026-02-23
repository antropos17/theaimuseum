/**
 * UX Audit Script for The AI Museum
 *
 * Crawls every page, captures screenshots, detects console errors,
 * layout overflow, z-index conflicts, and broken back-navigation.
 *
 * Usage:  node scripts/ux-audit.mjs
 * Requires: pnpm dev running on localhost:3000
 */

import { chromium } from "@playwright/test";
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SCREENSHOT_DIR = join(ROOT, "screenshots", "audit");
const RESULTS_PATH = join(ROOT, "scripts", "audit-results.json");

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const PAGES = [
  "/",
  "/explore",
  "/evolution",
  "/battles",
  "/simulator",
  "/quiz",
  "/passport",
  "/graveyard",
  "/leaderboard",
  "/memes",
  "/predictions",
  "/victims",
];

// Ensure screenshot directory exists
mkdirSync(SCREENSHOT_DIR, { recursive: true });

/**
 * Wait for the server to be reachable before starting the audit.
 */
async function waitForServer(url, timeoutMs = 30_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status < 500) return;
    } catch {
      // server not ready yet
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`Server at ${url} not reachable after ${timeoutMs}ms`);
}

/**
 * Collect page-level diagnostics: console messages, overflow, z-index issues.
 */
async function auditPage(page, route) {
  const slug = route === "/" ? "home" : route.replace(/\//g, "");
  const url = `${BASE_URL}${route}`;
  const result = {
    route,
    url,
    consoleErrors: [],
    consoleWarnings: [],
    overflow: false,
    scrollWidthDelta: 0,
    zIndexConflicts: [],
    screenshot: "",
    loadTimeMs: 0,
  };

  // Capture console messages
  const onConsole = (msg) => {
    const type = msg.type();
    const text = msg.text();
    if (type === "error") result.consoleErrors.push(text);
    if (type === "warning") result.consoleWarnings.push(text);
  };
  page.on("console", onConsole);

  const start = Date.now();
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
  } catch {
    // networkidle may time out on heavy 3D pages — fall back to domcontentloaded
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15_000 });
    } catch (e) {
      result.consoleErrors.push(`Navigation failed: ${e.message}`);
      return result;
    }
  }
  result.loadTimeMs = Date.now() - start;

  // Wait for animations / lazy-loaded content
  // Home page has a CRT boot sequence (~3.8s) that sets sessionStorage;
  // subsequent visits skip boot, so only home needs the extra wait.
  const waitMs = route === "/" ? 5000 : 2000;
  await page.waitForTimeout(waitMs);

  // Screenshot
  const screenshotPath = join(SCREENSHOT_DIR, `${slug}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  result.screenshot = `screenshots/audit/${slug}.png`;

  // Check horizontal overflow
  const overflow = await page.evaluate(() => {
    const docWidth = document.documentElement.scrollWidth;
    const viewportWidth = window.innerWidth;
    return { overflow: docWidth > viewportWidth, delta: docWidth - viewportWidth };
  });
  result.overflow = overflow.overflow;
  result.scrollWidthDelta = overflow.delta;

  // Check z-index conflicts with navbar
  const zConflicts = await page.evaluate(() => {
    const nav = document.querySelector("nav");
    if (!nav) return [];
    const navRect = nav.getBoundingClientRect();
    const navZ = parseInt(getComputedStyle(nav).zIndex, 10) || 0;
    const conflicts = [];
    const elements = document.querySelectorAll("*");
    for (const el of elements) {
      if (nav.contains(el)) continue;
      const style = getComputedStyle(el);
      const z = parseInt(style.zIndex, 10);
      if (Number.isNaN(z) || z <= navZ) continue;
      const rect = el.getBoundingClientRect();
      // Check if the element overlaps the navbar area
      const overlaps =
        rect.top < navRect.bottom &&
        rect.bottom > navRect.top &&
        rect.left < navRect.right &&
        rect.right > navRect.left;
      if (overlaps) {
        conflicts.push({
          tag: el.tagName.toLowerCase(),
          id: el.id || null,
          className: (el.className && typeof el.className === "string")
            ? el.className.slice(0, 80)
            : null,
          zIndex: z,
          navZIndex: navZ,
        });
      }
    }
    return conflicts.slice(0, 10); // cap at 10
  });
  result.zIndexConflicts = zConflicts;

  page.off("console", onConsole);
  return result;
}

/**
 * Test back navigation: go to page → go back → check for stuck elements.
 */
async function auditBackNavigation(page, route) {
  const slug = route === "/" ? "home" : route.replace(/\//g, "");
  const result = {
    route,
    stuckElements: [],
    screenshot: "",
  };

  // Start from home
  try {
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 15_000 });
    await page.waitForTimeout(1500);
  } catch {
    result.stuckElements.push("Failed to load home page");
    return result;
  }

  // Navigate to the target page
  try {
    await page.goto(`${BASE_URL}${route}`, {
      waitUntil: "domcontentloaded",
      timeout: 15_000,
    });
    await page.waitForTimeout(2000);
  } catch {
    result.stuckElements.push(`Failed to navigate to ${route}`);
    return result;
  }

  // Go back — wait longer for CRT boot if session key wasn't set yet
  await page.goBack({ waitUntil: "domcontentloaded", timeout: 15_000 }).catch(() => {});
  await page.waitForTimeout(5000);

  // Screenshot after going back
  const screenshotPath = join(SCREENSHOT_DIR, `back-from-${slug}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  result.screenshot = `screenshots/audit/back-from-${slug}.png`;

  // Detect stuck elements: opacity 0 IN VIEWPORT, off-screen transforms
  const stuck = await page.evaluate(() => {
    const issues = [];
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const elements = document.querySelectorAll("main *, section *, [class*='hero'], [class*='section']");
    for (const el of elements) {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();

      // Only flag elements that are WITHIN the viewport and have opacity 0
      const inViewport =
        rect.bottom > 0 &&
        rect.top < vh &&
        rect.right > 0 &&
        rect.left < vw;

      // Skip intentional boot-sequence elements
      if (el.hasAttribute("data-boot-wrapper") || el.closest("[data-boot-wrapper]")) continue;

      if (
        parseFloat(style.opacity) === 0 &&
        rect.width > 50 &&
        rect.height > 50 &&
        inViewport
      ) {
        issues.push({
          type: "opacity-0",
          tag: el.tagName.toLowerCase(),
          id: el.id || null,
          className: (el.className && typeof el.className === "string")
            ? el.className.slice(0, 80)
            : null,
          rect: { top: Math.round(rect.top), bottom: Math.round(rect.bottom) },
        });
      }

      // Element with transform that pushed it off-screen
      if (
        style.transform !== "none" &&
        (rect.right < 0 || rect.left > window.innerWidth || rect.bottom < 0)
      ) {
        issues.push({
          type: "transform-offscreen",
          tag: el.tagName.toLowerCase(),
          id: el.id || null,
          transform: style.transform.slice(0, 80),
        });
      }
    }
    return issues.slice(0, 20);
  });
  result.stuckElements = stuck;

  return result;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log("=== AI Museum UX Audit ===\n");

  // Check server
  console.log(`Checking server at ${BASE_URL}...`);
  try {
    await waitForServer(BASE_URL);
    console.log("Server is up.\n");
  } catch (e) {
    console.error(e.message);
    console.error("\nPlease start the dev server first:  pnpm dev");
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  const auditResults = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    pages: [],
    backNavigation: [],
    summary: {},
  };

  // ── Phase 1: Page Audits ─────────────────────────────────────────────────
  console.log("Phase 1: Auditing pages...\n");
  for (const route of PAGES) {
    process.stdout.write(`  ${route} ... `);
    const result = await auditPage(page, route);
    auditResults.pages.push(result);

    const issues = result.consoleErrors.length + (result.overflow ? 1 : 0) + result.zIndexConflicts.length;
    console.log(
      issues > 0
        ? `${issues} issue(s) (${result.loadTimeMs}ms)`
        : `OK (${result.loadTimeMs}ms)`
    );
  }

  // ── Phase 2: Back Navigation ─────────────────────────────────────────────
  console.log("\nPhase 2: Testing back navigation...\n");
  for (const route of PAGES.filter((r) => r !== "/")) {
    process.stdout.write(`  / → ${route} → back ... `);
    const result = await auditBackNavigation(page, route);
    auditResults.backNavigation.push(result);
    console.log(
      result.stuckElements.length > 0
        ? `${result.stuckElements.length} stuck element(s)`
        : "OK"
    );
  }

  await browser.close();

  // ── Summary ──────────────────────────────────────────────────────────────
  const totalErrors = auditResults.pages.reduce((s, p) => s + p.consoleErrors.length, 0);
  const totalWarnings = auditResults.pages.reduce((s, p) => s + p.consoleWarnings.length, 0);
  const overflowPages = auditResults.pages.filter((p) => p.overflow).map((p) => p.route);
  const zIndexPages = auditResults.pages.filter((p) => p.zIndexConflicts.length > 0).map((p) => p.route);
  const stuckPages = auditResults.backNavigation
    .filter((p) => p.stuckElements.length > 0)
    .map((p) => p.route);

  auditResults.summary = {
    totalPages: PAGES.length,
    totalConsoleErrors: totalErrors,
    totalConsoleWarnings: totalWarnings,
    pagesWithOverflow: overflowPages,
    pagesWithZIndexConflicts: zIndexPages,
    pagesWithStuckElements: stuckPages,
  };

  // Write results
  writeFileSync(RESULTS_PATH, JSON.stringify(auditResults, null, 2));

  // Print summary
  console.log("\n========================================");
  console.log("           AUDIT SUMMARY");
  console.log("========================================\n");
  console.log(`  Pages scanned:        ${PAGES.length}`);
  console.log(`  Console errors:       ${totalErrors}`);
  console.log(`  Console warnings:     ${totalWarnings}`);
  console.log(`  Overflow pages:       ${overflowPages.length > 0 ? overflowPages.join(", ") : "none"}`);
  console.log(`  Z-index conflicts:    ${zIndexPages.length > 0 ? zIndexPages.join(", ") : "none"}`);
  console.log(`  Back-nav stuck:       ${stuckPages.length > 0 ? stuckPages.join(", ") : "none"}`);
  console.log(`\n  Full report: scripts/audit-results.json`);
  console.log(`  Screenshots:  screenshots/audit/\n`);
}

main().catch((e) => {
  console.error("Audit failed:", e);
  process.exit(1);
});
