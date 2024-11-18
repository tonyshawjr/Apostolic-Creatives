<template>
  <div class="min-h-screen bg-gray-50 flex flex-col relative">
    <!-- Dark Slate Gray Header -->
    <header class="bg-[#232023] text-white">
      <div class="max-w-[1280px] mx-auto px-4 py-4 flex flex-col sm:px-6">
        <!-- Top Row - Logo and Icons -->
        <div class="flex items-center justify-between w-full">
          <!-- Logo -->
          <h1 class="text-lg font-bold cursor-pointer truncate flex-shrink-0" @click="navigateToDashboard">
            Apostolic Creatives
          </h1>

          <!-- Right Side Icons -->
          <div class="flex items-center space-x-4">
            <!-- Notification Bell -->
            <button @click="toggleNotificationDrawer" class="p-2 hover:text-gray-300 -mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 17h5l-1.405-1.405C18.597 14.597 18 13.327 18 12V8a6 6 0 10-12 0v4c0 1.327-.597 2.597-1.595 3.595L3 17h5m6 0a2 2 0 11-4 0h4z" />
              </svg>
            </button>

            <!-- Avatar and Name -->
            <div class="relative">
              <div @click="toggleAvatarMenu" class="flex items-center space-x-3 cursor-pointer p-2">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Avatar" class="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover" />
                <span class="font-medium hidden sm:block">Tony Shaw</span>
              </div>

              <!-- Avatar Dropdown -->
              <div v-if="avatarMenuOpen"
                class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div class="px-4 py-3 border-b border-gray-100 sm:hidden">
                  <p class="text-sm text-gray-700 font-medium">Tony Shaw</p>
                </div>
                <button class="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100">
                  My Account
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
      </div>
    </header>

    <!-- Notification Drawer -->
    <div v-if="notificationDrawerOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50"
      @click="toggleNotificationDrawer">
      <div
        class="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-lg transform transition-transform duration-300"
        :class="{ 'translate-x-0': notificationDrawerOpen, 'translate-x-full': !notificationDrawerOpen }" @click.stop>
        <div class="p-4 sm:p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-800">Notifications</h2>
            <button @click="toggleNotificationDrawer" class="p-2 text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <!-- Notification Content -->
          <div class="space-y-4">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <div class="h-8 w-8 bg-purple-600 text-white rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 7H7v6h6V7z" />
                    <path fill-rule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v10H4V5z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <p class="text-sm text-gray-800 font-medium">New job application received</p>
                <p class="text-sm text-gray-500">John Doe applied for the Sound Engineer role.</p>
                <p class="text-xs text-gray-400">2 hours ago</p>
              </div>
            </div>

            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <div class="h-8 w-8 bg-pink-600 text-white rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3a1 1 0 001 1h3a1 1 0 100-2h-2V7z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <p class="text-sm text-gray-800 font-medium">Upcoming event reminder</p>
                <p class="text-sm text-gray-500">Team meeting scheduled for Friday at 2:00 PM.</p>
                <p class="text-xs text-gray-400">1 day ago</p>
              </div>
            </div>

            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <div class="h-8 w-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-2-8a2 2 0 114 0 2 2 0 01-4 0z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <p class="text-sm text-gray-800 font-medium">Verification approved</p>
                <p class="text-sm text-gray-500">Your account has been verified successfully.</p>
                <p class="text-xs text-gray-400">3 days ago</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <!-- Navigation -->
    <nav class="bg-gradient-to-r from-purple-800 to-pink-600 relative">
      <div class="max-w-[1280px] mx-auto px-6 py-3">
        <div class="overflow-x-auto whitespace-nowrap">
          <ul class="flex items-center space-x-6">
            <li v-for="item in menuItems" :key="item.name"
              class="relative text-white font-semibold cursor-pointer inline-block"
              :ref="el => { if (el) menuRefs[item.name] = el }">
              <div @click="toggleChildMenu(item, $event)">
                {{ item.label }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Dropdowns -->
    <Teleport to="body">
      <div v-for="item in dropdownMenuItems" :key="item.name" v-show="expandedMenu === item.name"
        class="fixed bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-48" :style="{
          top: (dropdownPosition[item.name]?.top + 12) + 'px',
          left: dropdownPosition[item.name]?.left + 'px'
        }">
        <ul>
          <li v-for="child in item.children" :key="child.name"
            class="block px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer" @click="setActiveMenu(child)">
            {{ child.label }}
          </li>
        </ul>
      </div>
    </Teleport>

    <!-- White Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-[1280px] mx-auto px-6 py-4">
        <h2 class="text-xl font-bold text-gray-800">{{ activeMenuItem }}</h2>
      </div>
    </div>

    <!-- Main Content -->
    <main class="flex-1 bg-[#f9fafb]">
      <div class="max-w-[1280px] mx-auto px-6 py-8">
        <router-view />
      </div>
    </main>
    <footer class="bg-[#232023] text-white mt-auto">
      <div class="max-w-[1280px] mx-auto px-4 sm:px-6">
        <!-- Main Footer Content -->
        <div class="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div class="space-y-4 text-center sm:text-left">
            <h3 class="text-lg font-bold">Apostolic Creatives</h3>
            <p class="text-gray-300 text-sm">
              Connecting creative talent with ministry opportunities worldwide.
            </p>
            <div class="flex justify-center sm:justify-start space-x-4">
              <!-- Social Media Icons -->
              <a href="#" class="text-gray-300 hover:text-white">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" class="text-gray-300 hover:text-white">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" class="text-gray-300 hover:text-white">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.016 18.6h-2.472v-3.9c0-.923-.017-2.109-1.285-2.109-1.287 0-1.484 1.003-1.484 2.042v3.967H9.303V9.75h2.372v1.086h.033c.33-.627 1.137-1.287 2.34-1.287 2.504 0 2.968 1.648 2.968 3.791v4.26zm-10.5-10.02a1.434 1.434 0 11-.001-2.87 1.434 1.434 0 01.001 2.87zm1.237 10.02H5.28V9.75h2.473v8.85z" />
                </svg>
              </a>
              <a href="#" class="text-gray-300 hover:text-white">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                </svg>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="space-y-4 text-center sm:text-left">
            <h3 class="text-lg font-bold">Quick Links</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-300 hover:text-white text-sm">Dashboard</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white text-sm">Find Creatives</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white text-sm">Post a Job</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white text-sm">Resources</a></li>
            </ul>
          </div>

          <!-- Support -->
          <div class="space-y-4 text-center sm:text-left">
            <h3 class="text-lg font-bold">Support</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-300 hover:text-white text-sm">Help Center</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white text-sm">Contact Us</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white text-sm">Privacy Policy</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white text-sm">Terms of Service</a></li>
            </ul>
          </div>

          <!-- Newsletter -->
          <div class="space-y-4 text-center sm:text-left">
            <h3 class="text-lg font-bold">Stay Updated</h3>
            <p class="text-gray-300 text-sm">Subscribe to our newsletter for updates and opportunities.</p>
            <form @submit.prevent="subscribeNewsletter" class="space-y-2">
              <input type="email" placeholder="Enter your email"
                class="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" />
              <button type="submit"
                class="w-full px-4 py-2 bg-gradient-to-r from-purple-800 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-gray-800 py-6">
          <div class="flex flex-col items-center space-y-4 sm:space-y-0 sm:flex-row sm:justify-between">
            <p class="text-sm text-gray-400 text-center sm:text-left">
              © {{ new Date().getFullYear() }} Apostolic Creatives. All rights reserved.
            </p>
            <div class="flex space-x-6">
              <a href="#" class="text-sm text-gray-400 hover:text-white">Privacy</a>
              <a href="#" class="text-sm text-gray-400 hover:text-white">Terms</a>
              <a href="#" class="text-sm text-gray-400 hover:text-white">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatarMenuOpen: false,
      notificationDrawerOpen: false,
      activeMenuItem: "Dashboard",
      expandedMenu: null,
      dropdownPosition: {},
      menuRefs: {},
      menuItems: [
        { name: "Dashboard", label: "Dashboard", children: null },
        {
          name: "Account",
          label: "My Account",
          children: [
            { name: "ViewAccount", label: "View Account" },
            { name: "EditAccount", label: "Edit Account" },
          ],
        },
        {
          name: "ManageUsers",
          label: "Manage Users",
          children: [
            { name: "CreativesList", label: "Creatives" },
            { name: "PartnersList", label: "Partners" },
            { name: "TeamMembersList", label: "Team Members" },
          ],
        },
        {
          name: "ManageJobs",
          label: "Jobs",
          children: [
            { name: "ActiveJobs", label: "Active Jobs" },
            { name: "PendingJobs", label: "Pending Jobs" },
            { name: "ExpiredJobs", label: "Expired Jobs" },
          ],
        },
        { name: "Settings", label: "Settings", children: null },
      ],
    };
  },
  computed: {
    dropdownMenuItems() {
      return this.menuItems.filter((item) => item.children);
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    setActiveMenu(item) {
      this.activeMenuItem = item.label;
      this.expandedMenu = null;
      if (!item.children) {
        const routeMap = {
          Dashboard: "/dashboard",
          ManageUsers: "/dashboard/manage-users",
          CreativesList: "/dashboard/manage-users/creatives",
          PartnersList: "/dashboard/manage-users/partners",
          TeamMembersList: "/dashboard/manage-users/team-members",
          ViewAccount: "/dashboard/account",
          EditAccount: "/dashboard/account/edit",
          ActiveJobs: "/dashboard/manage-jobs/active",
          PendingJobs: "/dashboard/manage-jobs/pending",
          ExpiredJobs: "/dashboard/manage-jobs/expired",
          Settings: "/dashboard/settings",
        };
        const route = routeMap[item.name] || `/dashboard/${item.name.toLowerCase()}`;
        this.$router.push(route);
      }
    },
    toggleNotificationDrawer() {
      this.notificationDrawerOpen = !this.notificationDrawerOpen;
      this.avatarMenuOpen = false; // Close avatar menu when opening notifications
    },
    navigateToDashboard() {
      this.activeMenuItem = "Dashboard";
      this.$router.push("/dashboard");
    },
    toggleChildMenu(item, event) {
      event.stopPropagation();

      if (!item.children) {
        this.setActiveMenu(item);
        return;
      }

      const parent = this.menuRefs[item.name].getBoundingClientRect();

      // Close avatar menu when opening nav dropdown
      this.avatarMenuOpen = false;

      if (this.expandedMenu === item.name) {
        this.expandedMenu = null;
      } else {
        this.expandedMenu = item.name;
        this.dropdownPosition = {
          ...this.dropdownPosition,
          [item.name]: {
            top: parent.bottom + window.scrollY,
            left: parent.left,
          },
        };
      }
    },
    toggleAvatarMenu(event) {
      event.stopPropagation();
      // Close nav dropdowns when opening avatar menu
      this.expandedMenu = null;
      this.avatarMenuOpen = !this.avatarMenuOpen;
    },
    handleClickOutside(event) {
      const isClickInsideDropdown = (
        event.target.closest('.dropdown-trigger') ||
        event.target.closest('.dropdown-menu') ||
        event.target.closest('.avatar-menu')
      );

      if (!isClickInsideDropdown) {
        this.expandedMenu = null;
        this.avatarMenuOpen = false;
        // Don't close notification drawer here since it has its own overlay
      }
    },
    subscribeNewsletter() {
      // Implement newsletter subscription logic
      console.log('Newsletter subscription');
    },
  },
};
</script>
<style scoped>
.overflow-x-auto {
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.overflow-x-auto::-webkit-scrollbar {
  display: none;
}

.transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>