export function renderComments(comments, list) {
  list.textContent = "";

  if (comments.length === 0) {
    const p = document.createElement("p");
    p.className = "text-center text-muted mt-3";
    p.textContent = "Відгуків поки немає. Будьте першим!";
    list.append(p);
    return;
  }

  for (const c of comments) {
    const card = document.createElement("div");
    card.className = "card mb-3 shadow-sm";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = c.author;
    title.style.color = "#05f519"

    const newsTitle = document.createElement("h6");
    newsTitle.className = "card-subtitle mb-2 text-muted";
    newsTitle.textContent = `До новини: ${c.news_title}`;
    newsTitle.style.color = "#54c0d1"

    const message = document.createElement("p");
    message.className = "card-text mt-3";
    message.textContent = c.message;

    cardBody.append(title, newsTitle, message);
    card.append(cardBody);
    list.append(card);
  }
}

export function renderCommentsError(list, message) {
  list.textContent = "";
  const alertBox = document.createElement("div");
  alertBox.className = "alert alert-danger text-center";
  alertBox.setAttribute("role", "alert");
  alertBox.textContent = message;
  list.append(alertBox);
}
