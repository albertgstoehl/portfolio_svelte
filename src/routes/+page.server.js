import { connectToDatabase } from '../lib/db';

export async function load() {
  try {
    // Connect to the database
    const db = await connectToDatabase();

    // Fetch all projects from the "projects" collection
    const projects = await db.collection('projects').find({}).toArray();

    // Return projects to the corresponding +page.svelte
    return {
      projects: JSON.parse(JSON.stringify(projects)), // Ensure data is serializable
    };
  } catch (error) {
    console.error('Error fetching projects:', error);

    // Return error to the +page.svelte to handle appropriately
    return {
      error: 'Failed to fetch projects. Please try again later.',
    };
  }
}
