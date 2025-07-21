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
        // This function will be called after Netlify processes the form
        // We can show a thank you message here
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
        <!-- 
        IMPORTANT: Netlify forms in SvelteKit require:
        1. The route must be prerendered
        2. Hidden form for build-time detection
        3. action="/contact/success" for redirect
        4. Standard POST submission (no JavaScript interference)
        -->

        <!-- Hidden form for Netlify bot detection (REQUIRED) -->
        <form name="contact" netlify netlify-honeypot="bot-field" hidden>
            <input type="text" name="name" />
            <input type="email" name="email" />
            <textarea name="message"></textarea>
        </form>

        <!-- Actual visible form -->
        <form
            name="contact"
            method="POST"
            action="/contact/success"
            data-netlify="true"
            netlify-honeypot="bot-field"
            class="space-y-4"
        >
            <!-- Hidden fields for Netlify -->
            <input type="hidden" name="form-name" value="contact" />
            
            <!-- Anti-spam honeypot field -->
            <div style="display: none;">
                <label>
                    Don't fill this out if you're human: 
                    <input name="bot-field" />
                </label>
            </div>

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

    <div class="mt-8">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            GPG Public Key
        </h3>
        <p class="text-sm text-gray-700 dark:text-gray-300">
            You can use my GPG key to send encrypted messages.
        </p>
        <p class="mt-2">
            <strong>Fingerprint:</strong>
            <code class="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-1 py-0.5 rounded">
                C21E643424AE9A39292DEF9900641D45ED5F4F44
            </code>
        </p>
        <p class="mt-2">
            <a
                href="https://keys.openpgp.org/vks/v1/by-fingerprint/C21E643424AE9A39292DEF9900641D45ED5F4F44"
                target="_blank"
                class="underline"
            >
                Download
            </a>
        </p>
    </div>
</div>
