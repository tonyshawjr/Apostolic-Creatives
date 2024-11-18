<template>
  <div class="space-y-6">
    <!-- Header Section with Stats and Actions -->
    <div class="bg-gradient-to-r from-purple-800 to-pink-600 rounded-lg shadow-lg overflow-hidden">
  <div class="px-6 py-8 sm:px-8">
    <div class="flex flex-col sm:flex-row justify-between items-center gap-6">
      <!-- Left side: Search -->
      <div class="w-full sm:w-auto sm:flex-1 sm:max-w-xl">
        <div class="relative">
          <svg xmlns="http://www.w3.org/2000/svg"
            class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" 
            viewBox="0 0 24 24"
            fill="none" 
            stroke="currentColor" 
            stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input 
            v-model="searchTerm" 
            @input="searchUsers" 
            type="text" 
            placeholder="Search Creatives by Name or Email"
            class="w-full pl-12 pr-4 py-3 bg-white/10 text-white placeholder-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>
      </div>

      <!-- Right side: Add button -->
      <button 
        @click="addNewUser"
        class="w-full sm:w-auto px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
        <svg xmlns="http://www.w3.org/2000/svg" 
             class="h-5 w-5" 
             fill="none" 
             viewBox="0 0 24 24" 
             stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add New Creative
      </button>
    </div>
  </div>
</div>

    <!-- Users Table Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <!-- Desktop Table -->
      <div class="hidden lg:block">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-100">
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Creative</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Email</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Verification</th>
              <th class="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in paginatedUsers" :key="user.id" 
                class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
    <img :src="user.avatar || '/placeholder-avatar.jpg'" 
         :alt="user.name"
         class="w-10 h-10 rounded-full object-cover" />
    <div>
      <p @click="viewUser(user.id)" 
         class="font-medium text-gray-900 hover:text-purple-600 cursor-pointer transition-colors">
        {{ user.name }}
      </p>
    </div>
  </div>
              </td>
              <td class="px-6 py-4 text-gray-600">{{ user.email }}</td>
              <td class="px-6 py-4">
                <span :class="[
                  user.active 
                    ? 'bg-green-50 text-green-700 ring-green-600/20' 
                    : 'bg-gray-50 text-gray-600 ring-gray-500/10',
                  'inline-flex items-center rounded-full px-2 py-1 text-sm font-medium ring-1 ring-inset'
                ]">
                  {{ user.active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span :class="[
                  user.verified 
                    ? 'bg-blue-50 text-blue-700 ring-blue-600/20' 
                    : 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
                  'inline-flex items-center rounded-full px-2 py-1 text-sm font-medium ring-1 ring-inset'
                ]">
                  {{ user.verified ? 'Verified' : 'Pending' }}
                </span>
              </td>
              <td class="px-6 py-4">
  <div class="flex items-center justify-end gap-2">
    <button 
      @click="viewUser(user.id)"
      class="p-2 text-gray-600 hover:text-purple-600 transition-colors group relative"
      :aria-label="`View ${user.name}'s profile`">
      <span class="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
        View Profile
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" 
           class="h-5 w-5" 
           fill="none" 
           viewBox="0 0 24 24" 
           stroke="currentColor"
           aria-hidden="true">
        <path stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    </button>
    
    <button 
      @click="editUser(user)"
      class="p-2 text-gray-600 hover:text-purple-600 transition-colors group relative"
      :aria-label="`Edit ${user.name}'s profile`">
      <span class="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
        Edit Profile
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" 
           class="h-5 w-5" 
           fill="none" 
           viewBox="0 0 24 24" 
           stroke="currentColor"
           aria-hidden="true">
        <path stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    </button>
    
    <button 
      @click="toggleUserStatus(user)"
      class="p-2 text-gray-600 hover:text-red-600 transition-colors group relative"
      :aria-label="user.active ? `Deactivate ${user.name}'s account` : `Activate ${user.name}'s account`">
      <span class="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
        {{ user.active ? 'Deactivate Account' : 'Activate Account' }}
      </span>
      <svg v-if="user.active" 
           xmlns="http://www.w3.org/2000/svg" 
           class="h-5 w-5" 
           fill="none" 
           viewBox="0 0 24 24" 
           stroke="currentColor"
           aria-hidden="true">
        <path stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M6 18L18 6M6 6l12 12" />
      </svg>
      <svg v-else 
           xmlns="http://www.w3.org/2000/svg" 
           class="h-5 w-5" 
           fill="none" 
           viewBox="0 0 24 24" 
           stroke="currentColor"
           aria-hidden="true">
        <path stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M5 13l4 4L19 7" />
      </svg>
    </button>
  </div>
</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile List -->
<!-- Replace Mobile List with this centered design -->
<div class="block lg:hidden divide-y divide-gray-100">
  <div v-for="user in paginatedUsers" :key="user.id" 
       class="p-4 hover:bg-gray-50">
    <!-- Name and Email - Centered -->
    <div class="text-center mb-3">
      <p @click="viewUser(user.id)" 
         class="font-medium text-gray-900 hover:text-purple-600 cursor-pointer text-lg">
        {{ user.name }}
      </p>
      <p class="text-sm text-gray-600">{{ user.email }}</p>
    </div>

    <!-- Status Badges - Centered -->
    <div class="flex justify-center flex-wrap gap-2 mb-4">
      <span :class="[
        user.active 
          ? 'bg-green-50 text-green-700 ring-green-600/20' 
          : 'bg-gray-50 text-gray-600 ring-gray-500/10',
        'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset'
      ]">
        {{ user.active ? 'Active' : 'Inactive' }}
      </span>
      <span :class="[
        user.verified 
          ? 'bg-blue-50 text-blue-700 ring-blue-600/20' 
          : 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
        'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset'
      ]">
        {{ user.verified ? 'Verified' : 'Pending' }}
      </span>
    </div>

    <!-- Action Buttons - More Distinguished -->
    <div class="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
      <button @click="viewUser(user.id)"
        class="text-purple-600 font-medium hover:text-purple-800 active:text-purple-900 py-2 relative
               after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-purple-100 
               hover:after:bg-purple-200 transition-all">
        View
      </button>
      <button @click="editUser(user)"
        class="text-purple-600 font-medium hover:text-purple-800 active:text-purple-900 py-2 relative
               after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-purple-100 
               hover:after:bg-purple-200 transition-all">
        Edit
      </button>
      <button @click="toggleUserStatus(user)"
        class="text-red-600 font-medium hover:text-red-800 active:text-red-900 py-2 relative
               after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-red-100 
               hover:after:bg-red-200 transition-all">
        {{ user.active ? 'Deactivate' : 'Activate' }}
      </button>
    </div>
  </div>
</div>

      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-gray-100">
        <div class="flex items-center justify-between">
          <p class="text-sm text-gray-600">
            Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredUsers.length }} creatives
          </p>
          <div class="flex gap-2">
            <button @click="previousPage"
              :disabled="currentPage === 1"
              class="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
              Previous
            </button>
            <button @click="nextPage"
              :disabled="currentPage >= totalPages"
              class="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreativesList',
  
  data() {
    return {
      searchTerm: '',
      dropdownOpen: null,
      currentPage: 1,
      itemsPerPage: 20,
      users: [
        {
          id: 1,
          name: "Tre Tate",
          email: "tre@example.com",
          verified: true,
          active: true,
          avatar: null
        },
        {
          id: 2,
          name: "Peyton Whitehurst",
          email: "peyton@example.com",
          verified: false,
          active: false,
          avatar: null
        },
        {
          id: 3,
          name: "Annalea StClair",
          email: "anna@example.com",
          verified: true,
          active: true,
          avatar: null
        },
        {
          id: 4,
          name: "Ethan Short",
          email: "ethan@example.com",
          verified: false,
          active: true,
          avatar: null
        }
      ]
    }
  },

  computed: {
    filteredUsers() {
      if (!this.searchTerm) return this.users
      
      const searchLower = this.searchTerm.toLowerCase()
      return this.users.filter(user => 
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      )
    },

    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.itemsPerPage)
    },

    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage
    },

    endIndex() {
      return Math.min(this.startIndex + this.itemsPerPage, this.filteredUsers.length)
    },

    paginatedUsers() {
      return this.filteredUsers.slice(this.startIndex, this.endIndex)
    }
  },

  methods: {
    addNewUser() {
      this.$router.push('/dashboard/manage-users/creative/new')
    },

    viewUser(userId) {
      this.$router.push(`/dashboard/manage-users/creative/${userId}`)
    },

    editUser(user) {
      this.$router.push(`/dashboard/manage-users/creative/edit/${user.id}/`)
    },

    toggleUserStatus(user) {
      // In production, this would be an API call
      user.active = !user.active
    },

    toggleDropdown(userId) {
      this.dropdownOpen = this.dropdownOpen === userId ? null : userId
    },

    searchUsers() {
      // Reset to first page when searching
      this.currentPage = 1
    },

    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    }
  },

  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown-trigger')) {
        this.dropdownOpen = null
      }
    })
  },

  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>