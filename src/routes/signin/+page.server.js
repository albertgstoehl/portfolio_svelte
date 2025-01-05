import { redirect } from '@sveltejs/kit';
import { signOut, signIn } from '../../auth'; // Adjust the path to your auth setup

export const actions = { default: signIn }

export const load = async ({ parent, locals }) => {
    // Get data from the parent layout
    const {isAdmin,loginAttempted} = await parent();

    return {isAdmin, loginAttempted};
};
