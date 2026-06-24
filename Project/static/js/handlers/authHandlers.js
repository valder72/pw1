import { login, register, fetchMe } from "../api/authApi.js";
import { setAuth, getToken, clearAuth } from "../storage/storage.js";

export function checkAuthNav(loginBtn) {
  const token = getToken();
  if (token) {
    loginBtn.textContent = "Вийти";
    loginBtn.href = "#";
    loginBtn.addEventListener("click", () => {
      clearAuth();
      window.location.reload();
    });
  }
}

export function initLoginForm(form, errorEl) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = form.querySelector("#email").value;
    const password = form.querySelector("#password").value;

    try {
      const res = await login(email, password);

      if (!res.ok) {
        const err = await res.json();
        errorEl.textContent = err.detail;
        errorEl.classList.remove("d-none");
        return;
      }

      const data = await res.json();
      const me = await fetchMe(data.access_token);
      setAuth(data.access_token, me.role);
      window.location.href = "index.html";
    } catch (err) {
      console.log(err);
    }
  });
}

export function initRegisterForm(form, errorEl) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = form.querySelector("#username").value;
    const email = form.querySelector("#email").value;
    const password = form.querySelector("#password").value;

    try {
      const res = await register(name, email, password);

      if (!res.ok) {
        const err = await res.json();

        let errorMessage = "Помилка реєстрації";

        if (Array.isArray(err.detail)) {
          errorMessage = err.detail
            .map((e) => {
              const field = e.loc ? e.loc[e.loc.length - 1] : "Помилка";
              return `${field}: ${e.msg}`;
            })
            .join("\n");
        } else if (typeof err.detail === "string") {
          errorMessage = err.detail;
        }

        errorEl.textContent = errorMessage;
        errorEl.classList.remove("d-none");
        return;
      }

      window.location.href = "login.html";
    } catch (err) {
      console.log(err);
      errorEl.textContent = "Помилка з'єднання з сервером";
      errorEl.classList.remove("d-none");
    }
  });
}
