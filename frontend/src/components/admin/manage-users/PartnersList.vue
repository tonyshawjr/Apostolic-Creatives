<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="bg-gradient-to-r from-purple-800 to-pink-600 rounded-lg shadow-lg overflow-hidden">
      <div class="px-6 py-8 sm:px-8">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-6">
          <!-- Search -->
          <div class="w-full sm:w-auto sm:flex-1 sm:max-w-xl">
            <div class="relative">
              <svg xmlns="http://www.w3.org/2000/svg"
                class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input v-model="searchTerm" @input="searchPartners" type="text"
                placeholder="Search Partners by Church or Pastor"
                class="w-full pl-12 pr-4 py-3 bg-white/10 text-white placeholder-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50" />
            </div>
          </div>

          <!-- Add button -->
          <button @click="addNewPartner"
            class="w-full sm:w-auto px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add New Partner
          </button>
        </div>
      </div>
    </div>

    <!-- Partners Table Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <!-- Desktop Table -->
      <div class="hidden lg:block">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-100">
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Church</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Pastor</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Location</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Active Listings</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Active Creatives</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
              <th class="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="partner in paginatedPartners" :key="partner.id"
              class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <div>
                  <p @click="viewPartner(partner.id)"
                    class="font-medium text-gray-900 hover:text-purple-600 cursor-pointer transition-colors">
                    {{ partner.churchName }}
                  </p>
                  <p class="text-sm text-gray-500">{{ partner.email }}</p>
                </div>
              </td>
              <td class="px-6 py-4 text-gray-600">{{ partner.pastorName }}</td>
              <td class="px-6 py-4 text-gray-600">{{ partner.location }}</td>
              <td class="px-6 py-4 text-gray-600">{{ partner.activeListings }}</td>
              <td class="px-6 py-4 text-gray-600">{{ partner.activeCreatives }}</td>
              <td class="px-6 py-4">
                <span :class="[
                  partner.status === 'Active'
                    ? 'bg-green-50 text-green-700 ring-green-600/20'
                    : 'bg-gray-50 text-gray-600 ring-gray-500/10',
                  'inline-flex items-center rounded-full px-2 py-1 text-sm font-medium ring-1 ring-inset'
                ]">
                  {{ partner.status }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-end gap-2">
                  <button @click="viewPartner(partner.id)"
                    class="p-2 text-gray-600 hover:text-purple-600 transition-colors group relative"
                    :aria-label="`View ${partner.churchName}'s profile`">
                    <span
                      class="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      View Profile
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>

                  <button @click="editPartner(partner)"
                    class="p-2 text-gray-600 hover:text-purple-600 transition-colors group relative"
                    :aria-label="`Edit ${partner.churchName}'s profile`">
                    <span
                      class="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      Edit Profile
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>

                  <button @click="togglePartnerStatus(partner)"
                    class="p-2 text-gray-600 hover:text-red-600 transition-colors group relative"
                    :aria-label="partner.status === 'Active' ? `Deactivate ${partner.churchName}'s account` : `Activate ${partner.churchName}'s account`">
                    <span
                      class="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {{ partner.status === 'Active' ? 'Deactivate Account' : 'Activate Account' }}
                    </span>
                    <svg v-if="partner.status === 'Active'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile List -->
      <div class="block lg:hidden divide-y divide-gray-100">
        <div v-for="partner in paginatedPartners" :key="partner.id" class="p-4 hover:bg-gray-50">
          <div class="text-center mb-3">
            <p @click="viewPartner(partner.id)"
              class="font-medium text-gray-900 hover:text-purple-600 cursor-pointer text-lg">
              {{ partner.churchName }}
            </p>
            <p class="text-sm text-gray-600">{{ partner.pastorName }}</p>
            <p class="text-sm text-gray-500">{{ partner.location }}</p>
            <div class="mt-2 flex justify-center gap-4">
              <p class="text-sm text-gray-500">
                <span class="font-medium">{{ partner.activeListings }}</span> Listings
              </p>
              <p class="text-sm text-gray-500">
                <span class="font-medium">{{ partner.activeCreatives }}</span> Creatives
              </p>
            </div>
          </div>

          <div class="flex justify-center mb-4">
            <span :class="[
              partner.status === 'Active'
                ? 'bg-green-50 text-green-700 ring-green-600/20'
                : 'bg-gray-50 text-gray-600 ring-gray-500/10',
              'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset'
            ]">
              {{ partner.status }}
            </span>
          </div>

          <div class="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
            <button @click="viewPartner(partner.id)"
              class="text-purple-600 font-medium hover:text-purple-800 active:text-purple-900 py-2">
              View
            </button>
            <button @click="editPartner(partner)"
              class="text-purple-600 font-medium hover:text-purple-800 active:text-purple-900 py-2">
              Edit
            </button>
            <button @click="togglePartnerStatus(partner)"
              class="text-red-600 font-medium hover:text-red-800 active:text-red-900 py-2">
              {{ partner.status === 'Active' ? 'Deactivate' : 'Activate' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-gray-100">
        <div class="flex items-center justify-between">
          <p class="text-sm text-gray-600">
            Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredPartners.length }} partners
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
  name: 'PartnersList',

  data() {
    return {
      searchTerm: '',
      currentPage: 1,
      itemsPerPage: 20,
      partners: [
        {
          id: 1,
          churchName: "Grace Community Church",
          pastorName: "Rev. David Johnson",
          email: "pastor@gracechurch.org",
          status: "Active",
          location: "Austin, TX",
          activeListings: 12,
          activeCreatives: 8
        },
        {
          id: 2,
          churchName: "New Life Fellowship",
          pastorName: "Rev. Sarah Williams",
          email: "sarah@newlife.org",
          status: "Pending",
          location: "Dallas, TX",
          activeListings: 5,
          activeCreatives: 3
        }
      ]
    }
  },

  computed: {
    filteredPartners() {
      if (!this.searchTerm) return this.partners

      const searchLower = this.searchTerm.toLowerCase()
      return this.partners.filter(partner =>
        partner.churchName.toLowerCase().includes(searchLower) ||
        partner.pastorName.toLowerCase().includes(searchLower)
      )
    },

    totalPages() {
      return Math.ceil(this.filteredPartners.length / this.itemsPerPage)
    },

    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage
    },

    endIndex() {
      return Math.min(this.startIndex + this.itemsPerPage, this.filteredPartners.length)
    },

    paginatedPartners() {
      return this.filteredPartners.slice(this.startIndex, this.endIndex)
    }
  },

  methods: {
    addNewPartner() {
      this.$router.push('/dashboard/manage-partners/new')
    },

    viewPartner(partner) {
      this.$router.push(`/dashboard/manage-users/partner/${partner.Id}`)
    },

    editPartner(partner) {
      this.$router.push(`/dashboard/manage-users/partner/edit/${partner.Id}`)
    },

    togglePartnerStatus(partner) {
      partner.status = partner.status === 'Active' ? 'Inactive' : 'Active'
    },

    searchPartners() {
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
  }
}
</script>