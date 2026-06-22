import { fetchNews } from "../api/newsApi.js";
import { renderNews, renderError, renderPostOptions } from "../ui/newsUI.js";

export async function loadNews(container, spinner) {
  if (spinner) spinner.classList.remove("d-none");
  try {
    const news = await fetchNews();
    renderNews(news, container);
  } catch (err) {
    console.error("Помилка з'єднання:", err);
    renderError(
      container,
      err.message === "Failed to fetch"
        ? "Немає підключення до інтернету або сервер недоступний. Перевірте з'єднання."
        : "Сталася помилка при завантаженні новин. Спробуйте пізніше."
    );
  } finally {
    if (spinner) spinner.classList.add("d-none");
  }
}

export async function searchNews(query, container) {
  try {
    const allNews = await fetchNews();
    const lowerQuery = query.toLowerCase();

    const filteredNews = allNews.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) || 
      item.content.toLowerCase().includes(lowerQuery)
    );

    renderNews(filteredNews, container);
  } catch (err) {
    console.error(err);
    renderError(container, "Не вдалося завантажити дані, зачекайте будь ласка.");
  }
}

export async function loadPostOptions(select) {
  try {
    const news = await fetchNews();
    renderPostOptions(news, select);
  } catch (err) {
    console.log(err);
  }
}
