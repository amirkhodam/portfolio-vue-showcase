import type { ApiClient } from "../api.client";

export abstract class AbstractHelper {
  constructor(protected readonly apiClient: ApiClient) {}
}
