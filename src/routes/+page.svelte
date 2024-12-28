<script>
    import {Canvas} from "@threlte/core";
    import SceneOne from "../lib/SceneOne.svelte";

    export let data; // Data returned from the `load` function
    let selectedIcons = [];

    // Randomly select a project's technologies
    if (data?.projects && data.projects.length > 0) {
        const randomProject =
            data.projects[Math.floor(Math.random() * data.projects.length)];
        selectedIcons = randomProject.technologies.map((tech) => tech.icon); // Extract icons
    }
</script>

<section class="p-5">
    <div class="canvas-wrapper h-[700px]">
        <Canvas>
            <!-- Pass the selected icons to the scene -->
            <SceneOne {selectedIcons} />
        </Canvas>
    </div>
</section>
