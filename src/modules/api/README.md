# API Library Documentation

This directory contains the core API client, helpers, services, and error handling modules for the Thunder Web Application. Each submodule is documented below with usage and development details.

## Table of Contents

- [Overview](#overview)
- [Usage](#usage)
- [Modules](#modules)
  - [api.client](#apiclient)
  - [api.helpers](#apihelpers)
  - [services](#services)
  - [helpers](#helpers)
  - [errors](#errors)
- [Development](#development)

---

## Overview

This library provides a modular, extensible API client for interacting with backend services, along with a set of helpers and error handling utilities. It is designed for use in Vue.js applications but can be adapted for other frameworks.

## Usage

### Basic Example

```ts
import { ApiClient, ApiHelpers } from '@/lib/api'

const apiClient = new ApiClient('https://api.example.com')
const helpers = new ApiHelpers(apiClient)

// Example: Inviting a user to a workspace
await helpers.userHelper.inviteUser(workspaceId, userData)
```

### Service Usage

```ts
// Access a specific service
await apiClient.camera.get('/cameras')
```

---

## Modules

### api.client

- **Purpose:** Main entry point for API communication. Manages service instances and HTTP adaptors.
- **Key Class:** `ApiClient`
- **Features:**
  - Manages multiple service adaptors (Axios instances)
  - Provides access to all backend services (authentication, camera, workspace, etc.)
  - Global header management
  - Tracks running requests for UI feedback
- **Usage:**
  - Instantiate with a base URL
  - Access services as properties (e.g., `apiClient.camera`)

### api.helpers

- **Purpose:** Provides high-level helper classes for common workflows (user, workspace, map, camera, schedule, authentication).
- **Key Class:** `ApiHelpers`
- **Features:**
  - Wraps common multi-step or cross-service operations
  - Simplifies complex flows (e.g., bulk user invite, workspace creation)
- **Usage:**
  - Instantiate with an `ApiClient` instance
  - Use helper methods for business logic

### services

- **Purpose:** Contains all service classes for direct API interaction.
- **Key Files:**
  - `service.ts`: Base service class (handles HTTP, error parsing, headers)
  - `service.interface.ts`: Service scope enums
  - Subdirectories: Each backend domain (e.g., camera-manager, activity-log, ai, etc.)
- **Usage:**
  - Access via `ApiClient` properties
  - Extend or add new services in their respective subdirectories

### helpers

- **Purpose:** Utility classes for business logic and cross-service operations.
- **Key Files:**
  - `user-helper.ts`, `workspace-helper.ts`, `map-helper.ts`, `schedule-helper.ts`, `camera-helper.ts`, `abstract-helper.ts`
- **Usage:**
  - Use via `ApiHelpers` or directly import as needed

### errors

- **Purpose:** Error parsing and handling utilities for API responses.
- **Key Files:**
  - `service-errors/`, `parsers/`, `messageI18/`
- **Usage:**
  - Used internally by services for error normalization and translation

---

## Development

### Adding a New Service

1. Create a new directory under `services/` for your domain.
2. Implement your service class, extending the base `Service` class.
3. Export your service in `services/index.ts`.
4. Add an instance in `ApiClient` if it should be globally accessible.

### Adding a New Helper

1. Create a new helper file in `helpers/`.
2. Extend `AbstractHelper` if it needs API access.
3. Export in `helpers/index.ts` and add to `ApiHelpers`.

### Error Handling

- Use the error utilities in `errors/` for consistent error parsing and translation.
- Services should catch and process errors using the base `Service` class methods.

### Testing

- Unit test helpers and services in isolation.
- Use mock API clients for testing business logic.

---

For detailed documentation on each submodule, see the README in each respective directory (to be created if missing).
