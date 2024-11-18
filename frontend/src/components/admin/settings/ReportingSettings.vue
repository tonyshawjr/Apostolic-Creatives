<template>
  <div class="space-y-6">
    <!-- Settings Section Header -->
    <div class="bg-gradient-to-r from-purple-800 to-pink-600 rounded-lg shadow-lg overflow-hidden mb-6">
      <div class="px-6 py-8">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl font-semibold text-white">Reporting Settings</h3>
            <p class="text-white/70 mt-1">Configure report templates and data retention policies</p>
          </div>
          <div class="hidden sm:block">
            <span class="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white ring-1 ring-inset ring-white/20">
              Last updated: {{ lastUpdated }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Report Templates Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6 space-y-6">
        <div class="flex items-center justify-between">
          <h4 class="text-lg font-medium text-gray-900">Report Templates</h4>
          <button
            @click="showNewTemplateForm = true"
            class="inline-flex items-center px-3 py-1.5 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-purple-800 to-pink-600 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Add Template
          </button>
        </div>

        <!-- Template List -->
        <div v-if="form.reportTemplates.length > 0" class="space-y-4">
          <div v-for="template in form.reportTemplates" :key="template.id" 
            class="rounded-lg border border-gray-200 hover:border-purple-200 transition-colors p-4"
          >
            <div class="flex items-start justify-between">
              <div class="space-y-1">
                <h5 class="text-sm font-medium text-gray-900">{{ template.name }}</h5>
                <p class="text-sm text-gray-500">{{ template.description }}</p>
                <div class="flex flex-wrap gap-2 mt-2">
                  <span v-for="metric in template.metrics" :key="metric" 
                    class="inline-flex items-center rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-purple-700"
                  >
                    {{ metric }}
                  </span>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <button
                  @click="editTemplate(template)"
                  class="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button
                  @click="confirmDeleteTemplate(template)"
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
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No templates</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by creating a new report template.</p>
        </div>

        <!-- Template Form Dialog -->
        <div v-if="showNewTemplateForm" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">{{ editingTemplate ? 'Edit Template' : 'New Template' }}</h3>
            </div>
            <form @submit.prevent="saveTemplate" class="p-6 space-y-4">
              <!-- Template Name -->
              <div>
                <label for="templateName" class="block text-sm font-medium text-gray-700">Template Name</label>
                <input
                  v-model="newTemplate.name"
                  type="text"
                  id="templateName"
                  class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="e.g., Monthly Activity Report"
                />
              </div>

              <!-- Template Description -->
              <div>
                <label for="templateDescription" class="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  v-model="newTemplate.description"
                  id="templateDescription"
                  rows="3"
                  class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Describe the purpose of this report template"
                ></textarea>
              </div>

              <!-- Metrics Selection -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Include Metrics</label>
                <div class="space-y-2">
                  <label v-for="metric in availableMetrics" :key="metric.value" class="flex items-center">
                    <input
                      type="checkbox"
                      v-model="newTemplate.metrics"
                      :value="metric.value"
                      class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span class="ml-2 text-sm text-gray-600">{{ metric.label }}</span>
                  </label>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  @click="showNewTemplateForm = false"
                  class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-purple-800 to-pink-600 hover:opacity-90"
                >
                  {{ editingTemplate ? 'Update Template' : 'Create Template' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Report Settings Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6 space-y-6">
        <h4 class="text-lg font-medium text-gray-900">Report Settings</h4>

        <!-- Retention Period -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Data Retention Period</label>
          <select
            v-model="form.retentionPeriod"
            class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="1">1 Year</option>
            <option value="3">3 Years</option>
            <option value="5">5 Years</option>
            <option value="10">10 Years</option>
          </select>
          <p class="mt-1 text-xs text-gray-500">Historical report data will be retained for this period</p>
        </div>

        <!-- Export Formats -->
        <div class="space-y-3">
          <label class="block text-sm font-medium text-gray-700">Default Export Formats</label>
          
          <label class="relative flex items-start">
            <input
              type="checkbox"
              v-model="form.exportFormats.pdf"
              class="h-4 w-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <div class="ml-3">
              <span class="block text-sm font-medium text-gray-900">PDF Format</span>
              <span class="block text-sm text-gray-500">Professional document format with styling</span>
            </div>
          </label>

          <label class="relative flex items-start">
            <input
              type="checkbox"
              v-model="form.exportFormats.csv"
              class="h-4 w-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <div class="ml-3">
              <span class="block text-sm font-medium text-gray-900">CSV Format</span>
              <span class="block text-sm text-gray-500">Raw data format for spreadsheet analysis</span>
            </div>
          </label>

          <label class="relative flex items-start">
            <input
              type="checkbox"
              v-model="form.exportFormats.excel"
              class="h-4 w-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <div class="ml-3">
              <span class="block text-sm font-medium text-gray-900">Excel Format</span>
              <span class="block text-sm text-gray-500">Formatted spreadsheet with calculations</span>
            </div>
          </label>
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
  name: "ReportingSettings",
  data() {
    return {
      lastUpdated: new Date().toLocaleDateString(),
      showNewTemplateForm: false,
      editingTemplate: null,
      form: {
        reportTemplates: [
          {
            id: 1,
            name: "User Activity Report",
            description: "Comprehensive overview of platform user engagement",
            metrics: ["user_logins", "active_users", "new_registrations"]
          },
          {
            id: 2,
            name: "Revenue Analytics",
            description: "Financial performance and subscription metrics",
            metrics: ["total_revenue", "subscription_growth", "churn_rate"]
          }
        ],
        retentionPeriod: "1",
        exportFormats: {
          pdf: true,
          csv: true,
          excel: false
        }
      },
      newTemplate: {
        name: "",
        description: "",
        metrics: []
      },
      availableMetrics: [
        { value: "user_logins", label: "User Logins" },
        { value: "active_users", label: "Active Users" },
        { value: "new_registrations", label: "New Registrations" },
        { value: "total_revenue", label: "Total Revenue" },
        { value: "subscription_growth", label: "Subscription Growth" },
        { value: "churn_rate", label: "Churn Rate" },
        { value: "job_postings", label: "Job Postings" },
        { value: "applications", label: "Job Applications" }
      ],
      defaultForm: null
    };
  },
  mounted() {
    this.defaultForm = JSON.parse(JSON.stringify(this.form));
  },
  methods: {
    editTemplate(template) {
      this.editingTemplate = template;
      this.newTemplate = { ...template };
      this.showNewTemplateForm = true;
    },
    async saveTemplate() {
      try {
        if (!this.newTemplate.name) {
          throw new Error("Template name is required");
        }

        if (!this.newTemplate.description) {
          throw new Error("Template description is required");
        }

        if (this.newTemplate.metrics.length === 0) {
          throw new Error("Please select at least one metric");
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (this.editingTemplate) {
          // Update existing template
          const index = this.form.reportTemplates.findIndex(t => t.id === this.editingTemplate.id);
          this.form.reportTemplates[index] = {
            ...this.newTemplate,
            id: this.editingTemplate.id
          };
          
          this.$toast({
            title: "Template Updated",
            description: "Report template has been successfully updated.",
            variant: "success",
            duration: 3000
          });
        } else {
          // Add new template
          this.form.reportTemplates.push({
            ...this.newTemplate,
            id: Date.now()
          });
          
          this.$toast({
            title: "Template Created",
            description: "New report template has been created.",
            variant: "success",
            duration: 3000
          });
        }

        this.closeTemplateForm();
      } catch (error) {
        this.$toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
          duration: 3000
        });
      }
    },

    closeTemplateForm() {
      this.showNewTemplateForm = false;
      this.editingTemplate = null;
      this.newTemplate = {
        name: "",
        description: "",
        metrics: []
      };
    },

    confirmDeleteTemplate(template) {
      if (confirm("Are you sure you want to delete this template? This action cannot be undone.")) {
        this.deleteTemplate(template);
      }
    },

    async deleteTemplate(template) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const index = this.form.reportTemplates.findIndex(t => t.id === template.id);
        this.form.reportTemplates.splice(index, 1);
        
        this.$toast({
          title: "Template Deleted",
          description: "Report template has been successfully deleted.",
          variant: "success",
          duration: 3000
        });
      } catch (error) {
        this.$toast({
          title: "Error",
          description: "Failed to delete template.",
          variant: "destructive",
          duration: 3000
        });
      }
    },

    async saveSettings() {
      try {
        // Validate settings
        if (!this.form.exportFormats.pdf && !this.form.exportFormats.csv && !this.form.exportFormats.excel) {
          throw new Error("At least one export format must be selected");
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        this.lastUpdated = new Date().toLocaleDateString();
        
        this.$toast({
          title: "Settings Updated",
          description: "Reporting settings have been successfully updated.",
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
        description: "Reporting settings have been reset to default values.",
        duration: 3000
      });
    }
  },
  watch: {
    // Watch for changes to export formats to ensure at least one is selected
    'form.exportFormats': {
      handler(newFormats) {
        const hasFormat = Object.values(newFormats).some(value => value);
        if (!hasFormat) {
          this.$toast({
            title: "Warning",
            description: "At least one export format must be selected.",
            variant: "warning",
            duration: 3000
          });
          // Default to PDF if none selected
          this.form.exportFormats.pdf = true;
        }
      },
      deep: true
    }
  }
};
</script>