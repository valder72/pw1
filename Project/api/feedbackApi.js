import { API } from "./config.js";

export async function fetchFeedback() {
  const res = await fetch(`${API}/feedback`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function sendFeedback(newsId, message, token) {
  return fetch(`${API}/feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ news_id: Number(newsId), message }),
  });
}
