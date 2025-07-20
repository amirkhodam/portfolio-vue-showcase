import auth from './middleware/auth'

export default [
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: () => import('@/modules/Portfolio/view/PortfolioView.vue'),
    childrens: [
      {
        path: '/portfolio/:id',
        name: 'Portfolio',
        component: () => import('@/modules/Portfolio/view/PortfolioView.vue'),
      },
    ],
  },
]
