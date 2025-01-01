<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Textarea } from "$lib/components/ui/textarea";
    import { Send } from "lucide-svelte";

    let name = "";
    let email = "";
    let message = "";
    let submitted = false;

    function handleSubmit() {
        // This is just to simulate form submission
        // Netlify will handle the actual form submission
        submitted = true;
    }
</script>

<div class="max-w-xl mx-auto mt-10 p-6 rounded-lg shadow-md border">
    <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Contact Me
    </h2>

    {#if submitted}
        <div
            class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6"
            role="alert"
        >
            <p class="font-bold">Thank you!</p>
            <p>
                Your message has been sent successfully. I'll get back to you
                soon.
            </p>
        </div>
    {:else}
        <form
            name="contact"
            method="POST"
            netlify
            on:submit|preventDefault={handleSubmit}
            class="space-y-4"
        >
            <input type="hidden" name="form-name" value="contact" />

            <div>
                <label
                    for="name"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >Name</label
                >
                <Input
                    type="text"
                    id="name"
                    name="name"
                    bind:value={name}
                    placeholder="Your Name"
                    required
                />
            </div>

            <div>
                <label
                    for="email"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >Email</label
                >
                <Input
                    type="email"
                    id="email"
                    name="email"
                    bind:value={email}
                    placeholder="your.email@example.com"
                    required
                />
            </div>

            <div>
                <label
                    for="message"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >Message</label
                >
                <Textarea
                    id="message"
                    name="message"
                    bind:value={message}
                    placeholder="Your message here..."
                    required
                    class="min-h-[150px]"
                />
            </div>

            <Button type="submit" class="w-full">
                <Send class="mr-2 h-4 w-4" />
                Send Message
            </Button>
        </form>
    {/if}
</div>
