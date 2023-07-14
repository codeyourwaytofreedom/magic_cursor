import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient} from "mongodb";
import requestIp from 'request-ip';

async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.MD_URL!);
  return client;
}



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const options = {
    timeZone: 'Europe/Istanbul',
  };
  
  const moves = JSON.parse(req.body);
  console.log(moves)

  const client = await connectToDatabase();
  const data_base = client.db('magic_cursor');
  const coll = data_base.collection('Cursor_sets');
  coll.insertOne({
    time:new Date().toLocaleString('tr-TR',options),
    ip:requestIp.getClientIp(req),
    route:moves
    });
      
  res.status(200).send('OK');
}


