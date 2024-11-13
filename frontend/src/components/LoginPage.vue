<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-800 to-pink-600">
    <!-- Main container -->
    <div class="flex w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden">
      <!-- Left section with the quote and design -->
      <div class="hidden md:flex md:w-1/2 flex-col items-center justify-center p-10 bg-black text-white">
        <h3 class="text-sm uppercase tracking-wider mb-6">A Wise Quote</h3>
        <h1 class="text-4xl font-bold mb-6 leading-snug">
          Get Everything <br />
          You Want
        </h1>
        <p class="text-sm text-gray-300">
          You can get everything you want if you work hard, trust the process, and stick to the plan.
        </p>
      </div>

      <!-- Right section for login -->
      <div class="flex w-full md:w-1/2 flex-col items-center justify-center p-10">
        <div class="w-full max-w-md">
          <h2 class="text-3xl font-semibold text-gray-800 mb-4">Welcome Back</h2>
          <p class="text-sm text-gray-500 mb-6">
            Enter your email and password to access your account.
          </p>
          <form @submit.prevent="login" class="space-y-4">
            <!-- Email Field -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input
                v-model="email"
                type="email"
                id="email"
                placeholder="Enter your email"
                class="w-full px-4 py-2 mt-1 text-gray-800 border border-gray-300 rounded-lg focus:ring focus:ring-purple-300 focus:outline-none"
                required
              />
            </div>

            <!-- Password Field -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <input
                v-model="password"
                type="password"
                id="password"
                placeholder="Enter your password"
                class="w-full px-4 py-2 mt-1 text-gray-800 border border-gray-300 rounded-lg focus:ring focus:ring-purple-300 focus:outline-none"
                required
              />
            </div>

            <!-- Error Message -->
            <p v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>

            <!-- Remember Me and Forgot Password -->
            <div class="flex justify-between items-center text-sm">
              <div>
                <label class="inline-flex items-center">
                  <input type="checkbox" class="form-checkbox h-4 w-4 text-purple-600" />
                  <span class="ml-2">Remember me</span>
                </label>
              </div>
              <a href="#" class="text-purple-600 hover:underline">Forgot Password</a>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring focus:ring-purple-300"
            >
              Sign In
            </button>

            <!-- Google Sign In -->
            <button
              type="button"
              class="w-full flex items-center justify-center px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring focus:ring-purple-300"
            >
              <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" alt="Google logo" class="h-5 mr-2" />
              Sign in with Google
            </button>
          </form>

          <!-- Footer Text -->
          <p class="text-center text-sm text-gray-500 mt-6">
            Don’t have an account? <a href="#" class="text-purple-600 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "", // Error message to display if login fails
    };
  },
  methods: {
    async login() {
      try {
        // Make a POST request to the backend
        await axios.post("http://localhost:3000/login", {
          email: this.email,
          password: this.password,
        });

        // Clear any existing error message
        this.errorMessage = "";

        // Store the authentication token in localStorage
        localStorage.setItem("authToken", "test-auth-token");

        // Redirect to the protected page
        this.$router.push("/protected");
      } catch (error) {
        // Handle errors
        if (error.response && error.response.data.error) {
          // Display error message from the backend
          this.errorMessage = error.response.data.error;
        } else {
          // Display a generic error message if something else goes wrong
          this.errorMessage = "An error occurred. Please try again.";
        }
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
