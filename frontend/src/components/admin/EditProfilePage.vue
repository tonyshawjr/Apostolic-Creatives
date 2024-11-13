<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <h1 class="text-2xl font-bold text-gray-800">Edit Profile</h1>

    <!-- Profile Details -->
    <div class="bg-white shadow-sm rounded-lg p-6 space-y-4">
      <h2 class="text-lg font-medium text-gray-600">Profile Details</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Profile Photo -->
  <div class="shrink-0 flex flex-row items-center gap-4">
    <img class="h-16 w-16 object-cover rounded-full" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Current profile photo" />
  
  <label class="block">
    <span class="sr-only">Choose profile photo</span>
          <input
            type="file"
            @change="updatePhoto"
            class="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100"
          />
          </label>
          </div>
        <!-- Full Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            v-model="profile.name"
            class="mt-2 w-full border-gray-300"
          />
        </div>
        <!-- Location -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            v-model="profile.location"
            class="mt-2 w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <!-- Member Since -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Member Since</label>
          <input
            type="text"
            v-model="profile.memberSince"
            disabled
            class="mt-2 w-full bg-gray-100 border-gray-300 rounded-lg shadow-sm"
          />
        </div>
      </div>
    </div>

    <!-- Skills Section -->
    <div class="bg-white shadow-sm rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-600 mb-4">Skills</h2>
      <input
        type="text"
        v-model="skillsInput"
        placeholder="E.g., Drums, Piano, Music Director"
        class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>

    <!-- Social Links Section -->
    <div class="bg-white shadow-sm rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-600 mb-4">Social Links</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Website</label>
          <input
            type="text"
            v-model="profile.social.website"
            class="mt-2 w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Instagram</label>
          <input
            type="text"
            v-model="profile.social.instagram"
            class="mt-2 w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>

    <!-- Pastoral Recommendation Section -->
    <div class="bg-white shadow-sm rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-600 mb-4">Pastoral Recommendation</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Pastor Name</label>
          <input
            type="text"
            v-model="profile.pastoralRecommendation.pastorName"
            class="mt-2 w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Church Name</label>
          <input
            type="text"
            v-model="profile.pastoralRecommendation.churchName"
            class="mt-2 w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Expires in Days</label>
          <input
            type="number"
            v-model="profile.pastoralRecommendation.expiryDays"
            class="mt-2 w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>

    <!-- Experience Section -->
    <div class="bg-white shadow-sm rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-600 mb-4">Experience</h2>
      <div v-for="(experience, index) in profile.experience" :key="index" class="mb-6">
        <div class="border border-gray-200 rounded-lg p-4">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Church Name</label>
            <input
              type="text"
              v-model="experience.churchName"
              class="mt-2 w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div v-for="(role, rIndex) in experience.roles" :key="rIndex" class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              v-model="role.title"
              placeholder="Role Title"
              class="mt-2 w-full mb-2 border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <textarea
              v-model="role.description"
              placeholder="Description"
              class="mt-2 w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
            <button
              type="button"
              @click="removeRole(index, rIndex)"
              class="text-red-600 hover:underline"
            >
              Remove Role
            </button>
          </div>
          <button
            type="button"
            @click="addRole(index)"
            class="text-blue-600 hover:underline"
          >
            Add Role
          </button>
        </div>
      </div>
      <button
        type="button"
        @click="addExperience"
        class="text-blue-600 hover:underline"
      >
        Add Experience
      </button>
    </div>

    <!-- Submit Button -->
    <div class="flex justify-center mt-4">
      <button
        type="submit"
        @click="saveProfile"
        class="w-full max-w-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditProfilePage",
  data() {
    return {
      profile: {
        name: "Tony Shaw",
        location: "Wilmington, NC",
        memberSince: "May 2018",
        social: { website: "", instagram: "" },
        pastoralRecommendation: { pastorName: "", churchName: "", expiryDays: "" },
        experience: [],
      },
      skillsInput: "",
    };
  },
  methods: {
    saveProfile() {
      this.profile.skills = this.skillsInput.split(",").map((skill) => skill.trim());
      alert("Profile saved successfully!");
    },
    addExperience() {
      this.profile.experience.push({ churchName: "", roles: [] });
    },
    addRole(index) {
      this.profile.experience[index].roles.push({ title: "", description: "" });
    },
    removeRole(expIndex, roleIndex) {
      this.profile.experience[expIndex].roles.splice(roleIndex, 1);
    },
    updatePhoto(event) {
      const file = event.target.files[0];
      if (file) this.profile.photo = URL.createObjectURL(file);
    },
  },
};
</script>

<style scoped>
/* General layout improvements */
.bg-white {
  background-color: #ffffff;
}
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.rounded-lg {
  border-radius: 0.5rem;
}
</style>
