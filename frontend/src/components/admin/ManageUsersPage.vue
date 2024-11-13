<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold text-gray-800">Manage Users</h1>

    <!-- Search and Filter -->
    <div class="flex flex-wrap justify-between items-center space-y-4 md:space-y-0">
      <!-- Role Filters -->
      <div class="flex flex-wrap space-x-2">
        <button
          v-for="role in roles"
          :key="role"
          @click="filterUsersByRole(role)"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-all',
            role === activeRole ? 'bg-purple-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
          ]"
        >
          {{ role }}
        </button>
      </div>

      <!-- Search Input -->
      <input
        v-model="searchTerm"
        @input="searchUsers"
        type="text"
        placeholder="Search by name or email..."
        class="px-4 py-2 border rounded-lg w-full md:w-64 text-gray-600 focus:outline-none focus:ring focus:ring-purple-300"
      />

      <!-- Add User Button -->
      <button
        @click="addNewUser"
        class="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 w-full md:w-auto"
      >
        + Add New Member
      </button>
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
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Role</th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in filteredUsers"
              :key="user.id"
              class="border-t even:bg-gray-50 relative"
            >
              <td class="px-4 py-2">{{ user.name }}</td>
              <td class="px-4 py-2">{{ user.email }}</td>
              <td class="px-4 py-2">{{ user.role }}</td>
              <td class="px-4 py-2 relative">
                <div class="relative">
                  <button
                    @click="toggleDropdown(user.id)"
                    class="text-gray-600 hover:text-gray-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <circle cx="5" cy="12" r="1" />
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                    </svg>
                  </button>

                  <!-- Dropdown -->
                  <div
                    v-show="dropdownOpen === user.id"
                    class="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-50 border border-gray-200"
                  >
                    <button
                      @click="editUser(user)"
                      class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 w-full"
                    >
                      Edit
                    </button>
                    <button
                      @click="deleteUser(user)"
                      class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 w-full"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Responsive Cards for Mobile -->
      <div class="block md:hidden space-y-4">
        <div
          v-for="user in filteredUsers"
          :key="user.id"
          class="p-4 border rounded-lg bg-gray-50 shadow-sm"
        >
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-bold text-gray-800">{{ user.name }}</h2>
            <button
              @click="toggleDropdown(user.id)"
              class="text-gray-600 hover:text-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <circle cx="5" cy="12" r="1" />
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
              </svg>
            </button>
          </div>
          <p class="text-sm text-gray-600">{{ user.email }}</p>
          <p class="text-sm text-gray-500 mt-1">Role: {{ user.role }}</p>

          <!-- Dropdown -->
          <div
            v-show="dropdownOpen === user.id"
            class="mt-2 w-32 bg-white rounded-lg shadow-lg z-50 border border-gray-200"
          >
            <button
              @click="editUser(user)"
              class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 w-full text-left"
            >
              Edit
            </button>
            <button
              @click="deleteUser(user)"
              class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 w-full text-left"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex flex-wrap justify-between items-center py-4 space-y-4 md:space-y-0">
      <p class="text-sm text-gray-600">Rows per page:</p>
      <select
        v-model="rowsPerPage"
        @change="paginate"
        class="border rounded-lg px-2 py-1 text-sm text-gray-600"
      >
        <option v-for="option in [5, 10, 20]" :key="option" :value="option">{{ option }}</option>
      </select>
      <div>
        <button
          @click="goToPreviousPage"
          :disabled="currentPage === 1"
          class="text-gray-600 hover:text-gray-800 disabled:text-gray-400"
        >
          &lt;
        </button>
        <span class="mx-2 text-sm text-gray-600">Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          @click="goToNextPage"
          :disabled="currentPage === totalPages"
          class="text-gray-600 hover:text-gray-800 disabled:text-gray-400"
        >
          &gt;
        </button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      roles: ["All", "Owner", "Team Member", "Talent", "Partner"],
      activeRole: "All",
      searchTerm: "",
      users: [
        { id: 1, name: "John Doe", email: "john@example.com", role: "Owner" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Team Member" },
        // More user data...
      ],
      dropdownOpen: null,
      filteredUsers: [],
      rowsPerPage: 5,
      currentPage: 1,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.rowsPerPage);
    },
  },
  methods: {
    filterUsersByRole(role) {
      this.activeRole = role;
      this.filterAndPaginateUsers();
    },
    searchUsers() {
      this.filterAndPaginateUsers();
    },
    filterAndPaginateUsers() {
      let filtered = this.users.filter(user => {
        const matchesRole = this.activeRole === "All" || user.role === this.activeRole;
        const matchesSearch = user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || user.email.toLowerCase().includes(this.searchTerm.toLowerCase());
        return matchesRole && matchesSearch;
      });
      this.filteredUsers = filtered.slice(0, this.rowsPerPage);
    },
    paginate() {
      this.filterAndPaginateUsers();
    },
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.paginate();
      }
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.paginate();
      }
    },
    addNewUser() {
      console.log("Redirect to Add New User page...");
    },
    editUser(user) {
      console.log("Edit user:", user);
    },
    deleteUser(user) {
      console.log("Delete user:", user);
    },
    toggleDropdown(userId) {
      this.dropdownOpen = this.dropdownOpen === userId ? null : userId;
    },
  },
  mounted() {
    this.filterAndPaginateUsers();
  },
};
</script>