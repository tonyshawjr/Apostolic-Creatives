<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="px-6 ">
      <!-- Header -->
      <div class="flex items-center justify-between mb-12 mt-2 bg-white p-4 rounded-lg">
        <!-- Left: Avatar and Info -->
        <div class="flex items-center">
          <img :src="profile.photo || 'https://via.placeholder.com/150'" alt="Profile"
            class="w-24 h-24 rounded-lg object-cover bg-gray-200 mr-6" />
          <div>
            <h1 class="text-2xl font-bold">
              {{ profile.name }}
              <span class="text-green-600 text-sm font-medium ml-2">Verified</span>
            </h1>
            <p class="text-gray-500">{{ profile.location }}</p>
            <p class="text-gray-400 text-sm">Member since {{ profile.memberSince }}</p>
          </div>
        </div>

        <!-- Right: Edit Profile Button -->
        <router-link to="/dashboard/profile/edit">
  <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536M9 11l6.5-6.5a2.121 2.121 0 013 0l2 2a2.121 2.121 0 010 3L14 16l-5 1 1-5z" />
    </svg>
    Edit Profile
  </button>
</router-link>


      </div>

      <!-- Two-Column Layout -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
        <!-- Left Column -->
        <div class="md:col-span-4">
          <!-- Skills Section -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold">Skills</h3>
            <div class="flex flex-wrap gap-2 mt-2 bg-white p-4 rounded-lg">
              <span v-for="skill in profile.skills" :key="skill"
                class="px-3 py-1 bg-gray-200 rounded-full text-gray-700 text-sm">
                {{ skill }}
              </span>
            </div>
          </div>

          <!-- Social Links -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold">Social</h3>
            <div class="mt-2 bg-white p-4 rounded-lg">
              <ul class="space-y-2">
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
          </div>

<!-- Pastoral Recommendation -->
<div class="mb-8">
  <h3 class="text-lg font-semibold">Pastoral Recommendation</h3>
  <div class="mt-2 bg-white p-4 rounded-lg">
    <p class="text-gray-700">
      You have a current pastoral recommendation from 
      <span class="font-medium">{{ profile.pastoralRecommendation.pastorName }}</span> 
      at 
      <span class="font-medium">{{ profile.pastoralRecommendation.churchName }}</span>.
    </p>
    <p class="text-sm text-gray-500 mt-1">
      Expires: <span class="font-medium">{{ profile.pastoralRecommendation.expiryDays }} days</span>
    </p>
    <button
      class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      View Recommendation
    </button>
  </div>
</div>

        </div>

        <!-- Right Column -->
        <div class="md:col-span-8">
          <!-- Biography -->
          <section class="mb-8">
            <h2 class="text-xl font-semibold">Biography</h2>
            <div class="mt-2 bg-white p-4 rounded-lg">
              <p class="mt-4 text-gray-700">
                Tony Shaw is a multi-talented worship leader and creative professional with over 15 years of experience.
                Having served in multiple roles, Tony specializes in building dynamic music teams, mentoring youth, and
                leveraging social media to expand ministry reach. His passion for excellence and dedication to apostolic
                values
                drive his success in every project. Outside of ministry, Tony enjoys web design and exploring innovative
                ways
                to combine technology and faith. He has worked closely with church teams to create meaningful worship
                experiences both in-person and online.
              </p>
            </div>
          </section>

          <!-- Experience -->
          <section>
            <h2 class="text-xl font-semibold">Experience</h2>
            <ul class="mt-4 space-y-8">
              <li v-for="experience in profile.experience" :key="experience.churchName">
                <div class="mt-2 bg-white p-4 rounded-lg">
                  <!-- Church Name -->
                  <h3 class="text-lg font-bold">{{ experience.churchName }}</h3>
                  <ul class="mt-2  pl-4 border-l-2 border-gray-200">
                    <li v-for="role in experience.roles" :key="role.title" class="mt-4">
                      <!-- Role Details -->
                      <div class="flex justify-between">
                        <h4 class="text-md font-medium">{{ role.title }}</h4>
                        <span class="text-sm text-gray-500">{{ role.date }}</span>
                      </div>
                      <p class="text-gray-600 mt-1">{{ role.description }}</p>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfilePage",
  data() {
    return {
      profile: {
        name: "Tony Shaw",
        location: "Wilmington, NC",
        memberSince: "May 2018",
        verified: true,
        bio: "Tony Shaw is a multi-talented worship leader and creative professional...",
        experience: [
          {
            churchName: "Apostolic Tabernacle",
            roles: [
              {
                title: "Worship Leader",
                date: "September 2020 - Present",
                description:
                  "Led worship services, organized music teams, and coordinated church events. Spearheaded efforts to bring modern worship into traditional church settings while upholding apostolic values. Worked on recruiting, training, and mentoring musicians to enhance the quality of worship experiences."
              },
            ],
          },
          {
            churchName: "First Pentecostal",
            roles: [
              {
                title: "Youth Pastor",
                date: "June 2008 - August 2020",
                description:
                  "Directed youth programs, organized creative arts workshops, and provided spiritual mentorship to teens and young adults. Developed summer programs focusing on personal growth and spiritual enrichment. Worked closely with the church leadership to align youth ministry goals with the broader mission of the church."
              },
              {
                title: "Music Director",
                date: "January 2015 - August 2020",
                description:
                  "Oversaw the church's music department, directed choirs, and organized special music events. Implemented training sessions for musicians to improve technical skills and ensure spiritual alignment with the church's mission."
              },
            ],
          },
        ],
        skills: ["Drums", "Piano", "Music Director", "Web Design", "Social Media"],
        social: {
          website: "https://tonyj.me",
          instagram: "https://instagram.com/tony",
        },
        pastoralRecommendation: {
  pastorName: "Evan Grizzle", // Dynamic pastor name
  churchName: "Apostolic Tabernacle", // Dynamic church name
  expiryDays: 105, // Dynamic expiry days
},

        photo: null,
      },
    };
  },
};
</script>

<style scoped>
/* Tailwind utility classes are used for styling */
</style>
