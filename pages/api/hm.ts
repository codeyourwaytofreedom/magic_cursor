import type { NextApiRequest, NextApiResponse } from 'next';

const puppeteer = require("puppeteer-extra");
const {executablePath} = require('puppeteer')
const StealthPlugin = require("puppeteer-extra-plugin-stealth");


type Data = {
  name: string
}
function wait(ms:any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForTimeout(milliseconds:any) {
  await wait(milliseconds);
  console.log('Waited for', milliseconds, 'milliseconds.');
}
puppeteer.use(StealthPlugin());

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
  async function run(){
    const browser = await puppeteer.launch({
        headless:true,
        executablePath: executablePath()
    })
    const page = await browser.newPage()
    
    await page.goto("https://www.youtube.com/watch?v=CKThDnCf2C8");
    await page.waitForTimeout(5000);    

    for (let index = 0; index < 50; index++) {
        await page.keyboard.press("PageDown");
        await page.waitForTimeout(500);
    }


    const comments = await page.$$("#content-text");
    console.log("Length is: ",comments.length)
    let fin = []
    for (let i = 0; i < comments.length; i++) {
            const element = comments[i];
            const element_text = await page.evaluate(element => element.textContent, element)
            console.log(element_text);
            fin.push({"comment":element_text})
        }           
    browser.close()
}
run();
  res.status(200).json({ name: 'John Doe' })

}
