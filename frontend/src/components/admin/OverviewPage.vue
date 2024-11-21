<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section with Stats Summary -->
    <div class="space-y-4 sm:space-y-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
        <div class="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            class="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-gray-200 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2"
            @click="fetchData">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
          <button
            class="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-800 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span class="hidden sm:inline">Export Report</span>
            <span class="sm:hidden">Export</span>
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <div v-for="i in 4" :key="i" class="animate-pulse bg-white rounded-lg p-3 sm:p-6 shadow-sm">
          <div class="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div class="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-6">
        <div class="flex items-center gap-3 text-red-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Failed to load dashboard data</span>
        </div>
        <button @click="fetchData"
          class="mt-4 px-3 sm:px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors">
          Retry Loading Data
        </button>
      </div>

      <div v-else class="space-y-4 sm:space-y-6">
        <!-- Metrics Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-6">
          <MetricsCard title="Active Creatives" :value="metrics.activeCreatives" link="/admin/active-creatives"
            color="green">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </template>
          </MetricsCard>

          <MetricsCard title="Inactive" :value="metrics.inactiveCreatives" link="/admin/inactive-creatives"
            color="yellow" />
          <MetricsCard title="Open Jobs" :value="metrics.openJobs" link="/admin/jobs" color="blue" />
          <MetricsCard title="Pending" :value="metrics.pendingVerifications" link="/admin/verifications" color="purple" />
        </div>

        <!-- Chart and Income Section -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-6">
          <!-- Platform Activity Chart -->
          <div class="lg:col-span-3 bg-white rounded-lg shadow-sm p-3 sm:p-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-4 sm:mb-6">
              <h3 class="text-base sm:text-lg font-medium text-gray-900">Creative Supply vs Job Demand</h3>
              <div class="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                <div class="flex items-center">
                  <span class="h-3 w-3 rounded-full bg-amber-400 mr-1"></span>
                  <span class="text-gray-600">{{ metrics.inactiveCreatives }} Inactive</span>
                </div>
                <div class="flex items-center">
                  <span class="h-3 w-3 rounded-full bg-blue-500 mr-1"></span>
                  <span class="text-gray-600">{{ metrics.openJobs }} Open Jobs</span>
                </div>
              </div>
            </div>
            <div class="h-64 sm:h-80">
              <canvas id="platformActivityChart"></canvas>
            </div>
            <div class="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 text-center">
              Showing data for the last 4 months
            </div>
          </div>

          <!-- Income Stats -->
          <div class="space-y-3 sm:space-y-6">
            <!-- MTD Income -->
            <div class="bg-white rounded-lg shadow-sm p-3 sm:p-6 border border-gray-100">
              <h3 class="text-sm sm:text-base text-gray-600 font-medium">MTD Income</h3>
              <p class="text-2xl sm:text-3xl font-bold text-gray-900 mt-2 sm:mt-4">
                ${{ metrics.mtdIncome.toLocaleString() }}</p>
              <div class="mt-2 sm:mt-4 flex items-center text-xs sm:text-sm text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span class="ml-1">8.2% vs last month</span>
              </div>
            </div>

            <!-- YTD Income -->
            <div class="bg-white rounded-lg shadow-sm p-3 sm:p-6 border border-gray-100">
              <h3 class="text-sm sm:text-base text-gray-600 font-medium">YTD Income</h3>
              <p class="text-2xl sm:text-3xl font-bold text-gray-900 mt-2 sm:mt-4">
                ${{ metrics.ytdIncome.toLocaleString() }}</p>
              <div class="mt-2 sm:mt-4 flex items-center text-xs sm:text-sm text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span class="ml-1">12.5% vs last year</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Pending Job Listings -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-6">
          <!-- Pending Jobs Table -->
          <div class="lg:col-span-3 bg-white rounded-lg shadow-sm p-3 sm:p-6">
            <div class="flex items-center justify-between mb-4 sm:mb-6">
              <h3 class="text-base sm:text-lg font-medium text-gray-900">Pending Job Listings</h3>
              <button class="text-sm text-purple-600 hover:text-purple-700 font-medium">View All Jobs</button>
            </div>
            <div class="overflow-x-auto -mx-3 sm:-mx-6">
              <div class="inline-block min-w-full align-middle p-3 sm:p-6">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position
                      </th>
                      <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Church
                      </th>
                      <th class="hidden sm:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="job in pendingJobs" :key="job.id">
                      <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">{{ job.title }}</div>
                        <div class="text-xs sm:text-sm text-gray-500">Posted {{ job.posted }}</div>
                      </td>
                      <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ job.church }}</div>
                      </td>
                      <td class="hidden sm:table-cell px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ job.location }}</div>
                      </td>
                      <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="{
                          'bg-green-100 text-green-800': job.type === 'Full-time',
                          'bg-blue-100 text-blue-800': job.type === 'Part-time',
                          'bg-yellow-100 text-yellow-800': job.type === 'Contract'
                        }">
                          {{ job.type }}
                        </span>
                      </td>
                      <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                        <button class="text-green-600 hover:text-green-900 mr-3"
                          @click="approveJob(job.id)">Approve</button>
                        <button class="text-red-600 hover:text-red-900" @click="rejectJob(job.id)">Reject</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Recent Activity Feed -->
          <div class="bg-white rounded-lg shadow-sm p-3 sm:p-6">
            <h3 class="text-base sm:text-lg font-medium text-gray-900 mb-4 sm:mb-6">Recent Activity</h3>
            <div class="space-y-3 sm:space-y-4">
              <ActivityItem v-for="activity in recentActivity" :key="activity.id" :bgColor="activity.bgColor"
                :iconColor="activity.iconColor" :iconPath="activity.icon" :message="activity.message"
                :time="activity.time" />
            </div>
          </div>
        </div>

        <!-- Expiring Recommendations Table -->
        <div class="bg-white rounded-lg shadow-sm p-3 sm:p-6">
          <div class="flex items-center justify-between mb-4 sm:mb-6">
            <h3 class="text-base sm:text-lg font-medium text-gray-900">Expiring Pastoral Recommendations</h3>
            <button class="text-sm text-purple-600 hover:text-purple-700 font-medium">View All</button>
          </div>

          <div class="overflow-x-auto -mx-3 sm:-mx-6">
            <div class="inline-block min-w-full align-middle p-3 sm:p-6">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Creative
                    </th>
                    <th class="hidden sm:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Church
                    </th>
                    <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pastor
                    </th>
                    <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Days Left
                    </th>
                    <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="rec in paginatedRecommendations" :key="rec.id" :class="{ 'bg-red-50': rec.daysLeft < 14 }">
                    <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ rec.creativeName }}</div>
                    </td>
                    <td class="hidden sm:table-cell px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ rec.churchName }}</div>
                    </td>
                    <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ rec.pastorName }}</div>
                      <div class="text-xs sm:text-sm text-gray-500">{{ rec.pastorPhone }}</div>
                    </td>
                    <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="{
                        'bg-red-100 text-red-800': rec.daysLeft < 14,
                        'bg-yellow-100 text-yellow-800': rec.daysLeft >= 14 && rec.daysLeft < 30,
                        'bg-green-100 text-green-800': rec.daysLeft >= 30
                      }">
                        {{ rec.daysLeft }} days
                      </span>
                    </td>
                    <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                      <button class="text-indigo-600 hover:text-indigo-900 mr-3"
                        @click="handleUpdate(rec.id)">Update</button>
                      <button class="text-purple-600 hover:text-purple-900" @click="sendReminder(rec.id)">
                        <span class="hidden sm:inline">Send Reminder</span>
                        <span class="sm:hidden">Remind</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Pagination -->
          <div class="flex items-center justify-between mt-4 sm:mt-6">
            <div class="flex-1 flex justify-between sm:hidden">
              <button @click="previousPage" :disabled="currentPage === 1"
                class="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }">
                Previous
              </button>
              <button @click="nextPage" :disabled="currentPage === totalPages"
                class="ml-3 relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }">
                Next
              </button>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Showing page {{ currentPage }} of {{ totalPages }}
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button @click="previousPage" :disabled="currentPage === 1"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Previous
                  </button>
                  <button @click="nextPage" :disabled="currentPage === totalPages"
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MetricsCard from '@/components/cards/MetricsCard.vue';
import ActivityItem from '@/components/cards/ActivityItem.vue';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  name: 'AdminDashboard',
  data() {
    return {
      loading: true,
      error: false,
      chartTimeframe: '6',
      currentPage: 1,
      itemsPerPage: 5,
      chart: null,
      metrics: {
        activeCreatives: 0,
        inactiveCreatives: 0,
        openJobs: 0,
        pendingVerifications: 0,
        mtdIncome: 0,
        ytdIncome: 0
      },
      paginatedRecommendations: [],
      pendingJobs: [
        {
          id: 1,
          title: "Worship Leader",
          church: "First Apostolic Church",
          location: "Houston, TX",
          type: "Full-time",
          posted: "2 days ago"
        },
        {
          id: 2,
          title: "Sound Engineer",
          church: "Grace Community Church",
          location: "Dallas, TX",
          type: "Part-time",
          posted: "3 days ago"
        },
        {
          id: 3,
          title: "Youth Pastor",
          church: "Life Assembly",
          location: "Austin, TX",
          type: "Full-time",
          posted: "1 day ago"
        },
        {
          id: 4,
          title: "Media Director",
          church: "Faith Chapel",
          location: "San Antonio, TX",
          type: "Contract",
          posted: "5 days ago"
        }
      ],
      recentActivity: [
        {
          id: 1,
          message: "New job posted by Life Assembly",
          time: "5 minutes ago",
          bgColor: "bg-blue-100",
          iconColor: "text-blue-600",
          icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        },
        {
          id: 2,
          message: "John Smith verification approved",
          time: "10 minutes ago",
          bgColor: "bg-green-100",
          iconColor: "text-green-600",
          icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        },
        {
          id: 3,
          message: "New creative profile created",
          time: "1 hour ago",
          bgColor: "bg-purple-100",
          iconColor: "text-purple-600",
          icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
        }
      ]
    };
  },
  components: {
    MetricsCard,
    ActivityItem,
  },
  computed: {
    totalPages() {
      return Math.ceil(this.paginatedRecommendations.length / this.itemsPerPage);
    }
  },
  methods: {
    async fetchData() {
      this.loading = true;
      this.error = false;

      try {
        // Simulated API call
        setTimeout(() => {
          this.metrics = {
            activeCreatives: 120,
            inactiveCreatives: 35,
            openJobs: 15,
            pendingVerifications: 8,
            mtdIncome: 5234,
            ytdIncome: 45234
          };

          this.paginatedRecommendations = [
            {
              id: 1,
              creativeName: "John Doe",
              churchName: "First Church",
              pastorName: "Pastor Smith",
              pastorPhone: "(555) 123-4567",
              daysLeft: 10
            },
            {
              id: 2,
              creativeName: "Jane Smith",
              churchName: "Grace Community",
              pastorName: "Pastor Johnson",
              pastorPhone: "(555) 987-6543",
              daysLeft: 15
            },
            {
              id: 3,
              creativeName: "Mike Wilson",
              churchName: "Life Assembly",
              pastorName: "Pastor Brown",
              pastorPhone: "(555) 246-8135",
              daysLeft: 30
            }
          ];

          this.loading = false;
          this.$nextTick(() => {
            this.initChart();
          });
        }, 1500);
      } catch (err) {
        this.error = true;
        this.loading = false;
        console.error('Error fetching dashboard data:', err);
      }
    },
    initChart() {
      if (this.chart) {
        this.chart.destroy();
      }

      const canvas = document.getElementById('platformActivityChart');
      if (!canvas) {
        console.error('Canvas element not found');
        return;
      }

      const ctx = canvas.getContext('2d');

      // Get current month and previous 3 months
      const months = [];
      const currentDate = new Date();
      for (let i = 3; i >= 0; i--) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        months.push(date.toLocaleString('default', { month: 'short' }));
      }

      // Starting with current inactive creatives and open jobs
      const inactiveCreatives = [28, 31, 33, 35]; // ending with current (35)
      const openJobs = [12, 13, 14, 15]; // ending with current (15)

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: months,
          datasets: [
            {
              label: 'Inactive Creatives',
              data: inactiveCreatives,
              backgroundColor: 'rgba(251, 191, 36, 0.8)',
              borderColor: 'rgb(251, 191, 36)',
              borderWidth: 1,
              borderRadius: 4,
              order: 2
            },
            {
              label: 'Open Jobs',
              data: openJobs,
              backgroundColor: 'rgba(59, 130, 246, 0.8)',
              borderColor: 'rgb(59, 130, 246)',
              borderWidth: 1,
              borderRadius: 4,
              order: 1
            },
            {
              label: 'Supply vs Demand Gap',
              data: inactiveCreatives.map((inactive, index) => inactive - openJobs[index]),
              type: 'line',
              borderColor: 'rgb(220, 38, 38)',
              borderWidth: 2,
              fill: false,
              tension: 0.4,
              order: 0,
              yAxisID: 'gap'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: false,
              text: 'Supply (Inactive Creatives) vs Demand (Open Jobs)',
              color: '#1f2937',
              font: {
                size: 16,
                weight: 'bold'
              },
              padding: 20
            },
            legend: {
              position: 'top',
              labels: {
                usePointStyle: true,
                padding: 20,
                font: {
                  size: 12
                }
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              callbacks: {
                label: function (context) {
                  if (context.dataset.label === 'Supply vs Demand Gap') {
                    const value = context.raw;
                    return `Gap: ${value > 0 ? '+' : ''}${value} creatives`;
                  }
                  return `${context.dataset.label}: ${context.raw}`;
                }
              }
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                borderDash: [2, 4],
                color: '#e5e7eb'
              },
              title: {
                display: true,
                text: 'Number of Creatives/Jobs'
              }
            },
            gap: {
              position: 'right',
              beginAtZero: true,
              grid: {
                display: false
              },
              title: {
                display: true,
                text: 'Supply/Demand Gap'
              }
            }
          }
        }
      });
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
    },
    handleUpdate(id) {
      console.log('Update recommendation:', id);
    },
    sendReminder(id) {
      console.log('Send reminder for:', id);
    },
    approveJob(id) {
      this.pendingJobs = this.pendingJobs.filter(job => job.id !== id);
    },
    rejectJob(id) {
      this.pendingJobs = this.pendingJobs.filter(job => job.id !== id);
    }
  },
  mounted() {
    this.fetchData();
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
};
</script>

<style scoped>
.button {
  @apply px-3 py-1 rounded-md transition-colors duration-200;
}
</style>