import { writable } from 'svelte/store';

export const toggled = writable(false);
export const isMobile = writable(false);
export const height = writable(0);