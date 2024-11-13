<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed z-40 w-64 bg-white shadow-md transition-transform duration-300 md:static md:translate-x-0',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
    >
      <div class="p-4">
        <h1 class="text-2xl font-bold text-purple-800">Apostolic Creatives</h1>
        <p class="text-sm text-gray-600 mt-2">Welcome, {{ userName }}</p>
        <p class="text-sm text-gray-500">{{ userEmail }}</p>
      </div>

      <nav class="mt-6">
        <ul>
          <li
            v-for="item in menuItems"
            :key="item.name"
            class="px-4 py-2 hover:bg-purple-100 cursor-pointer"
            :class="{ 'bg-purple-200': item.name === activeMenuItem }"
            @click="setActiveMenu(item)"
          >
            <span class="text-gray-700 font-medium">{{ item.label }}</span>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        <!-- Hamburger Menu for Mobile -->
        <button
          class="block md:hidden"
          @click="isSidebarOpen = !isSidebarOpen"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        <h2 class="text-xl font-semibold text-gray-700">{{ activeMenuItem }}</h2>
        <div class="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            class="px-4 py-2 border rounded-lg text-gray-600 focus:outline-none focus:ring focus:ring-purple-300"
          />
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            class="h-10 w-10 rounded-full"
          />
        </div>
      </header>

      <!-- Dynamic Content -->
      <main class="flex-1 p-6">
        <component :is="activeMenuItemComponent" />
      </main>
    </div>

    <!-- Backdrop for Mobile Sidebar -->
    <div
      v-if="isSidebarOpen"
      @click="isSidebarOpen = false"
      class="fixed inset-0 bg-black bg-opacity-25 z-30 md:hidden"
    ></div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "DashboardPage",
  data() {
    return {
      userName: "Tony Shaw",
      userEmail: "tony.shaw@apostolicsoncall.com",
      activeMenuItem: "Overview", // Default to Overview
      isSidebarOpen: false, // Mobile sidebar visibility
      menuItems: [
        { name: "Overview", label: "Dashboard" },
        { name: "Profile", label: "Profile" },
        { name: "ManageUsers", label: "Manage Users" },
        { name: "Settings", label: "Settings" },
      ],
    };
  },
  computed: {
    activeMenuItemComponent() {
      // Dynamically resolve components
      const components = {
        Overview: defineAsyncComponent(() =>
          import("./admin/OverviewPage.vue")
        ),
        Profile: defineAsyncComponent(() =>
          import("./admin/ProfilePage.vue")
        ),
        ManageUsers: defineAsyncComponent(() =>
          import("./admin/ManageUsersPage.vue")
        ),
        Settings: defineAsyncComponent(() =>
          import("./admin/SettingsPage.vue")
        ),
      };
      return components[this.activeMenuItem] || components.Overview; // Fallback to Overview
    },
  },
  methods: {
    setActiveMenu(item) {
      this.activeMenuItem = item.name; // Update active menu item
      this.isSidebarOpen = false; // Close sidebar on selection (mobile)
    },
  },
};
</script>

<style scoped>
/* Sidebar and layout styling */
aside {
  height: 100vh;
}
</style>
