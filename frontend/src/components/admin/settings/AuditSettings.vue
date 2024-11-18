<template>
  <div class="space-y-6">
    <!-- Settings Section Header -->
    <div class="bg-gradient-to-r from-purple-800 to-pink-600 rounded-lg shadow-lg overflow-hidden mb-6">
      <div class="px-6 py-8">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl font-semibold text-white">Audit Logs & Activity</h3>
            <p class="text-white/70 mt-1">Configure audit trail and activity logging preferences</p>
          </div>
          <div class="hidden sm:block">
            <span class="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white ring-1 ring-inset ring-white/20">
              Last updated: {{ lastUpdated }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Log Configuration -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6 space-y-6">
        <h4 class="text-lg font-medium text-gray-900">Log Configuration</h4>

        <!-- Retention Period -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Data Retention Period</label>
          <select
            v-model="form.retentionPeriod"
            class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="1">1 Year</option>
            <option value="3">3 Years</option>
            <option value="5">5 Years</option>
            <option value="10">10 Years</option>
            <option value="custom">Custom Period</option>
          </select>
          <p class="mt-1 text-xs text-gray-500">Determine how long audit logs are retained in the system</p>
        </div>

        <!-- Log Level -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Log Level</label>
          <select
            v-model="form.logLevel"
            class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="debug">Debug - All Activities</option>
            <option value="info">Info - Standard Activities</option>
            <option value="warning">Warning - Important Changes</option>
            <option value="error">Error - Critical Events Only</option>
          </select>
          <p class="mt-1 text-xs text-gray-500">Set the detail level for activity logging</p>
        </div>
      </div>
    </div>

    <!-- Activity Categories -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6 space-y-6">
        <h4 class="text-lg font-medium text-gray-900">Activity Categories</h4>
        <div class="space-y-4">
          <label class="relative flex items-start">
            <input
              type="checkbox"
              v-model="form.categories.authentication"
              class="h-4 w-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <div class="ml-3">
              <span class="block text-sm font-medium text-gray-900">Authentication Events</span>
              <span class="block text-sm text-gray-500">Login attempts, password changes, 2FA activities</span>
            </div>
          </label>

          <label class="relative flex items-start">
            <input
              type="checkbox"
              v-model="form.categories.data"
              class="h-4 w-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <div class="ml-3">
              <span class="block text-sm font-medium text-gray-900">Data Modifications</span>
              <span class="block text-sm text-gray-500">Create, update, and delete operations</span>
            </div>
          </label>

          <label class="relative flex items-start">
            <input
              type="checkbox"
              v-model="form.categories.system"
              class="h-4 w-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <div class="ml-3">
              <span class="block text-sm font-medium text-gray-900">System Changes</span>
              <span class="block text-sm text-gray-500">Configuration updates and system maintenance</span>
            </div>
          </label>

          <label class="relative flex items-start">
            <input
              type="checkbox"
              v-model="form.categories.security"
              class="h-4 w-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <div class="ml-3">
              <span class="block text-sm font-medium text-gray-900">Security Events</span>
              <span class="block text-sm text-gray-500">Permission changes and security alerts</span>
            </div>
          </label>
        </div>
      </div>
    </div>

    <!-- Export Options -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6 space-y-6">
        <h4 class="text-lg font-medium text-gray-900">Export Configuration</h4>

        <!-- Export Format -->
        <div class="space-y-4">
          <label class="block text-sm font-medium text-gray-700">Available Export Formats</label>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <label class="relative flex items-start">
              <input
                type="checkbox"
                v-model="form.exportFormats.pdf"
                class="h-4 w-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <div class="ml-3">
                <span class="block text-sm font-medium text-gray-900">PDF Document</span>
                <span class="block text-sm text-gray-500">Formatted report with charts</span>
              </div>
            </label>

            <label class="relative flex items-start">
              <input
                type="checkbox"
                v-model="form.exportFormats.csv"
                class="h-4 w-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <div class="ml-3">
                <span class="block text-sm font-medium text-gray-900">CSV Spreadsheet</span>
                <span class="block text-sm text-gray-500">Raw data export</span>
              </div>
            </label>

            <label class="relative flex items-start">
              <input
                type="checkbox"
                v-model="form.exportFormats.json"
                class="h-4 w-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <div class="ml-3">
                <span class="block text-sm font-medium text-gray-900">JSON Format</span>
                <span class="block text-sm text-gray-500">Structured data format</span>
              </div>
            </label>
          </div>
        </div>

        <!-- Export Actions -->
        <div class="flex flex-wrap gap-4">
          <button
            @click="exportLogs('current')"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-purple-800 to-pink-600 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Export Current Period
          </button>
          <button
            @click="exportLogs('all')"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Export All Logs
          </button>
        </div>
      </div>
    </div>

    <!-- Data Management -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6 space-y-6">
        <h4 class="text-lg font-medium text-gray-900">Data Management</h4>

        <!-- Archive Settings -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Automatic Archiving</label>
          <select
            v-model="form.archiveInterval"
            class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="never">Never Archive</option>
            <option value="monthly">Monthly Archive</option>
            <option value="quarterly">Quarterly Archive</option>
            <option value="yearly">Yearly Archive</option>
          </select>
          <p class="mt-1 text-xs text-gray-500">Automatically archive old logs to save storage space</p>
        </div>

        <!-- Clear Data -->
        <div class="pt-4 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <h5 class="text-sm font-medium text-gray-900">Clear Audit Data</h5>
              <p class="text-sm text-gray-500">Permanently remove audit logs</p>
            </div>
            <button
              @click="confirmClearLogs"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Clear All Logs
            </button>
          </div>
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
  name: "AuditSettings",
  data() {
    return {
      lastUpdated: new Date().toLocaleDateString(),
      form: {
        retentionPeriod: "1",
        logLevel: "info",
        categories: {
          authentication: true,
          data: true,
          system: true,
          security: true
        },
        exportFormats: {
          pdf: true,
          csv: true,
          json: false
        },
        archiveInterval: "monthly"
      },
      defaultForm: null
    };
  },
  mounted() {
    // Store default values for reset functionality
    this.defaultForm = JSON.parse(JSON.stringify(this.form));
  },
  methods: {
    async exportLogs(period) {
      try {
        // Validate export options
        if (!Object.values(this.form.exportFormats).some(format => format)) {
          throw new Error("Please select at least one export format");
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        this.$toast({
          title: "Export Started",
          description: `Exporting ${period} logs. You'll be notified when complete.`,
          variant: "success",
          duration: 3000
        });
      } catch (error) {
        this.$toast({
          title: "Export Failed",
          description: error.message,
          variant: "destructive",
          duration: 3000
        });
      }
    },

    confirmClearLogs() {
      if (confirm("WARNING: This will permanently delete all audit logs. This action cannot be undone. Are you sure you want to continue?")) {
        this.clearLogs();
      }
    },

    async clearLogs() {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        this.$toast({
          title: "Logs Cleared",
          description: "All audit logs have been permanently deleted",
          variant: "success",
          duration: 3000
        });
      } catch (error) {
        this.$toast({
          title: "Error",
          description: "Failed to clear audit logs",
          variant: "destructive",
          duration: 3000
        });
      }
    },

    async saveSettings() {
      try {
        // Validate settings
        if (!Object.values(this.form.categories).some(enabled => enabled)) {
          throw new Error("At least one activity category must be enabled");
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        this.lastUpdated = new Date().toLocaleDateString();
        
        this.$toast({
          title: "Settings Updated",
          description: "Audit log settings have been successfully updated",
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
        description: "Audit log settings have been reset to default values",
        duration: 3000
      });
    }
  }
};
</script>