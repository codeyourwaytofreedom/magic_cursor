import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient} from "mongodb";
import nodemailer from 'nodemailer';
import { promisify } from 'util';
import requestIp from 'request-ip';


async function connectToDatabase() {
  const client = MongoClient.connect(process.env.MD_URL!);
  return client;
}



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  
  const sender = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL,
      pass: process.env.PW
    }
  });

  const mailOptions = {
    from: process.env.MAIL,
    to: process.env.ME,
    subject: 'Cursor Project:',
    text: "Cursor project visited..." + requestIp.getClientIp(req)
  };


  const sendMailAsync = promisify(sender.sendMail).bind(sender);
  try {
    await sendMailAsync(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
  
  res.status(200).send('OK');

}


