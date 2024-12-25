import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Loaded from Netlify's environment
const dbName = process.env.MONGODB_DBNAME;

let client;
let db;

/**
 * Initialize MongoDB Connection
 */
export async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db(dbName);
    console.log('Connected to MongoDB');
  }
  return db;
}
