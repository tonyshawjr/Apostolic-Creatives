<template>
    <div v-if="user" class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800">{{ user.name }}'s Profile</h1>
        <div class="flex space-x-4">
          <button
            @click="editUser"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Edit
          </button>
          <button
            @click="deactivateUser"
            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Deactivate
          </button>
        </div>
      </div>
  
      <div class="bg-white shadow-sm rounded-lg p-6 space-y-6">
        <div class="flex items-center space-x-6">
          <img
            :src="user.photo || 'https://via.placeholder.com/150'"
            alt="Profile Picture"
            class="w-32 h-32 rounded-full border"
          />
          <div>
            <h2 class="text-xl font-bold text-gray-800">{{ user.name }}</h2>
            <p class="text-gray-600">{{ user.email }}</p>
            <p class="text-gray-500">{{ user.role }}</p>
            <div v-if="user.verified" class="text-green-600 font-semibold">Verified</div>
          </div>
        </div>
  
        <div>
          <h3 class="font-semibold text-gray-800">Skills</h3>
          <ul class="mt-2 flex flex-wrap gap-2">
            <li v-for="skill in user.skills" :key="skill" class="px-3 py-1 bg-gray-200 text-sm rounded-lg">
              {{ skill }}
            </li>
          </ul>
        </div>
  
        <div>
          <h3 class="font-semibold text-gray-800">Biography</h3>
          <p class="text-gray-700">{{ user.bio }}</p>
        </div>
  
        <div v-if="user.pastoralRecommendation">
          <h3 class="font-semibold text-gray-800">Pastoral Recommendation</h3>
          <p class="text-gray-700">
            Recommendation from <strong>{{ user.pastoralRecommendation.pastorName }}</strong>
            at <strong>{{ user.pastoralRecommendation.churchName }}</strong>.
            Expires in {{ user.pastoralRecommendation.expiryDays }} days.
          </p>
        </div>
      </div>
    </div>
  
    <div v-else>
      <p>Loading user profile...</p>
    </div>
  </template>
  
  
  <script>
  export default {
  name: "ProfileView",
  data() {
    return {
      user: null, // Start as null and fetch dynamically
    };
  },
  created() {
    const userId = this.$route.params.id;
    this.loadUser(userId);
  },
  methods: {
    async loadUser(id) {
      // Replace this with an actual API or data fetching method
      const dummyData = [
        {
          id: 1,
          name: "Yomira Gomez",
          email: "yomira.gomez@example.com",
          role: "Team Member",
          skills: ["Planning", "Organizing"],
          bio: "Yomira is a skilled project manager.",
          verified: false,
          pastoralRecommendation: null,
        },
        {
          id: 2,
          name: "Tre Tate",
          email: "tre@example.com",
          role: "Creative",
          skills: ["Drums", "Music Director"],
          bio: "Tre is a talented musician who has served in various roles.",
          verified: true,
          pastoralRecommendation: {
            pastorName: "Evan Grizzle",
            churchName: "Apostolic Tabernacle",
            expiryDays: 105,
          },
        },
      ];

      // Simulate fetching user data
      this.user = dummyData.find(user => user.id === parseInt(id));
    },
    editUser() {
      console.log("Edit user:", this.user.id);
    },
    deactivateUser() {
      if (confirm(`Are you sure you want to deactivate ${this.user.name}?`)) {
        console.log(`Deactivated user: ${this.user.id}`);
      }
    },
  },
};

  </script>
  
  <style scoped>
  /* Focus styles */
  button:focus {
    outline: 2px solid transparent;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
  }
  </style>
  