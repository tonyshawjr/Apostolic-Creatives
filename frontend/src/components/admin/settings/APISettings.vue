<template>
    <div>
      <h3 class="text-2xl font-semibold text-gray-800 mb-6">API and Developer Settings</h3>
  
      <div class="space-y-6">
        <!-- API Key Management -->
        <div class="rounded-lg bg-white shadow-md p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-4">API Key Management</h4>
          <div class="space-y-4">
            <ul class="space-y-2">
              <li
                v-for="(key, index) in form.apiKeys"
                :key="key.id"
                class="flex justify-between items-center border border-gray-300 rounded-md p-4"
              >
                <div>
                  <p class="text-lg font-medium text-gray-800">{{ key.name }}</p>
                  <p class="text-sm text-gray-600">Key: {{ key.key }}</p>
                </div>
                <button
                  @click="deleteApiKey(index)"
                  class="rounded-md bg-red-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            </ul>
            <form @submit.prevent="generateApiKey" class="space-y-4">
              <div>
                <label for="apiKeyName" class="block text-sm font-medium text-gray-700">API Key Name</label>
                <input
                  v-model="newApiKey.name"
                  type="text"
                  id="apiKeyName"
                  placeholder="e.g., Stripe Integration"
                  class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-4 py-2"
                />
              </div>
              <button
                type="submit"
                class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light"
              >
                Generate API Key
              </button>
            </form>
          </div>
        </div>
  
        <!-- Rate Limits -->
        <div class="rounded-lg bg-white shadow-md p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-4">Rate Limits</h4>
          <input
            v-model="form.rateLimit"
            type="number"
            placeholder="Requests per minute"
            class="block w-full rounded-md border border-gray-300 shadow-sm px-4 py-2"
          />
        </div>
  
        <!-- Webhook Configuration -->
        <div class="rounded-lg bg-white shadow-md p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-4">Webhook Configuration</h4>
          <form @submit.prevent="testWebhook" class="space-y-4">
            <div>
              <label for="webhookUrl" class="block text-sm font-medium text-gray-700">Webhook URL</label>
              <input
                v-model="form.webhookUrl"
                type="url"
                id="webhookUrl"
                placeholder="https://example.com/webhook"
                class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-4 py-2"
              />
            </div>
            <button
              type="submit"
              class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light"
            >
              Test Webhook Connection
            </button>
          </form>
        </div>
  
        <!-- Actions -->
        <div class="flex space-x-4">
          <button
            @click="saveSettings"
            class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light"
          >
            Save API Settings
          </button>
          <button
            @click="resetDefaults"
            class="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "APISettings",
    data() {
      return {
        form: {
          apiKeys: [],
          rateLimit: 100, // Default rate limit
          webhookUrl: "",
        },
        newApiKey: {
          name: "",
        },
        defaultForm: null,
      };
    },
    mounted() {
      this.defaultForm = JSON.parse(JSON.stringify(this.form));
    },
    methods: {
      generateApiKey() {
        if (!this.newApiKey.name) {
          alert("Please provide a name for the API key.");
          return;
        }
        const newKey = {
          id: Date.now(),
          name: this.newApiKey.name,
          key: `key_${Math.random().toString(36).substring(2, 15)}`,
        };
        this.form.apiKeys.push(newKey);
        this.newApiKey.name = "";
        alert("API key generated successfully!");
      },
      deleteApiKey(index) {
        this.form.apiKeys.splice(index, 1);
        alert("API key deleted successfully!");
      },
      testWebhook() {
        alert(`Testing webhook connection to: ${this.form.webhookUrl}`);
      },
      saveSettings() {
        console.log("API Settings saved:", this.form);
        alert("API settings saved successfully!");
      },
      resetDefaults() {
        this.form = JSON.parse(JSON.stringify(this.defaultForm));
        alert("Settings reset to default values!");
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  