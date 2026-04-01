const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    console.log('Home loaded');
    
    // Get the HTML of the nav link
    const linkHtml = await page.locator('nav a[href="/services"]').first().evaluate(el => el.outerHTML);
    console.log('Link HTML:', linkHtml);
    
    // Check if it's a Next.js Link
    const linkProps = await page.locator('nav a[href="/services"]').first().evaluate(el => {
      return {
        tagName: el.tagName,
        href: el.getAttribute('href'),
        onclick: el.getAttribute('onclick'),
        dataLink: el.getAttribute('data-link'),
        class: el.className
      };
    });
    console.log('Link props:', linkProps);
    
    // Try clicking with JavaScript directly
    console.log('\nClicking via JS...');
    await page.evaluate(() => {
      const link = document.querySelector('nav a[href="/services"]');
      if (link) {
        console.log('Found link, clicking...');
        link.click();
      }
    });
    
    await page.waitForTimeout(3000);
    console.log('URL:', page.url());
    
    // Try using page.goto to verify the route works
    console.log('\nDirect page.goto test...');
    await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle' });
    console.log('After direct goto URL:', page.url());
    
    // Check if the page actually rendered content
    const content = await page.content();
    console.log('Has Our Services text:', content.includes('Our Services'));
    
  } catch (e) {
    console.error('Error:', e.message);
  }
  
  await browser.close();
})();