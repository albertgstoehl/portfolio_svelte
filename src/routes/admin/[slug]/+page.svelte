<script>
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";
  import { Badge } from "$lib/components/ui/badge";
  import { Plus, X } from "lucide-svelte";

  let title = "";
  let slug = "";
  let description = "";
  let image = "";
  let githubLink = "";
  let liveDemoLink = "";
  let tags = [];
  let currentTag = "";
  let technologies = [];
  let currentTech = { name: "", icon: "" };

  function addTag() {
    if (currentTag && !tags.includes(currentTag)) {
      tags = [...tags, currentTag];
      currentTag = "";
    }
  }

  function removeTag(tag) {
    tags = tags.filter(t => t !== tag);
  }

  function addTechnology() {
    if (currentTech.name && currentTech.icon && !technologies.some(t => t.name === currentTech.name)) {
      technologies = [...technologies, { ...currentTech }];
      currentTech = { name: "", icon: "" };
    }
  }

  function removeTechnology(techName) {
    technologies = technologies.filter(t => t.name !== techName);
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6 max-w-2xl mx-auto p-6 border rounded-lg shadow-lg">
  <h2 class="text-2xl font-bold text-center mb-6">Edit Project</h2>

  <div>
    <Label for="title">Title</Label>
    <Input type="text" id="title" bind:value={title} required />
  </div>

  <div>
      <Label for="title">Slug</Label>
      <Input type="text" id="title" bind:value={slug} required />
    </div>

  <div>
    <Label for="description">Description</Label>
    <Textarea id="description" bind:value={description} required />
  </div>

  <div>
    <Label for="image">Image URL</Label>
    <Input type="url" id="image" bind:value={image} required />
  </div>

  <div>
    <Label for="githubLink">GitHub Link</Label>
    <Input type="url" id="githubLink" bind:value={githubLink} required />
  </div>

  <div>
    <Label for="liveDemoLink">Live Demo Link</Label>
    <Input type="url" id="liveDemoLink" bind:value={liveDemoLink} required />
  </div>

  <div>
    <Label>Technologies</Label>
    <div class="flex space-x-2 mb-2">
      <Input type="text" placeholder="Name" bind:value={currentTech.name} />
      <Input type="text" placeholder="Icon class" bind:value={currentTech.icon} />
      <Button type="button" variant="outline" size="icon" on:click={addTechnology}>
        <Plus class="h-4 w-4" />
      </Button>
    </div>
    <div class="flex flex-wrap gap-2">
      {#each technologies as tech}
        <Badge variant="secondary">
          {tech.name}
          <button type="button" class="ml-2" on:click={() => removeTechnology(tech.name)}>
            <X class="h-3 w-3" />
          </button>
        </Badge>
      {/each}
    </div>
  </div>

  <div>
    <Label>Tags</Label>
    <div class="flex space-x-2 mb-2">
      <Input type="text" placeholder="Add a tag" bind:value={currentTag} />
      <Button type="button" variant="outline" size="icon" on:click={addTag}>
        <Plus class="h-4 w-4" />
      </Button>
    </div>
    <div class="flex flex-wrap gap-2">
      {#each tags as tag}
        <Badge variant="outline">
          {tag}
          <button type="button" class="ml-2" on:click={() => removeTag(tag)}>
            <X class="h-3 w-3" />
          </button>
        </Badge>
      {/each}
    </div>
  </div>

  <Button type="submit" class="w-full">Create Project</Button>
</form>  