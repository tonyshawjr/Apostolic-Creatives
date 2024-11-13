<template>
    <div>
      <h3 class="text-2xl font-semibold text-gray-800 mb-6">Job Posting Settings</h3>
  
      <div class="space-y-6">
        <!-- Default Fields -->
        <div class="rounded-lg bg-white shadow-md p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-4">Default Fields for Job Postings</h4>
          <form class="space-y-4">
            <!-- Role -->
            <div>
              <label for="defaultRole" class="block text-sm font-medium text-gray-700">Default Role</label>
              <input
                v-model="form.defaultFields.role"
                type="text"
                id="defaultRole"
                placeholder="e.g., Musician, Director, etc."
                class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary px-4 py-2 text-gray-800"
              />
            </div>
  
            <!-- Duration -->
            <div>
              <label for="defaultDuration" class="block text-sm font-medium text-gray-700">Default Duration</label>
              <input
                v-model="form.defaultFields.duration"
                type="text"
                id="defaultDuration"
                placeholder="e.g., 3 months, 6 months, etc."
                class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary px-4 py-2 text-gray-800"
              />
            </div>
  
            <!-- Description -->
            <div>
              <label for="defaultDescription" class="block text-sm font-medium text-gray-700">Default Description</label>
              <textarea
                v-model="form.defaultFields.description"
                id="defaultDescription"
                rows="3"
                placeholder="Provide a brief description of the job role."
                class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary px-4 py-2 text-gray-800"
              ></textarea>
            </div>
          </form>
        </div>
  
        <!-- Maximum Active Postings -->
        <div class="rounded-lg bg-white shadow-md p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-4">Maximum Active Job Postings</h4>
          <div>
            <label for="maxPostings" class="block text-sm font-medium text-gray-700">Per Subscription Tier</label>
            <input
              v-model="form.maxPostings"
              type="number"
              id="maxPostings"
              placeholder="e.g., 5, 10, etc."
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary px-4 py-2 text-gray-800"
            />
          </div>
        </div>
  
        <!-- Approval Workflow -->
        <div class="rounded-lg bg-white shadow-md p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-4">Approval Workflow</h4>
          <div class="flex items-center space-x-4">
            <label class="flex items-center">
              <input
                v-model="form.approvalWorkflow"
                type="radio"
                value="auto"
                class="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
              />
              <span class="ml-2 text-sm font-medium text-gray-700">Auto-approve</span>
            </label>
            <label class="flex items-center">
              <input
                v-model="form.approvalWorkflow"
                type="radio"
                value="manual"
                class="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
              />
              <span class="ml-2 text-sm font-medium text-gray-700">Manual Moderation</span>
            </label>
          </div>
        </div>
  
        <!-- Default Expiration -->
        <div class="rounded-lg bg-white shadow-md p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-4">Default Expiration for Job Postings</h4>
          <select
            v-model="form.defaultExpiration"
            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary px-4 py-2 text-gray-800"
          >
            <option value="30">30 Days</option>
            <option value="60">60 Days</option>
            <option value="90">90 Days</option>
          </select>
        </div>
  
        <!-- Actions -->
        <div class="flex space-x-4">
          <button
            @click="saveSettings"
            class="inline-flex justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Save Changes
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
    name: "JobPostingSettings",
    data() {
      return {
        form: {
          defaultFields: {
            role: "Musician",
            duration: "6 months",
            description: "Provide details about the job requirements.",
          },
          maxPostings: 5,
          approvalWorkflow: "auto", // Options: 'auto' or 'manual'
          defaultExpiration: "30", // Default: 30 days
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
        console.log("Job Posting Settings Saved:", this.form);
        alert("Job posting settings updated successfully!");
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
  