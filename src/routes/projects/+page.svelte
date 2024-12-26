<script>
    export let data;

    function handleClick(event, slug) {
        event.preventDefault(); // Prevent immediate navigation
        const selected_card = event.currentTarget;
        const root_div = selected_card.closest('.animate-fade-up');

        // Remove the root_div and replace with selected card
        if (root_div) {
            root_div.replaceWith(selected_card);
        }

        // Add Animation
        selected_card.classList.add(
            'animate-ping',
        );

        // Wait 0.5 seconds before redirecting
        setTimeout(() => {
            window.location.href = `/projects/${slug}`;
        }, 250);
    }
</script>

{#if data.error}
    <p class="text-red-500">{data.error}</p>
{:else if data.projects.length === 0}
    <p>No projects found.</p>
{:else}
    <div class="animate-fade-up pt-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each data.projects as project, index}
                <a
                    href={`/projects/${project.slug}`}
                    class="h-full max-w-sm p-6 rounded-lg shadow-md dark:bg-blue-950/30 backdrop-blur-xl hover:border-4 hover:border-indigo-500/100"
                    on:click={(e) => handleClick(e, project.slug)}
                >
                    <div class="w-full h-48 overflow-hidden">
                        <img
                            src={project.image}
                            alt={project.title}
                            class="w-full h-full object-cover"
                        />
                    </div>
                    <h2 class="text-xl font-semibold">{project.title}</h2>
                    <p class="text-gray-400 mt-2">{project.description}</p>
                    <p class="text-sm text-gray-500 mt-2">
                        Technologies: {project.technologies.join(", ")}
                    </p>
                </a>
            {/each}
        </div>
    </div>
{/if}
