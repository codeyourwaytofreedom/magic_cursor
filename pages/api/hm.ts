import type { NextApiRequest, NextApiResponse } from 'next';

import { MongoClient } from "mongodb";


type Data = {
  name: string
}

async function connectToDatabase() {
  const client = MongoClient.connect(process.env.MD_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  return client;
}



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
  console.log(JSON.parse(req.body));
  const client = await connectToDatabase();
  console.log(client)


  res.status(200).json({ name: 'John Doe' });

}
