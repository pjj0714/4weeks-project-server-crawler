const puppeteer = require("puppeteer");

async function run(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({
    path: __dirname + "/image.jpg",
    type: "jpeg"
  });
  await page.close();
  await browser.close();
  return;
}

module.exports = run;
