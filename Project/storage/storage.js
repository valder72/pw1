export function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getItem(key, fallback = null) {
  const raw = localStorage.getItem(key);
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function removeItem(key) {
  localStorage.removeItem(key);
}

export function setAuth(token, role) {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function getRole() {
  return localStorage.getItem("role");
}

export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
}
