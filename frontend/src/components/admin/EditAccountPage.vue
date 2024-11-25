<template>
  <div class="space-y-6">

    <!-- Profile Information Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6">
        <h4 class="text-lg font-medium text-gray-900 mb-6">Profile Information</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Profile Photo -->
          <div class="lg:col-span-2">
            <label class="block text-sm font-medium text-gray-700">Profile Photo</label>
            <div class="mt-2 flex items-center space-x-6">
              <div class="relative">
                <img
                  :src="form.photo || defaultPhoto"
                  alt="Profile photo"
                  class="h-24 w-24 rounded-lg object-cover border border-gray-200"
                />
                <button
                  v-if="form.photo"
                  @click="removePhoto"
                  class="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-sm border border-gray-200 hover:bg-gray-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
              <label class="block">
                <input
                  type="file"
                  @change="updatePhoto"
                  accept="image/*"
                  class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
                <p class="mt-1 text-xs text-gray-500">PNG, JPG up to 10MB</p>
              </label>
            </div>
          </div>

          <!-- Full Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <!-- Location -->
          <div>
            <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              id="location"
              v-model="form.location"
              class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <!-- Role (Read-only) -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              :value="form.role"
              disabled
              class="mt-2 block w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-600"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Security Settings Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6">
        <h4 class="text-lg font-medium text-gray-900 mb-6">Security Settings</h4>
        
        <div class="space-y-6">
          <!-- Change Password -->
          <div>
            <label for="currentPassword" class="block text-sm font-medium text-gray-700">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              v-model="form.currentPassword"
              class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label for="newPassword" class="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                id="newPassword"
                v-model="form.newPassword"
                class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                v-model="form.confirmPassword"
                class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>

          <!-- Two-Factor Authentication -->
          <div class="pt-6 border-t border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <h5 class="text-sm font-medium text-gray-900">Two-Factor Authentication</h5>
                <p class="mt-1 text-sm text-gray-500">
                  Add additional security to your account using two-factor authentication.
                </p>
              </div>
              <button
                type="button"
                @click="toggleTwoFactor"
                class="relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                :class="[form.twoFactorEnabled ? 'bg-purple-600' : 'bg-gray-200']"
              >
                <span
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition"
                  :class="[form.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1']"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification Preferences Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6">
        <h4 class="text-lg font-medium text-gray-900 mb-6">Notification Preferences</h4>
        
        <div class="space-y-4">
          <label class="relative flex items-start">
            <input
              type="checkbox"
              v-model="form.notifications.securityAlerts"
              class="h-4 w-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <div class="ml-3">
              <span class="block text-sm font-medium text-gray-900">Security Alerts</span>
              <span class="block text-sm text-gray-500">Get notified about security-related events</span>
            </div>
          </label>

          <label class="relative flex items-start">
            <input
              type="checkbox"
              v-model="form.notifications.accountUpdates"
              class="h-4 w-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <div class="ml-3">
              <span class="block text-sm font-medium text-gray-900">Account Updates</span>
              <span class="block text-sm text-gray-500">Receive updates about your account activity</span>
            </div>
          </label>

          <label class="relative flex items-start">
            <input
              type="checkbox"
              v-model="form.notifications.systemChanges"
              class="h-4 w-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <div class="ml-3">
              <span class="block text-sm font-medium text-gray-900">System Changes</span>
              <span class="block text-sm text-gray-500">Be notified about important system changes</span>
            </div>
          </label>
        </div>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="px-6 py-4 flex justify-between items-center">
        <button
          type="button"
          @click="resetForm"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Cancel
        </button>
        <button
          @click="saveChanges"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-purple-800 to-pink-600 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditAdminAccount',
  
  data() {
    return {
      defaultPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3000&auto=format&fit=crop',
      form: {
        photo: null,
        name: '',
        email: '',
        location: '',
        role: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        twoFactorEnabled: false,
        notifications: {
          securityAlerts: true,
          accountUpdates: true,
          systemChanges: true
        }
      }
    }
  },

  created() {
    // Load current account data
    this.loadAccountData()
  },

  methods: {
    loadAccountData() {
      // Simulate API call to get account data
      const accountData = {
        photo: null,
        name: 'Tony Shaw',
        email: 'tony@example.com',
        location: 'Wilmington, NC',
        role: 'Super Admin',
        twoFactorEnabled: true,
        notifications: {
          securityAlerts: true,
          accountUpdates: true,
          systemChanges: true
        }
      }
      
      // Populate form with current data
      this.form = {
        ...this.form,
        ...accountData
      }
    },

    updatePhoto(event) {
      const file = event.target.files[0]
      if (file) {
        // Validate file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
          this.$toast({
            title: 'Error',
            description: 'Image file size must be less than 10MB',
            variant: 'destructive',
            duration: 3000
          })
          return
        }

        // Create preview URL
        this.form.photo = URL.createObjectURL(file)
      }
    },

    removePhoto() {
      this.form.photo = null
    },

    toggleTwoFactor() {
      this.form.twoFactorEnabled = !this.form.twoFactorEnabled
    },

    resetForm() {
      // Reset form to original data
      this.loadAccountData()
      // Navigate back
      this.$router.push('/dashboard/account')
    },

    async saveChanges() {
      try {
        // Validate form
        if (!this.form.name || !this.form.email) {
          throw new Error('Name and email are required')
        }

        if (this.form.newPassword && this.form.newPassword !== this.form.confirmPassword) {
          throw new Error('New passwords do not match')
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        this.$toast({
          title: 'Success',
          description: 'Account settings have been updated successfully',
          variant: 'success',
          duration: 3000
        })

        // Navigate back to account page
        this.$router.push('/dashboard/account')
      } catch (error) {
        this.$toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
          duration: 3000
        })
      }
    }
  }
}
</script>