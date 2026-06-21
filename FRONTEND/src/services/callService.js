const API_BASE = import.meta.env.VITE_API_BASE ?? "/api";

async function fetchJson(endpoint, init = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, init);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function getCallList(init) {
  return fetchJson("/calls", init);
}

export async function getCallById(callId, init) {
  return fetchJson(`/calls/${callId}`, init);
}
