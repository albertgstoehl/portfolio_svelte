import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Loaded from environment
const dbName = process.env.MONGODB_DBNAME;

let client;
let db;

/**
 * Initialize MongoDB Connection
 */
export async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, {});
    await client.connect();
    db = client.db(dbName);
  }
  return db;
}

/**
 * Get Projects
 */
export async function getProjects() {
  const db = await connectToDatabase();
  const projects = await db.collection('projects').find({}).toArray();
  return projects;
}

/**
 * Get Ordered Intro Data
 */
export async function getIntroData() {
  const db = await connectToDatabase();
  const intro = await db
    .collection('intro')
    .find({})
    .sort({ order: 1 }) // Sort by the 'order' field in ascending order
    .toArray();
  return intro.map((item) => item.text); // Return only the 'text' field as an array
}
