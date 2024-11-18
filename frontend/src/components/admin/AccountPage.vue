<template>
  <div class="space-y-6">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-[60vh]">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>

    <template v-else>
      <!-- Settings Section Header -->
      <div class="bg-gradient-to-r from-purple-800 to-pink-600 rounded-lg shadow-lg overflow-hidden mb-6">
        <div class="px-6 py-8">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xl font-semibold text-white">Account Settings</h3>
              <p class="text-white/70 mt-1">Manage your account details and preferences</p>
            </div>
            <div class="hidden sm:block">
              <span class="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white ring-1 ring-inset ring-white/20">
                Last login: {{ formatDate(lastLogin) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Account Overview Card -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-100">
        <div class="p-6">
          <div class="flex items-start space-x-6">
            <!-- Account Picture -->
            <div class="relative">
              <img
                :src="account.photo || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
                :alt="account.name"
                class="w-24 h-24 rounded-lg object-cover border border-gray-200"
              />
              <button
                @click="updatePhoto"
                class="absolute -right-2 -bottom-2 p-1.5 bg-white rounded-full shadow-sm border border-gray-200 hover:bg-gray-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>

            <!-- Account Info -->
            <div class="flex-1">
              <div class="flex justify-between">
                <div>
                  <h2 class="text-xl font-semibold text-gray-900">{{ account.name }}</h2>
                  <p class="text-gray-500">{{ account.email }}</p>
                </div>
                <button
                  @click="editAccount"
                  class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Edit Account
                </button>
              </div>
              <div class="mt-4 flex items-center space-x-4">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" :class="roleClasses">
                  {{ account.role }}
                </span>
                <span class="text-sm text-gray-500">
                  Member since {{ formatDate(account.joinDate) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Two Column Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Security Settings Card -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-100">
          <div class="p-6 space-y-6">
            <h3 class="text-lg font-medium text-gray-900">Security</h3>

            <!-- 2FA Status -->
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium text-gray-700">Two-Factor Authentication</p>
                <p class="text-sm text-gray-500">{{ account.twoFactorEnabled ? 'Enabled' : 'Not enabled' }}</p>
              </div>
              <button
                @click="toggleTwoFactor"
                class="text-purple-600 hover:text-purple-700 font-medium text-sm"
              >
                {{ account.twoFactorEnabled ? 'Disable' : 'Enable' }}
              </button>
            </div>

            <!-- Password -->
            <div class="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <p class="font-medium text-gray-700">Password</p>
                <p class="text-sm text-gray-500">Last changed {{ formatDate(account.passwordLastChanged) }}</p>
              </div>
              <button
                @click="changePassword"
                class="text-purple-600 hover:text-purple-700 font-medium text-sm"
              >
                Change
              </button>
            </div>

            <!-- Sessions -->
            <div class="pt-4 border-t border-gray-100">
              <div class="flex items-center justify-between mb-4">
                <p class="font-medium text-gray-700">Active Sessions</p>
                <button
                  @click="viewAllSessions"
                  class="text-purple-600 hover:text-purple-700 font-medium text-sm"
                >
                  View all
                </button>
              </div>
              <div class="space-y-3">
                <div v-for="session in activeSessions" :key="session.id" 
                  class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 rounded-full" :class="session.current ? 'bg-green-500' : 'bg-gray-400'"></div>
                    <span class="text-gray-700 text-sm">{{ session.device }}</span>
                  </div>
                  <span class="text-gray-500 text-sm">{{ session.location }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Access & Activity Card -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-100">
          <div class="p-6 space-y-6">
            <h3 class="text-lg font-medium text-gray-900">Access & Activity</h3>

            <!-- Permissions -->
            <div>
              <p class="font-medium text-gray-700 mb-3">Permissions</p>
              <div class="space-y-2">
                <div v-for="permission in account.permissions" :key="permission" 
                  class="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-gray-700">{{ permission }}</span>
                </div>
              </div>
            </div>

            <!-- Recent Activity -->
            <div class="pt-4 border-t border-gray-100">
              <div class="flex items-center justify-between mb-4">
                <p class="font-medium text-gray-700">Recent Activity</p>
                <button
                  @click="viewAllActivity"
                  class="text-purple-600 hover:text-purple-700 font-medium text-sm"
                >
                  View all
                </button>
              </div>
              <div class="space-y-4">
                <div v-for="activity in recentActivity" :key="activity.id"
                  class="flex items-start space-x-3">
                  <div class="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-700">{{ activity.action }}</p>
                    <p class="text-xs text-gray-500">{{ formatDate(activity.date) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- API Access Card -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-100">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-medium text-gray-900">API Access</h3>
            <button
              @click="generateApiKey"
              class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Generate New Key
            </button>
          </div>

          <div class="space-y-4">
            <div v-for="key in apiKeys" :key="key.id" 
              class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 class="font-medium text-gray-900">{{ key.name }}</h4>
                <p class="text-sm text-gray-500">Created {{ formatDate(key.created) }}</p>
              </div>
              <button
                @click="revokeApiKey(key.id)"
                class="text-red-600 hover:text-red-700 font-medium text-sm"
              >
                Revoke
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "AdminAccount",
  data() {
    return {
      lastLogin: new Date(),
      account: {
        name: "Tony Shaw",
        email: "tony@example.com",
        role: "Super Admin",
        photo: null,
        joinDate: new Date("2018-05-01"),
        twoFactorEnabled: true,
        passwordLastChanged: new Date("2024-01-15"),
        permissions: [
          "Full System Access",
          "User Management",
          "Content Moderation",
          "System Configuration"
        ]
      },
      activeSessions: [
        {
          id: 1,
          device: "MacBook Pro",
          location: "Wilmington, NC",
          current: true
        },
        {
          id: 2,
          device: "iPhone 13",
          location: "Wilmington, NC",
          current: false
        }
      ],
      recentActivity: [
        {
          id: 1,
          action: "Updated system settings",
          date: new Date("2024-03-18T14:30:00")
        },
        {
          id: 2,
          action: "Approved new user verification",
          date: new Date("2024-03-18T10:15:00")
        }
      ],
      apiKeys: [
        {
          id: 1,
          name: "Production API Key",
          created: new Date("2024-01-01")
        }
      ]
    };
  },
  computed: {
    roleClasses() {
      const classes = {
        'Super Admin': 'bg-purple-100 text-purple-800',
        'Admin': 'bg-blue-100 text-blue-800'
      };
      return classes[this.account.role] || 'bg-gray-100 text-gray-800';
    }
  },
  methods: {
    formatDate(date) {
      return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }).format(new Date(date));
    },
    editAccount() {
      this.$router.push('/dashboard/account/edit');
    },
    updatePhoto() {
      // Implement photo update logic
    },
    toggleTwoFactor() {
      this.account.twoFactorEnabled = !this.account.twoFactorEnabled;
    },
    changePassword() {
      // Implement password change modal/logic
    },
    viewAllSessions() {
      // Navigate to sessions page
    },
    viewAllActivity() {
      // Navigate to activity log page
    },
    generateApiKey() {
      // Implement API key generation logic
    },
    revokeApiKey(keyId) {
      // Remove API key from list
  this.apiKeys = this.apiKeys.filter(key => key.id !== keyId);
  
  // Show notification
  this.$toast({
    title: "API Key Revoked",
    description: "The API key has been successfully revoked",
    variant: "success",
    duration: 3000
  });
    }
  }
};
</script>