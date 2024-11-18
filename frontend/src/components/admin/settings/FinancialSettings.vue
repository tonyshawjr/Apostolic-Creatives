<template>
  <div class="space-y-6">
    <!-- Settings Section Header -->
    <div class="bg-gradient-to-r from-purple-800 to-pink-600 rounded-lg shadow-lg overflow-hidden mb-6">
      <div class="px-6 py-8">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl font-semibold text-white">Financial Settings</h3>
            <p class="text-white/70 mt-1">Configure payment gateways, currencies, and billing preferences</p>
          </div>
          <div class="hidden sm:block">
            <span class="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white ring-1 ring-inset ring-white/20">
              Last updated: {{ lastUpdated }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment Gateway Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <form @submit.prevent="testPaymentGateway" class="divide-y divide-gray-100">
        <div class="p-6 space-y-6">
          <h4 class="text-lg font-medium text-gray-900">Payment Gateway Integration</h4>
          
          <!-- Stripe API Keys -->
          <div>
            <label for="stripePublishableKey" class="block text-sm font-medium text-gray-700">Stripe Publishable Key</label>
            <input
              v-model="form.stripePublishableKey"
              type="text"
              id="stripePublishableKey"
              placeholder="pk_test_..."
              class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div>
            <label for="stripeSecretKey" class="block text-sm font-medium text-gray-700">Stripe Secret Key</label>
            <input
              v-model="form.stripeSecretKey"
              type="password"
              id="stripeSecretKey"
              placeholder="sk_test_..."
              class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
            />
            <p class="mt-1 text-xs text-gray-500">Keep this key secure and never share it publicly</p>
          </div>
        </div>

        <div class="px-6 py-4 bg-gray-50 flex justify-end">
          <button
            type="submit"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-purple-800 to-pink-600 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Test Connection
          </button>
        </div>
      </form>
    </div>

    <!-- Currency and Tax Settings -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6 space-y-6">
        <h4 class="text-lg font-medium text-gray-900">Currency & Tax Settings</h4>
        
        <!-- Default Currency -->
        <div>
          <label for="defaultCurrency" class="block text-sm font-medium text-gray-700">Default Currency</label>
          <select
            v-model="form.defaultCurrency"
            id="defaultCurrency"
            class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="USD">USD - United States Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="CAD">CAD - Canadian Dollar</option>
          </select>
        </div>

        <!-- Tax Rate -->
        <div>
          <label for="taxRate" class="block text-sm font-medium text-gray-700">Tax Rate (%)</label>
          <input
            v-model="form.taxRate"
            type="number"
            id="taxRate"
            step="0.01"
            min="0"
            max="100"
            placeholder="0.00"
            class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
      </div>
    </div>

    <!-- Invoice Settings -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6 space-y-6">
        <h4 class="text-lg font-medium text-gray-900">Invoice Settings</h4>
        
        <!-- Logo Upload -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Invoice Logo</label>
          <div class="mt-2 flex items-center space-x-6">
            <div v-if="form.invoiceLogo" class="relative h-16 w-16 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-200">
              <img :src="form.invoiceLogo" alt="Invoice Logo" class="object-contain" />
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
              <p class="mt-1 text-xs text-gray-500">PNG or JPG up to 2MB</p>
            </div>
          </div>
        </div>

        <!-- Company Address -->
        <div>
          <label for="companyAddress" class="block text-sm font-medium text-gray-700">Company Address</label>
          <textarea
            v-model="form.companyAddress"
            id="companyAddress"
            rows="3"
            placeholder="Enter your company's full address"
            class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Data Retention -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6 space-y-6">
        <h4 class="text-lg font-medium text-gray-900">Data Retention</h4>
        
        <div>
          <label for="paymentHistoryRetention" class="block text-sm font-medium text-gray-700">Payment History Retention</label>
          <select
            v-model="form.paymentHistoryRetention"
            id="paymentHistoryRetention"
            class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="1">1 Year</option>
            <option value="3">3 Years</option>
            <option value="5">5 Years</option>
            <option value="10">10 Years</option>
          </select>
          <p class="mt-1 text-xs text-gray-500">Choose how long to retain payment records</p>
        </div>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="px-6 py-4 flex justify-between items-center">
        <button
          type="button"
          @click="resetForm"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Reset to Default
        </button>
        <button
          @click="updateSettings"
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
  name: "FinancialSettings",
  data() {
    return {
      lastUpdated: new Date().toLocaleDateString(),
      form: {
        stripePublishableKey: "",
        stripeSecretKey: "",
        defaultCurrency: "USD",
        taxRate: null,
        invoiceLogo: null,
        companyAddress: "",
        paymentHistoryRetention: "1"
      },
      defaultForm: null
    };
  },
  mounted() {
    // Store default values for reset functionality
    this.defaultForm = JSON.parse(JSON.stringify(this.form));
  },
  methods: {
    async testPaymentGateway() {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        this.$toast({
          title: "Connection Successful",
          description: "Payment gateway connection has been verified.",
          variant: "success",
          duration: 3000
        });
      } catch (error) {
        this.$toast({
          title: "Connection Failed",
          description: "Unable to connect to payment gateway. Please check your credentials.",
          variant: "destructive",
          duration: 3000
        });
      }
    },
    async updateSettings() {
      try {
        // Validate required fields
        if (!this.form.stripePublishableKey || !this.form.stripeSecretKey) {
          throw new Error("Payment gateway credentials are required");
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        this.lastUpdated = new Date().toLocaleDateString();
        
        this.$toast({
          title: "Settings Updated",
          description: "Financial settings have been successfully updated.",
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
    handleLogoUpload(event) {
      const file = event.target.files[0];
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          this.$toast({
            title: "Error",
            description: "Logo file size must be less than 2MB",
            variant: "destructive",
            duration: 3000
          });
          return;
        }
        
        const reader = new FileReader();
        reader.onload = () => {
          this.form.invoiceLogo = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },
    removeLogo() {
      this.form.invoiceLogo = null;
    },
    resetForm() {
      this.form = JSON.parse(JSON.stringify(this.defaultForm));
      this.$toast({
        title: "Form Reset",
        description: "Settings have been reset to default values.",
        duration: 3000
      });
    }
  }
};
</script>