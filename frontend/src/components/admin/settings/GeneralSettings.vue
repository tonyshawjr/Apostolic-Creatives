<template>
  <div class="space-y-6">
    <!-- Settings Section Header -->
    <div class="bg-gradient-to-r from-purple-800 to-pink-600 rounded-lg shadow-lg overflow-hidden mb-6">
      <div class="px-6 py-8">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl font-semibold text-white">General Platform Settings</h3>
            <p class="text-white/70 mt-1">Configure your platform's basic settings and preferences</p>
          </div>
          <div class="hidden sm:block">
            <span class="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white ring-1 ring-inset ring-white/20">
              Last updated: {{ lastUpdated }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Settings Form Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <form @submit.prevent="saveSettings" class="divide-y divide-gray-100">
        <!-- Platform Identity Section -->
        <div class="p-6 space-y-6">
          <h4 class="text-lg font-medium text-gray-900">Platform Identity</h4>
          
          <!-- Platform Name -->
          <div>
            <label for="platformName" class="block text-sm font-medium text-gray-700">Platform Name</label>
            <input
              v-model="form.platformName"
              type="text"
              id="platformName"
              placeholder="Apostolic Creatives"
              class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <!-- Logo Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Platform Logo</label>
            <div class="mt-2 flex items-center space-x-6">
              <!-- Logo Preview -->
              <div v-if="form.logo" class="relative h-16 w-16 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-200">
                <img :src="form.logo" alt="Logo Preview" class="object-cover" />
                <button
                  @click="removeLogo"
                  class="absolute top-0 right-0 p-1 bg-red-100 text-red-600 rounded-bl-lg hover:bg-red-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
              <div v-else class="h-16 w-16 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                  @change="handleLogoUpload"
                />
                <p class="mt-1 text-xs text-gray-500">PNG, JPG or GIF up to 2MB</p>
              </div>
            </div>
          </div>

          <!-- Tagline -->
          <div>
            <label for="tagline" class="block text-sm font-medium text-gray-700">Tagline</label>
            <input
              v-model="form.tagline"
              type="text"
              id="tagline"
              placeholder="Connecting churches with apostolic creatives"
              class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>

        <!-- Communication Settings -->
        <div class="p-6 space-y-6">
          <h4 class="text-lg font-medium text-gray-900">Communication Settings</h4>

          <!-- Default Email -->
          <div>
            <label for="defaultEmail" class="block text-sm font-medium text-gray-700">Default Email</label>
            <input
              v-model="form.defaultEmail"
              type="email"
              id="defaultEmail"
              placeholder="support@apostolicsoncall.com"
              class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <!-- Notification Settings -->
          <div>
            <label for="notifications" class="block text-sm font-medium text-gray-700">Notification Settings</label>
            <select
              v-model="form.notifications"
              id="notifications"
              class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="all">All Notifications</option>
              <option value="important">Important Alerts Only</option>
              <option value="lowActivity">Low Activity Alerts</option>
            </select>
          </div>
        </div>

        <!-- Platform Status -->
        <div class="p-6 space-y-6">
          <h4 class="text-lg font-medium text-gray-900">Platform Status</h4>

          <!-- Maintenance Mode -->
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <label for="maintenanceMode" class="flex items-center cursor-pointer">
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-700">Maintenance Mode</p>
                  <p class="text-sm text-gray-500">Temporarily disable the platform for maintenance</p>
                </div>
              </label>
            </div>
            <button 
              type="button"
              role="switch"
              :class="[
                'relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
                form.maintenanceMode ? 'bg-purple-600' : 'bg-gray-200'
              ]"
              @click="form.maintenanceMode = !form.maintenanceMode"
            >
              <span
                :class="[
                  'inline-block h-4 w-4 transform rounded-full bg-white transition',
                  form.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                ]"
              />
            </button>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-between items-center">
          <button
            type="button"
            @click="resetToDefault"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Reset to Default
          </button>
          <button
            type="submit"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-purple-800 to-pink-600 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "GeneralSettings",
  data() {
    return {
      lastUpdated: new Date().toLocaleDateString(),
      form: {
        platformName: "Apostolic Creatives",
        tagline: "Connecting churches with apostolic creatives",
        defaultEmail: "support@apostolicsoncall.com",
        notifications: "all",
        maintenanceMode: false,
        logo: null,
      },
      defaultForm: null,
    };
  },
  mounted() {
    this.defaultForm = JSON.parse(JSON.stringify(this.form));
  },
  methods: {
    async saveSettings() {
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.lastUpdated = new Date().toLocaleDateString();
        console.log("Settings saved:", this.form);
        
        // Show success message using shadcn/ui Alert component
        this.$toast({
          title: "Settings saved",
          description: "Your changes have been saved successfully.",
          duration: 3000,
        });
      } catch (error) {
        console.error("Error saving settings:", error);
      }
    },
    resetToDefault() {
      this.form = JSON.parse(JSON.stringify(this.defaultForm));
    },
    handleLogoUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.form.logo = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },
    removeLogo() {
      this.form.logo = null;
    },
  },
};
</script>