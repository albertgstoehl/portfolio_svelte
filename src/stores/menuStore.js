// src/stores/menuStore.js
import { writable } from 'svelte/store';

export const isMenuOpen = writable(false);
export const menuHeight = writable(0); // Height of the mobile menu