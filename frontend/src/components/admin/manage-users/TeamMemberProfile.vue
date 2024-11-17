<template>
  <div class="space-y-6">
    <div v-if="loading" class="flex justify-center items-center min-h-[60vh]">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>

    <template v-else-if="profile">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-purple-800 to-pink-600 rounded-lg shadow-lg overflow-hidden">
        <div class="px-6 py-8 sm:px-8 sm:py-12">
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <!-- Profile Image -->
            <div class="relative">
              <img
                :src="profile.photo || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
                :alt="profile.name"
                class="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover border-4 border-white shadow-md"
              />
              <div v-if="profile.verified" 
                class="absolute -top-2 -right-2 bg-green-500 text-white p-1.5 rounded-full shadow-lg">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <!-- Basic Info -->
            <div class="flex-grow">
              <h1 class="text-2xl sm:text-3xl font-bold text-white mb-2">{{ profile.name }}</h1>
              <div class="flex flex-wrap gap-3 text-white/90">
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {{ profile.location }}
                </div>
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Member since {{ profile.memberSince }}
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-3 sm:self-start">
              <button 
                @click="$router.push(`/admin/creatives/${profile.id}/edit`)"
                class="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
              <button 
                @click="showDeactivateModal = true"
                class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                Deactivate
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column -->
        <div class="space-y-6">
          <!-- Contact Info Card -->
<div class="bg-white rounded-lg shadow-sm border border-gray-100">
  <div class="p-6">
    <h3 class="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
    <div class="space-y-3">
      <div>
        <p class="text-sm font-medium text-gray-500">Email</p>
        <p class="text-gray-900">{{ profile.email }}</p>
      </div>
      <div>
        <p class="text-sm font-medium text-gray-500">Phone</p>
        <p class="text-gray-900">{{ profile.phonenumber }}</p>
      </div>
      <div>
        <p class="text-sm font-medium text-gray-500">Address</p>
        <p class="text-gray-900">{{ profile.address }}</p>
      </div>
      <div>
        <p class="text-sm font-medium text-gray-500">Home Church</p>
        <p class="text-gray-900">{{ profile.homeChurch }}</p>
      </div>
      <div>
        <p class="text-sm font-medium text-gray-500">Pastor</p>
        <p class="text-gray-900">{{ profile.pastorName }}</p>
      </div>
      <div>
        <p class="text-sm font-medium text-gray-500">Pastor Contact</p>
        <p class="text-gray-900">{{ profile.pastorContact }}</p>
      </div>
    </div>
  </div>
</div>

          <!-- Skills Card -->
          <div v-if="profile.skills?.length" class="bg-white rounded-lg shadow-sm border border-gray-100">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Skills & Expertise</h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="skill in profile.skills" 
                  :key="skill"
                  class="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>

          <!-- Recommendation Card -->
          <div v-if="profile.pastoralRecommendation" 
            class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div class="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100">
              <h3 class="text-lg font-semibold text-gray-800">Pastoral Recommendation</h3>
            </div>
            <div class="p-6">
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div class="flex-grow">
                  <p class="text-gray-900 font-medium">
                    {{ profile.pastoralRecommendation.pastorName }}
                  </p>
                  <p class="text-gray-600 text-sm">
                    {{ profile.pastoralRecommendation.churchName }}
                  </p>
                  <div class="mt-2 flex items-center gap-2">
                    <span class="text-sm" :class="recommendationStatusColor">
                      Expires in {{ profile.pastoralRecommendation.expiryDays }} days
                    </span>
                  </div>
                </div>
              </div>
              <button 
                @click="viewRecommendation"
                class="mt-4 w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Details
              </button>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Bio Card -->
          <div v-if="profile.bio" class="bg-white rounded-lg shadow-sm border border-gray-100">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">About</h3>
              <p class="text-gray-600 leading-relaxed">{{ profile.bio }}</p>
            </div>
          </div>

          <!-- Experience Card -->
          <div v-if="profile.experience?.length" class="bg-white rounded-lg shadow-sm border border-gray-100">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-6">Experience</h3>
              <div class="space-y-8">
                <div 
                  v-for="exp in profile.experience" 
                  :key="exp.churchName"
                  class="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-purple-200">
                  <div class="absolute left-0 top-1.5 w-4 h-4 -translate-x-1/2 rounded-full border-2 border-purple-600 bg-white"></div>
                  <div class="space-y-6">
                    <div>
                      <h4 class="text-lg font-medium text-gray-900">{{ exp.churchName }}</h4>
                      <div v-for="role in exp.roles" :key="role.title" class="mt-2">
                        <div class="flex flex-wrap justify-between items-baseline gap-2">
                          <span class="font-medium text-purple-600">{{ role.title }}</span>
                          <span class="text-sm text-gray-500">{{ role.date }}</span>
                        </div>
                        <p class="mt-1 text-gray-600 text-sm">{{ role.description }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="bg-white rounded-lg shadow-sm p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <h2 class="text-xl font-semibold text-gray-800 mb-2">Profile Not Found</h2>
        <p class="text-gray-600 mb-6">The creative profile you're looking for doesn't exist or has been removed.</p>
        <button 
          @click="$router.push('/dashboard/manage-users/creatives')"
          class="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Creatives
        </button>
      </div>
    </template>

<!-- Deactivate Modal -->
<teleport to="body">
      <div 
        v-if="showDeactivateModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-lg max-w-md w-full shadow-xl" @click.stop>
          <div class="p-6">
            <div class="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 text-center mb-2">Deactivate Profile</h3>
            <p class="text-gray-600 text-center mb-6">
              Are you sure you want to deactivate {{ profile?.name }}'s profile? This action can be reversed later.
            </p>
            <div class="flex gap-3">
              <button 
                @click="showDeactivateModal = false"
                class="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                Cancel
              </button>
              <button 
                @click="handleDeactivate"
                class="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                Deactivate
              </button>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
export default {
  name: 'CreativeProfile',
  
  data() {
    return {
      loading: true,
      profile: null,
      showDeactivateModal: false
    }
  },

  computed: {
    contactInfo() {
      if (!this.profile) return {}
      
      // Only include properties that exist
      const info = {}
      const fields = {
        email: 'email',
        phone: 'phonenumber',
        address: 'address',
        homeChurch: 'homeChurch',
        pastor: 'pastorName',
        pastorContact: 'pastorContact'
      }

      for (const [key, field] of Object.entries(fields)) {
        if (this.profile[field]) {
          info[key] = this.profile[field]
        }
      }

      return info
    },

    recommendationStatusColor() {
      const days = this.profile?.pastoralRecommendation?.expiryDays
      if (!days) return 'text-gray-500'
      return days <= 30 ? 'text-red-600 font-medium' : 
             days <= 60 ? 'text-yellow-600 font-medium' : 
             'text-green-600 font-medium'
    }
  },

  methods: {
    async fetchProfile() {
      try {
    this.loading = true
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In production, this would be an API call
    if (this.$route.params.id === '1') {
      this.profile = {
        id: 5,
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
        photo: null,
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
                description: "Led worship services, organized music teams, and coordinated church events. Spearheaded efforts to bring modern worship into traditional church settings while upholding apostolic values. Worked on recruiting, training, and mentoring musicians to enhance the quality of worship experiences."
              }
            ]
          },
          {
            churchName: "First Pentecostal",
            roles: [
              {
                title: "Youth Pastor",
                date: "June 2008 - August 2020",
                description: "Directed youth programs, organized creative arts workshops, and provided spiritual mentorship to teens and young adults. Developed summer programs focusing on personal growth and spiritual enrichment. Worked closely with the church leadership to align youth ministry goals with the broader mission of the church."
              },
              {
                title: "Music Director",
                date: "January 2015 - August 2020",
                description: "Oversaw the church's music department, directed choirs, and organized special music events. Implemented training sessions for musicians to improve technical skills and ensure spiritual alignment with the church's mission."
              }
            ]
          }
        ],
        social: {
          website: "https://tonyj.me",
          instagram: "https://instagram.com/tony"
        }
      }
    }
  } catch (error) {
    console.error('Error fetching profile:', error)
    this.profile = null
  } finally {
    this.loading = false
  }
    },

    formatLabel(key) {
      return key.charAt(0).toUpperCase() + 
             key.slice(1).replace(/([A-Z])/g, ' $1').trim()
    },

    getContactIcon(key) {
      const icons = {
        email: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>',
        phone: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>',
        address: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>',
        homeChurch: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>',
        pastor: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>',
        pastorContact: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>'
      }
      return icons[key] || icons.email
    },

    async handleDeactivate() {
      try {
        // In production, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 500))
        this.$router.push('/admin/creatives')
        // Show success toast/notification
      } catch (error) {
        console.error('Error deactivating profile:', error)
        // Show error toast/notification
      } finally {
        this.showDeactivateModal = false
      }
    },

    viewRecommendation() {
      if (this.profile?.id) {
        this.$router.push(`/admin/creatives/${this.profile.id}/recommendation`)
      }
    }
  },

  created() {
    this.fetchProfile()
  }
}
</script>

<style scoped>
.before\:absolute::before {
  content: '';
  position: absolute;
}

.before\:left-0::before {
  left: 0;
}

.before\:top-0::before {
  top: 0;
}

.before\:bottom-0::before {
  bottom: 0;
}

.before\:w-0\.5::before {
  width: 0.125rem;
}

.before\:bg-purple-200::before {
  background-color: rgb(233 213 255);
}
</style>