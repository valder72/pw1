import { API } from "../api/config.js";
import { NewsItem } from "../models/NewsItem.js";

export function renderNews(news, container) {
  container.className = "row g-3";
  container.textContent = "";

  if (news.length === 0) {
    container.className = "text-center mt-4";
    const msg = document.createElement("h4");
    msg.textContent = "Нічого не знайдено, спробуйте інший запит.";
    container.append(msg);
    return;
  }

  for (const raw of news) {
    const item = new NewsItem(raw.id, raw.title, raw.content, raw.img);

    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-md-3";

    const card = document.createElement("div");
    card.className = "card h-100";

    const img = document.createElement("img");
    img.src = `${API}/${item.img}`;
    img.className = "card-img-top";
    img.alt = "Зображення новини";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body d-flex flex-column";

    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = item.title;

    const textShort = document.createElement("p");
    textShort.className = "card-text";
    textShort.textContent = item.shortContent;

    const btn = document.createElement("button");
    btn.className = "btn btn-sm btn-outline-danger mt-auto";
    btn.type = "button";
    btn.setAttribute("data-bs-toggle", "collapse");
    btn.setAttribute("data-bs-target", `#news-${item.id}`);
    btn.textContent = "Детальніше";

    const collapseDiv = document.createElement("div");
    collapseDiv.className = "collapse mt-2";
    collapseDiv.id = `news-${item.id}`;

    const textFull = document.createElement("p");
    textFull.className = "card-text";
    textFull.textContent = item.content;

    collapseDiv.append(textFull);
    cardBody.append(title, textShort, btn, collapseDiv);
    card.append(img, cardBody);
    col.append(card);
    container.append(col);
  }
}

export function renderError(container, message) {
  container.textContent = "";
  container.className = "text-center mt-4";
  const alertBox = document.createElement("div");
  alertBox.className = "alert alert-danger w-75 mx-auto";
  alertBox.setAttribute("role", "alert");
  alertBox.textContent = message;
  container.append(alertBox);
}

export function renderPostOptions(news, select) {
  select.textContent = "";
  for (const item of news) {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.title;
    select.append(option);
  }
}
