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
    client = new MongoClient(uri, { });
    await client.connect();
    db = client.db(dbName);
  }
  return db;
}

export async function getProjects() {
  const db = await connectToDatabase();
  const projects = await db.collection('projects').find({}).toArray();
  return projects;
}
