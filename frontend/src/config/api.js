const runtimeApiBaseUrl = globalThis.window?.__APP_CONFIG__?.API_BASE_URL;

export const API_BASE_URL = (
  runtimeApiBaseUrl || import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"
).replace(/\/$/, "");

export function buildApiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

export const API_ENDPOINTS = {
  health: buildApiUrl("/health"),
  jobs: buildApiUrl("/jobs"),
  analyze: buildApiUrl("/analyze"),
  analyzeStream: buildApiUrl("/analyze/stream"),
};
