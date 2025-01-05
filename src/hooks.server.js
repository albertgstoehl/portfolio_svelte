export { handle } from './auth.js'; // Import the checkAdminStatus function
import { modalState } from './stores/modalStore.js';

modalState.set({
    showModal: false,
    message: '',
    type: 'info'
 });