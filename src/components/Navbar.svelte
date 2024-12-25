<script>
    let isMenuOpen = false;
  
    const navLinks = [
      { name: "About", href: "/" },
      { name: "Projects", href: "/projects" },
      { name: "Experience", href: "/experience" },
      { name: "CV", href: "/cv" },
      { name: "Contact", href: "/contact" }
    ];
  </script>
  
<nav class="text-white fixed w-full z-50 animate-fade-down animate-once">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/favicon.png" alt="Albert Gstöhl" class="w-8 h-8" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Albert Gstöhl</span>
        </a>

        <!-- Desktop Navigation -->
        <ul class="hidden md:flex space-x-6">
        {#each navLinks as link}
            <li>
            <a
                href={link.href}
                class="hover:text-gray-300 transition-colors duration-200"
            >
                {link.name}
            </a>
            </li>
        {/each}
        </ul>

        <!-- Mobile Menu Toggle -->
        <button
        class="md:hidden flex items-center text-gray-400 hover:text-white focus:outline-none"
        on:click={() => (isMenuOpen = !isMenuOpen)}
        >
        <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
        </svg>
        </button>
    </div>

    <!-- Mobile Navigation -->
    {#if isMenuOpen}
        <ul class="md:hidden bg-gray-700 px-4 py-2 space-y-2">
        {#each navLinks as link}
            <li>
            <a
                href={link.href}
                class="block text-white hover:text-gray-300 transition-colors duration-200"
            >
                {link.name}
            </a>
            </li>
        {/each}
        </ul>
    {/if}
</nav>
