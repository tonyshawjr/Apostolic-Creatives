<template>
    <div>
      <h3 class="text-2xl font-semibold text-gray-800 mb-6">Verification Settings</h3>
  
      <div class="space-y-6">
        <!-- Pastor Verification Requirements -->
        <div class="rounded-lg bg-white shadow-md p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-4">Pastor Verification Requirements</h4>
          <form class="space-y-4">
            <!-- Pastor Name -->
            <div>
              <label for="pastorName" class="block text-sm font-medium text-gray-700">Pastor Name</label>
              <input
                v-model="form.pastorVerification.name"
                type="text"
                id="pastorName"
                placeholder="Enter pastor's full name"
                class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary px-4 py-2 text-gray-800"
              />
            </div>
  
            <!-- Contact Info -->
            <div>
              <label for="pastorContact" class="block text-sm font-medium text-gray-700">Contact Info</label>
              <input
                v-model="form.pastorVerification.contact"
                type="text"
                id="pastorContact"
                placeholder="Phone or Email"
                class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary px-4 py-2 text-gray-800"
              />
            </div>
  
            <!-- Recommendation Letter Upload -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Upload Recommendation Letter</label>
              <div class="mt-2 flex items-center space-x-4">
                <div>
                  <input
                    type="file"
                    class="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-gray-600 file:bg-gray-50 hover:file:bg-gray-100"
                    @change="handleRecommendationUpload"
                  />
                  <p v-if="form.pastorVerification.recommendationLetter" class="mt-2 text-sm text-green-600">
                    File uploaded successfully!
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
  
        <!-- Background Check -->
        <div class="rounded-lg bg-white shadow-md p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-4">Background Check</h4>
          <div class="flex items-center">
            <input
              v-model="form.backgroundCheckRequired"
              type="checkbox"
              id="backgroundCheck"
              class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label for="backgroundCheck" class="ml-2 text-sm font-medium text-gray-700">Require Background Check</label>
          </div>
        </div>
  
        <!-- Verification Expiration -->
        <div class="rounded-lg bg-white shadow-md p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-4">Verification Expiration</h4>
          <select
            v-model="form.verificationExpiration"
            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary px-4 py-2 text-gray-800"
          >
            <option value="6">6 Months</option>
            <option value="12">1 Year</option>
          </select>
        </div>
  
        <!-- Notification Settings -->
        <div class="rounded-lg bg-white shadow-md p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-4">Notification Settings</h4>
          <div>
            <label for="autoEmail" class="block text-sm font-medium text-gray-700">Auto Email for Status Updates</label>
            <input
              v-model="form.notificationEmail"
              type="email"
              id="autoEmail"
              placeholder="Enter admin email for notifications"
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary px-4 py-2 text-gray-800"
            />
          </div>
        </div>
  
        <!-- Actions -->
        <div class="flex space-x-4">
          <button
            @click="saveSettings"
            class="inline-flex justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Save Verification Policies
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
    name: "VerificationSettings",
    data() {
      return {
        form: {
          pastorVerification: {
            name: "",
            contact: "",
            recommendationLetter: null,
          },
          backgroundCheckRequired: false,
          verificationExpiration: "6", // Default to 6 months
          notificationEmail: "",
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
        console.log("Verification settings saved:", this.form);
        alert("Verification policies updated successfully!");
      },
      resetDefaults() {
        this.form = JSON.parse(JSON.stringify(this.defaultForm));
        alert("Settings reset to default values!");
      },
      handleRecommendationUpload(event) {
        const file = event.target.files[0];
        if (file) {
          this.form.pastorVerification.recommendationLetter = file.name; // Store file name (or base64 if needed)
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Custom styles if needed */
  </style>
  