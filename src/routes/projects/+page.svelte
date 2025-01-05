<script>
    import ProjectCard from "../../components/ProjectCard.svelte";
    import { Button } from "$lib/components/ui/button";
    import { ArrowLeft, Layers, Plus } from "lucide-svelte";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { redirect } from "@sveltejs/kit";

    export let data;

    // Reactive filter and filtered projects
    let currentFilter = data.technology_filter || null;
    let filteredProjects = data.projects;

    $: filteredProjects = currentFilter
        ? data.projects.filter((project) =>
              project.technologies.some((tech) => tech.name === currentFilter),
          )
        : data.projects;

    // Watch URL changes for filter updates
    onMount(() => {
        const updateFilterFromUrl = () => {
            const { searchParams } = new URL(window.location.href);
            currentFilter = searchParams.get("technology") || null;
        };

        updateFilterFromUrl();

        // Listen to history changes
        window.addEventListener("popstate", updateFilterFromUrl);

        return () =>
            window.removeEventListener("popstate", updateFilterFromUrl);
    });

    // Update URL and filter dynamically
    function updateFilter(filter) {
        const url = new URL(window.location.href);
        if (filter) {
            url.searchParams.set("technology", filter);
        } else {
            url.searchParams.delete("technology");
        }
        window.history.pushState({}, "", url);
        currentFilter = filter;
    }
</script>

<div class="container mx-auto px-4 py-8 dark">
    {#if data.error}
        <p class="text-red-500 text-center text-lg">{data.error}</p>
    {:else if filteredProjects.length === 0}
        <p class="text-center text-lg text-gray-600 dark:text-gray-400">
            No projects found.
        </p>
    {:else}
        <div class="animate-fade-up space-y-8">
            <div class="flex items-center justify-center relative">
                {#if currentFilter}
                    <div class="text-white p-8 rounded-lg shadow-lg border">
                        <h1 class="text-3xl font-bold mb-2 text-center">
                            Projects using {currentFilter}
                        </h1>
                        <p class="text-blue-100 text-center">
                            Explore projects that leverage the power of {currentFilter}
                        </p>
                        <Button
                            variant="ghost"
                            class="mt-4"
                            on:click={() => updateFilter(null)}
                        >
                            Clear Filter
                        </Button>
                    </div>
                {/if}

                {#if data.isAdmin}
                    <div class="absolute right-0">
                        <a href="/admin/create">
                            <Button
                                variant="outline"
                                size="icon"
                                class="h-12 w-12 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                            >
                                <Plus class="h-6 w-6 text-green-500" />
                                <span class="sr-only">Create new project</span>
                            </Button>
                        </a>
                    </div>
                {/if}
            </div>

            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
            >
                {#each filteredProjects as project}
                    <ProjectCard
                        imageUrl={project.image}
                        title={project.title}
                        description={project.description}
                        technologies={project.technologies}
                        slug={project.slug}
                        manage={data.isAdmin}
                        projectId={project._id}
                        on:filterChange={updateFilter}
                    />
                {/each}
            </div>

            {#if currentFilter}
            <div
                class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8"
                >
            
                <Button variant="outline" class="w-full sm:w-auto" on:click={() => updateFilter(null)}>
                    <a
                        href="/projects"
                        class="flex items-center justify-center"
                    >
                        <Layers class="mr-2 h-4 w-4" />
                        Show all projects
                    </a>
                </Button>
            <Button
                variant="ghost"
                class="w-full sm:w-auto"
                on:click={() => window.history.back()}
            >
                <div class="flex items-center justify-center">
                    <ArrowLeft class="mr-2 h-4 w-4" />
                    Go back
                </div>
            </Button>
            </div>
            {/if}
        </div>
    {/if}
</div>
