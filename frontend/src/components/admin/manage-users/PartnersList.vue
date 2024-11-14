<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold text-gray-800">Manage Partners</h1>

    <!-- Search and Add Button -->
    <div class="flex flex-wrap justify-between items-center space-y-4 md:space-y-0">
      <!-- Search Input -->
      <div class="w-full md:w-auto md:flex-1 md:max-w-md relative">
        <svg xmlns="http://www.w3.org/2000/svg"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8" stroke-linecap="round" stroke-linejoin="round" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <input v-model="searchTerm" @input="searchUsers" type="text"
          placeholder="Search Team Members"
          class="w-full px-12 py-3 rounded-full bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-300" />
      </div>

      <!-- Add Team Member Button -->
      <button @click="addNewUser"
        class="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 w-full md:w-auto">
        + Add New Partner
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
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id" class="border-t even:bg-gray-50 relative">
              <td class="px-4 py-2">{{ user.name }}</td>
              <td class="px-4 py-2">{{ user.email }}</td>
              <td class="px-4 py-2 relative">
                <div class="relative">
                  <button @click="toggleDropdown(user.id)" :data-button-id="user.id"
                    class="text-gray-600 hover:text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <circle cx="5" cy="12" r="1" />
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                    </svg>
                  </button>

                  <div v-show="dropdownOpen === user.id" :data-dropdown-id="user.id"
                    class="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
                    <button @click="viewUser(user.id)"
                      class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 w-full">
                      View
                    </button>
                    <button @click="editUser(user)"
                      class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 w-full">Edit</button>
                    <button @click="deactivateUser(user)"
                      class="flex items-center px-4 py-2 text-gray-600 hover:bg-red-500 hover:text-white w-full">Deactivate</button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Responsive Cards for Mobile -->
      <div class="block md:hidden space-y-4">
        <div v-for="user in filteredUsers" :key="user.id" class="p-4 border rounded-lg bg-gray-50 shadow-sm relative">
          <div class="flex justify-between items-center relative">
            <h2 class="text-lg font-bold text-gray-800">{{ user.name }}</h2>
            <!-- Ellipsis Button -->
            <button @click.stop="toggleDropdown(user.id)" class="text-gray-600 hover:text-gray-800 relative"
              :data-button-id="user.id">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <circle cx="5" cy="12" r="1" />
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
              </svg>
            </button>

            <!-- Dropdown -->
            <div v-if="dropdownOpen === user.id"
              class="absolute top-full right-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-50 border border-gray-200"
              :data-dropdown-id="user.id">
              <button @click="viewUser(user)"
                class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 w-full text-left">
                View
              </button>
              <button @click="editUser(user)"
                class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 w-full text-left">
                Edit
              </button>
              <button @click="deactivateUser(user)"
                class="block px-4 py-2 text-sm bg-red-500 text-white w-full text-left">
                Deactivate
              </button>
            </div>
          </div>
          <p class="text-sm text-gray-600 font-medium">{{ user.email }}</p>
        </div>
      </div>
    </div>

    <!-- Pagination and Rows per Page -->
    <div class="flex flex-col items-center space-y-4 mt-4">
      <div class="flex items-center justify-center space-x-4">
        <button @click="goToPreviousPage" :disabled="currentPage === 1"
          class="px-4 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50">
          Previous
        </button>
        <span class="text-sm text-gray-600">Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="goToNextPage" :disabled="currentPage === totalPages"
          class="px-4 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50">
          Next
        </button>
      </div>

      <div class="flex items-center justify-center space-x-2">
        <label for="rowsPerPage" class="text-sm text-gray-600">Rows per page:</label>
        <select id="rowsPerPage" v-model="rowsPerPage" @change="paginate"
          class="border rounded-lg px-2 py-1 text-sm text-gray-600">
          <option v-for="option in [5, 10, 20]" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PartnerMembersList",
  data() {
    return {
      searchTerm: "",
      dropdownOpen: null,
      rowsPerPage: 5,
      currentPage: 1,
      users: [
        { id: 1, name: "Evan Grizzle", email: "evan.grizzle@example.com" },
        { id: 2, name: "John Doe", email: "john.doe@example.com" },
        { id: 3, name: "Jane Smith", email: "jane.smith@example.com" },
        { id: 4, name: "Michael Brown", email: "michael.brown@example.com" },
        // Add more team members
      ],
      filteredUsers: [],
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.users.length / this.rowsPerPage);
    },
  },
  methods: {
    addNewUser() {
      alert("Add new team member form should load.");
    },
    searchUsers() {
      this.filteredUsers = this.users.filter((user) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    viewUser(userId) {
      this.$router.push({ name: "PartnerProfile", params: { id: userId } });
    },
    editUser(user) {
      console.log("Edit user:", user);
    },
    deactivateUser(user) {
      if (confirm(`Are you sure you want to deactivate ${user.name}?`)) {
        console.log(`Deactivated user: ${user.name}`);
      }
    },
    toggleDropdown(userId) {
      this.dropdownOpen = this.dropdownOpen === userId ? null : userId;
    },
    paginate() {
      this.filteredUsers = this.users.slice(
        (this.currentPage - 1) * this.rowsPerPage,
        this.currentPage * this.rowsPerPage
      );
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
  },
  mounted() {
    this.paginate();
  },
};
</script>
