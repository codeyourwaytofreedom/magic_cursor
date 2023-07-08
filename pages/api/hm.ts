import type { NextApiRequest, NextApiResponse } from 'next';

import { MongoClient} from "mongodb";


async function connectToDatabase() {
  const client = MongoClient.connect(process.env.MD_URL!);
  return client;
}



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  console.log(JSON.parse(req.body));

  const client = await connectToDatabase();
  const data_base = client.db('magic_cursor');
  const coll = data_base.collection('Cursor_sets');
  coll.insertOne({
    time:new Date(),
    ip:req.headers['x-client-ip']
  });

  console.log(req.headers['x-client-ip'])

  res.status(200).send('OK');

}
