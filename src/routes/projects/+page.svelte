<script>
    export let data;
  </script>
  
  <h1 class="text-2xl font-bold">Projects</h1>
  
  {#if data.error}
    <p class="text-red-500">{data.error}</p>
  {:else if data.projects.length === 0}
    <p>No projects found.</p>
  {:else}
    <ul class="mt-4 space-y-4">
      {#each data.projects as project}
        <li class="p-4 border border-gray-300 rounded-lg">
          <h2 class="text-xl font-semibold">{project.title}</h2>
          <p class="text-gray-600 mt-2">{project.description}</p>
          <p class="text-sm text-gray-500 mt-2">Technologies: {project.technologies.join(', ')}</p>
        </li>
      {/each}
    </ul>
  {/if}
  