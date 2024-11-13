<template>
  <div class="space-y-6">
    <!-- Section Header -->
    <h3 class="text-2xl font-semibold text-gray-800">General Platform Settings</h3>

    <!-- Settings Card -->
    <div class="rounded-lg bg-white shadow-md p-6">
      <form @submit.prevent="saveSettings" class="space-y-6">
        <!-- Platform Name -->
        <div>
          <label for="platformName" class="block text-sm font-medium text-gray-700">Platform Name</label>
          <input
            v-model="form.platformName"
            type="text"
            id="platformName"
            placeholder="Apostolic Creatives"
            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary px-4 py-2 text-gray-800"
          />
        </div>

        <!-- Logo Upload -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Upload Logo</label>
          <div class="mt-2 flex items-center space-x-4">
            <!-- Logo Preview -->
            <div v-if="form.logo" class="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <img :src="form.logo" alt="Logo Preview" />
            </div>
            <div>
              <input
                type="file"
                class="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-gray-600 file:bg-gray-50 hover:file:bg-gray-100"
                @change="handleLogoUpload"
              />
              <button
                v-if="form.logo"
                type="button"
                @click="removeLogo"
                class="text-sm text-red-600 hover:underline"
              >
                Remove Logo
              </button>
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
            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary px-4 py-2 text-gray-800"
          />
        </div>

        <!-- Default Email -->
        <div>
          <label for="defaultEmail" class="block text-sm font-medium text-gray-700">Default Email</label>
          <input
            v-model="form.defaultEmail"
            type="email"
            id="defaultEmail"
            placeholder="support@apostolicsoncall.com"
            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary px-4 py-2 text-gray-800"
          />
        </div>

        <!-- Notification Settings -->
        <div>
          <label for="notifications" class="block text-sm font-medium text-gray-700">Notification Settings</label>
          <select
            v-model="form.notifications"
            id="notifications"
            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary px-4 py-2 text-gray-800"
          >
            <option value="all">All Notifications</option>
            <option value="important">Important Alerts Only</option>
            <option value="lowActivity">Low Activity Alerts</option>
          </select>
        </div>

        <!-- Maintenance Mode -->
        <div class="flex items-center">
          <input
            v-model="form.maintenanceMode"
            type="checkbox"
            id="maintenanceMode"
            class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label for="maintenanceMode" class="ml-2 text-sm font-medium text-gray-700">Enable Maintenance Mode</label>
        </div>

        <!-- Buttons -->
        <div class="flex space-x-4">
          <button
            type="button"
            @click="resetToDefault"
            class="inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm"
          >
            Reset to Default
          </button>
          <button
            type="submit"
            class="inline-flex justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
      form: {
        platformName: "Apostolic Creatives",
        tagline: "Connecting churches with apostolic creatives",
        defaultEmail: "support@apostolicsoncall.com",
        notifications: "all",
        maintenanceMode: false,
        logo: null, // Store logo as a base64 string for preview
      },
      defaultForm: null, // Store default values for reset
    };
  },
  mounted() {
    // Store the default form for resetting
    this.defaultForm = JSON.parse(JSON.stringify(this.form));
  },
  methods: {
    saveSettings() {
      console.log("Settings saved:", this.form);
      alert("General settings saved successfully!");
    },
    resetToDefault() {
      this.form = JSON.parse(JSON.stringify(this.defaultForm));
      alert("Settings have been reset to default!");
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

<style scoped>
/* Additional Tailwind overrides or custom styles */
</style>
