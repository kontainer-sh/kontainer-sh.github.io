import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(__dirname, 'public', 'index.html');

const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet-lg', width: 1024, height: 768 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile-lg', width: 480, height: 854 },
    { name: 'mobile', width: 375, height: 812 },
];

const browser = await puppeteer.launch({ headless: true });

for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
    const out = join(__dirname, `current-${vp.name}.png`);
    await page.screenshot({ path: out, fullPage: true });
    await page.close();
    console.log(`${vp.name} (${vp.width}px) → ${out}`);
}

await browser.close();
