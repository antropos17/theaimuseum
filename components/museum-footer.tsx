import Link from "next/link"

const socialLinks = [
  { label: "GitHub", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Telegram", href: "#" },
  { label: "Reddit", href: "#" },
]

export function MuseumFooter() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              className="text-primary"
            >
              <circle cx="12" cy="12" r="3" fill="currentColor" />
              <circle cx="12" cy="4" r="2" fill="currentColor" opacity="0.5" />
              <circle cx="12" cy="20" r="2" fill="currentColor" opacity="0.5" />
              <circle cx="4" cy="12" r="2" fill="currentColor" opacity="0.5" />
              <circle cx="20" cy="12" r="2" fill="currentColor" opacity="0.5" />
            </svg>
          </div>
          <span className="font-sans text-sm text-muted-foreground">
            The AI Museum &middot; 2025 &middot; Open Source
          </span>
        </div>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-sans text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <p className="font-sans text-xs text-muted-foreground">
          Built with care and neural connections
        </p>
      </div>
    </footer>
  )
}
