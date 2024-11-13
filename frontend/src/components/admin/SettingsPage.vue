<template>
  <div class="mx-auto max-w-screen-2xl p-4 md:p-6">
    <!-- Tab Navigation -->
    <div class="relative">
      <!-- Mobile Dropdown -->
      <div class="block md:hidden mb-4">
        <select
          v-model="currentTab"
          class="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-800 shadow-sm focus:border-primary focus:ring-primary"
        >
          <option v-for="tab in tabs" :key="tab.id" :value="tab.id">
            {{ tab.label }}
          </option>
        </select>
      </div>

      <!-- Horizontal Tabs (Desktop & Tablet) -->
      <div
        class="hidden md:flex gap-4 border-b border-stroke pb-4 overflow-x-auto whitespace-nowrap"
      >
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="currentTab = tab.id"
          :class="[
            'px-4 py-2 rounded',
            currentTab === tab.id
              ? 'text-primary font-bold border-b-2 border-primary'
              : 'text-gray-500 hover:text-primary'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Dynamic Content -->
    <div class="mt-6">
      <component :is="currentTabComponent" />
    </div>
  </div>
</template>

<script>
import GeneralSettings from './settings/GeneralSettings.vue';
import SubscriptionSettings from './settings/SubscriptionSettings.vue';
import RolePermissions from './settings/RolePermissions.vue';
import FinancialSettings from './settings/FinancialSettings.vue';
import JobPostingSettings from './settings/JobPostingSettings.vue';
import VerificationSettings from './settings/VerificationSettings.vue';
import NotificationSettings from './settings/NotificationSettings.vue';
import ReportingSettings from './settings/ReportingSettings.vue';
import APISettings from './settings/APISettings.vue';
import AuditSettings from './settings/AuditSettings.vue';

export default {
  name: 'SettingsPage',
  data() {
    return {
      currentTab: 'general',
      tabs: [
        { id: 'general', label: 'General' },
        { id: 'subscriptions', label: 'Subscriptions' },
        { id: 'roles', label: 'Roles & Permissions' },
        { id: 'financial', label: 'Financial Settings' },
        { id: 'job_posting', label: 'Job Posting' },
        { id: 'verification', label: 'Verification' },
        { id: 'notifications', label: 'Notifications' },
        { id: 'reporting', label: 'Reporting' },
        { id: 'api', label: 'API' },
        { id: 'audit', label: 'Audit Logs' },
      ],
    };
  },
  computed: {
    currentTabComponent() {
      switch (this.currentTab) {
        case 'general':
          return GeneralSettings;
        case 'subscriptions':
          return SubscriptionSettings;
        case 'roles':
          return RolePermissions;
        case 'financial':
          return FinancialSettings;
        case 'job_posting':
          return JobPostingSettings;
        case 'verification':
          return VerificationSettings;
        case 'notifications':
          return NotificationSettings;
        case 'reporting':
          return ReportingSettings;
        case 'api':
          return APISettings;
        case 'audit':
          return AuditSettings;
        default:
          return GeneralSettings;
      }
    },
  },
};
</script>

<style scoped>
/* Additional styles to improve responsiveness */
button {
  transition: all 0.2s ease-in-out;
}

button:hover {
  text-decoration: underline;
}
</style>
