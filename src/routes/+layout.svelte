<script>
    import "../app.css";
    import Navbar from "../components/Navbar.svelte";
    import Footer from "../components/Footer.svelte";
    import GlobalModal from "../components/GlobalModal.svelte";
    import { menuHeight } from "../stores/menuStore";
    import { modalState } from "../stores/modalStore";

    export let data;

    // Dynamic margin for main content so it doesn't overlap with the navbar
    $: dynamicMargin = `calc(4rem + ${$menuHeight}px)`;
</script>

<div class="min-h-screen bg-black text-white flex flex-col">
    <!-- Navbar -->
    <Navbar isAdmin={data.isAdmin} />

    <!-- Main Content -->
    <main
        class="min-h-screen flex items-center justify-center text-center dark"
        style={`margin-top: ${dynamicMargin}`}
    >
        <slot />
    </main>

    <!-- Global modal for popup -->
    <GlobalModal />

    <!-- Footer -->
    <Footer />
</div>
