<script>
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Textarea } from "$lib/components/ui/textarea";
    import { Badge } from "$lib/components/ui/badge";
    import { Plus, X } from "lucide-svelte";
    import ProjectForm from "../../../../components/ProjectForm.svelte";

    export let data;

    let { title, slug, description, image, githubLink, liveDemoLink, tags, technologies, dateCreated, _id } = data.project;
    let currentTag = "";
    let currentTech = { name: "", icon: "" };

    let selectedFile = null; // To store the selected file

    // Automatically generate the slug if it's empty
    $: slug = slug || title.toLowerCase().replace(/\s+/g, "-");

    function addTag() {
        if (currentTag && !tags.includes(currentTag)) {
            tags = [...tags, currentTag];
            currentTag = "";
        }
    }

    function removeTag(tag) {
        tags = tags.filter((t) => t !== tag);
    }

    function addTechnology() {
        if (
            currentTech.name &&
            currentTech.icon &&
            !technologies.some((t) => t.name === currentTech.name)
        ) {
            technologies = [...technologies, { ...currentTech }];
            currentTech = { name: "", icon: "" };
        }
    }

    function removeTechnology(techName) {
        technologies = technologies.filter((t) => t.name !== techName);
    }

    function handleFileChange(event) {
        selectedFile = event.target.files[0];
        console.log("Selected file:", selectedFile);
    }
</script>

<ProjectForm action="?/save" {data} isEditMode={true} />
