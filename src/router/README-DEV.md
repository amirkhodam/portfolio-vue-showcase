# Router Module - Developer Guide

This document explains the internal structure and development practices for the router module.

## Structure

- `index.ts`: Main router setup and export. Handles router creation, global guards, and plugin integration.
- `routes.ts`: Contains the array of route definitions. Each route maps a path to a component.
- `middleware/`: Place for route middleware (e.g., auth checks, logging). Middleware can be applied globally or per-route.

## Adding or Editing Routes

1. Open `routes.ts`.
2. Add a new route object to the exported array. Example:
   ```ts
   {
     path: '/new-page',
     name: 'NewPage',
     component: () => import('@/views/NewPage.vue'),
   }
   ```
3. If you need route-specific middleware, add a `meta` property:
   ```ts
   {
     path: '/admin',
     name: 'Admin',
     component: () => import('@/views/Admin.vue'),
     meta: { requiresAuth: true },
   }
   ```
4. Register any new middleware in the `middleware/` folder and apply it in `index.ts` as needed.

## Middleware Usage

- Middleware functions can be used for authentication, permissions, logging, etc.
- Add new middleware files to `middleware/`.
- Import and use them in `index.ts` with router hooks (e.g., `beforeEach`).

## Conventions

- Use lazy loading for route components: `component: () => import('...')`
- Name routes with the `name` property for programmatic navigation.
- Use the `meta` field for custom route metadata.

## Testing

- Test new routes and middleware by navigating in the app and checking expected behavior.

## More Info

- See the Vue Router docs: https://router.vuejs.org/
