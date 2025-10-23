import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!;
if (!uri) throw new Error("MONGODB_URI is not defined in .env");

const client = new MongoClient(uri);
const dbPromise = client.connect().then(() => client.db()); // default db

export const getDb = async (): Promise<Db> => {
  return await dbPromise;
};
