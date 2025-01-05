<script lang="ts">
    import { signIn } from "@auth/sveltekit/client";
    import { Button } from "$lib/components/ui/button";
    import { SignOut } from "@auth/sveltekit/components";
    import { Github } from "lucide-svelte";
    import { modalState } from "../../stores/modalStore.js";

    export let data;

    const loginWithGitHub = () => {
        signIn("github");
    };

    // Show appropriate modal messages based on session and admin status
    $: {
        if (data?.loginAttempted && data?.isAdmin) {
            modalState.set({
                showModal: true,
                message: "Login successful! You are now an admin.",
                type: "success",
            });
        } else if (data?.loginAttempted && !data?.isAdmin) {
            modalState.set({
                showModal: true,
                message: "You are logged in, but you are not authorized for admin functionality.",
                type: "error",
            });
        }
    }
</script>

<div class="min-h-screen flex flex-col items-center justify-center p-4">
    <div class="max-w-md w-full border rounded-lg shadow-xl p-8 text-center">
        <h1 class="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
            Admin Login
        </h1>

        {#if !data.isAdmin}
            <p class="text-gray-600 dark:text-gray-300 mb-6">
                Log in via GitHub to manage projects and content.
            </p>

            <!-- Admin access demo instructions -->
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
                For admin access to the demo, please click the login button below. Your session will be authorized for prototype purposes.
            </p>
            
            <Button on:click={loginWithGitHub} class="w-full" variant="default">
                <Github class="mr-2 h-5 w-5" />
                Login with GitHub
            </Button>
    
            <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Only authorized administrators can access this area.
            </p>
        {:else}
            <div
                class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                role="alert"
            >
                You are logged in as the admin.
            </div>
            <SignOut>
                <span class="text-sm font-medium transition-colors hover:text-primary" slot="submitButton">Logout</span>
            </SignOut>
        {/if}
    </div>
</div>
