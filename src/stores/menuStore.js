// this store is used to manage the mobile menu open state and height
import { writable } from 'svelte/store';

export const isMenuOpen = writable(false);
export const menuHeight = writable(0); // Height of the mobile menu