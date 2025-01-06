import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI; // Loaded from environment
const dbName = process.env.MONGODB_DBNAME;

let clientPromise = null; // Promise to track MongoDB client initialization
let db = null; // Database instance

/**
 * Initialize MongoDB Connection
 * @returns {Promise<Db>} The connected MongoDB database instance.
 * @throws {Error} If the connection fails.
 */
export async function connectToDatabase() {
  if (!clientPromise) {
    clientPromise = (async () => {
      try {
        const client = new MongoClient(uri);
        await client.connect();
        db = client.db(dbName);
        return client;
      } catch (error) {
        console.error("Error connecting to database:", error);
        throw new Error("Failed to connect to the database.");
      }
    })();
  }
  await clientPromise; // Ensure client is initialized
  return db;
}

/**
 * Get Projects
 * @returns {Promise<Array>} A list of all projects in the database.
 * @throws {Error} If fetching projects fails.
 */
export async function getProjects() {
  try {
    if (!db) {
      await connectToDatabase(); // Ensure DB is connected
    }
    const projects = await db.collection('projects').find({}).toArray();
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects.");
  }
}

/**
 * Get Ordered Intro Data
 * @returns {Promise<Array<string>>} A sorted list of intro text strings.
 * @throws {Error} If fetching intro data fails.
 */
export async function getIntroData() {
  try {
    if (!db) {
      await connectToDatabase(); // Ensure DB is connected
    }
    const intro = await db
      .collection('intro')
      .find({})
      .sort({ order: 1 }) // Sort by the 'order' field in ascending order
      .toArray();
    return intro.map((item) => item.text); // Return only the 'text' field as an array
  } catch (error) {
    console.error("Error fetching intro data:", error);
    throw new Error("Failed to fetch intro data.");
  }
}

/**
 * Find a Project by Slug
 * @param {string} slug - The slug of the project to find.
 * @returns {Promise<Object|null>} The project data, or null if not found.
 * @throws {Error} If the project lookup fails.
 */
export async function findProject(slug) {
  try {
    if (!db) {
      await connectToDatabase(); // Ensure DB is connected
    }
    const project = await db.collection('projects').findOne({ slug });
    return JSON.parse(JSON.stringify(project));
  } catch (error) {
    console.error(`Error finding project with slug "${slug}":`, error);
    throw new Error("Failed to find the project.");
  }
}

/**
 * Edit a Project
 * @param {string} _id - The ID of the project to edit.
 * @param {Object} updatedData - The updated project data.
 * @returns {Promise<Object>} The result of the update operation.
 * @throws {Error} If the project update fails.
 */
export async function editProject(_id, updatedData) {
  try {
    if (!db) {
      await connectToDatabase(); // Ensure DB is connected
    }
    const objectId = new ObjectId(_id); // Convert the string _id to ObjectId
    const result = await db.collection('projects').updateOne(
      { _id: objectId }, // Use the ObjectId in the query
      { $set: updatedData } // Set the updated data
    );
    return result;
  } catch (error) {
    console.error(`Error editing project with id "${_id}":`, error);
    throw new Error("Failed to edit the project.");
  }
}

/**
 * Delete a Project
 * @param {string} id - The ID of the project to delete.
 * @returns {Promise<Object>} The result of the delete operation.
 * @throws {Error} If the project deletion fails.
 */
export async function deleteProject(id) {
  try {
    if (!db) {
      await connectToDatabase(); // Ensure DB is connected
    }
    const result = await db.collection('projects').deleteOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error(`Error deleting project with id "${id}":`, error);
    throw new Error("Failed to delete the project.");
  }
}

/**
 * Add a New Project
 * @param {Object} projectData - The data of the new project to add.
 * @returns {Promise<Object>} The result of the insert operation.
 * @throws {Error} If adding the project fails.
 */
export async function addProject(projectData) {
  try {
    if (!db) {
      await connectToDatabase(); // Ensure DB is connected
    }
    const result = await db.collection('projects').insertOne(projectData);
    return result;
  } catch (error) {
    console.error("Error adding new project:", error);
    throw new Error("Failed to add the new project.");
  }
}