<template>
    <div>
      <h3 class="text-2xl font-semibold text-gray-800 mb-6">User Role and Permissions</h3>
  
      <!-- Add/Edit Role -->
      <div class="rounded-lg bg-white shadow-md p-6 mb-6">
        <h4 class="text-lg font-medium text-gray-800 mb-4">Add/Edit Role</h4>
        <form @submit.prevent="addOrEditRole" class="space-y-4">
          <!-- Role Name -->
          <div>
            <label for="roleName" class="block text-sm font-medium text-gray-700">Role Name</label>
            <input
              v-model="newRole.name"
              type="text"
              id="roleName"
              placeholder="Super Admin, Moderator, etc."
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary px-4 py-2 text-gray-800"
            />
          </div>
  
          <!-- Default Permissions -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Default Permissions</label>
            <div class="grid grid-cols-4 gap-4 mt-2">
              <div v-for="permission in permissions" :key="permission" class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  :id="`default-${permission}`"
                  v-model="newRole.permissions"
                  :value="permission"
                  class="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label :for="`default-${permission}`" class="text-sm font-medium text-gray-700 capitalize">
                  {{ permission }}
                </label>
              </div>
            </div>
          </div>
  
          <!-- Save Button -->
          <button
            type="submit"
            class="inline-flex justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Save Role
          </button>
        </form>
      </div>
  
      <!-- Role List -->
      <div class="rounded-lg bg-white shadow-md p-6">
        <h4 class="text-lg font-medium text-gray-800 mb-4">Existing Roles</h4>
        <ul class="space-y-4">
          <li
            v-for="(role, index) in roles"
            :key="role.id"
            class="flex justify-between items-center rounded-md border border-gray-300 p-4"
          >
            <!-- Role Details -->
            <div>
              <p class="text-lg font-medium text-gray-800">{{ role.name }}</p>
              <p class="text-sm text-gray-600">Permissions: {{ role.permissions.join(', ') }}</p>
            </div>
  
            <!-- Actions -->
            <div class="flex space-x-2">
              <button
                @click="editRole(index)"
                class="rounded-md bg-blue-500 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none"
              >
                Edit
              </button>
              <button
                @click="deleteRole(index)"
                class="rounded-md bg-red-500 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none"
              >
                Delete
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "RolePermissions",
    data() {
      return {
        permissions: ["view", "edit", "approve", "delete"], // Available permissions
        newRole: {
          id: null,
          name: "",
          permissions: [], // Permissions for the new or edited role
        },
        roles: [], // List of roles
      };
    },
    methods: {
      addOrEditRole() {
        if (!this.newRole.name) {
          alert("Role name is required.");
          return;
        }
  
        // If editing, update the existing role
        if (this.newRole.id !== null) {
          const index = this.roles.findIndex((role) => role.id === this.newRole.id);
          this.roles[index] = { ...this.newRole };
        } else {
          // Add a new role
          const newRole = { ...this.newRole, id: Date.now() };
          this.roles.push(newRole);
        }
  
        // Reset the form
        this.newRole = { id: null, name: "", permissions: [] };
        alert("Role saved successfully!");
      },
      editRole(index) {
        this.newRole = { ...this.roles[index] }; // Load the role into the form
      },
      deleteRole(index) {
        this.roles.splice(index, 1); // Remove the role from the list
        alert("Role deleted successfully!");
      },
    },
  };
  </script>
  
  <style scoped>
  /* Custom styles if needed */
  </style>
  