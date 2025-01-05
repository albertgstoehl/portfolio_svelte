<script>
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Edit, Trash2 } from "lucide-svelte";

    export let imageUrl;
    export let title;
    export let description;
    export let technologies;
    export let slug;
    export let manage=false; // Flag to toggle management icons
    export let projectId;
</script>

<Card.Root class="w-[350px] dark relative group flex flex-col justify-between h-[500px]">
    {#if manage}
        <div class="absolute -right-6 top-4 flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a href="/admin/{slug}/edit">
                <Button
                    variant="outline"
                    size="icon"
                    class="h-12 w-12 rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300"
                    aria-label="Edit project"
                >
                    <Edit class="h-6 w-6 text-blue-500 dark:text-blue-400" />
                </Button>
            </a>
            <form action="/admin/{slug}?/delete" method="POST" class="inline-block">
                <input type="hidden" name="projectId" value="{projectId}" />
                <Button
                    type="submit"
                    variant="outline"
                    size="icon"
                    class="h-12 w-12 rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300"
                    aria-label="Delete project"
                >
                    <Trash2 class="h-6 w-6 text-red-500 dark:text-red-400" />
                </Button>
            </form>            
        </div>
    {/if}
    <div class="flex-grow">
        <Card.Header>
            <div class="w-full h-48 mb-4 overflow-hidden rounded-t-lg">
                <img
                    src={imageUrl}
                    alt={title}
                    class="w-full h-full object-cover"
                />
            </div>
            <Card.Title>{title}</Card.Title>
            <Card.Description class="line-clamp-3 text-ellipsis overflow-hidden">{description}</Card.Description>
        </Card.Header>
        <Card.Content>
            <div class="flex flex-wrap gap-2">
                {#each technologies as tech}
                    <a href={`?technology=${encodeURIComponent(tech.name)}`}
                    rel="external">
                        <Badge variant="secondary" class="cursor-pointer hover:underline">{tech.name}</Badge>
                    </a>
                {/each}
            </div>
        </Card.Content>
    </div>
    <Card.Footer class="flex justify-end mt-auto">
        <a href="/projects/{slug}">
            <Button variant="outline">Learn More</Button>
        </a>
    </Card.Footer>
</Card.Root>
