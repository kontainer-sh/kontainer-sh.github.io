#!/usr/bin/env node
/**
 * Automatisierte Qualitätsprüfung für kontainer.sh
 * Führt visuelle und strukturelle Checks auf der Hugo-gebauten Seite durch.
 *
 * Usage: hugo && node check.mjs
 */

import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, 'public');

let passed = 0;
let failed = 0;
const errors = [];

function pass(msg) { passed++; console.log(`  ✅ ${msg}`); }
function fail(msg) { failed++; errors.push(msg); console.log(`  ❌ ${msg}`); }

// ============================================================
// 1. BUILD CHECKS (no browser needed)
// ============================================================
console.log('\n🔍 Build-Checks...');

// Check Hugo output exists
for (const f of ['index.html', 'css/main.css', 'images/logo-negativ.png', 'favicon.svg', 'impressum/index.html', 'datenschutz/index.html']) {
    const p = join(publicDir, f);
    existsSync(p) ? pass(`${f} existiert`) : fail(`${f} fehlt im Build`);
}

// Check internal links
const indexHtml = readFileSync(join(publicDir, 'index.html'), 'utf-8');

// Anchor links: every href="#foo" must have a matching id="foo"
const anchorLinks = [...indexHtml.matchAll(/href="#([^"]+)"/g)].map(m => m[1]);
const ids = [...indexHtml.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
for (const anchor of anchorLinks) {
    ids.includes(anchor) ? pass(`Anker #${anchor} hat Ziel`) : fail(`Anker #${anchor} hat kein Ziel-Element`);
}

// Check ring chart labels present in HTML
for (const label of ['erfassen', 'bewerten', 'empfehlen', 'verstehen']) {
    indexHtml.includes(`>${label}<`) ? pass(`Ring-Label "${label}" im HTML`) : fail(`Ring-Label "${label}" fehlt im HTML`);
}

// ============================================================
// 2. VISUAL CHECKS (browser-based)
// ============================================================
console.log('\n🖥️  Visuelle Checks...');

const browser = await puppeteer.launch({ headless: true });
const viewports = [
    { name: 'Mobile (375px)', width: 375, height: 812 },
    { name: 'Tablet (768px)', width: 768, height: 1024 },
    { name: 'Tablet-lg (1024px)', width: 1024, height: 768 },
    { name: 'Desktop (1440px)', width: 1440, height: 900 },
];

for (const vp of viewports) {
    console.log(`\n  📐 ${vp.name}:`);
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
    await page.goto(`file://${join(publicDir, 'index.html')}`, { waitUntil: 'networkidle0' });

    // Check: No horizontal overflow (body wider than viewport)
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    bodyWidth <= vp.width
        ? pass(`Kein horizontaler Overflow (body: ${bodyWidth}px)`)
        : fail(`Horizontaler Overflow! body=${bodyWidth}px > viewport=${vp.width}px`);

    // Check: Container padding (min 24px on each side)
    const containerPadding = await page.evaluate(() => {
        const el = document.querySelector('.container');
        if (!el) return null;
        const style = getComputedStyle(el);
        return {
            left: parseFloat(style.paddingLeft),
            right: parseFloat(style.paddingRight)
        };
    });
    if (containerPadding) {
        containerPadding.left >= 24 && containerPadding.right >= 24
            ? pass(`Container-Padding OK (${containerPadding.left}px / ${containerPadding.right}px)`)
            : fail(`Container-Padding zu klein (${containerPadding.left}px / ${containerPadding.right}px, min 24px)`);
    }

    // Check: Ring chart center text is vertically centered within SVG area
    const ringCheck = await page.evaluate(() => {
        const svg = document.querySelector('.ring-chart > svg');
        const center = document.querySelector('.ring-chart-center');
        if (!svg || !center) return null;
        const svgRect = svg.getBoundingClientRect();
        const centerRect = center.getBoundingClientRect();
        const svgMidY = svgRect.top + svgRect.height / 2;
        const centerMidY = centerRect.top + centerRect.height / 2;
        return { offset: Math.abs(svgMidY - centerMidY), svgMidY, centerMidY };
    });
    if (ringCheck) {
        ringCheck.offset < 30
            ? pass(`Ring-Center vertikal zentriert (Offset: ${ringCheck.offset.toFixed(1)}px)`)
            : fail(`Ring-Center verschoben! Offset: ${ringCheck.offset.toFixed(1)}px (max 30px)`);
    }

    // Check: All sections are visible (have height > 0)
    const sections = await page.evaluate(() => {
        const sels = ['.hero', '.leistungen', '.problem-section', '.ai-section', '.erfahrung-section', '.cta-section', 'footer'];
        return sels.map(s => {
            const el = document.querySelector(s);
            return { sel: s, height: el ? el.getBoundingClientRect().height : 0 };
        });
    });
    for (const s of sections) {
        s.height > 0
            ? pass(`${s.sel} sichtbar (${Math.round(s.height)}px)`)
            : fail(`${s.sel} nicht sichtbar (height=0)`);
    }

    // Check: No text-image overlap on ring chart (center text within SVG bounds)
    const overlapCheck = await page.evaluate(() => {
        const svg = document.querySelector('.ring-chart > svg');
        const center = document.querySelector('.ring-chart-center');
        if (!svg || !center) return null;
        const svgRect = svg.getBoundingClientRect();
        const centerRect = center.getBoundingClientRect();
        return {
            contained: centerRect.left >= svgRect.left &&
                       centerRect.right <= svgRect.right &&
                       centerRect.top >= svgRect.top &&
                       centerRect.bottom <= svgRect.bottom
        };
    });
    if (overlapCheck) {
        overlapCheck.contained
            ? pass('Ring-Center-Text innerhalb SVG-Grenzen')
            : fail('Ring-Center-Text ragt aus SVG heraus');
    }

    // Check: Ring chart labels visible (on tablet+ they should be in grid below)
    if (vp.width <= 1024) {
        const labelsVisible = await page.evaluate(() => {
            const labels = document.querySelectorAll('.ring-label');
            let visibleCount = 0;
            for (const l of labels) {
                const rect = l.getBoundingClientRect();
                if (rect.height > 0 && rect.width > 0) visibleCount++;
            }
            return visibleCount;
        });
        labelsVisible >= 4
            ? pass(`Alle ${labelsVisible} Ring-Labels sichtbar`)
            : fail(`Nur ${labelsVisible}/4 Ring-Labels sichtbar`);
    }

    await page.close();
}

await browser.close();

// ============================================================
// SUMMARY
// ============================================================
console.log('\n' + '='.repeat(50));
console.log(`Ergebnis: ${passed} bestanden, ${failed} fehlgeschlagen`);
if (errors.length > 0) {
    console.log('\nFehler:');
    errors.forEach(e => console.log(`  • ${e}`));
    process.exit(1);
}
console.log('✅ Alle Checks bestanden!\n');
