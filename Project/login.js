const API = "http://localhost:8000";

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      document.getElementById("error-msg").textContent = err.detail;
      document.getElementById("error-msg").classList.remove("d-none");
      return;
    }

    const data = await res.json();
    localStorage.setItem("token", data.access_token);
    const meRes = await fetch(`${API}/me`, {
      headers: { Authorization: `Bearer ${data.access_token}` },
    });
    const me = await meRes.json();
    localStorage.setItem("role", me.role);
    window.location.href = "index.html";
  } catch (err) {
    console.log(err);
  }
});
