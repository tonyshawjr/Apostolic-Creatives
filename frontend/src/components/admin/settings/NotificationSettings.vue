<template>
    <div>
      <h3 class="text-2xl font-semibold text-gray-800 mb-6">Notification and Alerts Settings</h3>
  
      <div class="space-y-6">
        <!-- Admin Alerts -->
        <div class="rounded-lg bg-white shadow-md p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-4">Admin Alerts</h4>
          <form class="space-y-4">
            <!-- Pending Verifications -->
            <div class="flex items-center space-x-4">
              <input
                type="checkbox"
                id="pendingVerifications"
                v-model="form.adminAlerts.pendingVerifications"
                class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label for="pendingVerifications" class="text-sm font-medium text-gray-700">
                Pending Verifications
              </label>
            </div>
  
            <!-- Expiring Subscriptions -->
            <div class="flex items-center space-x-4">
              <input
                type="checkbox"
                id="expiringSubscriptions"
                v-model="form.adminAlerts.expiringSubscriptions"
                class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label for="expiringSubscriptions" class="text-sm font-medium text-gray-700">
                Expiring Subscriptions
              </label>
            </div>
  
            <!-- Flagged Job Postings -->
            <div class="flex items-center space-x-4">
              <input
                type="checkbox"
                id="flaggedPostings"
                v-model="form.adminAlerts.flaggedPostings"
                class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label for="flaggedPostings" class="text-sm font-medium text-gray-700">
                Flagged or Inappropriate Job Postings
              </label>
            </div>
          </form>
        </div>
  
        <!-- User Notifications -->
        <div class="rounded-lg bg-white shadow-md p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-4">User Notifications</h4>
  
          <!-- Email Templates -->
          <div>
            <label for="emailTemplate" class="block text-sm font-medium text-gray-700">Email Template</label>
            <textarea
              v-model="form.userNotifications.emailTemplate"
              id="emailTemplate"
              rows="4"
              placeholder="Customize your email template here..."
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary px-4 py-2 text-gray-800"
            ></textarea>
          </div>
  
          <!-- Toggles for Specific Alerts -->
          <div class="mt-4">
            <h5 class="text-sm font-medium text-gray-800 mb-2">Specific Alerts</h5>
            <div class="space-y-2">
              <div class="flex items-center space-x-4">
                <input
                  type="checkbox"
                  id="jobApplicationUpdates"
                  v-model="form.userNotifications.jobApplicationUpdates"
                  class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label for="jobApplicationUpdates" class="text-sm font-medium text-gray-700">
                  Job Application Updates
                </label>
              </div>
              <div class="flex items-center space-x-4">
                <input
                  type="checkbox"
                  id="profileReviews"
                  v-model="form.userNotifications.profileReviews"
                  class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label for="profileReviews" class="text-sm font-medium text-gray-700">
                  Profile Reviews
                </label>
              </div>
            </div>
          </div>
  
          <!-- Notification Frequency -->
          <div class="mt-4">
            <label for="frequency" class="block text-sm font-medium text-gray-700">Notification Frequency</label>
            <select
              v-model="form.userNotifications.frequency"
              id="frequency"
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary px-4 py-2 text-gray-800"
            >
              <option value="instant">Instant</option>
              <option value="daily">Daily Digest</option>
              <option value="weekly">Weekly Summary</option>
            </select>
          </div>
        </div>
  
        <!-- Actions -->
        <div class="flex space-x-4">
          <button
            @click="saveSettings"
            class="inline-flex justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Save Notification Settings
          </button>
          <button
            @click="resetDefaults"
            class="inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm"
          >
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "NotificationSettings",
    data() {
      return {
        form: {
          adminAlerts: {
            pendingVerifications: true,
            expiringSubscriptions: false,
            flaggedPostings: true,
          },
          userNotifications: {
            emailTemplate: "Hello [Name],\n\nYou have a new notification: [Notification Details].",
            jobApplicationUpdates: true,
            profileReviews: false,
            frequency: "instant", // Options: 'instant', 'daily', 'weekly'
          },
        },
        defaultForm: null,
      };
    },
    mounted() {
      // Store the default form state
      this.defaultForm = JSON.parse(JSON.stringify(this.form));
    },
    methods: {
      saveSettings() {
        console.log("Notification settings saved:", this.form);
        alert("Notification settings updated successfully!");
      },
      resetDefaults() {
        this.form = JSON.parse(JSON.stringify(this.defaultForm));
        alert("Settings reset to default values!");
      },
    },
  };
  </script>
  
  <style scoped>
  /* Custom styles if needed */
  </style>
  