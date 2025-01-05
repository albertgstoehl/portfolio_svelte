import { addProject } from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';
import { fetchProjects } from '$lib/projects';
import { extractProjectData, convertToBase64Image } from '../../../utils/projectUtils';
import { modalState } from '../../../stores/modalStore';

export const actions = {
  add: async ({ request }) => {
    const formData = await request.formData();
    const newProject = extractProjectData(formData);

    // Convert uploaded image to Base64
    if (newProject.image && newProject.image.size > 0) {
      try {
        newProject.image = await convertToBase64Image(newProject.image);
      } catch (error) {
        console.error('Error converting file to Base64:', error);

        return fail(500, { message: 'Failed to process the uploaded image.' });
      }
    }

    try {
      const result = await addProject(newProject);

      if (result.insertedId) {
        // Fetch updated projects
        await fetchProjects(true);

        // Return success response
        return {
          message: 'Project created successfully!',
          redirectUrl: `/projects/${newProject.slug}`,
        };
      } else {
        return fail(400, { message: 'Failed to create the project.' });
      }
    } catch (error) {
      console.error('Error creating project:', error);

      return fail(500, { message: 'Internal server error.' });
    }
  },
};
