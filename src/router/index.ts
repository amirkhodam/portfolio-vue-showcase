import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import routes from './routes'
import { isMobile } from '@/utils/os'
import middlewarePipeline from './middleware/middlewarePipeline'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routes],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    } else return { top: 0 }
  },
})

const authenticationRoutes = ['authentication']
const openRoutes = ['404', 'forbidden', 'interruption', 'capacity', 'mobile']
const unGuardedRoutes = [...authenticationRoutes, ...openRoutes]

router.beforeEach(async (to, from, next) => {
  try {
    if (!unGuardedRoutes.includes(String(to.name))) {
      // start loading
    }
    handlePlatformQuery(to, next)

    if (isAuthenticatedRoute(to)) {
      return handleAuthenticatedRoute(to, next)
    }

    if (hasMiddleware(to) && !isGuardedRoute(to)) {
      return applyMiddleware(to, from, next)
    }
    next()
  } catch (error) {
    console.error('Router beforeEach error:', error)
    next({ name: 'interruption' })
  }
})

const handlePlatformQuery = (to, next) => {
  if (to.query.platform === 'mobile') {
    localStorage.setItem('platform', 'mobile')
  }

  if (
    isMobilePlatform() &&
    unGuardedRoutes.includes(String(to.name)) &&
    to.query.platform !== 'mobile'
  ) {
    const query = { ...to.query, platform: 'mobile' }
    return next({ ...to, query })
  }
}

const isMobilePlatform = () => localStorage.getItem('platform') === 'mobile'

const isGuardedRoute = (to) => !unGuardedRoutes.includes(String(to.name))

const isAuthenticatedRoute = (to) => authenticationRoutes.includes(String(to.name))

const handleAuthenticatedRoute = (to, next) => {
  if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
    if (localStorage.getItem('workspaceId')) {
      return next({ name: 'application' })
    } else {
      return next({ name: 'SelectWorkspace' })
    }
  } else {
    return next()
  }
}

const hasMiddleware = (to) => !!to.meta.middleware

const applyMiddleware = (to, from, next) => {
  const middleware = to.meta.middleware
  const context = { to, from, next }

  if (middleware[0]) {
    middleware[0]({
      ...context,
      next: middlewarePipeline(context, middleware, 1),
    })
  } else {
    return next()
  }
}

export default router
