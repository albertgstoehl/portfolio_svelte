import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';
import { Auth } from "@auth/core";


const ADMIN_USER_ID = parseInt(process.env.ADMIN_USER_ID, 10); // Parse the admin user ID from the environment variable

export const { handle, signIn, signOut } = SvelteKitAuth({
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            return {
                // for demo purposes, we will set isAdmin to true so everybody can access the admin page
                // TODO: change this to check if the user is an admin
                isAdmin: true,
                loginAttempted: true,
            };
        },
        async jwt({ token, profile }) {
            if (profile) {
                token.sub = profile.id;  // Store the GitHub user ID in the token
                token.isAdmin = profile.id === ADMIN_USER_ID;  // Set `isAdmin` flag in the token
            }
            return token;
        },
    },
    trustedHosts: ["ags-portfolio.netlify.app", "localhost"],
    trustHost: true
});