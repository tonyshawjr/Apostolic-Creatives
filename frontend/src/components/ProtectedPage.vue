<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-800 to-pink-600">
    <!-- Main container -->
    <div class="flex w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden">
      <!-- Left section with the design -->
      <div class="hidden md:flex md:w-1/2 flex-col items-center justify-center p-10 bg-black text-white">
        <h1 class="text-4xl font-bold mb-6 leading-snug text-center">
          Protected Area
        </h1>
        <p class="text-sm text-gray-300 text-center">
          Only authorized users can access this page. Keep your credentials safe!
        </p>
      </div>

      <!-- Right section -->
      <div class="flex w-full md:w-1/2 flex-col items-center justify-center p-10">
        <div class="w-full max-w-md text-center">
          <h2 class="text-3xl font-semibold text-gray-800 mb-6">Welcome!</h2>
          <p class="text-gray-700 mb-6">You are logged in successfully! 🎉</p>

          <!-- Logout Button -->
          <button
            @click="logout"
            class="w-full px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProtectedPage",
  methods: {
    logout() {
      localStorage.removeItem("authToken"); // Clear authentication token
      this.$router.push("/"); // Redirect to login page
    },
  },
};
</script>

<style scoped>
/* Add additional styles if needed */
</style>
