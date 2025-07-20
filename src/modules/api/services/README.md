# Services Module

This directory contains all service classes for direct API interaction. Each service corresponds to a backend domain (e.g., camera, workspace, activity-log).

## Structure

- **service.ts**: Base class for all services. Handles HTTP requests, error parsing, and header management.
- **service.interface.ts**: Enum for service scopes/domains.
- Subdirectories: Each backend domain (e.g., camera-manager, ai, activity-log, etc.) contains its own service implementation.

## Usage Example

```ts
import { ApiClient } from '@/lib/api'
const apiClient = new ApiClient('https://api.example.com')
const cameras = await apiClient.camera.get('/cameras')
```

## Adding a New Service

1. Create a new directory for your domain (e.g., `my-service/`).
2. Implement your service class, extending `Service` from `service.ts`.
3. Export your service in `index.ts`.
4. Add an instance in `ApiClient` if it should be globally accessible.

## Development Notes

- Use the base `Service` class for consistent error handling and HTTP logic.
- Use the `Scopes` enum for defining service domains.
- Services should be stateless and reusable.
