<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside :class="[
      'fixed z-40 w-100 transition-transform duration-300 md:static md:translate-x-0',
      isSidebarOpen ? 'translate-x-0 bg-white' : '-translate-x-full',
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
    ]">
      <div class="p-6">
        <h1 class="text-2xl font-bold text-gray-800">Apostolic Creatives</h1>
      </div>

      <nav class="mt-8 p-4">
        <ul class="space-y-2">
          <!-- Main Menu Items -->
          <li v-for="item in menuItems" :key="item.name" class="px-4 py-3 cursor-pointer">
            <div class="flex justify-between items-center" @click="toggleChildMenu(item)">
              <!-- Menu Item Label -->
              <span class="text-gray-700 transition-all duration-300" :class="{
                'font-bold': activeMenuItem === item.name,
                'hover:font-bold': true,
              }">
                {{ item.label }}
              </span>

              <!-- Dropdown Arrow -->
              <span v-if="item.children">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform transition-transform"
                  :class="{ 'rotate-90': expandedMenu === item.name }" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6 8a1 1 0 011.707-.707l4 4a1 1 0 010 1.414l-4 4A1 1 0 016 16V8z"
                    clip-rule="evenodd" />
                </svg>
              </span>
            </div>

            <!-- Child Menu Items -->
            <ul v-if="item.children && expandedMenu === item.name" class="mt-2 space-y-1">
              <li v-for="child in item.children" :key="child.name" class="px-4 py-2 cursor-pointer"
                @click="setActiveMenu(child)">
                <span class="text-gray-600 text-sm transition-all duration-300" :class="{
                  'font-bold': activeMenuItem === child.name,
                  'hover:font-bold': true,
                }">
                  {{ child.label }}
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="flex flex-wrap md:flex-nowrap justify-between items-center px-6 py-4 space-y-4 md:space-y-0">
        <!-- Mobile Header -->
        <div class="flex justify-between items-center w-full md:hidden">
          <!-- Hamburger Menu -->
          <button @click="isSidebarOpen = !isSidebarOpen" class="block md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          <!-- Mobile Title -->
          <h1 class="text-2xl font-bold text-gray-800 cursor-pointer" @click="navigateToDashboard">
            Apostolic Creatives
          </h1>

          <!-- Notification and Avatar -->
          <div class="flex items-center space-x-4">
            <!-- Notification Icon -->
            <button class="relative">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 17h5l-1.405-1.405C18.597 14.597 18 13.327 18 12V8a6 6 0 10-12 0v4c0 1.327-.597 2.597-1.595 3.595L3 17h5m6 0a2 2 0 11-4 0h4z" />
              </svg>
              <span class="absolute top-0 right-0 h-2 w-2 bg-blue-500 rounded-full border-white border-2"></span>
            </button>

            <!-- User Avatar -->
            <div class="relative">
              <img @click="toggleDropdown"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="User Avatar" class="h-10 w-10 rounded-full cursor-pointer object-cover" />

              <!-- Dropdown Menu -->
              <div
  v-show="dropdownOpen"
  class="absolute right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
>
  <button class="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100">
    Profile & Account
  </button>
  <button class="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100">
    Settings
  </button>
  <button class="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100">
    Manage Team
  </button>
  <button class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">
    Sign Out
  </button>
</div>

            </div>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="w-full md:w-auto md:flex-1 md:max-w-md">
          <div class="relative">
            <svg xmlns="http://www.w3.org/2000/svg"
              class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8" stroke-linecap="round" stroke-linejoin="round" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            <input type="text" placeholder="What can i help you find?"
              class="w-full px-12 py-3 rounded-full bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-300" />
          </div>
        </div>

        <!-- Right-Side Icons and Profile (Desktop Only) -->
        <div class="hidden md:flex items-center space-x-4">
          <!-- Notification Icon -->
          <button class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 17h5l-1.405-1.405C18.597 14.597 18 13.327 18 12V8a6 6 0 10-12 0v4c0 1.327-.597 2.597-1.595 3.595L3 17h5m6 0a2 2 0 11-4 0h4z" />
            </svg>
            <span class="absolute top-0 right-0 h-2 w-2 bg-blue-500 rounded-full border-white border-2"></span>
          </button>

          <!-- User Info -->
          <div class="flex items-center space-x-2">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="User Avatar" class="h-10 w-10 rounded-full object-cover" />
            <div>
              <p class="text-gray-800 font-medium">Tony Shaw</p>
              <p class="text-sm text-gray-500">Owner</p>
            </div>
          </div>

          <!-- Ellipsis Menu -->
          <div class="relative">
            <button @click="toggleDropdown" class="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <circle cx="5" cy="12" r="1" />
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div v-show="dropdownOpen"
              class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
              <button class="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100">
                Profile & Account
              </button>
              <button class="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100">
                Settings
              </button>
              <button class="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100">
                Manage Team
              </button>
              <button class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">
                Sign Out
              </button>
            </div>
          </div>
        </div>

      </header>

      <!-- Dynamic Content -->
      <main class="flex-1 p-6 space-y-6">
        <component :is="activeMenuItemComponent" @set-active-menu="setActiveMenu" />
      </main>
    </div>

    <!-- Backdrop for Mobile Sidebar -->
    <div v-if="isSidebarOpen" @click="isSidebarOpen = false"
      class="fixed inset-0 bg-black bg-opacity-25 z-30 md:hidden"></div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "DashboardPage",
  data() {
    return {
      userName: "Tony Shaw",
      userEmail: "tony.shaw@apostoliccreatives.com",
      dropdownOpen: false,
      activeMenuItem: "Overview",
      expandedMenu: null,
      isSidebarOpen: false,
      menuItems: [
        { name: "Overview", label: "Dashboard" },
        {
          name: "Profile", label: "Profile", children: [
            { name: "ViewProfile", label: "View Profile" },
            { name: "EditProfile", label: "Edit Profile" },
          ]
        },
        { name: "ManageUsers", label: "Manage Users" },
        { name: "Settings", label: "Settings" },
      ],
    };
  },
  computed: {
    activeMenuItemComponent() {
      const components = {
        Overview: defineAsyncComponent(() =>
          import("./admin/OverviewPage.vue")
        ),
        ManageUsers: defineAsyncComponent(() =>
          import("./admin/ManageUsersPage.vue")
        ),
        Settings: defineAsyncComponent(() =>
          import("./admin/SettingsPage.vue")
        ),
        ViewProfile: defineAsyncComponent(() =>
          import("./admin/ProfilePage.vue")
        ),
        EditProfile: defineAsyncComponent(() =>
          import("./admin/EditProfilePage.vue")
        ),
      };
      return components[this.activeMenuItem] || components.Overview;
    },
  },
  methods: {
    setActiveMenu(item) {
      this.activeMenuItem = item.name;
      this.expandedMenu = item.children ? this.expandedMenu : null; // Closes expanded menu for child items
      this.isSidebarOpen = false; // Closes the sidebar on mobile
      const routeMap = {
        Overview: "/dashboard",
        ManageUsers: "/dashboard/manage-users",
        Settings: "/dashboard/settings",
        ViewProfile: "/dashboard/profile",
        EditProfile: "/dashboard/profile/edit",
      };
      const route = routeMap[item.name] || `/dashboard/${item.name.toLowerCase()}`;
      this.$router.push(route); // Navigate to the route
    },
    toggleChildMenu(item) {
      // Toggles child menu visibility for items with children
      if (item.children) {
        this.expandedMenu = this.expandedMenu === item.name ? null : item.name;
      } else {
        this.setActiveMenu(item); // Navigate directly if no children
      }
    },
    navigateToDashboard() {
      this.activeMenuItem = "Overview";
      this.$router.push("/dashboard"); // Redirect to the Dashboard route
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
  },

};
</script>

<style scoped>
aside {
  height: 100vh;
}
html,
body {
  overflow-x: hidden;
}

header {
  max-width: 100%;
  box-sizing: border-box;
}
</style>
