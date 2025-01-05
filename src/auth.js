import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';
import { Auth } from "@auth/core";


const ADMIN_USER_ID = parseInt(process.env.ADMIN_USER_ID, 10);  // Store admin ID in your environment variables as an integer

export const { handle, signIn, signOut } = SvelteKitAuth({
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            // Here, we set the `isAdmin` flag based on the user ID
            return {
                // Set `isAdmin` flag based on the user ID
                //isAdmin: token.sub === ADMIN_USER_ID,
                // for demo purposes, we will set isAdmin to true
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
    trustedHosts: ["ags-portfolio.netlify.app", "localhost"], // Add your trusted hosts here
    trustHost: true,
    debug: true,
});