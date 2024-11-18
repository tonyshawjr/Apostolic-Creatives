<template>
  <div class="space-y-6">
    <!-- Settings Section Header -->
    <div class="bg-gradient-to-r from-purple-800 to-pink-600 rounded-lg shadow-lg overflow-hidden mb-6">
      <div class="px-6 py-8">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl font-semibold text-white">API & Developer Settings</h3>
            <p class="text-white/70 mt-1">Manage API keys, rate limits, and webhook configurations</p>
          </div>
          <div class="hidden sm:block">
            <span class="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white ring-1 ring-inset ring-white/20">
              Last updated: {{ lastUpdated }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- API Keys Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6 space-y-6">
        <div class="flex items-center justify-between">
          <h4 class="text-lg font-medium text-gray-900">API Keys</h4>
          <button
            @click="showNewKeyForm = true"
            class="inline-flex items-center px-3 py-1.5 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-purple-800 to-pink-600 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Generate New Key
          </button>
        </div>

        <!-- API Keys List -->
        <div v-if="form.apiKeys.length > 0" class="space-y-4">
          <div v-for="key in form.apiKeys" :key="key.id" 
            class="rounded-lg border border-gray-200 hover:border-purple-200 transition-colors p-4"
          >
            <div class="flex items-start justify-between">
              <div class="space-y-1">
                <h5 class="text-sm font-medium text-gray-900">{{ key.name }}</h5>
                <div class="flex items-center space-x-2">
                  <code class="text-xs bg-gray-100 px-2 py-1 rounded">{{ maskApiKey(key.key) }}</code>
                  <button
                    @click="copyToClipboard(key.key)"
                    class="text-purple-600 hover:text-purple-700 text-xs"
                  >
                    Copy
                  </button>
                </div>
                <div class="flex flex-wrap gap-2 mt-2">
                  <span class="inline-flex items-center rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-purple-700">
                    Created: {{ formatDate(key.created) }}
                  </span>
                  <span class="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                    Last used: {{ key.lastUsed ? formatDate(key.lastUsed) : 'Never' }}
                  </span>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <button
                  @click="regenerateKey(key)"
                  class="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                  title="Regenerate Key"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                  </svg>
                </button>
                <button
                  @click="confirmDeleteKey(key)"
                  class="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No API keys</h3>
          <p class="mt-1 text-sm text-gray-500">Generate your first API key to get started.</p>
        </div>

        <!-- New API Key Dialog -->
        <div v-if="showNewKeyForm" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Generate New API Key</h3>
            </div>
            <form @submit.prevent="generateApiKey" class="p-6 space-y-4">
              <div>
                <label for="keyName" class="block text-sm font-medium text-gray-700">Key Name</label>
                <input
                  v-model="newApiKey.name"
                  type="text"
                  id="keyName"
                  class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="e.g., Production API Key"
                />
                <p class="mt-1 text-xs text-gray-500">Give your key a descriptive name for easy identification</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Permissions</label>
                <div class="mt-2 space-y-2">
                  <label class="flex items-center">
                    <input
                      type="checkbox"
                      v-model="newApiKey.permissions"
                      value="read"
                      class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span class="ml-2 text-sm text-gray-600">Read Access</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      type="checkbox"
                      v-model="newApiKey.permissions"
                      value="write"
                      class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span class="ml-2 text-sm text-gray-600">Write Access</span>
                  </label>
                </div>
              </div>

              <div class="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  @click="showNewKeyForm = false"
                  class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-purple-800 to-pink-600 hover:opacity-90"
                >
                  Generate Key
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Rate Limits & Security -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6 space-y-6">
        <h4 class="text-lg font-medium text-gray-900">Rate Limits & Security</h4>

        <!-- Rate Limits -->
        <div>
          <label class="block text-sm font-medium text-gray-700">API Rate Limit</label>
          <div class="mt-2 flex items-center space-x-2">
            <input
              v-model="form.rateLimit"
              type="number"
              min="1"
              max="1000"
              class="block w-32 rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
            />
            <span class="text-sm text-gray-600">requests per minute</span>
          </div>
          <p class="mt-1 text-xs text-gray-500">Maximum number of API requests allowed per minute per key</p>
        </div>

        <!-- IP Whitelist -->
        <div>
          <label class="block text-sm font-medium text-gray-700">IP Whitelist</label>
          <div class="mt-2 space-y-2">
            <div v-for="(ip, index) in form.ipWhitelist" :key="index" class="flex items-center space-x-2">
              <input
                v-model="form.ipWhitelist[index]"
                type="text"
                class="block flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
                placeholder="e.g., 192.168.1.1"
              />
              <button
                @click="removeIp(index)"
                class="p-2 text-gray-400 hover:text-red-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            <button
              @click="addIp"
              class="text-sm text-purple-600 hover:text-purple-700"
            >
              + Add IP Address
            </button>
          </div>
          <p class="mt-1 text-xs text-gray-500">Leave empty to allow all IP addresses</p>
        </div>
      </div>
    </div>

    <!-- Webhook Settings -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6 space-y-6">
        <h4 class="text-lg font-medium text-gray-900">Webhook Configuration</h4>

        <div>
          <label class="block text-sm font-medium text-gray-700">Webhook URL</label>
          <input
            v-model="form.webhookUrl"
            type="url"
            class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
            placeholder="https://your-domain.com/webhook"
          />
          <p class="mt-1 text-xs text-gray-500">URL to receive webhook notifications</p>
        </div>

        <!-- Webhook Events -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Webhook Events</label>
          <div class="mt-2 space-y-2">
            <label class="flex items-center">
              <input
                type="checkbox"
                v-model="form.webhookEvents"
                value="api_key.created"
                class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span class="ml-2 text-sm text-gray-600">API Key Created</span>
            </label>
            <label class="flex items-center">
              <input
                type="checkbox"
                v-model="form.webhookEvents"
                value="api_key.revoked"
                class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span class="ml-2 text-sm text-gray-600">API Key Revoked</span>
            </label>
            <label class="flex items-center">
              <input
                type="checkbox"
                v-model="form.webhookEvents"
                value="rate_limit.exceeded"
                class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span class="ml-2 text-sm text-gray-600">Rate Limit Exceeded</span>
            </label>
            <label class="flex items-center">
              <input
                type="checkbox"
                v-model="form.webhookEvents"
                value="security.breach"
                class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span class="ml-2 text-sm text-gray-600">Security Alert</span>
            </label>
          </div>
          <p class="mt-1 text-xs text-gray-500">Select events to trigger webhook notifications</p>
        </div>

        <!-- Test Webhook -->
        <div class="pt-4">
          <button
            @click="testWebhook"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Test Webhook
          </button>
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
  name: "APISettings",
  data() {
    return {
      lastUpdated: new Date().toLocaleDateString(),
      showNewKeyForm: false,
      form: {
        apiKeys: [
          {
            id: 1,
            name: "Production API Key",
            key: "live_k1_abc123xyz789",
            created: new Date("2024-01-01"),
            lastUsed: new Date("2024-03-15"),
            permissions: ["read", "write"]
          }
        ],
        rateLimit: 100,
        ipWhitelist: [],
        webhookUrl: "",
        webhookEvents: ["api_key.created", "security.breach"],
      },
      newApiKey: {
        name: "",
        permissions: ["read"]
      },
      defaultForm: null
    };
  },
  mounted() {
    this.defaultForm = JSON.parse(JSON.stringify(this.form));
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },

    maskApiKey(key) {
      return `${key.substring(0, 8)}...${key.substring(key.length - 4)}`;
    },

    async copyToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text);
        this.$toast({
          title: "Copied",
          description: "API key copied to clipboard",
          duration: 2000
        });
      } catch (error) {
        this.$toast({
          title: "Error",
          description: "Failed to copy API key",
          variant: "destructive",
          duration: 3000
        });
      }
    },

    async generateApiKey() {
      try {
        if (!this.newApiKey.name) {
          throw new Error("Key name is required");
        }

        if (this.newApiKey.permissions.length === 0) {
          throw new Error("At least one permission must be selected");
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const newKey = {
          id: Date.now(),
          name: this.newApiKey.name,
          key: `live_k1_${Math.random().toString(36).substring(2, 15)}`,
          created: new Date(),
          lastUsed: null,
          permissions: [...this.newApiKey.permissions]
        };

        this.form.apiKeys.push(newKey);
        this.showNewKeyForm = false;
        this.newApiKey = {
          name: "",
          permissions: ["read"]
        };

        this.$toast({
          title: "API Key Generated",
          description: "New API key has been created successfully",
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

    async regenerateKey(key) {
      try {
        if (!confirm("Are you sure you want to regenerate this API key? The old key will stop working immediately.")) {
          return;
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const index = this.form.apiKeys.findIndex(k => k.id === key.id);
        this.form.apiKeys[index] = {
          ...key,
          key: `live_k1_${Math.random().toString(36).substring(2, 15)}`,
          created: new Date()
        };

        this.$toast({
          title: "API Key Regenerated",
          description: "Please update your applications with the new key",
          variant: "success",
          duration: 3000
        });
      } catch (error) {
        this.$toast({
          title: "Error",
          description: "Failed to regenerate API key",
          variant: "destructive",
          duration: 3000
        });
      }
    },

    confirmDeleteKey(key) {
      if (confirm("Are you sure you want to delete this API key? This action cannot be undone.")) {
        this.deleteApiKey(key);
      }
    },

    async deleteApiKey(key) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const index = this.form.apiKeys.findIndex(k => k.id === key.id);
        this.form.apiKeys.splice(index, 1);
        
        this.$toast({
          title: "API Key Deleted",
          description: "The API key has been successfully deleted",
          variant: "success",
          duration: 3000
        });
      } catch (error) {
        this.$toast({
          title: "Error",
          description: "Failed to delete API key",
          variant: "destructive",
          duration: 3000
        });
      }
    },

    addIp() {
      this.form.ipWhitelist.push("");
    },

    removeIp(index) {
      this.form.ipWhitelist.splice(index, 1);
    },

    async testWebhook() {
      try {
        if (!this.form.webhookUrl) {
          throw new Error("Webhook URL is required");
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        this.$toast({
          title: "Webhook Test Successful",
          description: "Test event was successfully sent to webhook URL",
          variant: "success",
          duration: 3000
        });
      } catch (error) {
        this.$toast({
          title: "Webhook Test Failed",
          description: error.message,
          variant: "destructive",
          duration: 3000
        });
      }
    },

    async saveSettings() {
      try {
        // Validate settings
        if (this.form.rateLimit < 1) {
          throw new Error("Rate limit must be at least 1");
        }

        // Validate IP addresses if any are specified
        if (this.form.ipWhitelist.some(ip => ip && !this.isValidIP(ip))) {
          throw new Error("Invalid IP address format");
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        this.lastUpdated = new Date().toLocaleDateString();
        
        this.$toast({
          title: "Settings Updated",
          description: "API settings have been successfully updated",
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
        description: "API settings have been reset to default values",
        duration: 3000
      });
    },

    isValidIP(ip) {
      const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
      if (!ipv4Regex.test(ip)) return false;
      
      const parts = ip.split('.');
      return parts.every(part => {
        const num = parseInt(part, 10);
        return num >= 0 && num <= 255;
      });
    }
  }
};
</script>