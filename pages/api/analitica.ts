import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient} from "mongodb";
import requestIp from 'request-ip';
import nodemailer from 'nodemailer';


async function connectToDatabase() {
  const client = MongoClient.connect(process.env.MD_URL!);
  return client;
}



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  console.log(requestIp.getClientIp(req));

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
    subject: 'Portfolio Visited: ' + new Date().toLocaleString(),
    text: `Visitor with IP ${requestIp.getClientIp(req)} visited www.emrullahcankilic.com at ${new Date().toLocaleString()} `
  };

  sender.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent successfully:', info.response);
    }
  });

/*   const client = await connectToDatabase();
  const data_base = client.db('magic_cursor');
  const coll = data_base.collection('Cursor_sets');
  coll.insertOne({
    time:new Date().toLocaleString(),
    ip:requestIp.getClientIp(req)
  }); */

  
  res.status(200).send('OK');

}


