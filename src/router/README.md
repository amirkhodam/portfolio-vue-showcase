# Router Module

This module handles all routing for the application using Vue Router.

## What is the Router?

The router manages navigation between different pages and views in the app. It defines which components are shown for each URL path.

## How to Use

- The router is already set up and exported from `@/router`.
- In `main.ts`, the router is imported and passed to the Vue app:
  ```ts
  import router from '@/router'
  app.use(router)
  ```
- To navigate programmatically, use:
  ```ts
  this.$router.push('/some-path')
  // or in setup()
  import { useRouter } from 'vue-router'
  const router = useRouter()
  router.push('/some-path')
  ```
- To add a new route, see the developer documentation in `README-DEV.md`.

## Features

- Route definitions are in `routes.ts`.
- Middleware support is available in the `middleware/` folder.

For advanced usage and customization, see `README-DEV.md` in this folder.
