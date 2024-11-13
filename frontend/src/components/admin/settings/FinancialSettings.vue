<template>
    <div>
      <h3 class="text-2xl font-semibold text-gray-800 mb-6">Financial Settings</h3>
  
      <div class="space-y-6">
        <!-- Payment Gateway Integration -->
        <div class="rounded-lg bg-white shadow-md p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-4">Payment Gateway Integration</h4>
          <form @submit.prevent="testPaymentGateway" class="space-y-4">
            <!-- Stripe API Keys -->
            <div>
              <label for="stripePublishableKey" class="block text-sm font-medium text-gray-700">Stripe Publishable Key</label>
              <input
                v-model="form.stripePublishableKey"
                type="text"
                id="stripePublishableKey"
                placeholder="pk_test_..."
                class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary px-4 py-2 text-gray-800"
              />
            </div>
            <div>
              <label for="stripeSecretKey" class="block text-sm font-medium text-gray-700">Stripe Secret Key</label>
              <input
                v-model="form.stripeSecretKey"
                type="text"
                id="stripeSecretKey"
                placeholder="sk_test_..."
                class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary px-4 py-2 text-gray-800"
              />
            </div>
            <button
              type="submit"
              class="inline-flex justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Test Payment Gateway
            </button>
          </form>
        </div>
  
        <!-- Default Currency -->
        <div class="rounded-lg bg-white shadow-md p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-4">Default Currency</h4>
          <select
            v-model="form.defaultCurrency"
            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary px-4 py-2 text-gray-800"
          >
            <option value="USD">USD - United States Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="CAD">CAD - Canadian Dollar</option>
          </select>
        </div>
  
        <!-- Tax Configuration -->
        <div class="rounded-lg bg-white shadow-md p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-4">Tax Configuration</h4>
          <label for="taxRate" class="block text-sm font-medium text-gray-700">Tax Rate (%)</label>
          <input
            v-model="form.taxRate"
            type="number"
            id="taxRate"
            placeholder="0.00"
            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary px-4 py-2 text-gray-800"
          />
        </div>
  
        <!-- Invoice Templates -->
        <div class="rounded-lg bg-white shadow-md p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-4">Invoice Template</h4>
          <!-- Logo Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Upload Logo</label>
            <div class="mt-2 flex items-center space-x-4">
              <div v-if="form.invoiceLogo" class="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <img :src="form.invoiceLogo" alt="Invoice Logo" />
              </div>
              <div>
                <input
                  type="file"
                  class="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-gray-600 file:bg-gray-50 hover:file:bg-gray-100"
                  @change="handleLogoUpload"
                />
                <button
                  v-if="form.invoiceLogo"
                  type="button"
                  @click="removeLogo"
                  class="text-sm text-red-600 hover:underline"
                >
                  Remove Logo
                </button>
              </div>
            </div>
          </div>
          <!-- Address -->
          <div class="mt-4">
            <label for="companyAddress" class="block text-sm font-medium text-gray-700">Company Address</label>
            <textarea
              v-model="form.companyAddress"
              id="companyAddress"
              rows="3"
              placeholder="123 Church Street, City, Country"
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary px-4 py-2 text-gray-800"
            ></textarea>
          </div>
        </div>
  
        <!-- Payment History Retention -->
        <div class="rounded-lg bg-white shadow-md p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-4">Payment History Retention</h4>
          <select
            v-model="form.paymentHistoryRetention"
            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary px-4 py-2 text-gray-800"
          >
            <option value="1">1 Year</option>
            <option value="3">3 Years</option>
            <option value="5">5 Years</option>
            <option value="10">10 Years</option>
          </select>
        </div>
  
        <!-- Actions -->
        <div class="flex space-x-4">
          <button
            @click="updateSettings"
            class="inline-flex justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Update Financial Settings
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
        form: {
          stripePublishableKey: "",
          stripeSecretKey: "",
          defaultCurrency: "USD",
          taxRate: null,
          invoiceLogo: null,
          companyAddress: "",
          paymentHistoryRetention: "1",
        },
      };
    },
    methods: {
      testPaymentGateway() {
        alert("Testing payment gateway connection...");
        // Add actual API testing logic here
      },
      updateSettings() {
        console.log("Financial settings updated:", this.form);
        alert("Financial settings updated successfully!");
      },
      handleLogoUpload(event) {
        const file = event.target.files[0];
        if (file) {
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
    },
  };
  </script>
  
  <style scoped>
  /* Custom styles can be added if needed */
  </style>
  