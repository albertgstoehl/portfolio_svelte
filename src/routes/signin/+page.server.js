import { redirect } from '@sveltejs/kit';
import { signOut, signIn } from '../../auth'; // Adjust the path to your auth setup

export const actions = { default: signIn }

export const load = async ({ parent, locals }) => {
    // Get data from the parent layout
    const { session, isAdmin } = await parent();

    if (session?.user && !isAdmin) {
        throw redirect(303, '/signout'); // Redirect to login with an error flag
    }

    // Return session for the login page
    return {
        isAdmin,
    };
};
