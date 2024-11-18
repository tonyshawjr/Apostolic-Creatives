<template>
  <div class="space-y-6">
    <!-- Settings Section Header -->
    <div class="bg-gradient-to-r from-purple-800 to-pink-600 rounded-lg shadow-lg overflow-hidden mb-6">
      <div class="px-6 py-8">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl font-semibold text-white">Verification Settings</h3>
            <p class="text-white/70 mt-1">Configure pastor verification requirements and background check policies</p>
          </div>
          <div class="hidden sm:block">
            <span class="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white ring-1 ring-inset ring-white/20">
              Last updated: {{ lastUpdated }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Pastor Verification Requirements -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6 space-y-6">
        <h4 class="text-lg font-medium text-gray-900">Pastor Verification Requirements</h4>
        
        <!-- Required Fields -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Required Information</label>
            <p class="text-sm text-gray-500 mb-4">Select which fields are required for pastor verification</p>
            
            <div class="space-y-3">
              <label class="relative flex items-start">
                <input
                  v-model="form.requiredFields"
                  type="checkbox"
                  value="full_name"
                  class="h-4 w-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <div class="ml-3">
                  <span class="block text-sm font-medium text-gray-900">Full Name</span>
                  <span class="block text-sm text-gray-500">Pastor's complete legal name</span>
                </div>
              </label>

              <label class="relative flex items-start">
                <input
                  v-model="form.requiredFields"
                  type="checkbox"
                  value="church_info"
                  class="h-4 w-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <div class="ml-3">
                  <span class="block text-sm font-medium text-gray-900">Church Information</span>
                  <span class="block text-sm text-gray-500">Church name and address</span>
                </div>
              </label>

              <label class="relative flex items-start">
                <input
                  v-model="form.requiredFields"
                  type="checkbox"
                  value="contact_details"
                  class="h-4 w-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <div class="ml-3">
                  <span class="block text-sm font-medium text-gray-900">Contact Details</span>
                  <span class="block text-sm text-gray-500">Official email and phone number</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Recommendation Letter Requirements -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Recommendation Letter Format</label>
            <select
              v-model="form.letterFormat"
              class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="pdf">PDF Document Only</option>
              <option value="doc">Word Document (.doc, .docx)</option>
              <option value="any">Any Document Format</option>
            </select>
            <p class="mt-1 text-xs text-gray-500">Specify acceptable file formats for recommendation letters</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Background Check Settings -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6 space-y-6">
        <h4 class="text-lg font-medium text-gray-900">Background Check Policy</h4>

        <!-- Background Check Toggle -->
        <div>
          <label class="relative inline-flex items-center">
            <input
              v-model="form.backgroundCheckRequired"
              type="checkbox"
              class="sr-only peer"
            />
            <div class="h-6 w-11 rounded-full bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            <span class="ml-3 text-sm font-medium text-gray-900">Require Background Check</span>
          </label>
          <p class="mt-1 text-xs text-gray-500">Enable mandatory background checks for creative verification</p>
        </div>

        <!-- Background Check Provider -->
        <div v-if="form.backgroundCheckRequired">
          <label class="block text-sm font-medium text-gray-700">Background Check Provider</label>
          <select
            v-model="form.backgroundCheckProvider"
            class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="checkr">Checkr</option>
            <option value="sterling">Sterling</option>
            <option value="hireright">HireRight</option>
          </select>
          <p class="mt-1 text-xs text-gray-500">Select your preferred background check service provider</p>
        </div>
      </div>
    </div>

    <!-- Verification Timeline -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6 space-y-6">
        <h4 class="text-lg font-medium text-gray-900">Verification Timeline</h4>

        <!-- Expiration Settings -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Verification Validity Period</label>
          <select
            v-model="form.verificationExpiration"
            class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="6">6 Months</option>
            <option value="12">1 Year</option>
            <option value="24">2 Years</option>
          </select>
          <p class="mt-1 text-xs text-gray-500">Period after which verification needs to be renewed</p>
        </div>

        <!-- Processing Time -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Maximum Processing Time</label>
          <select
            v-model="form.processingTime"
            class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="24">24 Hours</option>
            <option value="48">48 Hours</option>
            <option value="72">72 Hours</option>
          </select>
          <p class="mt-1 text-xs text-gray-500">Target time for completing verification reviews</p>
        </div>
      </div>
    </div>

    <!-- Notification Settings -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6 space-y-6">
        <h4 class="text-lg font-medium text-gray-900">Notification Settings</h4>

        <!-- Admin Notifications -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Admin Notification Email</label>
          <input
            v-model="form.notificationEmail"
            type="email"
            placeholder="admin@example.com"
            class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
          />
          <p class="mt-1 text-xs text-gray-500">Email address for verification notifications</p>
        </div>

        <!-- Notification Preferences -->
        <div class="space-y-3">
          <label class="block text-sm font-medium text-gray-700">Notification Triggers</label>
          
          <label class="relative flex items-start">
            <input
              v-model="form.notifications"
              type="checkbox"
              value="new_submission"
              class="h-4 w-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span class="ml-3 text-sm text-gray-600">New verification submission</span>
          </label>

          <label class="relative flex items-start">
            <input
              v-model="form.notifications"
              type="checkbox"
              value="verification_approved"
              class="h-4 w-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span class="ml-3 text-sm text-gray-600">Verification approved</span>
          </label>

          <label class="relative flex items-start">
            <input
              v-model="form.notifications"
              type="checkbox"
              value="verification_rejected"
              class="h-4 w-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span class="ml-3 text-sm text-gray-600">Verification rejected</span>
          </label>
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
  name: "VerificationSettings",
  data() {
    return {
      lastUpdated: new Date().toLocaleDateString(),
      form: {
        requiredFields: ["full_name", "church_info", "contact_details"],
        letterFormat: "pdf",
        backgroundCheckRequired: false,
        backgroundCheckProvider: "checkr",
        verificationExpiration: "12",
        processingTime: "48",
        notificationEmail: "",
        notifications: ["new_submission", "verification_rejected"],
      },
      defaultForm: null
    };
  },
  mounted() {
    // Store default values for reset functionality
    this.defaultForm = JSON.parse(JSON.stringify(this.form));
  },
  methods: {
    async saveSettings() {
      try {
        // Validate form data
        if (!this.form.notificationEmail && this.form.notifications.length > 0) {
          throw new Error("Notification email is required when notifications are enabled");
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        this.lastUpdated = new Date().toLocaleDateString();
        
        this.$toast({
          title: "Settings Updated",
          description: "Verification settings have been successfully updated.",
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
        description: "Verification settings have been reset to default values.",
        duration: 3000
      });
    }
  }
};
</script>