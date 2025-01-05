<script>
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Textarea } from "$lib/components/ui/textarea";
    import { Badge } from "$lib/components/ui/badge";
    import { Plus, X } from "lucide-svelte";
    import { modalState } from '../stores/modalStore';

    export let data;

    export let project = {
        title: "",
        slug: "",
        description: "",
        githubLink: "",
        liveDemoLink: "",
        tags: [],
        technologies: [],
        image: null,
        dateCreated: "",
        _id: null,
    };

    if (data?.project) {
        project = data.project;
    }

    export let action = ""; // Action URL for the form
    export let isEditMode = false; // Determines if the form is in edit mode

    let currentTag = "";
    let currentTech = { name: "", icon: "" };
    let selectedFile = null;

    function addTag() {
        if (currentTag && !project.tags.includes(currentTag)) {
            project.tags = [...project.tags, currentTag];
            currentTag = "";
        }
    }

    function removeTag(tag) {
        project.tags = project.tags.filter((t) => t !== tag);
    }

    function addTechnology() {
        if (
            currentTech.name &&
            currentTech.icon &&
            !project.technologies.some((t) => t.name === currentTech.name)
        ) {
            project.technologies = [...project.technologies, { ...currentTech }];
            currentTech = { name: "", icon: "" };
        }
    }

    function removeTechnology(techName) {
        project.technologies = project.technologies.filter((t) => t.name !== techName);
    }

    function handleFileChange(event) {
        selectedFile = event.target.files[0];
        console.log("Selected file:", selectedFile);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        if (selectedFile) {
            formData.set("image", selectedFile);
        }

        try {
            const response = await fetch(action, {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            console.log("Form submission result:", result);

            const message = JSON.parse(result.data)[JSON.parse(result.data)[0].message];
            const redirectUrl = JSON.parse(result.data)[JSON.parse(result.data)[0].redirectUrl];
            console.log("message:", redirectUrl);

            // Reset modal state before showing new one
            modalState.set({ showModal: false, message: "", type: "info" });

            // Handle response based on the `type` field
            if (result.type === "success") {
                modalState.set({
                    showModal: true,
                    message: message || (isEditMode ? "Project updated successfully!" : "Project created successfully!"),
                    type: "success",
                });

                if (redirectUrl) {
                    setTimeout(() => {
                        window.location.href = redirectUrl;
                    }, 3000); // Delay for modal display
                }
            }else {
                modalState.set({
                    showModal: true,
                    message: message || "An error occurred.",
                    type: "error",
                });
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            modalState.set({
                showModal: true,
                message: "Failed to submit the form.",
                type: "error",
            });
        }
    }
</script>


  
  <form
    on:submit|preventDefault={handleSubmit}
    enctype="multipart/form-data"
    class="space-y-6 max-w-2xl mx-auto p-6 border rounded-lg shadow-lg"
  >
    <h2 class="text-2xl font-bold text-center mb-6">{isEditMode ? "Edit Project" : "Create New Project"}</h2>
  
    {#if isEditMode}
      <Input type="hidden" name="projectId" bind:value={project._id} />
    {/if}
  
    <div>
      <Label for="title">Title</Label>
      <Input type="text" id="title" name="title" bind:value={project.title} required />
    </div>
  
    <div>
      <Label for="description">Description</Label>
      <Textarea id="description" name="description" bind:value={project.description} required />
    </div>
  
    <div>
      <Label for="image">Image</Label>
      <Input type="file" id="image" name="image" accept="image/*" on:change={handleFileChange} />
      {#if isEditMode && project.image}
        <div class="mt-2">
          <Label>Current Image:</Label>
          <img src={project.image} alt="Current Image" class="max-w-xs border rounded" />
        </div>
      {/if}
    </div>
  
    <div>
      <Label for="githubLink">GitHub Link</Label>
      <Input type="url" id="githubLink" name="githubLink" bind:value={project.githubLink} required />
    </div>
  
    <div>
      <Label for="liveDemoLink">Live Demo Link</Label>
      <Input type="url" id="liveDemoLink" name="liveDemoLink" bind:value={project.liveDemoLink} required />
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
        {#each project.technologies as tech}
          <Badge variant="secondary">
            {tech.name}
            <button type="button" class="ml-2" on:click={() => removeTechnology(tech.name)}>
              <X class="h-3 w-3" />
            </button>
          </Badge>
        {/each}
      </div>
      <input type="hidden" name="technologies" value={JSON.stringify(project.technologies)} />
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
        {#each project.tags as tag}
          <Badge variant="outline">
            {tag}
            <button type="button" class="ml-2" on:click={() => removeTag(tag)}>
              <X class="h-3 w-3" />
            </button>
          </Badge>
        {/each}
      </div>
      <input type="hidden" name="tags" value={JSON.stringify(project.tags)} />
    </div>
  
    <Button type="submit" class="w-full">{isEditMode ? "Save Changes" : "Create Project"}</Button>
  
    <input type="hidden" name="dateCreated" value={project.dateCreated || new Date().toISOString()} />
  </form>
  