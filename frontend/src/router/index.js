import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/LoginPage.vue';
import ProtectedPage from '../components/ProtectedPage.vue';
import DashboardPage from "../components/DashboardPage.vue";

// Lazy-loaded components for optimization
const ProfilePage = () => import('../components/admin/ProfilePage.vue');
const SettingsPage = () => import('../components/admin/SettingsPage.vue');

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage, // Lazy-loaded
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsPage, // Lazy-loaded
  },
  {
    path: '/protected',
    name: 'Protected',
    component: ProtectedPage,
    meta: { requiresAuth: true }, // Route requires authentication
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard: Check for authentication before accessing certain routes
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isAuthenticated = localStorage.getItem('authToken'); // Check for a stored auth token
    if (!isAuthenticated) {
      next('/'); // Redirect to the login page if not authenticated
    } else {
      next(); // Allow access
    }
  } else {
    next(); // Allow access to public routes
  }
});

export default router;
