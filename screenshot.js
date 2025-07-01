const puppeteer = require('puppeteer');
const path = require('path');

async function takeScreenshot() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Set viewport to desktop size
    await page.setViewport({ width: 1200, height: 800 });
    
    // Navigate to the local HTML file
    const filePath = `file://${path.resolve(__dirname, 'index.html')}`;
    await page.goto(filePath, { waitUntil: 'networkidle0' });
    
    // Take full page screenshot
    await page.screenshot({ 
        path: 'assets/images/current-screenshot.png', 
        fullPage: true 
    });
    
    // Take screenshot of just the CTA section
    const ctaElement = await page.$('.main__content');
    if (ctaElement) {
        await ctaElement.screenshot({ 
            path: 'assets/images/cta-current.png' 
        });
    }
    
    // Take individual CTA screenshots for comparison
    const ctas = await page.$$('.cta');
    for (let i = 0; i < ctas.length; i++) {
        await ctas[i].screenshot({ 
            path: `assets/images/cta-${i + 1}-current.png` 
        });
    }
    
    await browser.close();
    console.log('Screenshots saved to assets/images/');
}

takeScreenshot().catch(console.error);