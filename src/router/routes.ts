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
]
