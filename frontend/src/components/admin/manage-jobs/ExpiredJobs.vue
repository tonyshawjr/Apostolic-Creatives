<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="bg-gradient-to-r from-purple-800 to-pink-600 rounded-lg shadow-lg overflow-hidden">
      <div class="px-6 py-8 sm:px-8">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-6">
          <!-- Search -->
          <div class="w-full sm:w-auto sm:flex-1 sm:max-w-xl">
            <div class="relative">
              <svg xmlns="http://www.w3.org/2000/svg"
                class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input v-model="searchTerm" @input="searchJobs" type="text" placeholder="Search Expired Jobs"
                class="w-full pl-12 pr-4 py-3 bg-white/10 text-white placeholder-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Jobs Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="hidden lg:block">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-100">
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Job Title</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Church</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Location</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Type</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Expired</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Applications</th>
              <th class="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="job in paginatedJobs" :key="job.id"
              class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <div>
                  <p @click="viewJob(job.id)"
                    class="font-medium text-gray-900 hover:text-purple-600 cursor-pointer transition-colors">
                    {{ job.title }}
                  </p>
                </div>
              </td>
              <td class="px-6 py-4 text-gray-600">{{ job.church }}</td>
              <td class="px-6 py-4 text-gray-600">{{ job.location }}</td>
              <td class="px-6 py-4">
                <span :class="[
                  job.type === 'Full-time'
                    ? 'bg-blue-50 text-blue-700 ring-blue-600/20'
                    : 'bg-purple-50 text-purple-700 ring-purple-600/20',
                  'inline-flex items-center rounded-full px-2 py-1 text-sm font-medium ring-1 ring-inset'
                ]">
                  {{ job.type }}
                </span>
              </td>
              <td class="px-6 py-4 text-gray-600">{{ job.expiredDate }}</td>
              <td class="px-6 py-4 text-gray-600">{{ job.applications }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-end gap-2">
                  <button @click="viewJob(job.id)"
                    class="p-2 text-gray-600 hover:text-purple-600 transition-colors group relative">
                    <span
                      class="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      View Job
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile List -->
      <div class="block lg:hidden divide-y divide-gray-100">
        <div v-for="job in paginatedJobs" :key="job.id" class="p-4 hover:bg-gray-50">
          <div class="text-center mb-3">
            <p @click="viewJob(job.id)" class="font-medium text-gray-900 hover:text-purple-600 cursor-pointer text-lg">
              {{ job.title }}
            </p>
            <p class="text-sm text-gray-600">{{ job.church }}</p>
            <p class="text-sm text-gray-500">{{ job.location }}</p>
          </div>

          <div class="flex justify-center mb-4">
            <span :class="[
              job.type === 'Full-time'
                ? 'bg-blue-50 text-blue-700 ring-blue-600/20'
                : 'bg-purple-50 text-purple-700 ring-purple-600/20',
              'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset'
            ]">
              {{ job.type }}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
            <button @click="viewJob(job.id)"
              class="text-purple-600 font-medium hover:text-purple-800 active:text-purple-900 py-2">
              View
            </button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-gray-100">
        <div class="flex items-center justify-between">
          <p class="text-sm text-gray-600">
            Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredJobs.length }} jobs
          </p>
          <div class="flex gap-2">
            <button @click="previousPage" :disabled="currentPage === 1"
              class="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
              Previous
            </button>
            <button @click="nextPage" :disabled="currentPage >= totalPages"
              class="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActiveJobs',

  data() {
    return {
      searchTerm: '',
      currentPage: 1,
      itemsPerPage: 20,
      jobs: [
        {
          id: 1,
          title: "Youth Pastor",
          church: "Grace Community Church",
          location: "Austin, TX",
          type: "Full-time",
          expiredDate: "2023-11-15",
          applications: 3
        },
        {
          id: 2,
          title: "Sound Technician",
          church: "New Life Fellowship",
          location: "Dallas, TX",
          type: "Part-time",
          expiredDate: "2023-11-12",
          applications: 5
        }
      ]
    }
  },

  computed: {
    filteredJobs() {
      if (!this.searchTerm) return this.jobs;

      const searchLower = this.searchTerm.toLowerCase();
      return this.jobs.filter(job =>
        job.title.toLowerCase().includes(searchLower) ||
        job.church.toLowerCase().includes(searchLower) ||
        job.location.toLowerCase().includes(searchLower)
      );
    },

    totalPages() {
      return Math.ceil(this.filteredJobs.length / this.itemsPerPage);
    },

    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage;
    },

    endIndex() {
      return Math.min(this.startIndex + this.itemsPerPage, this.filteredJobs.length);
    },

    paginatedJobs() {
      return this.filteredJobs.slice(this.startIndex, this.endIndex);
    }
  },

  methods: {
    viewJob(jobId) {
      this.$router.push(`/dashboard/manage-jobs/job/${jobId}`);
    },

    searchJobs() {
      this.currentPage = 1;
    },

    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
  }
}
</script>