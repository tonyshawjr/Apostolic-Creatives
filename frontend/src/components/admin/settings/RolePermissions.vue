<template>
  <div class="space-y-6">
    <!-- Settings Section Header -->
    <div class="bg-gradient-to-r from-purple-800 to-pink-600 rounded-lg shadow-lg overflow-hidden mb-6">
      <div class="px-6 py-8">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl font-semibold text-white">Platform Roles & Permissions</h3>
            <p class="text-white/70 mt-1">Manage access levels for team members, creatives, and church partners</p>
          </div>
          <div class="hidden sm:block">
            <span class="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white ring-1 ring-inset ring-white/20">
              Last updated: {{ lastUpdated }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Role Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <form @submit.prevent="saveRole" class="divide-y divide-gray-100">
        <!-- Role Details Section -->
        <div class="p-6 space-y-6">
          <h4 class="text-lg font-medium text-gray-900">Role Details</h4>
          
          <!-- Role Type -->
          <div>
            <label for="roleType" class="block text-sm font-medium text-gray-700">Role Type</label>
            <select
              v-model="form.roleType"
              id="roleType"
              class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
              @change="updatePermissionsByRole"
            >
              <option value="admin">Team Member (Admin)</option>
              <option value="creative">Creative (Talent)</option>
              <option value="partner">Partner (Church)</option>
            </select>
          </div>

          <!-- Role Name -->
          <div>
            <label for="roleName" class="block text-sm font-medium text-gray-700">Role Name</label>
            <input
              v-model="form.roleName"
              type="text"
              id="roleName"
              :placeholder="getRolePlaceholder"
              class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <!-- Role Description -->
          <div>
            <label for="roleDescription" class="block text-sm font-medium text-gray-700">Role Description</label>
            <textarea
              v-model="form.roleDescription"
              id="roleDescription"
              rows="3"
              class="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-600 focus:border-purple-500 focus:ring-purple-500"
            ></textarea>
          </div>
        </div>

        <!-- Permissions Section -->
        <div class="p-6 space-y-6">
          <h4 class="text-lg font-medium text-gray-900">Role Permissions</h4>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div v-for="(category, categoryName) in getFilteredPermissions" :key="categoryName" class="space-y-4">
              <h5 class="text-sm font-medium text-gray-900 border-b pb-2">{{ categoryName }}</h5>
              <div class="space-y-3">
                <div v-for="permission in category" :key="permission.value" class="flex items-center">
                  <button 
                    type="button"
                    role="switch"
                    :class="[
                      'relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
                      form.permissions.includes(permission.value) ? 'bg-purple-600' : 'bg-gray-200'
                    ]"
                    @click="togglePermission(permission.value)"
                  >
                    <span
                      :class="[
                        'inline-block h-4 w-4 transform rounded-full bg-white transition',
                        form.permissions.includes(permission.value) ? 'translate-x-6' : 'translate-x-1'
                      ]"
                    />
                  </button>
                  <label class="ml-3 text-sm text-gray-600">
                    {{ permission.label }}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-between items-center">
          <button
            type="button"
            @click="resetForm"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Clear Form
          </button>
          <button
            type="submit"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-purple-800 to-pink-600 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            {{ form.id ? 'Update Role' : 'Create Role' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Existing Roles List -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6">
        <h4 class="text-lg font-medium text-gray-900 mb-6">Current Roles</h4>
        
        <div class="space-y-4">
          <div v-for="role in roles" :key="role.id" class="p-4 rounded-lg border border-gray-200 hover:border-purple-200 transition-colors">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center space-x-3">
                <h5 class="text-sm font-medium text-gray-900">{{ role.roleName }}</h5>
                <span 
                  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                  :class="{
                    'bg-purple-100 text-purple-800': role.roleType === 'admin',
                    'bg-blue-100 text-blue-800': role.roleType === 'creative',
                    'bg-green-100 text-green-800': role.roleType === 'partner'
                  }"
                >
                  {{ getRoleTypeLabel(role.roleType) }}
                </span>
              </div>
              <div class="flex items-center space-x-2">
                <button
                  @click="editRole(role)"
                  class="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button
                  @click="deleteRole(role.id)"
                  class="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  :disabled="role.isDefault"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            <p class="text-sm text-gray-500 mb-3">{{ role.roleDescription }}</p>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="(category, categoryName) in groupPermissionsByCategory(role.permissions)"
                :key="categoryName"
                class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
              >
                {{ categoryName }}: {{ category.length }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoleSettings",
  data() {
    return {
      lastUpdated: new Date().toLocaleDateString(),
      form: {
        id: null,
        roleType: "admin",
        roleName: "",
        roleDescription: "",
        permissions: [],
      },
      roles: [
  {
    id: 1,
    roleType: "admin",
    roleName: "Platform Administrator",
    roleDescription: "Responsible for managing platform operations and ensuring smooth functionality.",
    permissions: [
      "users.view", "users.create", "users.delete", "verification.approve",
      "jobs.moderate", "jobs.manage", "platform.manage", "platform.monitor",
      "financials.view", "financials.analyze"
    ],
    isDefault: true
  },
  {
    id: 2,
    roleType: "creative",
    roleName: "Verified Creative",
    roleDescription: "Creative talent offering skills and services to churches.",
    permissions: [
      "profile.manage", "verification.submit", "verification.track",
      "jobs.view", "jobs.apply", "messaging.access", "messaging.send",
      "subscription.manage"
    ],
    isDefault: true
  },
  {
    id: 3,
    roleType: "partner",
    roleName: "Church Partner",
    roleDescription: "Church organization posting job opportunities and hiring creatives.",
    permissions: [
      "profile.manage", "jobs.post", "jobs.manage",
      "creatives.browse", "creatives.filter",
      "messaging.access", "messaging.send", "subscription.manage"
    ],
    isDefault: true
  },
],
      permissionCategories: {
  "User Management": [
    { value: "users.view", label: "View User Profiles", roles: ["admin"] },
    { value: "users.create", label: "Create/Edit Users", roles: ["admin"] },
    { value: "users.delete", label: "Delete Users", roles: ["admin"] },
    { value: "verification.approve", label: "Approve Pastor Verifications", roles: ["admin"] }
  ],
  "Job Management": [
    { value: "jobs.view", label: "Browse Job Listings", roles: ["creative"] },
    { value: "jobs.post", label: "Post Job Listings", roles: ["partner"] },
    { value: "jobs.apply", label: "Apply for Jobs", roles: ["creative"] },
    { value: "jobs.manage", label: "Manage Job Listings", roles: ["partner", "admin"] },
    { value: "jobs.moderate", label: "Moderate All Jobs", roles: ["admin"] }
  ],
  "Profile Management": [
    { value: "profile.manage", label: "Manage Own Profile", roles: ["creative", "partner"] },
    { value: "verification.submit", label: "Submit Pastor Verification", roles: ["creative"] },
    { value: "verification.track", label: "Track Verification Status", roles: ["creative"] }
  ],
  "Creative Directory": [
    { value: "creatives.browse", label: "Browse Creative Directory", roles: ["partner"] },
    { value: "creatives.filter", label: "Filter by Skills & Location", roles: ["partner"] }
  ],
  "Communication": [
    { value: "messaging.access", label: "Access Messaging System", roles: ["creative", "partner"] },
    { value: "messaging.send", label: "Send Messages", roles: ["creative", "partner"] }
  ],
  "Financials": [
    { value: "financials.view", label: "View Financial Reports", roles: ["admin"] },
    { value: "financials.analyze", label: "Access Analytics", roles: ["admin"] },
    { value: "subscription.manage", label: "Manage Subscription", roles: ["creative", "partner"] }
  ],
  "Platform Management": [
    { value: "platform.manage", label: "Manage Platform Settings", roles: ["admin"] },
    { value: "platform.monitor", label: "Monitor Platform Activity", roles: ["admin"] }
  ]
}
    };
  },
  computed: {
    getRolePlaceholder() {
      const types = {
        admin: "e.g., Platform Manager, Support Admin",
        creative: "e.g., Verified Creative, Premium Creative",
        partner: "e.g., Church Partner, Ministry Partner"
      };
      return types[this.form.roleType] || "";
    },
    getFilteredPermissions() {
      const filtered = {};
      Object.entries(this.permissionCategories).forEach(([category, permissions]) => {
        const filteredPerms = permissions.filter(p => p.roles.includes(this.form.roleType));
        if (filteredPerms.length > 0) {
          filtered[category] = filteredPerms;
        }
      });
      return filtered;
    }
  },
  methods: {
    getRoleTypeLabel(type) {
      const labels = {
        admin: "Team Member",
        creative: "Creative",
        partner: "Church Partner"
      };
      return labels[type] || type;
    },
    
    togglePermission(permission) {
      const index = this.form.permissions.indexOf(permission);
      if (index === -1) {
        this.form.permissions.push(permission);
      } else {
        this.form.permissions.splice(index, 1);
      }
    },
    groupPermissionsByCategory(permissions) {
      const grouped = {};
      permissions.forEach(permission => {
        Object.entries(this.permissionCategories).forEach(([category, perms]) => {
          if (perms.some(p => p.value === permission)) {
            if (!grouped[category]) {
              grouped[category] = [];
            }
            grouped[category].push(permission);
          }
        });
      });
      return grouped;
    },

    async saveRole() {
      try {
        // Validate form data
        if (!this.form.roleName.trim()) {
          throw new Error("Role name is required");
        }

        if (!this.form.roleDescription.trim()) {
          throw new Error("Role description is required");
        }

        if (this.form.permissions.length === 0) {
          throw new Error("At least one permission must be selected");
        }

        // Additional validation for required permissions based on role type
        const requiredPermissions = this.getRequiredPermissions();
        const missingPermissions = requiredPermissions.filter(
          perm => !this.form.permissions.includes(perm)
        );

        if (missingPermissions.length > 0) {
          throw new Error(`Missing required permissions for ${this.form.roleType} role`);
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (this.form.id) {
          // Update existing role
          const index = this.roles.findIndex(role => role.id === this.form.id);
          if (this.roles[index].isDefault) {
            throw new Error("Cannot modify default platform roles");
          }
          this.roles[index] = { ...this.form };
        } else {
          // Create new role
          this.roles.push({
            ...this.form,
            id: Date.now(),
            isDefault: false
          });
        }

        this.resetForm();
        this.lastUpdated = new Date().toLocaleDateString();
        
        // Show success message using shadcn/ui Toast
        this.$toast({
          title: `Role ${this.form.id ? 'Updated' : 'Created'}`,
          description: `The role has been successfully ${this.form.id ? 'updated' : 'created'}.`,
          variant: 'success',
          duration: 3000,
        });
      } catch (error) {
        console.error("Error saving role:", error);
        this.$toast({
          title: "Error",
          description: error.message,
          variant: 'destructive',
          duration: 3000,
        });
      }
    },

    getRequiredPermissions() {
  const requiredByType = {
    admin: [
      'users.view',
      'users.create',
      'verification.approve',
      'jobs.moderate',
      'platform.manage',
      'financials.view'
    ],
    creative: [
      'profile.manage',
      'jobs.view',
      'jobs.apply',
      'messaging.access',
      'verification.track'
    ],
    partner: [
      'profile.manage',
      'jobs.post',
      'jobs.manage',
      'creatives.browse',
      'messaging.access'
    ]
  };
  return requiredByType[this.form.roleType] || [];
},

    editRole(role) {
      if (role.isDefault) {
        this.$toast({
          title: "Cannot Edit Default Role",
          description: "Default platform roles cannot be modified for security reasons.",
          variant: 'warning',
          duration: 3000,
        });
        return;
      }

      // Deep clone the role to avoid direct reference
      this.form = JSON.parse(JSON.stringify(role));
      
      // Scroll to form
      this.$nextTick(() => {
        document.querySelector('#roleType').scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      });
    },

    async deleteRole(id) {
      try {
        const role = this.roles.find(r => r.id === id);
        
        if (!role) {
          throw new Error("Role not found");
        }

        if (role.isDefault) {
          throw new Error("Cannot delete default platform roles");
        }

        // Confirm deletion
        if (!confirm("Are you sure you want to delete this role? This action cannot be undone.")) {
          return;
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const index = this.roles.findIndex(r => r.id === id);
        this.roles.splice(index, 1);
        
        this.$toast({
          title: "Role Deleted",
          description: "The role has been successfully deleted.",
          variant: 'success',
          duration: 3000,
        });
      } catch (error) {
        console.error("Error deleting role:", error);
        this.$toast({
          title: "Error",
          description: error.message,
          variant: 'destructive',
          duration: 3000,
        });
      }
    },

    resetForm() {
      this.form = {
        id: null,
        roleType: "admin",
        roleName: "",
        roleDescription: "",
        permissions: []
      };
      this.updatePermissionsByRole();
    },

    updatePermissionsByRole() {
      this.form.permissions = [];
      
      // Add default permissions based on role type
      const defaultPermissions = {
        admin: [
          'users.view',
          'users.edit',
          'jobs.moderate',
          'platform.manage',
          'financials.view'
        ],
        creative: [
          'profile.manage',
          'jobs.view',
          'jobs.apply',
          'messaging.access',
          'subscription.manage'
        ],
        partner: [
          'profile.manage',
          'jobs.post',
          'jobs.manage',
          'messaging.access',
          'subscription.manage',
          'creatives.browse'
        ]
      };

      this.form.permissions = defaultPermissions[this.form.roleType] || [];
    },

    // Helper method to get readable permission names
    getPermissionLabel(permissionValue) {
      for (const category of Object.values(this.permissionCategories)) {
        const permission = category.find(p => p.value === permissionValue);
        if (permission) {
          return permission.label;
        }
      }
      return permissionValue;
    }
  },
created() {
    this.updatePermissionsByRole();
  },

  watch: {
    'form.roleType': {
      handler(newType) {
        // Update form description based on role type
        const descriptions = {
          admin: "Responsible for managing platform operations and ensuring smooth functionality.",
          creative: "User offering skills and services to churches through the platform.",
          partner: "Church organization posting job opportunities and hiring creatives."
        };

        // Only auto-update description for new roles
        if (!this.form.id) {
          this.form.roleDescription = descriptions[newType] || "";
          this.updatePermissionsByRole();
        }
      },
      immediate: true
    }
  }
};
</script>