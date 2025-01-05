import { fetchProjects } from '$lib/projects';

export async function load({parent, url}) {
  const { isAdmin } = await parent();
  const projects = await fetchProjects();
  const technology_filter = url.searchParams.get('technology'); // Get technology from query params
  return { projects, technology_filter, isAdmin };
}
