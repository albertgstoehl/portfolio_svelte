<script>
    export let data;
    let project = data.project;
</script>

{#if project}
    <div
        class="animate-jump animate-once text-white flex backdrop-blur-md rounded-lg shadow-md dark:bg-blue-950/30 backdrop-blur-xl"
    >
        <div class="w-full max-w-4xl p-8">
            <!-- Project Image -->
            <div class="w-full h-64 overflow-hidden rounded-lg">
                <img
                    src={project.image}
                    alt={project.title}
                    class="w-full h-full object-cover"
                />
            </div>

            <!-- Title and Metadata -->
            <div class="mt-6">
                <h1 class="text-4xl font-bold">{project.title}</h1>
                <p class="text-gray-400 mt-2">
                    Created on: <span class="text-white"
                        >{new Date(
                            project.dateCreated,
                        ).toLocaleDateString()}</span
                    >
                </p>
                <div class="mt-4 flex gap-2 justify-center">
                    {#each project.tags as tag}
                        <span
                            class="bg-indigo-700 text-sm rounded-full px-4 py-1"
                            >{tag}</span
                        >
                    {/each}
                </div>
            </div>

            <!-- Description -->
            <div class="mt-6">
                <p class="text-gray-300 text-lg">{project.description}</p>
            </div>

            <!-- Technologies -->
            <div class="mt-6">
                <h2 class="text-2xl font-semibold mb-4 text-center">
                    Technologies Used
                </h2>
                <div class="flex flex-wrap gap-4 justify-center">
                    {#each project.technologies as tech}
                        <div class="flex flex-col items-center gap-2">
                            <!-- Icon -->
                            <i class="{tech.icon} colored text-4xl"></i>
                            <!-- Name -->
                            <span class="text-gray-300 text-sm"
                                >{tech.name}</span
                            >
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Links -->
            <div class="mt-6 flex gap-4 justify-center">
                {#if project.githubLink}
                    <!-- GitHub Icon Link -->
                    <a
                        href={project.githubLink}
                        target="_blank"
                        class="hover:opacity-75"
                    >
                        <i
                            class="devicon-github-original-wordmark colored text-6xl"
                        ></i>
                    </a>
                {/if}
                {#if project.liveDemoLink}
                    <a
                        href={project.liveDemoLink}
                        target="_blank"
                        class="hover:opacity-75"
                    >
                        <div
                            class="flex items-center justify-center w-16 h-16 rounded-full bg-grey-900"
                        >
                            <i
                                class="fa-solid fa-eye text-5xl"
                                style="color: #ffff;"
                            ></i>
                        </div>
                    </a>
                {/if}
            </div>
        </div>
    </div>
{:else}
    <!-- Error message for missing project -->
    <div
        class="min-h-screen bg-gradient-to-r from-blue-800 to-indigo-900 text-white flex items-center justify-center"
    >
        <div class="text-center">
            <h1 class="text-3xl font-bold mb-4">Project not found</h1>
            <a href="/projects" class="text-blue-500 hover:underline text-lg"
                >← Back to Projects</a
            >
        </div>
    </div>
{/if}
