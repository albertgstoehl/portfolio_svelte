<script>
    import ProjectForm from "../../../../components/ProjectForm.svelte";

    export let data;
</script>

<ProjectForm action="?/save" {data} isEditMode={true} />
