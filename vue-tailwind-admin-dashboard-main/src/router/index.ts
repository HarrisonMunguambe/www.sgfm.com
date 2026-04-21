import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/services/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    // ================= PUBLIC =================
    {
      path: '/',
      name: 'Landing',
      component: () => import('@/views/Landing.vue'),
      meta: { title: 'Bem-vindo', public: true },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Auth/Login.vue'),
      meta: { title: 'Entrar', public: true, guestOnly: true },
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Auth/Register.vue'),
      meta: { title: 'Criar conta', public: true, guestOnly: true },
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: () => import('@/views/Auth/ForgotPassword.vue'),
      meta: { title: 'Recuperar palavra-passe', public: true, guestOnly: true },
    },
    {
      path: '/observatorio',
      name: 'Observatorio',
      component: () => import('@/views/Observatorio/ObservatorioHub.vue'),
      meta: { title: 'Observatório Financeiro', public: true },
    },
    {
      path: '/observatorio/:slug',
      name: 'InsightDetail',
      component: () => import('@/views/Observatorio/InsightDetail.vue'),
      meta: { title: 'Análise', public: true },
    },

    // Legacy auth paths redirect to the new ones
    { path: '/signin', redirect: '/login' },
    { path: '/signup', redirect: '/register' },

    // ================= AUTHENTICATED =================
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/Ecommerce.vue'),
      meta: { title: 'Dashboard', requiresAuth: true },
    },

    // ---- Admin template routes (kept for future use, all protected) ----
    { path: '/dashboard/ecommerce', redirect: '/dashboard' },
    {
      path: '/dashboard/calendar',
      name: 'Calendar',
      component: () => import('@/views/Others/Calendar.vue'),
      meta: { title: 'Calendar', requiresAuth: true },
    },
    {
      path: '/dashboard/profile',
      name: 'Profile',
      component: () => import('@/views/Others/UserProfile.vue'),
      meta: { title: 'Profile', requiresAuth: true },
    },
    {
      path: '/dashboard/form-elements',
      name: 'Form Elements',
      component: () => import('@/views/Forms/FormElements.vue'),
      meta: { title: 'Form Elements', requiresAuth: true },
    },
    {
      path: '/dashboard/basic-tables',
      name: 'Basic Tables',
      component: () => import('@/views/Tables/BasicTables.vue'),
      meta: { title: 'Basic Tables', requiresAuth: true },
    },
    {
      path: '/dashboard/line-chart',
      name: 'Line Chart',
      component: () => import('@/views/Chart/LineChart/LineChart.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/dashboard/bar-chart',
      name: 'Bar Chart',
      component: () => import('@/views/Chart/BarChart/BarChart.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/dashboard/alerts',
      name: 'Alerts',
      component: () => import('@/views/UiElements/Alerts.vue'),
      meta: { title: 'Alerts', requiresAuth: true },
    },
    {
      path: '/dashboard/avatars',
      name: 'Avatars',
      component: () => import('@/views/UiElements/Avatars.vue'),
      meta: { title: 'Avatars', requiresAuth: true },
    },
    {
      path: '/dashboard/badge',
      name: 'Badge',
      component: () => import('@/views/UiElements/Badges.vue'),
      meta: { title: 'Badge', requiresAuth: true },
    },
    {
      path: '/dashboard/buttons',
      name: 'Buttons',
      component: () => import('@/views/UiElements/Buttons.vue'),
      meta: { title: 'Buttons', requiresAuth: true },
    },
    {
      path: '/dashboard/images',
      name: 'Images',
      component: () => import('@/views/UiElements/Images.vue'),
      meta: { title: 'Images', requiresAuth: true },
    },
    {
      path: '/dashboard/videos',
      name: 'Videos',
      component: () => import('@/views/UiElements/Videos.vue'),
      meta: { title: 'Videos', requiresAuth: true },
    },
    {
      path: '/dashboard/blank',
      name: 'Blank',
      component: () => import('@/views/Pages/BlankPage.vue'),
      meta: { title: 'Blank', requiresAuth: true },
    },

    // ================= 404 =================
    {
      path: '/:pathMatch(.*)*',
      name: '404 Error',
      component: () => import('@/views/Errors/FourZeroFour.vue'),
      meta: { title: '404 Error', public: true },
    },
  ],
})

router.beforeEach((to, _from, next) => {
  const authed = isAuthenticated()
  if (to.meta.requiresAuth && !authed) {
    return next({ name: 'Login', query: { redirect: to.fullPath } })
  }
  if (to.meta.guestOnly && authed) {
    return next({ name: 'Dashboard' })
  }
  next()
})

router.afterEach((to) => {
  const title = (to.meta.title as string) || ''
  document.title = title ? `${title} | SGFM` : 'SGFM'
})

export default router
