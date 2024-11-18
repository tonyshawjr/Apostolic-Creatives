<template>
  <div class="space-y-6">
    <div v-if="loading" class="flex justify-center items-center min-h-[60vh]">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>

    <template v-if="!loading && partner">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-purple-800 to-pink-600 rounded-lg shadow-lg overflow-hidden">
        <div class="px-6 py-8 sm:px-8 sm:py-12">
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div class="flex-grow">
              <h1 class="text-2xl sm:text-3xl font-bold text-white mb-2">{{ partner.churchName }}</h1>
              <div class="flex flex-wrap gap-3 text-white/90">
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {{ partner.location }}
                </div>
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Partner since {{ partner.memberSince }}
                </div>
              </div>
            </div>

            <div class="flex gap-3 sm:self-start">
              <button 
                @click="$router.push(`/dashboard/partners/${partner.id}/edit`)"
                class="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
              <button 
                v-if="partner.status === 'Active'"
                @click="showDeactivateModal = true"
                class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-2">
                Deactivate
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 class="text-sm font-medium text-gray-500 mb-1">Active Listings</h3>
          <p class="text-2xl font-bold text-gray-900">{{ partner.stats.activeListings }}</p>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 class="text-sm font-medium text-gray-500 mb-1">Current Team</h3>
          <p class="text-2xl font-bold text-gray-900">{{ partner.stats.currentTeam }}</p>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 class="text-sm font-medium text-gray-500 mb-1">Total Hires</h3>
          <p class="text-2xl font-bold text-gray-900">{{ partner.stats.totalHires }}</p>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 class="text-sm font-medium text-gray-500 mb-1">Avg. Time to Fill</h3>
          <p class="text-2xl font-bold text-gray-900">{{ partner.stats.avgTimeToFill }}</p>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column -->
        <div class="space-y-6">
          <div class="bg-white rounded-lg shadow-sm border border-gray-100">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Church Information</h3>
              <div class="space-y-3">
                <div v-for="(value, key) in partnerInfo" :key="key">
                  <p class="text-sm font-medium text-gray-500">{{ formatLabel(key) }}</p>
                  <p class="text-gray-900">{{ value }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Active Listings -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-100">
            <div class="p-6">
              <div class="flex justify-between items-center mb-6">
                <h3 class="text-lg font-semibold text-gray-800">Active Listings</h3>
                <button 
                  @click="$router.push(`/dashboard/partners/${partner.id}/listings/new`)"
                  class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm">
                  Post New Listing
                </button>
              </div>
              
              <div v-if="partner.activeListings.length" class="divide-y divide-gray-100">
                <div v-for="listing in partner.activeListings" 
                     :key="listing.id" 
                     class="py-4 first:pt-0 last:pb-0">
                  <div class="flex justify-between items-start">
                    <div>
                      <h4 class="font-medium text-gray-900">{{ listing.title }}</h4>
                      <div class="mt-1 flex flex-wrap gap-x-4 gap-y-2 items-center text-sm">
                        <span class="text-gray-500">Posted {{ listing.postedDate }}</span>
                        <span :class="[
                          listing.type === 'Full-time' ? 'text-blue-600' : 'text-purple-600',
                          'font-medium'
                        ]">{{ listing.type }}</span>
                        <span :class="[
                          listing.urgent ? 'text-red-600' : 'text-gray-500'
                        ]">{{ listing.duration }}</span>
                      </div>
                    </div>
                    <div class="text-sm">
                      <span class="font-medium text-gray-900">{{ listing.applicants }}</span>
                      <span class="text-gray-500"> applicants</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-else class="text-center py-8 text-gray-500">
                No active listings at the moment
              </div>
            </div>
          </div>

          <!-- Current Team -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-100">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-6">Current Team</h3>
              <div v-if="partner.currentTeam.length" class="divide-y divide-gray-100">
                <div v-for="member in partner.currentTeam" 
                     :key="member.id" 
                     class="py-4 first:pt-0 last:pb-0">
                  <div class="flex justify-between items-start">
                    <div>
                      <h4 class="font-medium text-gray-900">{{ member.title }}</h4>
                      <router-link 
                        :to="`/dashboard/creatives/${member.creative.id}`"
                        class="inline-block mt-1 text-sm text-purple-600 hover:text-purple-800">
                        {{ member.creative.name }}
                      </router-link>
                    </div>
                    <div class="text-right text-sm">
                      <p class="text-gray-900">Started {{ member.startDate }}</p>
                      <p class="text-gray-500">{{ member.duration }}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-else class="text-center py-8 text-gray-500">
                No team members yet
              </div>
            </div>
          </div>

          <!-- Position History -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-100">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-6">Position History</h3>
              <div v-if="partner.positionHistory.length" class="divide-y divide-gray-100">
                <div v-for="position in partner.positionHistory" 
                     :key="position.id" 
                     class="py-4 first:pt-0 last:pb-0">
                  <div class="flex justify-between items-start">
                    <div>
                      <h4 class="font-medium text-gray-900">{{ position.title }}</h4>
                      <router-link 
                        :to="`/dashboard/creatives/${position.creative.id}`"
                        class="inline-block mt-1 text-sm text-purple-600 hover:text-purple-800">
                        {{ position.creative.name }}
                      </router-link>
                      <div class="mt-1 text-sm text-gray-500">
                        {{ position.term }} • {{ position.duration }}
                      </div>
                    </div>
                    <div class="text-right text-sm text-gray-500">
                      {{ position.startDate }} - {{ position.endDate }}
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-else class="text-center py-8 text-gray-500">
                No position history yet
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-if="!loading && !partner">
      <div class="bg-white rounded-lg shadow-sm p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h2 class="text-xl font-semibold text-gray-800 mb-2">Partner Not Found</h2>
        <p class="text-gray-600 mb-6">This partner profile doesn't exist or has been removed.</p>
        <button 
          @click="$router.push('/dashboard/manage-users/partners')"
          class="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
          Back to Partners
        </button>
      </div>
    </template>

    <!-- Deactivate Modal -->
    <teleport to="body">
      <div v-if="showDeactivateModal"
           class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-lg max-w-md w-full" @click.stop>
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Deactivate Partner?</h3>
            <p class="text-gray-600 mb-6">
              Are you sure you want to deactivate this partner? All active listings will be paused.
            </p>
            <div class="flex justify-end gap-3">
              <button 
                @click="showDeactivateModal = false"
                class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">
                Cancel
              </button>
              <button 
                @click="handleDeactivate"
                class="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg">
                Deactivate
              </button>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
export default {
  name: 'PartnerProfile',
  
  data() {
    return {
      loading: true,
      partner: null,
      showDeactivateModal: false
    }
  },

  computed: {
    partnerInfo() {
      if (!this.partner) return {}
      return {
        email: this.partner.email,
        phone: this.partner.phone,
        address: this.partner.address,
        pastorName: this.partner.pastorName,
        size: this.partner.size
      }
    }
  },

  methods: {
    async fetchPartner() {
      try {
        this.loading = true
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Default data for ID 1
        if (this.$route.params.id === '1') {
          this.partner = {
            id: 1,
            churchName: "Grace Community Church",
            location: "Austin, TX",
            address: "123 Church Street, Austin, TX 78701",
            phone: "(512) 555-0123",
            email: "office@gracechurch.org",
            memberSince: "January 2022",
            pastorName: "Rev. David Johnson",
            size: "500-1000 members",
            status: "Active",

            stats: {
              activeListings: 3,
              currentTeam: 4,
              totalHires: 12,
              avgTimeToFill: "45 days"
            },

            activeListings: [
              {
                id: 1,
                title: "Worship Leader",
                postedDate: "2 days ago",
                type: "Full-time",
                urgent: true,
                duration: "Permanent",
                applicants: 8,
                salary: "$40,000 - $50,000"
              },
              {
                id: 2,
                title: "Media Director",
                postedDate: "1 week ago",
                type: "Part-time",
                urgent: false,
                duration: "6 months",
                applicants: 4,
                salary: "$25/hr"
              }
            ],

            currentTeam: [
              {
                id: 1,
                title: "Music Director",
                creative: {
                  id: 101,
                  name: "Sarah Anderson"
                },
                startDate: "March 2023",
                duration: "Permanent",
                contractType: "Full-time"
              },
              {
                id: 2,
                title: "Video Editor",
                creative: {
                  id: 102,
                  name: "Michael Chen"
                },
                startDate: "June 2023",
                duration: "1 year",
                contractType: "Contract"
              }
            ],

            positionHistory: [
              {
                id: 1,
                title: "Sound Engineer",
                creative: {
                  id: 103,
                  name: "James Wilson"
                },
                startDate: "Jan 2022",
                endDate: "Dec 2022",
                duration: "12 months",
                term: "Contract",
                completionStatus: "Completed"
              },
              {
                id: 2,
                title: "Social Media Manager",
                creative: {
                  id: 104,
                  name: "Emily Parker"
                },
                startDate: "Mar 2022",
                endDate: "Sep 2022",
                duration: "6 months",
                term: "Part-time",
                completionStatus: "Early Termination"
              }
            ]
          }
        }
      } catch (error) {
        console.error('Error fetching partner:', error)
        this.partner = null
      } finally {
        this.loading = false
      }
    },

    formatLabel(key) {
      return key.charAt(0).toUpperCase() + 
             key.slice(1).replace(/([A-Z])/g, ' $1').trim()
    },

    async handleDeactivate() {
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        this.partner.status = 'Inactive'
        this.showDeactivateModal = false
        this.$router.push('/dashboard/manage-users/partner')
      } catch (error) {
        console.error('Error deactivating partner:', error)
      }
    }
  },

  created() {
    this.fetchPartner()
  }
}
</script>