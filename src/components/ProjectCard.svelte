<script>
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";

    export let imageUrl;
    export let title;
    export let description;
    export let technologies;
    export let slug;
</script>

<Card.Root class="w-[350px] dark">
    <Card.Header>
        <div class="w-full h-48 mb-4 overflow-hidden rounded-t-lg">
            <img
                src={imageUrl}
                alt={title}
                class="w-full h-full object-cover"
            />
        </div>
        <Card.Title>{title}</Card.Title>
        <Card.Description>{description}</Card.Description>
    </Card.Header>
    <Card.Content>
        <div class="flex flex-wrap gap-2">
            {#each technologies as tech}
                <Badge variant="secondary">{tech.name}</Badge>
            {/each}
        </div>
    </Card.Content>
    <Card.Footer class="flex justify-end">
        <a href="/projects/{slug}">
            <Button variant="outline">Learn More</Button>
        </a>
    </Card.Footer>
</Card.Root>
