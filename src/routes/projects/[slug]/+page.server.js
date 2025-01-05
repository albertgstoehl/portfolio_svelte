import { findProject } from '../../../lib/db';
import { error } from '@sveltejs/kit';

export async function load({ params, parent, url }) {
  const project= await findProject(params.slug);
  const {isAdmin} = await parent();
  return { project, isAdmin };
}
