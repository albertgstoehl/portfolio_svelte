import { getProjects } from '$lib/db';
import { projectsStore } from '../stores/projectStore';

/**
 * Fetch projects from the database or cache.
 * @param {boolean} needsUpdate - Flag to determine if the cache should be bypassed
 * @returns {Promise<Array>} List of projects
 */
export async function fetchProjects(needsUpdate) {
  let projects;

  // Subscribe to the store to check its current value
  const unsubscribe = projectsStore.subscribe((value) => {
    projects = value;
  });

  if (projects !== null && !needsUpdate) {
    // If the store already has data, return it
    unsubscribe();
    return projects;
  }

  try {
    // Fetch data if not already cached
    projects = await getProjects();
    const formattedProjects = JSON.parse(JSON.stringify(projects));
    projectsStore.set(formattedProjects); // Cache the data in the store
    unsubscribe();
    return formattedProjects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    unsubscribe();
    return []; // Return an empty array in case of error
  }
}
