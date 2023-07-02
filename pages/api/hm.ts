import type { NextApiRequest, NextApiResponse } from 'next';

import puppeteer from "puppeteer-extra";
import { executablePath } from 'puppeteer';
import StealthPlugin from "puppeteer-extra-plugin-stealth";


type Data = {
  name: string
}


puppeteer.use(StealthPlugin());

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
  async function fetch_price() {
    try {
      const browser = await puppeteer.launch({
        headless: "new",
        executablePath: executablePath()
      });
      const page = await browser.newPage();
  
      await page.goto("https://www.interspar.at/shop/lebensmittel/pepsi-cola-cola/p/2020004406385");
      await page.waitForSelector('label.productDetailsPrice');
  
      const value = await page.evaluate(() => {
        const label = document.querySelector('label.productDetailsPrice');
        return label?.textContent;
      });
      console.log(value);
  
      await browser.close();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

fetch_price();

  res.status(200).json({ name: 'John Doe' });

}
