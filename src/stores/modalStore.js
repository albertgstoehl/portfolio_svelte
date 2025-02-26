//This store will hold the modal state
import { writable } from 'svelte/store';

export const modalState = writable({
    showModal: false,
    message: '',
    type: 'info',
});

// Utility functions to update modal state
export function showModal(message, type = 'info', redirectUrl = null) {
    modalState.set({ showModal: true, message, type, redirectUrl });
}
export function hideModal() {
    modalState.set({ showModal: false, message: '', type: 'info', redirectUrl: null });
}
