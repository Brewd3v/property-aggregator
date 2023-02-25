// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import puppeteer from "puppeteer";

export default async function handler(req, res) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(
    "https://www.pedderproperty.com/let/property-to-let?streetarea=Forest%20Hill&maxprice=2400&minbedrooms=1&sortorder=date-desc"
  );

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  await new Promise((r) => setTimeout(r, 2000));

  await page.$eval(".includingSold", (el) => el.click());

  await new Promise((r) => setTimeout(r, 3000));

  const rawItems = await page.$$(".property");

  const results = rawItems.length;

  const items = await Promise.all(
    rawItems.map(async (item) => {
      const address = await item.$eval(".list-address", (el) => el.innerText);

      const price = await item.$eval(".list-price", (el) => el.innerText);

      const beds = await item.$eval(
        "xpath/div[2]/div[1]/ul/li[1]/span",
        (el) => el.innerText
      );

      const url = await item.$eval(
        ".property-description-link",
        (el) => el.href
      );

      const images = await item.$$eval(".owl-image img", (nodes) =>
        nodes.map((img) => {
            if(img.src){
                return img.src;
            }
            return img.dataset.src;
        })
      );

      return { address, price, beds, url, images };
    })
  );

  await browser.close();
  res.setHeader("Cache-Control", "s-maxage=86400");
  res.status(200).json({ results, items });
}

//   await page.select(".streetarea", "Forest Hill");
//   await page.select(".minbedrooms", "1");
//   await page.select(".maxprice", "2400");

//   page.$eval(".sort-toggle", (el) => el.click());
//   await page.$eval("text/Newest First", (el) => el.click());
