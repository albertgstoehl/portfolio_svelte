<script lang="ts">
    import { onDestroy } from "svelte";
    import { modalState } from "../stores/modalStore";
    import * as Dialog from "$lib/components/ui/dialog";
    import { Button } from "$lib/components/ui/button";

    let timeout: number;

    // Reactive modal state from the store
    $: {
        $modalState;
        const { showModal } = $modalState;

        if (showModal) {
            // Close the modal after 3 seconds
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                closeModal();
            }, 3000);
        }
    }

    onDestroy(() => {
        closeModal();
        clearTimeout(timeout);
    });

    function closeModal() {
        modalState.set({
            showModal: false,
            message: "",
            type: "info",
        });
    }

    // Return the appropriate icon based on the modal type
    function getIcon(type: string) {
        switch (type) {
            case "success":
                return "✅";
            case "error":
                return "❌";
            case "info":
                return "ℹ️";
            default:
                return "";
        }
    }
</script>

<Dialog.Root
    open={$modalState.showModal}
    onOpenChange={(open) => modalState.set({ ...$modalState, showModal: open })}
>
    <Dialog.Portal class="dark">
        <Dialog.Overlay />
        <Dialog.Content class="dark">
            <div class="flex flex-col items-center text-center">
                <span class="text-4xl mb-2">{getIcon($modalState.type)}</span>
                <Dialog.Title class="text-lg font-semibold">
                    {$modalState.type.charAt(0).toUpperCase() +
                        $modalState.type.slice(1)}
                </Dialog.Title>
                <Dialog.Description class="text-sm text-muted-foreground mt-2">
                    {$modalState.message}
                </Dialog.Description>
            </div>
            <Dialog.Close asChild class="text-white">
                <Button
                    variant="outline"
                    class="w-full mt-2 text-white border"
                    on:click={closeModal}>Close</Button
                >
            </Dialog.Close>
        </Dialog.Content>
    </Dialog.Portal>
</Dialog.Root>
