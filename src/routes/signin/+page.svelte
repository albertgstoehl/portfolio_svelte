<script lang="ts">
    import { signIn } from "@auth/sveltekit/client";
    import { Button } from "$lib/components/ui/button";
    import { SignOut } from "@auth/sveltekit/components";
    import { Github } from "lucide-svelte";

    export let data

    const loginWithGitHub = () => {
        signIn("github");
    };
</script>

<div class="min-h-screen flex flex-col items-center justify-center p-4">
    <div class="max-w-md w-full border rounded-lg shadow-xl p-8 text-center">
        <h1 class="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
            Admin Login
        </h1>

        {#if !data.isAdmin}
            <div
                class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                role="alert"
            >
                You are not authorized to access the admin area.
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
                Log in via GitHub to manage projects and content.
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
