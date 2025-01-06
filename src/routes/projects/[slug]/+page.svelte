<script>
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import { Badge } from "$lib/components/ui/badge";
    import { Calendar, Github, ExternalLink } from 'lucide-svelte';

    export let data;
    let project = data.project;
  </script>
  
  <svelte:head>
    <title>{project.title} | AGS Portfolio</title>
    <meta name="description" content={project.description} />
  </svelte:head>
  
  <div class="max-w-4xl mx-auto">
    <nav class="text-sm mb-6">
      <a href="/" class="text-blue-400 hover:underline">Home</a>
      <span class="mx-2">/</span>
      <a href="/projects" class="text-blue-400 hover:underline">Projects</a>
      <span class="mx-2">/</span>
      <span>{project.title}</span>
    </nav>
  
    <Card.Root class="overflow-hidden dark">
      <div class="relative h-64 md:h-96">
        <img src={project.image} alt={project.title} class="absolute inset-0 w-full h-full object-cover" />
        <div class="absolute inset-0 bg-black bg-opacity-50 flex items-end">
          <div class="p-6">
            <h1 class="text-4xl font-bold text-white mb-2">{project.title}</h1>
            <div class="flex flex-wrap gap-2">
              {#each project.tags as tag}
                <Badge variant="secondary" class="bg-blue-500 text-white">{tag}</Badge>
              {/each}
            </div>
          </div>
        </div>
      </div>
  
      <Card.Content class="mt-6">
        <p class="text-lg mb-4">{project.description}</p>
        
        <h2 class="text-2xl font-semibold mb-3">Technologies Used</h2>
        <div class="flex flex-wrap gap-2 mb-6">
          {#each project.technologies as tech}
            <a href={`/projects/?technology=${encodeURIComponent(tech.name)}`}
                      rel="external">
              <Badge variant="outline" class="text-blue-400 border-blue-400">{tech.name}</Badge>
            </a>
          {/each}
        </div>
  
        <div class="flex items-center space-x-4 text-sm text-gray-400 mb-6">
          <div class="flex items-center">
            <Calendar class="w-4 h-4 mr-1" />
            <span>Created on {new Date(project.dateCreated).toLocaleDateString()}</span>
          </div>
        </div>
  
        <div class="flex flex-wrap gap-4">
          <Button variant="outline" class="flex items-center space-x-2">
            <Github class="w-4 h-4" />
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer">View on GitHub</a>
          </Button>
          <Button variant="default" class="flex items-center space-x-2">
            <ExternalLink class="w-4 h-4" />
            <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer">Live Demo</a>
          </Button>
        </div>
      </Card.Content>
    </Card.Root>
  </div>