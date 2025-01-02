<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { Button } from "$lib/components/ui/button";
  import * as Sheet from "$lib/components/ui/sheet";
  import { Menu } from "lucide-svelte";

  let isVisible = true;
  let lastScrollY = 0;
  let isOpen = false;

  const navLinks = [
    { name: "About", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Experience", href: "/experience" },
    { name: "CV", href: "/cv" },
    { name: "Contact", href: "/contact" },
  ];

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    isVisible = currentScrollY === 0;
    lastScrollY = currentScrollY;
  };

  onMount(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  $: if ($page.url.pathname) {
    isOpen = false;
  }
</script>

<nav
  class="fixed top-0 left-0 w-full h-16 dark z-50 transition-transform duration-300"
  style:transform={isVisible ? "translateY(0)" : "translateY(-100%)"}
>
  <div class="container mx-auto px-4 py-4 flex justify-between items-center">
    <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="/favicon.png" alt="Albert Gstöhl" class="w-8 h-8" />
      <span class="self-center text-2xl font-semibold whitespace-nowrap">
        Albert Gstöhl
      </span>
    </a>

    <!-- Desktop Navigation -->
    <ul class="hidden md:flex space-x-6">
      {#each navLinks as link}
        <li>
          <a
            href={link.href}
            class="text-sm font-medium transition-colors hover:text-primary"
          >
            {link.name}
          </a>
        </li>
      {/each}
    </ul>

    <!-- Mobile Menu Toggle -->
    <Button
      variant="ghost"
      size="icon"
      class="md:hidden"
      on:click={() => (isOpen = true)}
    >
      <Menu class="h-6 w-6" />
      <span class="sr-only">Toggle menu</span>
    </Button>
  </div>
</nav>

<!-- Mobile Navigation Sheet -->
<Sheet.Root bind:open={isOpen} side="left">
  <Sheet.Content>
    <nav class="grid gap-4 py-4">
      {#each navLinks as link}
        <a
          href={link.href}
          class="block px-2 py-1 text-lg font-medium hover:underline"
        >
          {link.name}
        </a>
      {/each}
    </nav>
  </Sheet.Content>
</Sheet.Root>