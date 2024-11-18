<template>
  <div class="space-y-6">
    <!-- Header Section with Stats and Actions -->
    <div class="bg-gradient-to-r from-purple-800 to-pink-600 rounded-lg shadow-lg overflow-hidden">
      <div class="px-6 py-8 sm:px-8">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-6">
          <!-- Search Input -->
          <div class="w-full sm:w-auto sm:flex-1 sm:max-w-xl">
            <div class="relative">
              <svg xmlns="http://www.w3.org/2000/svg"
                class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input v-model="searchTerm" @input="searchUsers" type="text"
                placeholder="Search Team Members by Name or Email"
                class="w-full pl-12 pr-4 py-3 bg-white/10 text-white placeholder-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50" />
            </div>
          </div>

          <!-- Add New Team Member Button -->
          <button @click="addNewMember"
            class="w-full sm:w-auto px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add New Team Member
          </button>
        </div>
      </div>
    </div>

    <!-- Members Table Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <!-- Desktop Table -->
      <div class="hidden lg:block">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-100">
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Team Member</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Email</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Role</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
              <th class="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in paginatedMembers" :key="member.id"
              class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <img :src="member.photo || '/placeholder-avatar.jpg'" :alt="member.name"
                    class="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p @click="viewMember(member.id)"
                      class="font-medium text-gray-900 hover:text-purple-600 cursor-pointer transition-colors">
                      {{ member.name }}
                    </p>
                    <p class="text-sm text-gray-600">{{ member.department }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-gray-600">{{ member.email }}</td>
              <td class="px-6 py-4 text-gray-600">{{ member.role }}</td>
              <td class="px-6 py-4">
                <span :class="[
                  member.active
                    ? 'bg-green-50 text-green-700 ring-green-600/20'
                    : 'bg-gray-50 text-gray-600 ring-gray-500/10',
                  'inline-flex items-center rounded-full px-2 py-1 text-sm font-medium ring-1 ring-inset'
                ]">
                  {{ member.active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-end gap-2">
                  <button @click="viewMember(member.id)"
                    class="p-2 text-gray-600 hover:text-purple-600 transition-colors" aria-label="View Profile">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button @click="editMember(member)" class="p-2 text-gray-600 hover:text-purple-600 transition-colors"
                    aria-label="Edit Profile">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button @click="toggleMemberStatus(member)"
                    class="p-2 text-gray-600 hover:text-red-600 transition-colors" aria-label="Toggle Status">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path v-if="member.active" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M6 18L18 6M6 6l12 12" />
                      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-gray-100">
        <div class="flex items-center justify-between">
          <p class="text-sm text-gray-600">
            Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredMembers.length }} team members
          </p>
          <div class="flex gap-2">
            <button @click="previousPage" :disabled="currentPage === 1"
              class="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
              Previous
            </button>
            <button @click="nextPage" :disabled="currentPage >= totalPages"
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
  name: 'TeamMembersList',
  data() {
    return {
      searchTerm: '',
      currentPage: 1,
      itemsPerPage: 10,
      members: [
        {
          id: 1,
          name: 'Alex Johnson',
          email: 'alex@example.com',
          role: 'Super Admin',
          active: true,
          photo: null,
          department: 'Operations'
        },
        {
          id: 2,
          name: 'Jamie Doe',
          email: 'jamie@example.com',
          role: 'Admin',
          active: false,
          photo: null,
          department: 'Finance'
        }
      ]
    };
  },
  computed: {
    filteredMembers() {
      const searchLower = this.searchTerm.toLowerCase();
      return this.members.filter(
        member =>
          member.name.toLowerCase().includes(searchLower) ||
          member.email.toLowerCase().includes(searchLower)
      );
    },
    totalPages() {
      return Math.ceil(this.filteredMembers.length / this.itemsPerPage);
    },
    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage;
    },
    endIndex() {
      return Math.min(this.startIndex + this.itemsPerPage, this.filteredMembers.length);
    },
    paginatedMembers() {
      return this.filteredMembers.slice(this.startIndex, this.endIndex);
    }
  },
  methods: {
    addNewMember() {
      this.$router.push('/dashboard/manage-users/team/new');
    },
    viewMember(memberId) {
      this.$router.push(`/dashboard/manage-users/team-member/${memberId}`);
    },
    editMember(member) {
      this.$router.push(`/dashboard/manage-users/team-member/edit/${member.id}`);
    },
    toggleMemberStatus(member) {
      member.active = !member.active;
    },
    previousPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    searchUsers() {
      this.currentPage = 1;
    }
  }
};
</script>

<style scoped>
/* Custom styles for team members list if needed */
</style>
