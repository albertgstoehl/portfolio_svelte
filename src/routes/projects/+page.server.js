import { fetchProjects } from '$lib/projects';

export async function load({parent, url}) {
  const { isAdmin } = await parent();
  const projects = await fetchProjects();
  return { projects, isAdmin };
}
