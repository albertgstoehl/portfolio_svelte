import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Loaded from environment
const dbName = process.env.MONGODB_DBNAME;

let clientPromise = null; // Promise to track MongoDB client initialization
let db = null; // Database instance

/**
 * Initialize MongoDB Connection
 */
export async function connectToDatabase() {
  if (!clientPromise) {
    clientPromise = (async () => {
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      db = client.db(dbName);
      return client;
    })();
  }
  await clientPromise; // Ensure client is initialized
  return db;
}

/**
 * Get Projects
 */
export async function getProjects() {
  if (!db) {
    await connectToDatabase(); // Ensure DB is connected
  }
  const projects = await db.collection('projects').find({}).toArray();
  return projects;
}

/**
 * Get Ordered Intro Data
 */
export async function getIntroData() {
  if (!db) {
    await connectToDatabase(); // Ensure DB is connected
  }
  const intro = await db
    .collection('intro')
    .find({})
    .sort({ order: 1 }) // Sort by the 'order' field in ascending order
    .toArray();
  return intro.map((item) => item.text); // Return only the 'text' field as an array
}
