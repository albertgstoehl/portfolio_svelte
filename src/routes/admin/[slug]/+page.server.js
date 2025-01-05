import { fetchProjects } from '$lib/projects';
import { redirect, fail, json, error } from '@sveltejs/kit';
import { findProject, editProject, deleteProject } from '$lib/db';

export async function load({ params, parent }) {
    const project = await findProject(params.slug);
    if (!project) {
        throw error(404, 'Project not found');
    }

    const { isAdmin } = await parent();
    return { project, isAdmin };
}

export const actions = {
    delete: async ({ request }) => {
      const formData = await request.formData();
      const projectId = formData.get('projectId');

      const result = await deleteProject(projectId);
      if (result.deletedCount === 0) {
          return fail(400, { message: 'No project was deleted.' });
      }
      await fetchProjects(true); // Update the projects store
      throw redirect(303, '/projects');
  }
};
