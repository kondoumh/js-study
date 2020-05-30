const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let currentURL;
  page
    .waitForSelector('img')
    .then(() => console.log('First URL with image: ' + currentURL));
  for (currentURL of ['https://examplek.com', 'https://google.com', 'https://bbc.com']) {
    await page.goto(currentURL).catch(e => console.error(e));
  }
  await browser.close();
})();
