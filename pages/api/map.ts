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

    console.log("Mapping route accessed");

    const client = await connectToDatabase();
    const data_base = client.db('magic_cursor');
    const coll = data_base.collection('Cursor_sets');

    coll.find().toArray((error, documents) => {
        if (error) {
          console.error('Error finding documents in collection:', error);
          return;
        }
    
        documents?.forEach((document) => {
          console.log(document);
        });
    });
    
  res.status(200).send('OK');
}


