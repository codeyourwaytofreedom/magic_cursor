import type { NextApiRequest, NextApiResponse } from 'next';

import puppeteer from "puppeteer-extra";
import { executablePath } from 'puppeteer';
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import {urls_austria} from "../../components/product_bank";
import {urls} from "../../components/product_bank";

type Data = {
  name: string
}

type url_interface = {
  url:string
}


puppeteer.use(StealthPlugin());

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
  async function fetch_price(url) {
    try {
      const browser = await puppeteer.launch({
        headless: "new",
        executablePath: executablePath()
      });
      const page = await browser.newPage();
      await page.goto(url);
      await page.waitForSelector('label.productDetailsPrice');
      await page.waitForSelector('h1.productDetailsName');
  
      const product = await page.evaluate(() => {
        const product_name = document.querySelector('h1.productDetailsName')?.getAttribute("title");
        const product_price = document.querySelector('label.productDetailsPrice')?.textContent;
        return {product_name,product_price};
      });

      console.log(product);
  
      await browser.close();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

urls.drinks.products.forEach((pro) => pro.product_urls.map((p_url) => fetch_price(p_url.link)))

res.status(200).json({ name: 'John Doe' });

}
