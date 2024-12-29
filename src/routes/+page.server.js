import { fetchProjects } from '$lib/fetchProjects';

export async function load() {
  const projects = await fetchProjects();
  return { projects };
}
