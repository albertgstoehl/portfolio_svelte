<script>
    import '../app.css';
    import Navbar from '../components/Navbar.svelte';
    import Footer from '../components/Footer.svelte';
    import { menuHeight } from '../stores/menuStore';
    export let data;

    $: dynamicMargin = `calc(4rem + ${$menuHeight}px)`; // Default navbar height (4rem)
</script>

<div class="min-h-screen bg-black text-white flex flex-col">
    <!-- Navbar -->
    <Navbar isAdmin={data.isAdmin}/>

    <!-- Main Content -->
    <main class="min-h-screen flex items-center justify-center text-center dark" style={`margin-top: ${dynamicMargin}`}>
        <slot />
    </main>
</div>
