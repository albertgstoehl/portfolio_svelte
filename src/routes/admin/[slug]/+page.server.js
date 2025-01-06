import { fetchProjects } from '$lib/projects';
import { redirect, fail } from '@sveltejs/kit';
import { deleteProject } from '$lib/db';

export const actions = {
    delete: async ({ request }) => {
      const formData = await request.formData();
      const projectId = formData.get('projectId');

      const result = await deleteProject(projectId);
      if (result.deletedCount === 0) {
          return fail(400, { message: 'No project was deleted.' });
      }
      // Fetch projects again from the database (flagging cache as stale)
      await fetchProjects(true); 
      throw redirect(303, '/projects');
  }
};
