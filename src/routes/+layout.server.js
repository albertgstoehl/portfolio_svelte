import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, url }) => {
    // Get the session data
    const session = await locals.auth();
    // Extract the isAdmin and loginAttempted flags from the session data
    const {isAdmin, loginAttempted} = session || {};
    // Check if the current URL path starts with "/admin"
    if (url.pathname.startsWith('/admin')) {
        // Check if the user is authenticated
        if (!isAdmin) {
            // Redirect to login if not authenticated
            throw redirect(302, '/signin');
        }
    }

    // If the URL is not under "/admin", proceed without a redirect
    return {
        isAdmin,
        loginAttempted
    };
};
