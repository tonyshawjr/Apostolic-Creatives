<template>
  <div class="space-y-6">
    <div v-if="loading" class="flex justify-center items-center min-h-[60vh]">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>

    <template v-else-if="member">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-purple-800 to-pink-600 rounded-lg shadow-lg overflow-hidden">
        <div class="px-6 py-8 sm:px-8 sm:py-12">
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <!-- Profile Image -->
            <div class="relative">
              <img
                :src="member.photo || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
                :alt="member.name"
                class="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover border-4 border-white shadow-md" />
              <div v-if="member.role === 'Super Admin'"
                class="absolute -top-2 -right-2 bg-purple-500 text-white p-1.5 rounded-full shadow-lg">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>

            <!-- Basic Info -->
            <div class="flex-grow">
              <h1 class="text-2xl sm:text-3xl font-bold text-white mb-2">{{ member.name }}</h1>
              <div class="flex flex-wrap gap-3 text-white/90">
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {{ member.role }}
                </div>
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Team Member since {{ member.memberSince }}
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-3 sm:self-start">
              <button @click="$router.push(`/dashboard/manage-users/team-member/edit/${member.id}`)"
                class="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
              <button @click="showDeactivateModal = true"
                class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                Deactivate
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column -->
        <div class="space-y-6">
          <!-- Contact Info -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-100">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
              <div class="space-y-3">
                <div>
                  <p class="text-sm font-medium text-gray-500">Email</p>
                  <p class="text-gray-900">{{ member.email }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">Phone</p>
                  <p class="text-gray-900">{{ member.phone }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">Department</p>
                  <p class="text-gray-900">{{ member.department }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">Reports To</p>
                  <p class="text-gray-900">{{ member.reportsTo }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Permissions -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-100">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Access & Permissions</h3>
              <div class="space-y-3">
                <div v-for="(value, key) in member.permissions" :key="key" class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">{{ formatPermissionLabel(key) }}</span>
                  <span :class="[
                    value ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600',
                    'px-2 py-1 rounded-full text-xs font-medium'
                  ]">
                    {{ value ? 'Yes' : 'No' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Activity Log -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-100">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-6">Recent Activity</h3>
              <div class="space-y-6">
                <div v-for="activity in member.recentActivity" :key="activity.id" class="flex gap-4">
                  <div class="flex-shrink-0 mt-1">
                    <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <svg class="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path v-if="activity.type === 'update'"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        <path v-else-if="activity.type === 'create'" d="M12 4v16m8-8H4" />
                        <path v-else d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <div class="flex-grow">
                    <p class="text-gray-900">{{ activity.description }}</p>
                    <p class="text-sm text-gray-500">{{ activity.timestamp }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Stats -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-100">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-6">Performance Stats</h3>
              <div class="grid grid-cols-2 gap-6">
                <div v-for="stat in member.stats" :key="stat.label">
                  <p class="text-sm font-medium text-gray-500">{{ stat.label }}</p>
                  <p class="mt-1 text-2xl font-semibold text-gray-900">{{ stat.value }}</p>
                  <p class="text-sm text-gray-500">{{ stat.subtext }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="bg-white rounded-lg shadow-sm p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <h2 class="text-xl font-semibold text-gray-800 mb-2">Team Member Not Found</h2>
        <p class="text-gray-600 mb-6">This team member profile doesn't exist or has been removed.</p>
        <button @click="$router.push('/dashboard/manage-users/team-members')"
          class="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
          Back to Team
        </button>
      </div>
    </template>

    <!-- Deactivate Modal -->
    <teleport to="body">
      <div v-if="showDeactivateModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-lg max-w-md w-full" @click.stop>
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Deactivate Team Member?</h3>
            <p class="text-gray-600 mb-6">
              Are you sure you want to deactivate {{ member?.name }}'s account? This action will revoke their access to
              the
              system.
            </p>
            <div class="flex justify-end gap-3">
              <button @click="showDeactivateModal = false"
                class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">
                Cancel
              </button>
              <button @click="handleDeactivate" class="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg">
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
  name: 'TeamMemberProfile',

  data() {
    return {
      loading: true,
      member: null,
      showDeactivateModal: false
    }
  },

  methods: {
    async fetchMember() {
      try {
        this.loading = true
        await new Promise(resolve => setTimeout(resolve, 1000))

        if (this.$route.params.id === '1') {
          this.member = {
            id: 1,
            name: "Alex Johnson",
            email: "alex@apostoliccreatives.com",
            phone: "(555) 123-4567",
            department: "Operations",
            reportsTo: "Sarah Williams (COO)",
            role: "Super Admin",
            memberSince: "January 2023",
            photo: null,

            permissions: {
              manageUsers: true,
              managePartners: true,
              manageCreatives: true,
              viewReports: true,
              editSettings: true,
              manageTeam: true,
              superAdmin: true,
              manageRoles: true,
              auditLogs: true,
              systemSettings: true,
              manageJobs: true
            },

            recentActivity: [
              {
                id: 1,
                type: "update",
                description: "Updated partner verification process",
                timestamp: "2 hours ago"
              },
              {
                id: 2,
                type: "create",
                description: "Added new team member - Marketing Coordinator",
                timestamp: "1 day ago"
              }
            ],

            stats: [
              {
                label: "Partners Onboarded",
                value: "24",
                subtext: "Last 30 days"
              },
              {
                label: "Creatives Verified",
                value: "45",
                subtext: "Last 30 days"
              },
              {
                label: "Issues Resolved",
                value: "92%",
                subtext: "Resolution rate"
              },
              {
                label: "Response Time",
                value: "1.2h",
                subtext: "Average"
              }
            ]
          }
        }
      } catch (error) {
        console.error('Error fetching team member:', error)
        this.member = null
      } finally {
        this.loading = false
      }
    },

    formatPermissionLabel(key) {
      return key
        .replace(/^./, str => str.toUpperCase());
    },

    async handleDeactivate() {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.showDeactivateModal = false;
        this.$router.push('/dashboard/manage-users/team');
        this.$toast.success(`${this.member.name} has been deactivated.`);
      } catch (error) {
        console.error('Error deactivating member:', error);
        this.$toast.error('Failed to deactivate team member.');
      }
    }
  },

  async mounted() {
    await this.fetchMember();
  }
};
</script>

<style scoped>
/* Add any additional styling specific to this component if needed */
</style>
