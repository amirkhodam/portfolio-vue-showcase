# Helpers Module

This directory contains utility classes that encapsulate business logic and cross-service workflows for the API layer.

## Helpers Overview

- **AbstractHelper**: Base class for helpers that require API access.
- **UserHelper**: Bulk user invite, user creation, and workspace user management.
- **WorkspaceHelper**: Workspace creation, avatar management, and utility functions.
- **MapHelper**: Geolocation utilities for user location.
- **ScheduleHelper**: Schedule management and time utilities.
- **CameraHelper**: Camera creation and bridge integration.

## Usage Example
```ts
import { ApiClient } from '@/lib/api'
import { UserHelper } from '@/lib/api/helpers/user-helper'

const apiClient = new ApiClient('https://api.example.com')
const userHelper = new UserHelper(apiClient)
await userHelper.inviteUser(workspaceId, userData)
```

## Development
- Extend `AbstractHelper` for new helpers that need API access.
- Export new helpers in `index.ts` and add to `ApiHelpers` if needed.
- Keep helpers focused on business logic, not direct HTTP calls (use services for that). 