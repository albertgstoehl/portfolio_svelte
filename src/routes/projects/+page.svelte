<script lang="ts">
    import ProjectCard from "../../components/ProjectCard.svelte";
    import { Button } from "$lib/components/ui/button";
    import { ArrowLeft, Layers } from "lucide-svelte";
    export let data;

    if (data.technology_filter !== null) {
        data.projects = data.projects.filter((project) =>
            project.technologies.some(
                (tech) => tech.name === data.technology_filter,
            ),
        );
    }
</script>

<div class="container mx-auto px-4 py-8 dark">
    {#if data.error}
        <p class="text-red-500 text-center text-lg">{data.error}</p>
    {:else if data.projects.length === 0}
        <p class="text-center text-lg text-gray-600 dark:text-gray-400">No projects found.</p>
    {:else}
        <div class="animate-fade-up space-y-8">
            {#if data.technology_filter !== null}
                <div class="border text-white p-8 rounded-lg shadow-lg">
                    <h1 class="text-3xl font-bold mb-2">
                        Projects using {data.technology_filter}
                    </h1>
                    <p class="text-blue-100">
                        Explore projects that leverage the power of {data.technology_filter}
                    </p>
                </div>
            {:else}
                <h1 class="text-3xl font-bold text-gray-800 dark:text-white">
                    All Projects
                </h1>
            {/if}

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

            {#if data.technology_filter !== null}
                <div class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                    <Button variant="outline" class="w-full sm:w-auto">
                        <a href="/projects" class="flex items-center justify-center">
                            <Layers class="mr-2 h-4 w-4" />
                            Show all projects
                        </a>
                    </Button>
                    <Button variant="ghost" class="w-full sm:w-auto">
                        <a href="/" class="flex items-center justify-center">
                            <ArrowLeft class="mr-2 h-4 w-4" />
                            Go back
                        </a>
                    </Button>
                </div>
            {/if}
        </div>
    {/if}
</div>