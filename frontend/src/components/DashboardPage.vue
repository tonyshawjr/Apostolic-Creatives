<template>
  <div class="min-h-screen bg-gray-50 flex flex-col relative">
    <!-- Dark Slate Gray Header -->
    <header class="bg-[#232023] text-white">
      <div class="max-w-[1280px] mx-auto px-6 py-4 flex justify-between items-center">
        <h1 class="text-lg font-bold cursor-pointer" @click="navigateToDashboard">
          Apostolic Creatives
        </h1>
        <div class="flex items-center space-x-4">
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-300" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 17h5l-1.405-1.405C18.597 14.597 18 13.327 18 12V8a6 6 0 10-12 0v4c0 1.327-.597 2.597-1.595 3.595L3 17h5m6 0a2 2 0 11-4 0h4z" />
            </svg>
          </button>
          <div class="relative">
            <img @click="toggleAvatarMenu" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Avatar"
              class="h-10 w-10 rounded-full object-cover cursor-pointer" />
            <div v-if="avatarMenuOpen"
              class="absolute right-0 top-[57px] w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <button class="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100">Profile & Account</button>
              <button class="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100">Settings</button>
              <button class="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100">Manage Team</button>
              <button class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">Sign Out</button>
            </div>
          </div>
        </div>
      </div>
    </header>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatarMenuOpen: false,
      activeMenuItem: "Dashboard",
      expandedMenu: null,
      dropdownPosition: {},
      menuRefs: {},
      menuItems: [
        { name: "Dashboard", label: "Dashboard", children: null },
        {
          name: "Profile",
          label: "Profile",
          children: [
            { name: "ViewProfile", label: "View Profile" },
            { name: "EditProfile", label: "Edit Profile" },
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
          ViewProfile: "/dashboard/profile",
          EditProfile: "/dashboard/profile/edit",
          Settings: "/dashboard/settings",
        };
        const route = routeMap[item.name] || `/dashboard/${item.name.toLowerCase()}`;
        this.$router.push(route);
      }
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
      // Check if the click target is one of our menu triggers or menu items
      const isClickInsideDropdown = (
        event.target.closest('.dropdown-trigger') || // Add this class to menu triggers
        event.target.closest('.dropdown-menu') ||    // For the dropdown menus
        event.target.closest('.avatar-menu')         // For the avatar menu
      );

      // If the click is outside our menus, close everything
      if (!isClickInsideDropdown) {
        this.expandedMenu = null;
        this.avatarMenuOpen = false;
      }
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
</style>