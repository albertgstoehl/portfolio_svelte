<script>
    import '../app.css';
    import Navbar from '../components/Navbar.svelte';
    import Footer from '../components/Footer.svelte';
</script>

<div class="min-h-screen bg-gradient-to-r from-blue-800 to-indigo-900 text-white flex flex-col">
    <!-- Navbar -->
    <Navbar />

    <!-- Main Content -->
    <main class="pt-16 min-h-screen flex items-center justify-center text-center">
        <slot />
    </main>
</div>
