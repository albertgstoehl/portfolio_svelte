<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Textarea } from "$lib/components/ui/textarea";
    import { Send, CheckCircle, AlertCircle } from "lucide-svelte";

    let name = "";
    let email = "";
    let message = "";
    let isSubmitting = false;
    let submitStatus: 'idle' | 'success' | 'error' = 'idle';
    let statusMessage = "";

    // Get your free access key from https://web3forms.com/
    const WEB3FORMS_ACCESS_KEY = process.env.VITE_WEB3FORMS_ACCESS_KEY;

    async function handleSubmit(event: Event) {
        event.preventDefault();
        isSubmitting = true;
        submitStatus = 'idle';

        const formData = {
            access_key: WEB3FORMS_ACCESS_KEY,
            name: name,
            email: email,
            message: message,
            subject: `New Contact Form Submission from ${name}`,
        };

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                submitStatus = 'success';
                statusMessage = "Thank you! Your message has been sent successfully.";
                // Reset form
                name = "";
                email = "";
                message = "";
            } else {
                throw new Error(result.message || "Something went wrong");
            }
        } catch (error) {
            submitStatus = 'error';
            statusMessage = "Sorry, there was an error sending your message. Please try again.";
            console.error("Form submission error:", error);
        } finally {
            isSubmitting = false;
        }
    }
</script>

<div class="max-w-xl mx-auto mt-10 p-6 rounded-lg shadow-md border">
    <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Contact Me
    </h2>

    <!-- Status Messages -->
    {#if submitStatus === 'success'}
        <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 flex items-start" role="alert">
            <CheckCircle class="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
            <div>
                <p class="font-bold">Success!</p>
                <p>{statusMessage}</p>
            </div>
        </div>
    {/if}

    {#if submitStatus === 'error'}
        <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 flex items-start" role="alert">
            <AlertCircle class="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
            <div>
                <p class="font-bold">Error</p>
                <p>{statusMessage}</p>
            </div>
        </div>
    {/if}

    <!-- Contact Form -->
    <form on:submit={handleSubmit} class="space-y-4">
        <div>
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
            </label>
            <Input
                type="text"
                id="name"
                bind:value={name}
                placeholder="Your Name"
                required
                disabled={isSubmitting}
            />
        </div>

        <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
            </label>
            <Input
                type="email"
                id="email"
                bind:value={email}
                placeholder="your.email@example.com"
                required
                disabled={isSubmitting}
            />
        </div>

        <div>
            <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
            </label>
            <Textarea
                id="message"
                bind:value={message}
                placeholder="Your message here..."
                required
                class="min-h-[150px]"
                disabled={isSubmitting}
            />
        </div>

        <Button type="submit" class="w-full" disabled={isSubmitting}>
            <Send class="mr-2 h-4 w-4" />
            {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
    </form>

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

<style>
    /* Optional: Add a subtle animation to status messages */
    div[role="alert"] {
        animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
