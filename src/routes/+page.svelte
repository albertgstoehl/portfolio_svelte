<script>
    import { Canvas } from "@threlte/core";
    import SceneOne from "../lib/SceneOne.svelte";

    export let data; // Data returned from the `load` function
    let selectedTechnologies = [];

    // Extract unique technologies (icon and name) from all projects
    if (data?.projects && data.projects.length > 0) {
        const allTechnologies = data.projects.flatMap((project) =>
            project.technologies.map((tech) => ({
                icon: tech.icon,
                name: tech.name,
            }))
        );

        // Remove duplicates based on icon and name
        const uniqueTechnologies = new Map();
        allTechnologies.forEach((tech) => {
            uniqueTechnologies.set(tech.icon, tech);
        });

        selectedTechnologies = Array.from(uniqueTechnologies.values());
    }
</script>

<section class="p-5">
    <div class="canvas-wrapper h-[700px]">
        <Canvas>
            <!-- Pass the selected technologies to the scene -->
            <SceneOne {selectedTechnologies} />
        </Canvas>
    </div>
</section>
