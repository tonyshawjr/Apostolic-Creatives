<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold text-gray-800">Admin Dashboard Overview</h1>

    <!-- Loading/Error States -->
    <div v-if="loading" class="text-center text-gray-500">Loading...</div>
    <div v-else-if="error" class="text-center text-red-600">Failed to load data. Please try again later.</div>
    <div v-else>
      <!-- Summary Metrics -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <!-- Total Active Creatives -->
        <div class="bg-white shadow-xl rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
          <h2 class="text-lg font-medium text-gray-600">Active Creatives</h2>
          <p class="text-3xl font-bold text-green-600">{{ metrics.activeCreatives }}</p>
          <a href="/admin/active-creatives" class="text-sm text-blue-500 underline hover:text-blue-700">View Active
            Creatives</a>
        </div>

        <!-- Total Inactive Creatives -->
        <div class="bg-white shadow-xl rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
          <h2 class="text-lg font-medium text-gray-600">Inactive Creatives</h2>
          <p class="text-3xl font-bold text-yellow-600">{{ metrics.inactiveCreatives }}</p>
          <a href="/admin/inactive-creatives" class="text-sm text-blue-500 underline hover:text-blue-700">View Inactive
            Creatives</a>
        </div>

        <!-- Open Job Listings -->
        <div class="bg-white shadow-xl rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
          <h2 class="text-lg font-medium text-gray-600">Open Job Listings</h2>
          <p class="text-3xl font-bold text-blue-600">{{ metrics.openJobs }}</p>
          <a href="/admin/job-listings" class="text-sm text-blue-500 underline hover:text-blue-700">View Job
            Listings</a>
        </div>

        <!-- Pending Verifications -->
        <div class="bg-white shadow-xl rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
          <h2 class="text-lg font-medium text-gray-600">Pending Verifications</h2>
          <p class="text-3xl font-bold text-red-600">{{ metrics.pendingVerifications }}</p>
          <a href="/admin/verifications" class="text-sm text-blue-500 underline hover:text-blue-700">View
            Verifications</a>
        </div>
      </div>

      <!-- Platform Activity and Income Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <!-- Platform Activity Chart (3/4 width) -->
        <div class="bg-white shadow-xl rounded-lg p-6 md:col-span-3">
          <h2 class="text-lg font-medium text-gray-600">Platform Activity</h2>
          <div class="h-64 sm:h-80 md:h-96 lg:h-64">
            <canvas id="platformActivityChart"></canvas>
          </div>
        </div>

        <!-- Income Metrics (1/4 width) -->
        <div class="flex flex-col space-y-4">
          <!-- MTD Income -->
          <div class="bg-white shadow-xl rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <h2 class="text-lg font-medium text-gray-600">MTD Income</h2>
            <p class="text-3xl font-bold text-purple-600">${{ metrics.mtdIncome }}</p>
          </div>

          <!-- YTD Income -->
          <div class="bg-white shadow-xl rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <h2 class="text-lg font-medium text-gray-600">YTD Income</h2>
            <p class="text-3xl font-bold text-purple-600">${{ metrics.ytdIncome }}</p>
          </div>
        </div>
      </div>

      <!-- Tables Section -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <!-- Jobs Pending Approval Table -->
        <div class="bg-white shadow-xl rounded-lg p-6 md:col-span-3">
          <h2 class="text-lg font-medium text-gray-600 mb-4">Jobs Pending Approval</h2>
          <div class="overflow-x-auto">
            <table class="w-full table-auto border-collapse">
              <thead>
                <tr class="bg-gray-100 border-b">
                  <th class="px-4 py-2 text-left text-sm text-gray-600" scope="col">Role/Job Title</th>
                  <th class="px-4 py-2 text-left text-sm text-gray-600" scope="col">Church</th>
                  <th class="px-4 py-2 text-left text-sm text-gray-600" scope="col">Location</th>
                  <th class="px-4 py-2 text-left text-sm text-gray-600" scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="job in pendingJobs" :key="job.id" class="border-t even:bg-gray-50">
                  <td class="px-4 py-2">{{ job.title }}</td>
                  <td class="px-4 py-2">{{ job.church }}</td>
                  <td class="px-4 py-2">{{ job.location }}</td>
                  <td class="px-4 py-2 space-x-2">
                    <button class="button text-blue-600 hover:text-blue-800">View</button>
                    <button class="button text-green-600 hover:text-green-800">Approve</button>
                    <button class="button text-red-600 hover:text-red-800">Disapprove</button>
                  </td>

                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- Missed Payments Table -->
        <div class="bg-white shadow-xl rounded-lg p-6">
          <h2 class="text-lg font-medium text-gray-600 mb-4">Missed Payments</h2>
          <div class="overflow-x-auto">
            <table class="w-full table-auto border-collapse">
              <thead>
                <tr class="bg-gray-100 border-b">
                  <th class="px-4 py-2 text-left text-sm text-gray-600" scope="col">User</th>
                  <th class="px-4 py-2 text-left text-sm text-gray-600" scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in missedPayments" :key="user.id" class="border-t even:bg-gray-50">
                  <td class="px-4 py-2">{{ user.name }}</td>
                  <td class="px-4 py-2">
                    <button class="button text-blue-600 hover:text-blue-800">Contact</button>
                  </td>

                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-6 mt-6">
        <!-- Expiring Pastoral Recommendations Table -->
        <div class="bg-white shadow-xl rounded-lg p-6">
          <h2 class="text-lg font-medium text-gray-600 mb-4">Expiring Pastoral Recommendations</h2>
          <div class="overflow-x-auto">
            <table class="w-full table-auto border-collapse">
              <thead>
                <tr class="bg-gray-100 border-b">
                  <th class="px-4 py-2 text-left text-sm text-gray-600">Creative</th>
                  <th class="px-4 py-2 text-left text-sm text-gray-600">Church</th>
                  <th class="px-4 py-2 text-left text-sm text-gray-600">Pastor</th>
                  <th class="px-4 py-2 text-left text-sm text-gray-600">Phone</th>
                  <th class="px-4 py-2 text-left text-sm text-gray-600">Days Left</th>
                  <th class="px-4 py-2 text-left text-sm text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                <!-- Use paginatedRecommendations for proper pagination -->
                <tr v-for="recommendation in paginatedRecommendations" :key="recommendation.id"
                  class="border-t even:bg-gray-50" :class="{ 'bg-red-50': recommendation.daysLeft < 14 }">
                  <td class="px-4 py-2">{{ recommendation.creativeName }}</td>
                  <td class="px-4 py-2">{{ recommendation.churchName }}</td>
                  <td class="px-4 py-2">{{ recommendation.pastorName }}</td>
                  <td class="px-4 py-2">{{ recommendation.pastorPhone }}</td>
                  <td class="px-4 py-2 text-sm font-medium" :class="{ 'text-red-600': recommendation.daysLeft < 14 }">
                    {{ recommendation.daysLeft }} days
                  </td>
                  <td class="px-4 py-2 space-x-2">
                    <button class="button text-blue-600 hover:text-blue-800">Update</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex justify-between items-center mt-4">
            <!-- Pagination Controls -->
            <button @click="previousPage" :disabled="currentPage === 1"
              class="button px-4 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300">Previous</button>
            <span class="text-sm text-gray-600">Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages"
              class="button px-4 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300">Next</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Register necessary components
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Title);

export default {
  name: "OverviewPage",
  data() {
    return {
      loading: true,
      error: false,
      currentPage: 1, // Current page for pagination
      itemsPerPage: 5, // Number of items to show per page
      metrics: {
        activeCreatives: 0,
        inactiveCreatives: 0,
        openJobs: 0,
        pendingVerifications: 0,
        ytdIncome: 0,
        mtdIncome: 0,
      },
      pendingJobs: [],
      missedPayments: [],
      expiringRecommendations: [],
    };
  },
  computed: {
    // Sort recommendations by daysLeft ascending
    sortedRecommendations() {
      return [...this.expiringRecommendations].sort((a, b) => a.daysLeft - b.daysLeft);
    },
    // Calculate total number of pages
    totalPages() {
      return Math.ceil(this.sortedRecommendations.length / this.itemsPerPage);
    },
    // Paginate recommendations based on currentPage
    paginatedRecommendations() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.sortedRecommendations.slice(start, end);
    },
  },
  methods: {
    fetchData() {
      setTimeout(() => {
        this.metrics = {
          activeCreatives: 120,
          inactiveCreatives: 30,
          openJobs: 12,
          pendingVerifications: 5,
          ytdIncome: 50000,
          mtdIncome: 5000,
        };
        this.pendingJobs = [
          { id: 1, title: "Choir Director", church: "First Apostolic Church", location: "Houston, TX" },
          { id: 2, title: "Drummer", church: "Pentecostal Tabernacle", location: "New York, NY" },
        ];
        this.missedPayments = [
          { id: 1, name: "John Doe" },
          { id: 2, name: "Jane Smith" },
        ];
        this.expiringRecommendations = [
          {
            id: 1,
            creativeName: "John Doe",
            churchName: "Apostolic Faith Assembly",
            pastorName: "General Smith",
            pastorPhone: "555-123-4567",
            daysLeft: 10,
          },
          {
            id: 2,
            creativeName: "Jane Smith",
            churchName: "Pentecostal Lighthouse Church",
            pastorName: "John Johnson",
            pastorPhone: "555-987-6543",
            daysLeft: 5,
          },
          {
            id: 3,
            creativeName: "Michael Brown",
            churchName: "New Life Apostolic Church",
            pastorName: "Ted Davis",
            pastorPhone: "555-456-7890",
            daysLeft: 20,
          },
          {
            id: 4,
            creativeName: "Sarah Wilson",
            churchName: "True Gospel Assembly",
            pastorName: "Greg Williams",
            pastorPhone: "555-654-3210",
            daysLeft: 30,
          },
          {
            id: 5,
            creativeName: "Emily Taylor",
            churchName: "Living Waters Apostolic Center",
            pastorName: "Jose Martinez",
            pastorPhone: "555-789-1234",
            daysLeft: 28,
          },
          {
            id: 6,
            creativeName: "Chris Green",
            churchName: "Faith Temple Apostolic",
            pastorName: "Tim Lee",
            pastorPhone: "555-321-6547",
            daysLeft: 15,
          },
        ];
        this.loading = false;
        this.$nextTick(() => this.renderChart());
      }, 1000);
    },
    // Handle Next Page
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    // Handle Previous Page
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    renderChart() {
  const chartCanvas = document.getElementById("platformActivityChart");
  if (!chartCanvas) return;

  const ctx = chartCanvas.getContext("2d");

  // Generate realistic data for the past six months
  const currentDate = new Date();
  const months = [];
  const inactiveCreativesData = [];
  const openRolesData = [];

  for (let i = 5; i >= 0; i--) {
    const month = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    months.push(month.toLocaleString("default", { month: "long" }));

    // Simulated data for inactive creatives and open roles
    inactiveCreativesData.push(Math.floor(Math.random() * 15) + 20); // Between 20-35
    openRolesData.push(Math.floor(Math.random() * 10) + 5);         // Between 5-15
  }

  // Use the dynamic metrics for the current month
  inactiveCreativesData[5] = this.metrics.inactiveCreatives; // Current month's data
  openRolesData[5] = this.metrics.openJobs;                 // Current month's data

  new Chart(ctx, {
    type: "line",
    data: {
      labels: months,
      datasets: [
        {
          label: "Inactive Creatives",
          data: inactiveCreativesData,
          borderColor: "#7C3AED",
          backgroundColor: "rgba(124, 58, 237, 0.2)",
        },
        {
          label: "Open Roles",
          data: openRolesData,
          borderColor: "#F59E0B",
          backgroundColor: "rgba(245, 158, 11, 0.2)",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Recent Platform Activity (Last 6 Months)",
          font: { size: 18 },
          color: "#4B5563",
          padding: 20,
        },
        legend: {
          labels: {
            color: "#4B5563",
          },
        },
      },
      scales: {
        x: {
          grid: {
            color: "#E5E7EB", // Light gridlines for the x-axis
          },
          ticks: {
            color: "#4B5563",
          },
        },
        y: {
          grid: {
            color: "#E5E7EB", // Light gridlines for the y-axis
          },
          ticks: {
            color: "#4B5563",
          },
        },
      },
    },
  });
}

  },
  mounted() {
    try {
      this.fetchData();
    } catch {
      this.error = true;
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.h-64 {
  height: 16rem;
  /* Fixed height for the chart */
}

.overflow-x-auto {
  overflow-x: auto;
  /* Make tables scrollable horizontally on small screens */
}

.button {
  padding: 6px 12px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.button:hover {
  background-color: #f1f1f1;
}
</style>