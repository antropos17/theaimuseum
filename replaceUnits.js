const fs = require('fs');
const cp = require('child_process');
const dirs = ['x:/Future/T/theaimuseum/components', 'x:/Future/T/theaimuseum/app'];

dirs.forEach(dir => {
    // Find all .tsx files
    const files = cp.execSync('dir /s /b *.tsx', { cwd: dir }).toString().split('\r\n').filter(Boolean);
    files.forEach(f => {
        let content = fs.readFileSync(f, 'utf8');
        let changed = false;

        const replacements = [
            { regex: /min-h-screen/g, target: 'min-h-full h-full' },
            { regex: /min-h-\[100dvh\]/g, target: 'min-h-full h-full' },
            { regex: /min-h-\[100vh\]/g, target: 'min-h-full h-full' },
            { regex: /h-screen/g, target: 'h-full' },
            { regex: /h-\[100dvh\]/g, target: 'h-full' },
            { regex: /h-\[100vh\]/g, target: 'h-full' },
            { regex: /max-h-screen/g, target: 'max-h-full' },
            { regex: /w-screen/g, target: 'w-full' },
            { regex: /w-\[100vw\]/g, target: 'w-full' },
            { regex: /w-\[100dvw\]/g, target: 'w-full' }
        ];

        replacements.forEach(r => {
            if (r.regex.test(content)) {
                content = content.replace(r.regex, r.target);
                changed = true;
            }
        });

        if (changed) {
            fs.writeFileSync(f, content);
            console.log(`Updated ${f}`);
        }
    });
});
