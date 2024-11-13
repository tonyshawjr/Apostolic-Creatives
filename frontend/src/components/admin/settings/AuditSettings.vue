<template>
    <div>
      <h3 class="text-2xl font-semibold text-gray-800 mb-6">Audit Logs and Activity Settings</h3>
  
      <div class="space-y-6">
        <!-- Log Retention Period -->
        <div class="rounded-lg bg-white shadow-md p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-4">Log Retention Period</h4>
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
  
        <!-- Export Logs -->
        <div class="rounded-lg bg-white shadow-md p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-4">Export Logs</h4>
          <div class="flex space-x-4">
            <button
              @click="exportLogs('pdf')"
              class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light"
            >
              Export as PDF
            </button>
            <button
              @click="exportLogs('csv')"
              class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light"
            >
              Export as CSV
            </button>
          </div>
        </div>
  
        <!-- Clear Logs -->
        <div class="rounded-lg bg-white shadow-md p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-4">Clear Logs</h4>
          <button
            @click="clearLogs"
            class="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
          >
            Clear All Logs
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AuditSettings",
    data() {
      return {
        form: {
          retentionPeriod: "1", // Default: 1 year
        },
      };
    },
    methods: {
      exportLogs(format) {
        alert(`Exporting logs as ${format.toUpperCase()}`);
      },
      clearLogs() {
        if (confirm("Are you sure you want to clear all logs? This action cannot be undone.")) {
          alert("Logs cleared successfully!");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  