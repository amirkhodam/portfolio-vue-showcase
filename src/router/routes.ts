import auth from './middleware/auth'

export default [
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: () => import('@/modules/Portfolio/view/PortfolioView.vue'),
    children: [
      {
        path: ':id',
        name: 'PortfolioDetail',
        component: () => import('@/modules/Portfolio/view/PortfolioView.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'AboutUs',
    component: () => import('@/modules/AboutUs/view/AboutUsView.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/modules/Contact/view/ContactView.vue'),
  },
  // Admin routes
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('@/modules/Admin/view/AdminLoginView.vue'),
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('@/modules/Admin/view/AdminDashboardView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/portfolios',
    name: 'AdminPortfolios',
    component: () => import('@/modules/Admin/view/AdminPortfolioView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/about',
    name: 'AdminAbout',
    component: () => import('@/modules/Admin/view/AdminAboutUsView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/contact',
    name: 'AdminContact',
    component: () => import('@/modules/Admin/view/AdminContactView.vue'),
    meta: { requiresAuth: true },
  },
]
