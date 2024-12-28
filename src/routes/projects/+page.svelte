<script>
    import ProjectCard from '../../components/ProjectCard.svelte';
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
            {#each data.projects as project}
                <ProjectCard
                    imageUrl={project.image}
                    title={project.title}
                    description={project.description}
                    technologies={project.technologies}
                    slug={project.slug}
                />
            {/each}
        </div>
    </div>
{/if}
