// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import puppeteer from "puppeteer";

export default async function handler(req, res) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://www.rightmove.co.uk/");

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // // Type into search box
  await page.type("input.ksc_inputText.ksc_typeAheadInputField", "SE23");

  const element = await page.waitForSelector("text/To Rent");

  await element.click();

  const searchProperties = await page.waitForSelector("text/Find properties");

  await searchProperties.click();

  await new Promise((r) => setTimeout(r, 3500));

  await page.select("aria/Max Price", "2500");

  await page.select("aria/Min Beds", "1");

  const textSelector = await page.waitForSelector(".searchHeader-resultCount");

  const results = await textSelector.evaluate((el) => el.textContent);

  await new Promise((r) => setTimeout(r, 4000));

  const rawItems = await page.$$(".l-searchResult");

  const items = await Promise.all(
    rawItems.map(async (item) => {

      const address = await item.$eval(
        ".propertyCard-address",
        (el) => el.title
      );

      const price = await item.$eval(
        ".propertyCard-rentalPrice-primary .propertyCard-priceValue",
        (el) => el.innerText
      );

      const beds = await item.$eval(
        "xpath/div/div/div[4]/div[1]/div[2]/a/div/span[3]",
        (el) => el.innerText
      );

      const url = await item.$eval(".propertyCard-link", (el) => el.href);

      const images = await item.$$eval(".propertyCard-img img", (nodes) =>
        nodes.map((img) => img.src)
      );

      const estateAgent = await item.$eval(
        ".propertyCard-branchLogo-link",
        (el) => el.title
      );
      const dateListed = await item.$eval(
        ".propertyCard-contactsAddedOrReduced",
        (el) => el.innerText
      );

      return { address, price, beds, url, images, estateAgent, dateListed };
    })
  );

  await browser.close();
  res.setHeader("Cache-Control", "s-maxage=86400");
  res.status(200).json({ results, items });
}
