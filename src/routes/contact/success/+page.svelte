<script>
    import { Button } from "$lib/components/ui/button";
    import { CheckCircle, ArrowLeft } from "lucide-svelte";
</script>

<svelte:head>
    <title>Message Sent Successfully | Contact</title>
</svelte:head>

<div class="max-w-xl mx-auto mt-10 p-6 rounded-lg shadow-md border text-center">
    <div class="flex justify-center mb-6">
        <CheckCircle class="w-16 h-16 text-green-500" />
    </div>
    
    <h1 class="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        Thank You!
    </h1>
    
    <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">
        Your message has been sent successfully. I'll get back to you as soon as possible.
    </p>
    
    <div class="space-y-4">
        <Button href="/contact" variant="outline" class="w-full">
            <ArrowLeft class="mr-2 h-4 w-4" />
            Send Another Message
        </Button>
        
        <Button href="/" variant="default" class="w-full">
            Back to Home
        </Button>
    </div>
</div>