export function renderQuizResult(resultEl, score, total) {
  resultEl.textContent = `Ваш результат: ${score} з ${total}`;
  resultEl.className =
    score === total ? "mt-3 fw-bold text-success" : "mt-3 fw-bold text-danger";
}
