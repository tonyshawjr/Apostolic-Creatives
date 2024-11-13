import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router
import './main.css'; // Import Tailwind styles

createApp(App).use(router).mount('#app'); // Attach the router to the app
