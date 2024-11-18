<template>
  <div class="space-y-6">
    <!-- Settings Section Header -->
    <div class="bg-gradient-to-r from-purple-800 to-pink-600 rounded-lg shadow-lg overflow-hidden mb-6">
      <div class="px-6 py-8">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl font-semibold text-white">Subscription Tiers</h3>
            <p class="text-white/70 mt-1">Manage subscription plans and pricing</p>
          </div>
          <button 
            @click="showNewTierForm = true"
            class="hidden sm:flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add New Tier
          </button>
        </div>
      </div>
    </div>

    <!-- Add/Edit Subscription Tier Form -->
    <div v-show="showNewTierForm" class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="px-6 py-4 border-b border-gray-100">
        <h4 class="text-lg font-medium text-gray-900">{{ editMode ? 'Edit' : 'Add New' }} Subscription Tier</h4>
      </div>
      
      <form @submit.prevent="saveTier" class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Name -->
          <div>
            <label for="tierName" class="block text-sm font-medium text-gray-700">Tier Name</label>
            <input
              v-model="newTier.name"
              type="text"
              id="tierName"
              placeholder="e.g., Basic, Premium, Pro"
              class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <!-- Price -->
          <div>
            <label for="tierPrice" class="block text-sm font-medium text-gray-700">Price ($)</label>
            <div class="mt-2 relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                v-model="newTier.price"
                type="number"
                step="0.01"
                id="tierPrice"
                placeholder="0.00"
                class="block w-full rounded-lg border border-gray-200 pl-7 pr-12 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">USD</span>
              </div>
            </div>
          </div>

          <!-- Duration -->
          <div>
            <label for="tierDuration" class="block text-sm font-medium text-gray-700">Billing Cycle</label>
            <select
              v-model="newTier.duration"
              id="tierDuration"
              class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="monthly">Monthly Billing</option>
              <option value="yearly">Annual Billing</option>
              <option value="quarterly">Quarterly Billing</option>
            </select>
          </div>

          <!-- Grace Period -->
          <div>
            <label for="tierGrace" class="block text-sm font-medium text-gray-700">Grace Period</label>
            <div class="mt-2 relative">
              <input
                v-model="newTier.gracePeriod"
                type="number"
                id="tierGrace"
                placeholder="7"
                class="block w-full rounded-lg border border-gray-200 pr-16 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">days</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Features -->
        <div>
          <label for="tierFeatures" class="block text-sm font-medium text-gray-700">Features</label>
          <p class="text-sm text-gray-500 mb-2">Add features one per line</p>
          <textarea
            v-model="newTier.features"
            id="tierFeatures"
            rows="4"
            placeholder="- Unlimited job postings&#10;- Priority support&#10;- Advanced analytics"
            class="block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
          ></textarea>
        </div>

        <!-- Form Actions -->
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="cancelEdit"
            class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-gradient-to-r from-purple-800 to-pink-600 text-white rounded-lg text-sm font-medium hover:opacity-90"
          >
            {{ editMode ? 'Update' : 'Add' }} Tier
          </button>
        </div>
      </form>
    </div>

    <!-- Existing Subscription Tiers -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="px-6 py-4 border-b border-gray-100">
        <h4 class="text-lg font-medium text-gray-900">Active Subscription Tiers</h4>
      </div>

      <div class="divide-y divide-gray-100">
        <div
          v-for="(tier, index) in subscriptionTiers"
          :key="tier.id"
          class="p-6 hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-start justify-between">
            <div class="space-y-1">
              <div class="flex items-center gap-3">
                <h5 class="text-lg font-medium text-gray-900">{{ tier.name }}</h5>
                <span class="inline-flex items-center rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                  {{ tier.duration }}
                </span>
              </div>
              <p class="text-2xl font-bold text-gray-900">${{ tier.price }}<span class="text-sm font-normal text-gray-500">/{{ tier.duration }}</span></p>
              <div class="mt-2 space-y-1">
                <p v-for="(feature, idx) in tier.features.split('\n')" :key="idx" class="text-sm text-gray-600 flex items-center gap-2">
                  <svg class="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  {{ feature.trim() }}
                </p>
              </div>
            </div>

            <div class="flex space-x-2">
              <button
                @click="startEdit(tier, index)"
                class="p-2 text-gray-600 hover:text-purple-600 transition-colors"
                title="Edit tier"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                @click="confirmDelete(index)"
                class="p-2 text-gray-600 hover:text-red-600 transition-colors"
                title="Delete tier"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <div class="mt-4 flex items-center gap-4 text-sm text-gray-500">
            <span class="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ tier.gracePeriod }} days grace period
            </span>
            <span class="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {{ Math.floor(Math.random() * 100) + 1 }} active subscribers
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubscriptionSettings",
  data() {
    return {
      showNewTierForm: false,
      editMode: false,
      editIndex: null,
      newTier: {
        name: "",
        price: "",
        features: "",
        duration: "monthly",
        gracePeriod: "7",
      },
      subscriptionTiers: [
        {
          id: 1,
          name: "Basic",
          price: "9.99",
          features: "- 5 job postings per month\n- Basic analytics\n- Email support",
          duration: "monthly",
          gracePeriod: "7"
        },
        {
          id: 2,
          name: "Pro",
          price: "29.99",
          features: "- Unlimited job postings\n- Advanced analytics\n- Priority support\n- Custom branding",
          duration: "monthly",
          gracePeriod: "14"
        }
      ],
    };
  },
  methods: {
    saveTier() {
      if (!this.newTier.name || !this.newTier.price) {
        // Show error toast
        return;
      }

      if (this.editMode && this.editIndex !== null) {
        this.subscriptionTiers[this.editIndex] = { ...this.newTier };
      } else {
        this.subscriptionTiers.push({ ...this.newTier, id: Date.now() });
      }

      this.resetForm();
    },
    startEdit(tier, index) {
      this.editMode = true;
      this.editIndex = index;
      this.newTier = { ...tier };
      this.showNewTierForm = true;
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.newTier = {
        name: "",
        price: "",
        features: "",
        duration: "monthly",
        gracePeriod: "7",
      };
      this.editMode = false;
      this.editIndex = null;
      this.showNewTierForm = false;
    },
    confirmDelete(index) {
      if (confirm('Are you sure you want to delete this subscription tier?')) {
        this.subscriptionTiers.splice(index, 1);
      }
    },
  },
};
</script>