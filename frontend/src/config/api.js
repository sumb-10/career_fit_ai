export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"
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
