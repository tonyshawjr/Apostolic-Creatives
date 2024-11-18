<template>
  <div>
    <!-- Tab Navigation -->
    <div class="bg-white border-b border-gray-100 mb-6">
      <!-- Mobile Dropdown -->
      <div class="block lg:hidden p-4">
        <select
          v-model="currentTab"
          class="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
        >
          <option v-for="tab in tabs" :key="tab.id" :value="tab.id">
            {{ tab.label }}
          </option>
        </select>
      </div>

      <!-- Desktop Tabs -->
      <div class="hidden lg:flex overflow-x-auto">
        <div class="flex-1 flex">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="currentTab = tab.id"
            :class="[
              'px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors',
              currentTab === tab.id
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Dynamic Content -->
    <div>
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
  components: {
    GeneralSettings,
    SubscriptionSettings,
    RolePermissions,
    FinancialSettings,
    JobPostingSettings,
    VerificationSettings,
    NotificationSettings,
    ReportingSettings,
    APISettings,
    AuditSettings,
  },
  data() {
    return {
      currentTab: 'general',
      tabs: [
        { id: 'general', label: 'General' },
        { id: 'subscriptions', label: 'Subscriptions' },
        { id: 'roles', label: 'Roles & Permissions' },
        { id: 'financial', label: 'Financial' },
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
      const componentMap = {
        general: GeneralSettings,
        subscriptions: SubscriptionSettings,
        roles: RolePermissions,
        financial: FinancialSettings,
        job_posting: JobPostingSettings,
        verification: VerificationSettings,
        notifications: NotificationSettings,
        reporting: ReportingSettings,
        api: APISettings,
        audit: AuditSettings,
      };
      return componentMap[this.currentTab] || GeneralSettings;
    },
  },
};
</script>