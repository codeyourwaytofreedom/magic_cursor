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

    try {
      const documents = await new Promise((resolve, reject) => {
        coll.find().toArray((error, result) => {
          if (error) {
            console.error('Error finding documents in collection:', error);
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
  
      res.json(documents);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }

  }


