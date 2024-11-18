<template>
  <div class="space-y-6">
    <!-- Settings Section Header -->
    <div class="bg-gradient-to-r from-purple-800 to-pink-600 rounded-lg shadow-lg overflow-hidden mb-6">
      <div class="px-6 py-8">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl font-semibold text-white">Job Posting Settings</h3>
            <p class="text-white/70 mt-1">Configure default job posting options and moderation preferences</p>
          </div>
          <div class="hidden sm:block">
            <span class="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white ring-1 ring-inset ring-white/20">
              Last updated: {{ lastUpdated }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Default Fields Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6 space-y-6">
        <h4 class="text-lg font-medium text-gray-900">Default Fields for Job Postings</h4>
        
        <!-- Role -->
        <div>
          <label for="defaultRole" class="block text-sm font-medium text-gray-700">Default Role Type</label>
          <select
            v-model="form.defaultFields.role"
            id="defaultRole"
            class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="musician">Musician</option>
            <option value="worship_leader">Worship Leader</option>
            <option value="music_director">Music Director</option>
            <option value="sound_engineer">Sound Engineer</option>
            <option value="media_specialist">Media Specialist</option>
            <option value="video_editor">Video Editor</option>
            <option value="graphic_designer">Graphic Designer</option>
          </select>
          <p class="mt-1 text-xs text-gray-500">This will be pre-selected when creating new job posts</p>
        </div>

        <!-- Duration -->
        <div>
          <label for="defaultDuration" class="block text-sm font-medium text-gray-700">Default Contract Duration</label>
          <select
            v-model="form.defaultFields.duration"
            id="defaultDuration"
            class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="3_months">3 Months</option>
            <option value="6_months">6 Months</option>
            <option value="12_months">12 Months</option>
            <option value="permanent">Permanent</option>
          </select>
        </div>

        <!-- Description Template -->
        <div>
          <label for="defaultDescription" class="block text-sm font-medium text-gray-700">Description Template</label>
          <textarea
            v-model="form.defaultFields.description"
            id="defaultDescription"
            rows="4"
            placeholder="Add a template for job descriptions..."
            class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
          ></textarea>
          <p class="mt-1 text-xs text-gray-500">Use placeholders like {role}, {church_name}, {location} in your template</p>
        </div>
      </div>
    </div>

    <!-- Posting Limits and Rules -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6 space-y-6">
        <h4 class="text-lg font-medium text-gray-900">Posting Limits & Rules</h4>

        <!-- Subscription Tier Limits -->
        <div class="space-y-4">
          <label class="block text-sm font-medium text-gray-700">Maximum Active Postings per Tier</label>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs text-gray-600">Basic Tier</label>
              <input
                v-model="form.maxPostings.basic"
                type="number"
                min="1"
                max="10"
                class="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <label class="block text-xs text-gray-600">Professional Tier</label>
              <input
                v-model="form.maxPostings.pro"
                type="number"
                min="1"
                max="20"
                class="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <label class="block text-xs text-gray-600">Enterprise Tier</label>
              <input
                v-model="form.maxPostings.enterprise"
                type="number"
                min="1"
                max="50"
                class="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        <!-- Default Expiration -->
        <div>
          <label for="defaultExpiration" class="block text-sm font-medium text-gray-700">Default Post Duration</label>
          <select
            v-model="form.defaultExpiration"
            id="defaultExpiration"
            class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="30">30 Days</option>
            <option value="60">60 Days</option>
            <option value="90">90 Days</option>
            <option value="180">180 Days</option>
          </select>
          <p class="mt-1 text-xs text-gray-500">Posts will automatically expire after this duration</p>
        </div>
      </div>
    </div>

    <!-- Moderation Settings -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6 space-y-6">
        <h4 class="text-lg font-medium text-gray-900">Moderation Settings</h4>

        <!-- Approval Workflow -->
        <div class="space-y-4">
          <label class="block text-sm font-medium text-gray-700">Job Post Approval Process</label>
          
          <div class="grid gap-4">
            <label class="relative flex items-start">
              <input
                v-model="form.approvalWorkflow"
                type="radio"
                value="auto"
                class="h-4 w-4 mt-1 text-purple-600 border-gray-300 focus:ring-purple-500"
              />
              <div class="ml-3">
                <span class="block text-sm font-medium text-gray-900">Auto-approve Posts</span>
                <span class="block text-sm text-gray-500">Jobs go live immediately after submission</span>
              </div>
            </label>
            
            <label class="relative flex items-start">
              <input
                v-model="form.approvalWorkflow"
                type="radio"
                value="manual"
                class="h-4 w-4 mt-1 text-purple-600 border-gray-300 focus:ring-purple-500"
              />
              <div class="ml-3">
                <span class="block text-sm font-medium text-gray-900">Manual Moderation</span>
                <span class="block text-sm text-gray-500">Admin review required before posts go live</span>
              </div>
            </label>
          </div>
        </div>

        <!-- Auto-moderation Rules -->
        <div>
          <label class="relative inline-flex items-center">
            <input
              v-model="form.autoModeration"
              type="checkbox"
              class="sr-only peer"
            />
            <div class="h-6 w-11 rounded-full bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            <span class="ml-3 text-sm font-medium text-gray-900">Enable Auto-moderation</span>
          </label>
          <p class="mt-1 text-xs text-gray-500">Automatically flag posts containing inappropriate content</p>
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
  name: "JobPostingSettings",
  data() {
    return {
      lastUpdated: new Date().toLocaleDateString(),
      form: {
        defaultFields: {
          role: "musician",
          duration: "6_months",
          description: "We are seeking a talented and passionate {role} to join our team at {church_name} in {location}. The ideal candidate will have experience in church ministry and a heart for worship.\n\nResponsibilities:\n- [List key responsibilities]\n- [Add specific requirements]\n\nQualifications:\n- Strong musical abilities\n- Experience in church worship\n- Team player with excellent communication skills",
        },
        maxPostings: {
          basic: 3,
          pro: 10,
          enterprise: 25
        },
        approvalWorkflow: "auto",
        autoModeration: true,
        defaultExpiration: "60"
      },
      defaultForm: null
    };
  },
  mounted() {
    // Store default values for reset functionality
    this.defaultForm = JSON.parse(JSON.stringify(this.form));
  },
  methods: {
    async saveSettings() {
      try {
        // Validate form data
        if (!this.form.defaultFields.description.trim()) {
          throw new Error("Description template is required");
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        this.lastUpdated = new Date().toLocaleDateString();
        
        this.$toast({
          title: "Settings Updated",
          description: "Job posting settings have been successfully updated.",
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
        description: "Job posting settings have been reset to default values.",
        duration: 3000
      });
    }
  }
};
</script>