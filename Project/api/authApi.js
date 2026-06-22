import { API } from "./config.js";

export async function login(email, password) {
  return fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

export async function register(name, email, password) {
  return fetch(`${API}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
}

export async function fetchMe(token) {
  const res = await fetch(`${API}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
