import { projectsStore } from '../stores/projectStore';
import { getProjects } from './db';

export async function fetchProjects() {
  let projects;

  // Subscribe to the store to check its current value
  const unsubscribe = projectsStore.subscribe((value) => {
    projects = value;
  });

  if (projects !== null) {
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
