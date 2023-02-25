// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import puppeteer from "puppeteer";

export default async function handler(req, res) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(
    "https://www.dexters.co.uk/property-lettings/1-bathroom-properties-available-to-rent-in-se23-under-3000"
  );

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  await new Promise((r) => setTimeout(r, 2000));

  const rawItems = await page.$$("li.result.item.to-let.infinite-item");

  const results = rawItems.length;

  const items = await Promise.all(
    rawItems.map(async (item) => {
      const address = await item.$eval(
        ".result-content h2 a",
        (el) => el.innerText
      );

      const price = await item.$eval(".price-qualifier", (el) => el.innerText);

      const beds = await item.$eval(".list-info li:first-child", (el) => el.innerText);

      const url = await item.$eval(".result-content h2 a", (el) => el.href);

      const images = await item.$$eval(".result-image img", (nodes) =>
        nodes.map((img) => img.src)
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
