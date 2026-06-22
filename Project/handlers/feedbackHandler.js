import { fetchFeedback, sendFeedback } from "../api/feedbackApi.js";
import { renderComments, renderCommentsError } from "../ui/commentsUI.js";
import { getToken } from "../storage/storage.js";

export async function loadComments(list, spinner) {
  if (spinner) spinner.classList.remove("d-none");
  try {
    const comments = await fetchFeedback();
    renderComments(comments, list);
  } catch (err) {
    console.error(err);
    renderCommentsError(
      list,
      err.message === "Failed to fetch"
        ? "Немає підключення до інтернету. Перевірте з'єднання."
        : "Сталася помилка при завантаженні відгуків. Спробуйте пізніше."
    );
  } finally {
    if (spinner) spinner.classList.add("d-none");
  }
}

export function initFeedbackForm(form, {selectEl, messageEl, commentsList, commentsSpinner}) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const token = getToken();

    if (!token) {
      window.location.href = "login.html";
      return;
    }

    try {
      const res = await sendFeedback(selectEl.value, messageEl.value, token);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      messageEl.value = "";
      loadComments(commentsList, commentsSpinner);

      const successMsg = document.createElement("p");
      successMsg.textContent = "Відгук надіслано!";
      successMsg.className = "text-success mt-2";
      form.append(successMsg);
      setTimeout(() => successMsg.remove(), 3000);
    } catch (err) {
      console.log(err);
    }
  });
}
