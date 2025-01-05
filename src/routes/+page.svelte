<script>
    import { Canvas } from "@threlte/core";
    import SceneOne from "$lib/SceneOne.svelte";
    import { introPlayed } from "../stores/introStore";
    import { Button } from "$lib/components/ui/button";
    import { onMount } from "svelte";

    export let data;
    let selectedTechnologies = [];
    let showCanvas = false;
    let intro;
    let displayedText = "";
    let cursorInterval;
    let cursorVisible = false;

    const unsubscribe = introPlayed.subscribe((value) => {
        intro = value;
    });

    onMount(() => {
        unsubscribe();
    });

    if (data?.projects && data.projects.length > 0) {
        const allTechnologies = data.projects.flatMap((project) =>
            project.technologies.map((tech) => ({
                icon: tech.icon,
                name: tech.name,
            })),
        );

        const uniqueTechnologies = new Map();
        allTechnologies.forEach((tech) => {
            uniqueTechnologies.set(tech.icon, tech);
        });

        selectedTechnologies = Array.from(uniqueTechnologies.values());
    }
    function toggleCursor() {
        cursorInterval = setInterval(() => {
            cursorVisible = !cursorVisible;
        }, 500);
    }

    async function typewriterEffect() {
        toggleCursor();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        for (let word of data.introText) {
            for (let i = 0; i < word.length; i++) {
                clearInterval(cursorInterval);
                cursorVisible = true;
                displayedText = word.slice(0, i + 1);
                await new Promise((resolve) => setTimeout(resolve, 50));
            }
            toggleCursor();
            await new Promise((resolve) => setTimeout(resolve, 1000));
            if (word !== data.introText[data.introText.length - 1]) {
                for (let i = word.length; i > 0; i--) {
                    clearInterval(cursorInterval);
                    cursorVisible = true;
                    displayedText = word.slice(0, i - 1);
                    await new Promise((resolve) => setTimeout(resolve, 50));
                }
                toggleCursor();
            } else {
                clearInterval(cursorInterval);
                cursorVisible = false;
            }
        }
        showCanvas = true;
    }

    onMount(() => {
        if (!intro) {
            typewriterEffect();
            introPlayed.set(true);
        } else {
            showCanvas = true;
            displayedText = data.introText[data.introText.length - 1];
        }
    });
</script>

<section class="p-5 min-h-screen flex flex-col">
    <div class="text-center mb-5 animate-fade-up animate-once">
        <!-- Fancy "Hello, I'm Albert" -->
        <h1 class="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-200 via-red-500 to-fuchsia-500 text-transparent bg-clip-text animate-gradient">
            Hello, I'm Albert
        </h1>
        <!-- Modern and animated text for the intro -->
        <p class="text-2xl md:text-3xl font-light">
            <i class="inline-block px-4 py-2 rounded-lg shadow-lg text-white animate-bounce">
                {displayedText}<span class="animate-blink">{cursorVisible ? "|" : " "}</span>
            </i>
        </p>
    </div>

    {#if showCanvas}
        <div class="canvas-wrapper h-screen animate-fade-up animate-once">
            <Canvas>
                <SceneOne {selectedTechnologies} />
            </Canvas>
        </div>
    {/if}
</section>

<style>
/* Tailwind utilities for custom animations */
/* Gradient Animation */
@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.animate-gradient {
    @apply bg-gradient-to-r from-yellow-200 via-red-500 to-fuchsia-500 text-transparent bg-clip-text;
    animation: gradient 5s ease infinite;
    background-size: 200% 200%;
}

/* Blinking Cursor */
@keyframes blink {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
}

.animate-blink {
    animation: blink 1s step-start infinite;
}
</style>
