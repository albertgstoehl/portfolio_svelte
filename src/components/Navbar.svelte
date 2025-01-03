<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { Button } from "$lib/components/ui/button";
  import * as Sheet from "$lib/components/ui/sheet";
  import { Menu } from "lucide-svelte";
  import { SignOut } from "@auth/sveltekit/components";

  const { isAdmin } = $props();

  // Reactive state variables
  const state = $state({
    isVisible: true,
    lastScrollY: 0,
    isOpen: false,
  });

  const navLinks = [
    { name: "About", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "CV", href: "/cv" },
    { name: "Contact", href: "/contact" },
  ];

  const adminLinks = [
    { name: "Dashboard", href: "/admin" },
    { name: "Manage Projects", href: "/admin/projects" }
  ];

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    state.isVisible = currentScrollY === 0;
    state.lastScrollY = currentScrollY;
  };

  onMount(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  // Automatically close the menu when the path changes
  $effect(() => {
    const unsubscribe = page.subscribe(({ url }) => {
      if (url.pathname) {
        state.isOpen = false; // Close the menu
      }
    });
    return () => unsubscribe(); // Cleanup the subscription
  });
</script>

<nav
  class="fixed top-0 left-0 w-full h-16 dark z-50 transition-transform duration-300"
  style:transform={state.isVisible ? "translateY(0)" : "translateY(-100%)"}
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
      {#if isAdmin}
        {#each adminLinks as link}
          <li>
            <a
              href={link.href}
              class="text-sm font-medium transition-colors hover:text-primary"
            >
              {link.name}
            </a>
          </li>
        {/each}
        <li>
          <SignOut>
            <span class="text-sm font-medium transition-colors hover:text-primary" slot="submitButton">Logout</span>
          </SignOut>
        </li>
      {:else}
        <li>
          <a
            href="/signin"
            class="text-sm font-medium transition-colors hover:text-primary"
          >
            Login
          </a>
        </li>
      {/if}
    </ul>

    <!-- Mobile Menu Toggle -->
    <Button
      variant="ghost"
      size="icon"
      class="md:hidden"
      on:click={() => (state.isOpen = true)}
    >
      <Menu class="h-6 w-6" />
      <span class="sr-only">Toggle menu</span>
    </Button>
  </div>
</nav>

<!-- Mobile Navigation Sheet -->
<Sheet.Root bind:open={state.isOpen}>
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
      {#if isAdmin}
        {#each adminLinks as link}
          <a
            href={link.href}
            class="block px-2 py-1 text-lg font-medium hover:underline"
          >
            {link.name}
          </a>
        {/each}
        <SignOut>
          <span class="block px-2 py-1 text-lg font-medium hover:underline" slot="submitButton">Logout</span>
        </SignOut>
      {:else}
        <a
          href="/signin"
          class="block px-2 py-1 text-lg font-medium hover:underline"
        >
          Login
        </a>
      {/if}
    </nav>
  </Sheet.Content>
</Sheet.Root>
