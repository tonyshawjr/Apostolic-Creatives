<template>
    <div>
      <h3 class="text-2xl font-semibold text-gray-800 mb-6">Reporting Settings</h3>
  
      <div class="space-y-6">
        <!-- Predefined Report Templates -->
        <div class="rounded-lg bg-white shadow-md p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-4">Predefined Report Templates</h4>
          <div class="space-y-4">
            <ul class="space-y-2">
              <li
                v-for="(template, index) in form.reportTemplates"
                :key="template.id"
                class="flex justify-between items-center border border-gray-300 rounded-md p-4"
              >
                <div>
                  <p class="text-lg font-medium text-gray-800">{{ template.name }}</p>
                  <p class="text-sm text-gray-600">{{ template.description }}</p>
                </div>
                <div class="flex space-x-2">
                  <button
                    @click="editTemplate(index)"
                    class="rounded-md bg-blue-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteTemplate(index)"
                    class="rounded-md bg-red-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            </ul>
            <!-- Add New Template -->
            <form @submit.prevent="addTemplate" class="space-y-4">
              <div>
                <label for="templateName" class="block text-sm font-medium text-gray-700">Template Name</label>
                <input
                  v-model="newTemplate.name"
                  type="text"
                  id="templateName"
                  placeholder="e.g., User Activity Report"
                  class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-4 py-2"
                />
              </div>
              <div>
                <label for="templateDescription" class="block text-sm font-medium text-gray-700">Template Description</label>
                <textarea
                  v-model="newTemplate.description"
                  id="templateDescription"
                  rows="3"
                  placeholder="Provide a brief description of the report"
                  class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-4 py-2"
                ></textarea>
              </div>
              <button
                type="submit"
                class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light"
              >
                Add Template
              </button>
            </form>
          </div>
        </div>
  
        <!-- Report Retention Period -->
        <div class="rounded-lg bg-white shadow-md p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-4">Report Retention Period</h4>
          <select
            v-model="form.retentionPeriod"
            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-4 py-2"
          >
            <option value="1">1 Year</option>
            <option value="3">3 Years</option>
            <option value="5">5 Years</option>
            <option value="10">10 Years</option>
          </select>
        </div>
  
        <!-- Default Export Formats -->
        <div class="rounded-lg bg-white shadow-md p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-4">Default Export Formats</h4>
          <div class="space-y-2">
            <div class="flex items-center space-x-4">
              <input
                type="checkbox"
                id="exportPDF"
                v-model="form.exportFormats.pdf"
                class="h-4 w-4 text-primary border-gray-300 rounded"
              />
              <label for="exportPDF" class="text-sm font-medium text-gray-700">PDF</label>
            </div>
            <div class="flex items-center space-x-4">
              <input
                type="checkbox"
                id="exportCSV"
                v-model="form.exportFormats.csv"
                class="h-4 w-4 text-primary border-gray-300 rounded"
              />
              <label for="exportCSV" class="text-sm font-medium text-gray-700">CSV</label>
            </div>
          </div>
        </div>
  
        <!-- Actions -->
        <div class="flex space-x-4">
          <button
            @click="saveSettings"
            class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light"
          >
            Save Reporting Settings
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
    name: "ReportingSettings",
    data() {
      return {
        form: {
          reportTemplates: [
            { id: 1, name: "User Activity Report", description: "Tracks user activity on the platform" },
            { id: 2, name: "Revenue Trends", description: "Provides insights into platform revenue trends" },
          ],
          retentionPeriod: "1", // Default: 1 Year
          exportFormats: {
            pdf: true,
            csv: false,
          },
        },
        newTemplate: {
          name: "",
          description: "",
        },
        defaultForm: null,
      };
    },
    mounted() {
      // Store the default form state
      this.defaultForm = JSON.parse(JSON.stringify(this.form));
    },
    methods: {
      addTemplate() {
        if (!this.newTemplate.name || !this.newTemplate.description) {
          alert("Please fill out all fields for the template.");
          return;
        }
  
        const newTemplate = { ...this.newTemplate, id: Date.now() };
        this.form.reportTemplates.push(newTemplate);
  
        // Reset the template form
        this.newTemplate = { name: "", description: "" };
        alert("Template added successfully!");
      },
      editTemplate(index) {
        const templateToEdit = this.form.reportTemplates[index];
        this.newTemplate = { ...templateToEdit }; // Load into the form
        this.form.reportTemplates.splice(index, 1); // Temporarily remove it
      },
      deleteTemplate(index) {
        this.form.reportTemplates.splice(index, 1);
        alert("Template deleted successfully!");
      },
      saveSettings() {
        console.log("Reporting settings saved:", this.form);
        alert("Reporting settings updated successfully!");
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
  