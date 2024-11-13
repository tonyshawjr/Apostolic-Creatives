<template>
    <div class="min-h-screen bg-gray-100 py-8">
      <div class="max-w-6xl mx-auto px-6 bg-white p-6 rounded-lg shadow">
        <h1 class="text-2xl font-bold mb-6">Edit Profile</h1>
  
        <!-- Profile Form -->
        <form @submit.prevent="saveProfile">
          <!-- Avatar Upload -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
            <input
              type="file"
              @change="updatePhoto"
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
            />
          </div>
  
          <!-- Name -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              v-model="profile.name"
              class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
  
          <!-- Location -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              v-model="profile.location"
              class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
  
          <!-- Member Since -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
            <input
              type="text"
              v-model="profile.memberSince"
              disabled
              class="w-full bg-gray-100 border-gray-300 rounded-lg shadow-sm"
            />
          </div>
  
          <!-- Skills -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Skills (comma-separated)</label>
            <input
              type="text"
              v-model="skillsInput"
              class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="E.g., Drums, Piano, Music Director"
            />
          </div>
  
          <!-- Social Links -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Social Links</label>
            <div>
              <input
                type="text"
                v-model="profile.social.website"
                placeholder="Website"
                class="w-full mb-3 border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <input
                type="text"
                v-model="profile.social.instagram"
                placeholder="Instagram"
                class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
  
          <!-- Pastoral Recommendation -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Pastoral Recommendation</label>
            <div>
              <input
                type="text"
                v-model="profile.pastoralRecommendation.pastorName"
                placeholder="Pastor Name"
                class="w-full mb-3 border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <input
                type="text"
                v-model="profile.pastoralRecommendation.churchName"
                placeholder="Church Name"
                class="w-full mb-3 border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <input
                type="number"
                v-model="profile.pastoralRecommendation.expiryDays"
                placeholder="Expires in days"
                class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
  
          <!-- Experience Section (Repeater) -->
          <div class="mb-6">
            <h2 class="text-lg font-semibold mb-4">Experience</h2>
            <div v-for="(experience, index) in profile.experience" :key="index" class="mb-6 border border-gray-200 p-4 rounded-lg">
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Church Name</label>
                <input
                  type="text"
                  v-model="experience.churchName"
                  class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div v-for="(role, rIndex) in experience.roles" :key="rIndex" class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <input
                  type="text"
                  v-model="role.title"
                  placeholder="Role Title"
                  class="w-full mb-2 border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="text"
                  v-model="role.date"
                  placeholder="Date"
                  class="w-full mb-2 border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <textarea
                  v-model="role.description"
                  placeholder="Description"
                  class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                ></textarea>
                <button
                  type="button"
                  @click="removeRole(index, rIndex)"
                  class="mt-2 text-red-600 hover:underline"
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
            <button
              type="button"
              @click="addExperience"
              class="text-blue-600 hover:underline"
            >
              Add Experience
            </button>
          </div>
  
          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
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
          skills: ["Drums", "Piano", "Music Director"],
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
        this.profile.experience.push({ churchName: "", roles: [{ title: "", date: "", description: "" }] });
      },
      addRole(index) {
        this.profile.experience[index].roles.push({ title: "", date: "", description: "" });
      },
      removeRole(expIndex, roleIndex) {
        this.profile.experience[expIndex].roles.splice(roleIndex, 1);
      },
      updatePhoto(event) {
        const file = event.target.files[0];
        if (file) this.profile.photo = URL.createObjectURL(file); // For preview only
      },
    },
  };
  </script>
  
  <style scoped>
  /* Styling handled by TailwindCSS */
  </style>
  