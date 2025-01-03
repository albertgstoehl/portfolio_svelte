import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, url }) => {
    const isAdmin = await locals.auth();
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
        isAdmin
    };
};
