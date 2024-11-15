<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold text-gray-800">Manage Partners</h1>

    <!-- Search Input -->
    <div class="w-full md:w-auto md:flex-1 md:max-w-md relative">
      <svg xmlns="http://www.w3.org/2000/svg"
        class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8" stroke-linecap="round" stroke-linejoin="round" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <input v-model="searchTerm" @input="searchUsers" type="text"
        placeholder="Search Partners"
        class="w-full px-12 py-3 rounded-full bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-300" />
    </div>

    <!-- User Table -->
    <div class="bg-white shadow-sm rounded-lg">
      <!-- Responsive Table -->
      <div class="hidden md:block">
        <table class="w-full table-auto border-collapse">
          <thead>
            <tr class="bg-gray-100 border-b">
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Email</th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id" class="border-t even:bg-gray-50 relative">
              <td class="px-4 py-2">{{ user.name }}</td>
              <td class="px-4 py-2">{{ user.email }}</td>
              <td class="px-4 py-2 relative">
                <div class="relative">
                  <button @click="viewUser(user.id)" class="text-gray-600 hover:text-gray-800">View</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Responsive Cards for Mobile -->
      <div class="block md:hidden space-y-4">
        <div v-for="user in filteredUsers" :key="user.id" class="p-4 border rounded-lg bg-gray-50 shadow-sm">
          <h2 class="text-lg font-bold text-gray-800">{{ user.name }}</h2>
          <p class="text-sm text-gray-600">{{ user.email }}</p>
          <button @click="viewUser(user.id)" class="text-purple-500 hover:underline">View</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: "",
      users: [
        { id: 4, name: "Lundy Logue", email: "lundy@example.com", role: "Partner" },
        { id: 6, name: "John McMahan", email: "john@example.com", role: "Partner" },
        { id: 10, name: "Matthew Tuttle", email: "matthew@example.com", role: "Partner" },
      ],
      filteredUsers: [],
    };
  },
  methods: {
    searchUsers() {
      this.filteredUsers = this.users.filter(user =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    viewUser(userId) {
      this.$router.push({ name: "PartnerProfile", params: { id: userId } });
    },
  },
  mounted() {
    this.filteredUsers = this.users; // Initialize filtered users
  },
};
</script>
