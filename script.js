const { default: puppeteer } = require('puppeteer')
const { load } = require('cheerio')
const fs = require('fs');
const main = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1280,
      height: 720
    }
  });

  const page = await browser.newPage();
  await page.goto('https://flipkart.com/');
  await page.click('._2KpZ6l._2doB4z');
  await page.type('input[type="text"]', 'pixel 6a')
  await page.keyboard.press('Enter')
  await page.waitForTimeout(5000)
  const data = [];
  const $ = load(await page.content())

  $('._1fQZEK').each((index, element) => {
    const name = $('div._4rR01T', element).text();
    const price = $('div._30jeq3._1_WHN1', element).text()
    const image = $(element).find('img').attr('src');
    const desc = $('li._1xgFaf', element).text()
    // console.log({name, price, image, desc});
    data.push({ name, price, image, desc });
  })
  await browser.close();
  fs.writeFileSync('output.json', JSON.stringify(data, null, 2), 'utf-8');
  console.log("successfully");
}
main();