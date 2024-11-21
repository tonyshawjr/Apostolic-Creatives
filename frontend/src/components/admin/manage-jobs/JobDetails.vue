<template>
  <div class="space-y-6">
    <div v-if="loading" class="flex justify-center items-center min-h-[60vh]">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>

    <template v-else-if="job">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-purple-800 to-pink-600 rounded-lg shadow-lg overflow-hidden">
        <div class="px-6 py-8 sm:px-8 sm:py-12">
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <!-- Job Icon -->
            <div class="relative">
              <div
                class="w-24 h-24 sm:w-32 sm:h-32 rounded-lg bg-white flex items-center justify-center border-4 border-white shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-purple-600" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4M7 12l2-2 4 4" />
                </svg>
              </div>
            </div>

            <!-- Basic Info -->
            <div class="flex-grow">
              <h1 class="text-2xl sm:text-3xl font-bold text-white mb-2">{{ job.title }}</h1>
              <div class="flex flex-wrap gap-3 text-white/90">
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {{ job.location }}
                </div>
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Posted on {{ job.postDate }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column -->
        <div class="space-y-6">
          <!-- Job Information -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-100">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Job Information</h3>
              <div class="space-y-3">
                <div>
                  <p class="text-sm font-medium text-gray-500">Church</p>
                  <p class="text-gray-900">{{ job.church }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">Employment Type</p>
                  <p class="text-gray-900">{{ job.employmentType }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">Job Type</p>
                  <p class="text-gray-900">{{ job.jobType }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">Salary</p>
                  <p class="text-gray-900">{{ job.salary }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Skills Required -->
          <div v-if="job.skills?.length" class="bg-white rounded-lg shadow-sm border border-gray-100">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Skills & Requirements</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="skill in job.skills" :key="skill"
                  class="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Job Description -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-100">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Job Description</h3>
              <div class="prose" v-html="job.description"></div>
            </div>
          </div>

          <!-- Admin Notes -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-100">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Admin Notes</h3>
              <textarea v-model="adminNotes" rows="4"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter admin notes..."></textarea>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="bg-white rounded-lg shadow-sm p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <h2 class="text-xl font-semibold text-gray-800 mb-2">Job Not Found</h2>
        <p class="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
        <button @click="$router.push('/dashboard/manage-jobs/active')"
          class="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Jobs
        </button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      job: null,
      adminNotes: '',
    };
  },
  async created() {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const jobId = this.$route.params.id;

      // Mock job data: Only ID 1 has an associated job
      if (jobId === '1') {
        this.job = {
          id: 1,
          title: 'Keyboard Player',
          church: 'First Pentecostal Church',
          location: 'Houston, TX',
          employmentType: 'Part-time',
          jobType: 'Music',
          salary: '$200 per week',
          postDate: 'June 1, 2023',
          description: `
            <p>We are seeking a talented keyboard player to join our worship team. The ideal candidate should have experience playing in a church setting and be able to read sheet music and chord charts.</p>

            <p>Responsibilities:</p>
            <ul>
              <li>Play keyboard during Sunday morning and evening services</li>
              <li>Attend weekly rehearsals</li>
              <li>Assist in selecting and arranging music</li>
              <li>Collaborate with other musicians and worship leaders</li>
            </ul>

            <p>If you have a passion for worship music and want to use your talents to serve God, we'd love to hear from you!</p>
          `,
          skills: ['Proficiency in piano', 'Ability to read chord charts', 'Team collaboration'],
        };
      } else {
        // No job found for other IDs
        this.job = null;
      }
    } catch (error) {
      console.error('Error fetching job:', error);
      this.job = null;
    } finally {
      this.loading = false;
    }
  },
};
</script>

