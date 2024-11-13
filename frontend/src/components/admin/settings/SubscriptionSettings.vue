<template>
    <div>
      <h3 class="text-2xl font-semibold text-gray-800 mb-6">Subscription Management Settings</h3>
  
      <!-- Add New Subscription Tier -->
      <div class="rounded-lg bg-white shadow-md p-6 mb-6">
        <h4 class="text-lg font-medium text-gray-800 mb-4">Add New Subscription Tier</h4>
        <form @submit.prevent="addTier" class="space-y-4">
          <!-- Name -->
          <div>
            <label for="tierName" class="block text-sm font-medium text-gray-700">Tier Name</label>
            <input
              v-model="newTier.name"
              type="text"
              id="tierName"
              placeholder="Basic, Premium, etc."
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary px-4 py-2 text-gray-800"
            />
          </div>
  
          <!-- Price -->
          <div>
            <label for="tierPrice" class="block text-sm font-medium text-gray-700">Price ($)</label>
            <input
              v-model="newTier.price"
              type="number"
              id="tierPrice"
              placeholder="10.00"
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary px-4 py-2 text-gray-800"
            />
          </div>
  
          <!-- Features -->
          <div>
            <label for="tierFeatures" class="block text-sm font-medium text-gray-700">Features</label>
            <textarea
              v-model="newTier.features"
              id="tierFeatures"
              rows="3"
              placeholder="Job post limits, directory visibility, etc."
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary px-4 py-2 text-gray-800"
            ></textarea>
          </div>
  
          <!-- Default Duration -->
          <div>
            <label for="tierDuration" class="block text-sm font-medium text-gray-700">Default Duration</label>
            <select
              v-model="newTier.duration"
              id="tierDuration"
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary px-4 py-2 text-gray-800"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
  
          <!-- Grace Period -->
          <div>
            <label for="tierGrace" class="block text-sm font-medium text-gray-700">Grace Period (days)</label>
            <input
              v-model="newTier.gracePeriod"
              type="number"
              id="tierGrace"
              placeholder="7"
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary px-4 py-2 text-gray-800"
            />
          </div>
  
          <!-- Add Button -->
          <button
            type="submit"
            class="inline-flex justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Add Subscription Tier
          </button>
        </form>
      </div>
  
      <!-- Existing Subscription Tiers -->
      <div class="rounded-lg bg-white shadow-md p-6">
        <h4 class="text-lg font-medium text-gray-800 mb-4">Existing Subscription Tiers</h4>
  
        <ul class="space-y-4">
          <li
            v-for="(tier, index) in subscriptionTiers"
            :key="tier.id"
            class="flex justify-between items-center rounded-md border border-gray-300 p-4"
          >
            <!-- Tier Details -->
            <div>
              <p class="text-lg font-medium text-gray-800">{{ tier.name }} ({{ tier.duration }})</p>
              <p class="text-sm text-gray-600">Price: ${{ tier.price }}</p>
              <p class="text-sm text-gray-600">Features: {{ tier.features }}</p>
              <p class="text-sm text-gray-600">Grace Period: {{ tier.gracePeriod }} days</p>
            </div>
  
            <!-- Actions -->
            <div class="flex space-x-2">
              <button
                @click="editTier(index)"
                class="rounded-md bg-blue-500 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none"
              >
                Edit
              </button>
              <button
                @click="deleteTier(index)"
                class="rounded-md bg-red-500 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none"
              >
                Delete
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "SubscriptionSettings",
    data() {
      return {
        newTier: {
          name: "",
          price: "",
          features: "",
          duration: "monthly",
          gracePeriod: "",
        },
        subscriptionTiers: [],
      };
    },
    methods: {
      addTier() {
        if (!this.newTier.name || !this.newTier.price) {
          alert("Please fill out the required fields.");
          return;
        }
  
        // Create a new tier object
        const newTier = { ...this.newTier, id: Date.now() };
  
        // Add to the list
        this.subscriptionTiers.push(newTier);
  
        // Reset the form
        this.newTier = {
          name: "",
          price: "",
          features: "",
          duration: "monthly",
          gracePeriod: "",
        };
  
        alert("Subscription tier added successfully!");
      },
      deleteTier(index) {
        this.subscriptionTiers.splice(index, 1);
        alert("Subscription tier deleted successfully!");
      },
      editTier(index) {
        const tierToEdit = this.subscriptionTiers[index];
        this.newTier = { ...tierToEdit }; // Load the tier into the form
        this.subscriptionTiers.splice(index, 1); // Remove from the list temporarily
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles here if necessary */
  </style>
  