<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <!-- Cover Photo -->
      <div class="h-48 bg-gray-300">
        <!-- Placeholder for cover photo -->
      </div>

      <!-- Profile Content -->
      <div class="p-6 text-center">
        <img
          :src="profile.photo || 'https://via.placeholder.com/150'"
          alt="Profile"
          class="w-32 h-32 rounded-full mx-auto -mt-16 border-4 border-white object-cover"
        />
        <h2 class="text-2xl font-bold mt-4">{{ profile.name }}</h2>
        <p class="text-sm text-gray-500">{{ profile.role }}</p>
        <div class="flex justify-center space-x-4 mt-4">
          <div class="text-center">
            <span class="block font-bold">{{ profile.posts }}</span>
            <span class="text-sm text-gray-500">Posts</span>
          </div>
          <div class="text-center">
            <span class="block font-bold">{{ profile.followers }}</span>
            <span class="text-sm text-gray-500">Followers</span>
          </div>
          <div class="text-center">
            <span class="block font-bold">{{ profile.following }}</span>
            <span class="text-sm text-gray-500">Following</span>
          </div>
        </div>

        <p class="text-gray-600 mt-6">{{ profile.bio }}</p>
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
        role: "Admin",
        posts: 120,
        followers: 300,
        following: 150,
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        photo: null, // Placeholder for profile photo
      },
    };
  },
};
</script>

<style scoped>
/* Add any additional styling if needed */
</style>
