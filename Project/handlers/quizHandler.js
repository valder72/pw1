import { renderQuizResult } from "../ui/quizUI.js";

const ANSWERS = { q1: "b", q2: "c", q3: "a" };

export function initQuiz(form, resultEl) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let score = 0;

    for (const q in ANSWERS) {
      const picked = form.querySelector(`input[name="${q}"]:checked`);
      if (picked && picked.value === ANSWERS[q]) score++;
    }

    renderQuizResult(resultEl, score, Object.keys(ANSWERS).length);
  });
}
