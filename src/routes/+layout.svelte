<script>
    import '../app.css';
    import Navbar from '../components/Navbar.svelte';
    import Footer from '../components/Footer.svelte';
    import GlobalModal from '../components/GlobalModal.svelte';
    import { menuHeight } from '../stores/menuStore';
    import { modalState } from '../stores/modalStore';

    export let data;

    $: dynamicMargin = `calc(4rem + ${$menuHeight}px)`; // Default navbar height

    // Reactive modal state subscription
    let showModal = false;
    $: modalState.subscribe((state) => {
        showModal = state.showModal;
    });
</script>

<div class="min-h-screen bg-black text-white flex flex-col">
    <!-- Navbar -->
    <Navbar isAdmin={data.isAdmin} />

    <!-- Main Content -->
    <main class="min-h-screen flex items-center justify-center text-center dark" style={`margin-top: ${dynamicMargin}`}>
        <slot />
    </main>

    <!-- Global Modal -->
    {#if showModal}
        <GlobalModal />
    {/if}
</div>
