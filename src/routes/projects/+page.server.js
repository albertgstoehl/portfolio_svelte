import { fetchProjects } from '$lib/fetchProjects';

export async function load({url}) {
  const projects = await fetchProjects();
  const technology_filter = url.searchParams.get('technology'); // Get technology from query params
  return { projects, technology_filter };
}
