  /**
 * Extract project data from form data.
 * @param {FormData} formData - The form data containing project details
 * @returns {Object} Extracted project data
 */
export function extractProjectData(formData) {
    const title = formData.get('title');
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    const description = formData.get('description');
    const image = formData.get('image');
    const githubLink = formData.get('githubLink');
    const liveDemoLink = formData.get('liveDemoLink');
    const dateCreated = formData.get('dateCreated') || new Date().toISOString().split('T')[0];
    const technologies = JSON.parse(formData.get('technologies') || '[]');
    const tags = JSON.parse(formData.get('tags') || '[]');

    return {
      title,
      slug,
      description,
      image,
      githubLink,
      liveDemoLink,
      dateCreated,
      technologies,
      tags,
    };
  }

  /**
 * Convert a file to a base64-encoded image string.
 * @param {File} file - The uploaded file
 * @returns {Promise<string>} Base64 image string
 */
export async function convertToBase64Image(file) {
    if (!file || file.size === 0) {
      return null; // No file uploaded
    }
  
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;
      return base64Image;
    } catch (error) {
      console.error('Error converting file to base64 image:', error);
      throw new Error('Failed to convert file to base64 image.');
    }
  }
  
  