// this store is used to keep track of whether the intro has been played or not
import { writable } from 'svelte/store';

export const introPlayed = writable(false);