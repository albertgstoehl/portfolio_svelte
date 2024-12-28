<script>
    import {Canvas} from "@threlte/core";
    import SceneOne from "../lib/SceneOne.svelte";

    export let data; // Data returned from the `load` function
    let selectedIcons = [];

    // Extract unique icons from all projects' technologies
    if (data?.projects && data.projects.length > 0) {
        const allIcons = data.projects.flatMap((project) => project.technologies.map((tech) => tech.icon));
        selectedIcons = [...new Set(allIcons)]; // Remove duplicates
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
