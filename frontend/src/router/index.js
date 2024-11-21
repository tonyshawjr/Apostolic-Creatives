import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../components/LoginPage.vue";
import ProtectedPage from "../components/ProtectedPage.vue";
import DashboardPage from "../components/DashboardPage.vue";

// Lazy-loaded components
const EditAccountPage = () => import("../components/admin/EditAccountPage.vue");
const SettingsPage = () => import("../components/admin/SettingsPage.vue");
const ManageUsersPage = () => import("../components/admin/ManageUsersPage.vue");
const ManageJobsPage = () => import("../components/admin/ManageJobsPage.vue");


const routes = [
 {
   path: "/",
   name: "Login", 
   component: LoginPage
 },
 {
   path: "/dashboard",
   component: DashboardPage,
   children: [
     {
       path: "",
       name: "Overview",
       component: () => import("../components/admin/OverviewPage.vue")
     },
     {
       path: "account",
       name: "Account",
       component: () => import("../components/admin/AccountPage.vue")
     },
     {
       path: "account/edit",
       name: "EditAccount",
       component: EditAccountPage
     },
     {
       path: "manage-users",
       name: "ManageUsers",
       component: ManageUsersPage,
       children: [
         {
           path: "creatives",
           name: "CreativesList",
           component: () => import("../components/admin/manage-users/CreativesList.vue")
         },
         {
           path: "team-members", 
           name: "TeamMembersList",
           component: () => import("../components/admin/manage-users/TeamMembersList.vue")
         },
         {
           path: "partners",
           name: "PartnersList", 
           component: () => import("../components/admin/manage-users/PartnersList.vue")
         },
         {
           path: "creative/:id",
           name: "CreativeProfile",
           component: () => import("../components/admin/manage-users/CreativeProfile.vue")
         },
         {
           path: "team-member/:id",
           name: "TeamMemberProfile",
           component: () => import("../components/admin/manage-users/TeamMemberProfile.vue")
         },
         {
           path: "partner/:id",
           name: "PartnerProfile",
           component: () => import("../components/admin/manage-users/PartnerProfile.vue")
         }
       ]
     },
     {
      path: "manage-jobs",
      name: "ManageJobs",
      component: ManageJobsPage,
      children: [
        {
          path: "active",
          name: "ActiveJobs",
          component: () => import("../components/admin/manage-jobs/ActiveJobs.vue")
        },
        {
          path: "pending",
          name: "PendingJobs", 
          component: () => import("../components/admin/manage-jobs/PendingJobs.vue")
        },
        {
          path: "expired",
          name: "ExpiredJobs",
          component: () => import("../components/admin/manage-jobs/ExpiredJobs.vue")
        },
        {
          path: "job/:id",
          name: "JobDetails",
          component: () => import("../components/admin/manage-jobs/JobDetails.vue")
        },
        {
          path: "job/edit/:id",
          name: "EditJob",
          component: () => import("../components/admin/manage-jobs/EditJob.vue")
        }
      ]
    },
     {
       path: "settings",
       name: "Settings",
       component: SettingsPage
     }
   ]
 },
 {
   path: "/protected",
   name: "Protected",
   component: ProtectedPage,
   meta: { requiresAuth: true }
 }
];

const router = createRouter({
 history: createWebHistory(),
 routes,
});

router.beforeEach((to, from, next) => {
 if (to.matched.some((record) => record.meta.requiresAuth)) {
   const isAuthenticated = localStorage.getItem("authToken");
   if (!isAuthenticated) {
     next("/");
   } else {
     next();
   }
 } else {
   next();
 }
});

export default router;