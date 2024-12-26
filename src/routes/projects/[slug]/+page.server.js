import { connectToDatabase } from '../../../lib/db';
import { error } from '@sveltejs/kit';

export async function load({ params }) {

  try {
    // Connect to the database
    const db = await connectToDatabase()

    // Find the project by slug
    const project = await db.collection('projects').findOne({ slug: params.slug });

    // Return the project with the original title and description
    return {
      project: JSON.parse(JSON.stringify(project)),
    };
  } catch (err) {
    console.error('Error fetching project:', err);

    // Throw a 500 error for unexpected issues
    throw error(500, 'Failed to fetch project. Please try again later.');
  }
}
