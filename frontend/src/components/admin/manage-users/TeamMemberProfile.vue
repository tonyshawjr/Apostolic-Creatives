<template>
    <div class="space-y-6">
      <template v-if="profile">
        <!-- Page Header -->
        <h1 class="text-2xl font-bold text-gray-800">Profile Overview</h1>
  
        <!-- Profile Details Section -->
        <div class="bg-white shadow-sm rounded-lg p-6">
          <div class="flex flex-wrap md:flex-nowrap items-center space-y-4 md:space-y-0 md:space-x-6">
            <!-- Profile Picture -->
            <div class="flex-shrink-0">
              <img
                :src="profile.photo || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
                alt="Profile Photo"
                class="w-24 h-24 md:w-32 md:h-32 border border-gray-200 shadow-sm object-cover rounded-full" />
            </div>
  
            <!-- Profile Info -->
            <div class="flex-1">
              <h2 class="text-2xl font-bold text-gray-800">{{ profile.name }}</h2>
              <p class="text-gray-600">{{ profile.location }}</p>
              <p class="text-sm text-gray-500">Member since {{ profile.memberSince }}</p>
              <span v-if="profile.verified"
                class="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                Verified
              </span>
            </div>
  
            <!-- Action Buttons -->
            <div class="ml-auto text-right space-y-4">
              <div class="space-x-4">
                <button
                  class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  @click="navigateToEditProfile">
                  Edit Profile
                </button>
                <button
                  class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  @click="deactivateUser">
                  Deactivate
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Two-Column Layout -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          <!-- Left Column -->
          <div class="md:col-span-4 space-y-6">
            <!-- Contact Details Section -->
            <div class="bg-white shadow-sm rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-800">Contact Details</h3>
              <p class="text-gray-600 mt-4"><strong>Email:</strong> {{ profile.email }}</p>
              <p class="text-gray-600"><strong>Phone:</strong> {{ profile.phonenumber }}</p>
              <p v-if="profile.address" class="text-gray-600"><strong>Address:</strong> {{ profile.address }}</p>
              <p v-if="profile.homeChurch" class="text-gray-600"><strong>Home Church:</strong> {{ profile.homeChurch }}
              </p>
              <p v-if="profile.pastorName" class="text-gray-600"><strong>Pastor:</strong> {{ profile.pastorName }}</p>
              <p v-if="profile.pastorContact" class="text-gray-600"><strong>Pastor Contact:</strong> {{
                profile.pastorContact }}</p>
            </div>
  
            <!-- Skills Section -->
            <div class="bg-white shadow-sm rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-800">Skills</h3>
              <div class="flex flex-wrap gap-2 mt-4">
                <span v-for="skill in profile.skills" :key="skill"
                  class="px-3 py-1 bg-gray-200 text-sm font-medium text-gray-700 rounded-full">
                  {{ skill }}
                </span>
              </div>
            </div>
  
            <!-- Social Links Section -->
            <div class="bg-white shadow-sm rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-800">Social Links</h3>
              <ul class="mt-4 space-y-2">
                <li v-if="profile.social.website">
                  <a :href="profile.social.website" target="_blank" class="text-blue-600 hover:underline">
                    Website
                  </a>
                </li>
                <li v-if="profile.social.instagram">
                  <a :href="profile.social.instagram" target="_blank" class="text-blue-600 hover:underline">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
            <!-- Pastoral Recommendation Section -->
            <div class="bg-white shadow-sm rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-800">Pastoral Recommendation</h3>
              <p class="mt-2 text-gray-700">
                You have a recommendation from
                <span class="font-semibold">{{ profile.pastoralRecommendation.pastorName }}</span>
                at
                <span class="font-semibold">{{ profile.pastoralRecommendation.churchName }}</span>.
              </p>
              <p class="text-sm text-gray-500 mt-1">
                Expires in {{ profile.pastoralRecommendation.expiryDays }} days.
              </p>
              <button
                class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                View Recommendation
              </button>
            </div>
          </div>
  
          <!-- Right Column -->
          <div class="md:col-span-8 space-y-6">
            <!-- Biography Section -->
            <div class="bg-white shadow-sm rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-800">Biography</h3>
              <p class="mt-4 text-gray-700 leading-relaxed">
                {{ profile.bio }}
              </p>
            </div>
  
            <!-- Experience Section -->
            <div class="bg-white shadow-sm rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-800">Experience</h3>
              <ul class="mt-4 space-y-6">
                <li v-for="experience in profile.experience" :key="experience.churchName"
                  class="bg-gray-50 p-4 rounded-lg shadow">
                  <h4 class="text-md font-semibold text-gray-800">{{ experience.churchName }}</h4>
                  <ul class="mt-2 space-y-4 pl-4 border-l-2 border-gray-200">
                    <li v-for="role in experience.roles" :key="role.title" class="space-y-2">
                      <div class="flex justify-between">
                        <span class="text-sm font-medium text-gray-700">{{ role.title }}</span>
                        <span class="text-sm text-gray-500">{{ role.date }}</span>
                      </div>
                      <p class="text-sm text-gray-600 leading-relaxed">{{ role.description }}</p>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="bg-white shadow-sm rounded-lg p-6 text-center">
          <h2 class="text-2xl font-bold text-gray-800">Account Not Available</h2>
          <p class="text-gray-600 mt-4">The profile you are trying to view does not exist or is unavailable.</p>
        </div>
      </template>
    </div>
  </template>
  
  <script>
  export default {
    name: "TeamMemberProfile",
    data() {
      return {
        profile: null, // Default to null
      };
    },
    created() {
      const userId = parseInt(this.$route.params.id, 10); // Get user ID from route
      this.loadProfile(userId);
    },
    methods: {
      loadProfile(userId) {
        // Mock data for user ID 1
        if (userId === 5) {
          this.profile = {
            name: "Tony Shaw",
            location: "Wilmington, NC",
            address: "123 Church Street, Wilmington, NC 28401",
            phonenumber: "555-123-4567",
            email: "tony.shaw@apostoliccreatives.com",
            memberSince: "May 2018",
            homeChurch: "Apostolic Tabernacle",
            pastorName: "Evan Grizzle",
            pastorContact: "555-123-4567",
            verified: true,
            bio: "Tony Shaw is a multi-talented worship leader and creative professional with over 15 years of experience. Having served in multiple roles, Tony specializes in building dynamic music teams, mentoring youth, and leveraging social media to expand ministry reach. His passion for excellence and dedication to apostolic values drive his success in every project. Outside of ministry, Tony enjoys web design and exploring innovative ways to combine technology and faith.",
            skills: ["Drums", "Piano", "Music Director", "Web Design", "Social Media"],
            pastoralRecommendation: {
              pastorName: "Evan Grizzle",
              churchName: "Apostolic Tabernacle",
              expiryDays: 105,
            },
            experience: [
              {
                churchName: "Apostolic Tabernacle",
                roles: [
                  {
                    title: "Worship Leader",
                    date: "September 2020 - Present",
                    description:
                      "Led worship services, organized music teams, and coordinated church events. Spearheaded efforts to bring modern worship into traditional church settings while upholding apostolic values. Worked on recruiting, training, and mentoring musicians to enhance the quality of worship experiences.",
                  },
                ],
              },
              {
                churchName: "First Pentecostal",
                roles: [
                  {
                    title: "Youth Pastor",
                    date: "June 2008 - August 2020",
                    description: "Directed youth programs, organized creative arts workshops, and provided spiritual mentorship to teens and young adults. Developed summer programs focusing on personal growth and spiritual enrichment. Worked closely with the church leadership to align youth ministry goals with the broader mission of the church.",
                  },
                  {
                    title: "Music Director",
                    date: "January 2015 - August 2020",
                    description: "Oversaw the church's music department, directed choirs, and organized special music events. Implemented training sessions for musicians to improve technical skills and ensure spiritual alignment with the church's mission.",
                  },
                ],
              },
            ],
            social: { website: "https://tonyj.me", instagram: "https://instagram.com/tony" },
          };
        } else {
          this.profile = null; // No profile for other user IDs
        }
      },
      navigateToEditProfile() {
        this.$router.push("/dashboard/profile/edit");
      },
      deactivateUser() {
        if (confirm(`Are you sure you want to deactivate ${this.profile.name}?`)) {
          console.log(`Deactivated user: ${this.profile.name}`);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  button:focus {
    outline: 2px solid transparent;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
  }
  </style>
  