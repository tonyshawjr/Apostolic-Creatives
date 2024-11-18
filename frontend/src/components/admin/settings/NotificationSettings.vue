<template>
  <div class="space-y-6">
    <!-- Settings Section Header -->
    <div class="bg-gradient-to-r from-purple-800 to-pink-600 rounded-lg shadow-lg overflow-hidden mb-6">
      <div class="px-6 py-8">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl font-semibold text-white">Notification Settings</h3>
            <p class="text-white/70 mt-1">Configure platform notifications and alert preferences</p>
          </div>
          <div class="hidden sm:block">
            <span class="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white ring-1 ring-inset ring-white/20">
              Last updated: {{ lastUpdated }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Admin Alerts Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6 space-y-6">
        <h4 class="text-lg font-medium text-gray-900">Admin Alert Preferences</h4>
        
        <div class="space-y-4">
          <!-- Alert Categories -->
          <div class="space-y-4">
            <label class="block text-sm font-medium text-gray-700">Alert Categories</label>
            
            <!-- Pending Verifications -->
            <label class="relative flex items-start">
              <input
                type="checkbox"
                v-model="form.adminAlerts.pendingVerifications"
                class="h-4 w-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <div class="ml-3">
                <span class="block text-sm font-medium text-gray-900">Pastor Verification Requests</span>
                <span class="block text-sm text-gray-500">Get notified when new verification requests are submitted</span>
              </div>
            </label>

            <!-- Subscription Management -->
            <label class="relative flex items-start">
              <input
                type="checkbox"
                v-model="form.adminAlerts.expiringSubscriptions"
                class="h-4 w-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <div class="ml-3">
                <span class="block text-sm font-medium text-gray-900">Subscription Management</span>
                <span class="block text-sm text-gray-500">Alert when subscriptions are expiring or require attention</span>
              </div>
            </label>

            <!-- Content Moderation -->
            <label class="relative flex items-start">
              <input
                type="checkbox"
                v-model="form.adminAlerts.flaggedPostings"
                class="h-4 w-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <div class="ml-3">
                <span class="block text-sm font-medium text-gray-900">Content Moderation</span>
                <span class="block text-sm text-gray-500">Flagged job postings and reported content</span>
              </div>
            </label>

            <!-- System Alerts -->
            <label class="relative flex items-start">
              <input
                type="checkbox"
                v-model="form.adminAlerts.systemAlerts"
                class="h-4 w-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <div class="ml-3">
                <span class="block text-sm font-medium text-gray-900">System Alerts</span>
                <span class="block text-sm text-gray-500">Critical system updates and performance notifications</span>
              </div>
            </label>
          </div>

          <!-- Alert Urgency -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Alert Urgency Settings</label>
            <select
              v-model="form.adminAlerts.urgencyLevel"
              class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="all">All Alerts</option>
              <option value="high">High Priority Only</option>
              <option value="critical">Critical Only</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- User Notification Templates -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6 space-y-6">
        <h4 class="text-lg font-medium text-gray-900">User Notification Templates</h4>

        <!-- Email Template Editor -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Email Template</label>
          <div class="mt-2 space-y-2">
            <textarea
              v-model="form.userNotifications.emailTemplate"
              rows="4"
              class="block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
              placeholder="Enter your email template..."
            ></textarea>
            <p class="text-xs text-gray-500">
              Available variables: [Name], [Church], [Role], [Date], [Action_Required]
            </p>
          </div>
        </div>

        <!-- Template Preview -->
        <div class="bg-gray-50 rounded-lg p-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Template Preview</label>
          <div class="bg-white rounded border border-gray-200 p-4 text-sm text-gray-600">
            {{ previewTemplate }}
          </div>
        </div>
      </div>
    </div>

    <!-- User Notification Preferences -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6 space-y-6">
        <h4 class="text-lg font-medium text-gray-900">User Notification Preferences</h4>

        <!-- Notification Categories -->
        <div class="space-y-4">
          <label class="block text-sm font-medium text-gray-700">Default User Notification Settings</label>

          <!-- Job Applications -->
          <label class="relative flex items-start">
            <input
              type="checkbox"
              v-model="form.userNotifications.jobApplicationUpdates"
              class="h-4 w-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <div class="ml-3">
              <span class="block text-sm font-medium text-gray-900">Job Application Updates</span>
              <span class="block text-sm text-gray-500">Status changes and responses to applications</span>
            </div>
          </label>

          <!-- Profile Reviews -->
          <label class="relative flex items-start">
            <input
              type="checkbox"
              v-model="form.userNotifications.profileReviews"
              class="h-4 w-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <div class="ml-3">
              <span class="block text-sm font-medium text-gray-900">Profile Reviews</span>
              <span class="block text-sm text-gray-500">Profile verification and review updates</span>
            </div>
          </label>

          <!-- Messages -->
          <label class="relative flex items-start">
            <input
              type="checkbox"
              v-model="form.userNotifications.messages"
              class="h-4 w-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <div class="ml-3">
              <span class="block text-sm font-medium text-gray-900">Direct Messages</span>
              <span class="block text-sm text-gray-500">New messages and chat notifications</span>
            </div>
          </label>
        </div>

        <!-- Notification Frequency -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Default Notification Frequency</label>
          <select
            v-model="form.userNotifications.frequency"
            class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="instant">Real-time Notifications</option>
            <option value="daily">Daily Digest</option>
            <option value="weekly">Weekly Summary</option>
          </select>
          <p class="mt-1 text-xs text-gray-500">Users can override this setting in their preferences</p>
        </div>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="px-6 py-4 flex justify-between items-center">
        <button
          type="button"
          @click="resetDefaults"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Reset to Default
        </button>
        <button
          @click="saveSettings"
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
  name: "NotificationSettings",
  data() {
    return {
      lastUpdated: new Date().toLocaleDateString(),
      form: {
        adminAlerts: {
          pendingVerifications: true,
          expiringSubscriptions: true,
          flaggedPostings: true,
          systemAlerts: true,
          urgencyLevel: "all"
        },
        userNotifications: {
          emailTemplate: "Hello [Name],\n\nYou have received an update regarding [Action_Required] at [Church].\n\nPlease review this notification at your earliest convenience.\n\nBest regards,\nApostolic Creatives Team",
          jobApplicationUpdates: true,
          profileReviews: true,
          messages: true,
          frequency: "instant"
        }
      },
      defaultForm: null
    };
  },
  computed: {
    previewTemplate() {
      return this.form.userNotifications.emailTemplate
        .replace("[Name]", "John Doe")
        .replace("[Church]", "First Church")
        .replace("[Action_Required]", "your job application")
        .replace("[Date]", new Date().toLocaleDateString());
    }
  },
  mounted() {
    // Store default values for reset functionality
    this.defaultForm = JSON.parse(JSON.stringify(this.form));
  },
  methods: {
    async saveSettings() {
      try {
        // Validate template
        if (!this.form.userNotifications.emailTemplate.includes("[Name]")) {
          throw new Error("Email template must include [Name] variable");
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        this.lastUpdated = new Date().toLocaleDateString();
        
        this.$toast({
          title: "Settings Updated",
          description: "Notification settings have been successfully updated.",
          variant: "success",
          duration: 3000
        });
      } catch (error) {
        this.$toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
          duration: 3000
        });
      }
    },
    resetDefaults() {
      this.form = JSON.parse(JSON.stringify(this.defaultForm));
      this.$toast({
        title: "Settings Reset",
        description: "Notification settings have been reset to default values.",
        duration: 3000
      });
    }
  }
};
</script>