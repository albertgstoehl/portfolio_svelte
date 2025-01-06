import { findProject, editProject } from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';
import { fetchProjects } from '$lib/projects';
import { extractProjectData, convertToBase64Image } from '../../../../utils/projectUtils.js';
import { modalState } from '../../../../stores/modalStore.js';

export async function load({ params, parent }) {
  const project = await findProject(params.slug);

  if (!project) {
    throw error(404, 'Project not found');
  }

  const { isAdmin } = await parent();
  return { project, isAdmin };
}

export const actions = {
  save: async ({ request }) => {
    const formData = await request.formData();
    const projectId = formData.get('projectId');
    const updatedData = extractProjectData(formData);

    // Handle image processing if file present
    if (updatedData.image && updatedData.image.size > 0) {
      try {
        updatedData.image = await convertToBase64Image(updatedData.image);
      } catch (error) {
        console.error('Error converting file to Base64:', error);

        return fail(500, { message: 'Failed to process the uploaded image.' });
      }
    }else{
      delete updatedData.image;
    }

    try {
      const result = await editProject(projectId, updatedData);

      // Fetch projects again from the database (flagging cache as stale)
      await fetchProjects(true);

      if (result.modifiedCount === 0) {
        return fail(400, { message: 'No changes were made.' });
      }

      return {
        redirectUrl: `/projects/${updatedData.slug}`,
        message: 'Project updated successfully!',
      };
    } catch (error) {
      console.error('Error updating project:', error);

      return fail(500, { message: 'Failed to update project.' });
    }
  },
};
