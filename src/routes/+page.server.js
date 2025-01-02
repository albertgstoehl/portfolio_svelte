import { fetchProjects } from '$lib/fetchProjects';
import { getIntroData } from '$lib/db';

export async function load() {
  // Fetch both projects and intro data concurrently
  const [projects, introText] = await Promise.all([
    fetchProjects(),
    getIntroData(),
  ]);

  return {
    projects,
    introText
  };
}
