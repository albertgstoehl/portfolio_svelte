<script>
    import '../app.css';
    import Navbar from '../components/Navbar.svelte';
    import Footer from '../components/Footer.svelte';
    import { menuHeight } from '../stores/menuStore';

    console.log($menuHeight);

    $: dynamicMargin = `calc(4rem + ${$menuHeight}px)`; // Default navbar height (4rem)
</script>

<div class="min-h-screen bg-gradient-to-r from-blue-800 to-indigo-900 text-white flex flex-col">
    <!-- Navbar -->
    <Navbar />

    <!-- Main Content -->
    <main class="min-h-screen flex items-center justify-center text-center" style={`margin-top: ${dynamicMargin}`}>
        <slot />
    </main>
</div>
