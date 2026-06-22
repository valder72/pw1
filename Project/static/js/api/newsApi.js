import { API } from "../config.js";

export async function fetchNews(search = "") {
  const url = search
    ? `${API}/news?search=${encodeURIComponent(search)}`
    : `${API}/news`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function fetchNewsById(id) {
  const res = await fetch(`${API}/news/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function createNews(formData, token) {
  return fetch(`${API}/news`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
}

export async function updateNews(id, formData, token) {
  return fetch(`${API}/news/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
}

export async function deleteNews(id, token) {
  return fetch(`${API}/news/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}
