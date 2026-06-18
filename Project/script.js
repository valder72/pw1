const API = "http://localhost:8000";

function renderNews(news, container) {
  container.className = "row g-3";
  container.textContent = "";

  if (news.length === 0) {
    container.className = "text-center mt-4";
    const msg = document.createElement("h4");
    msg.textContent = "Нічого не знайдено, спробуйте інший запит.";
    container.append(msg);
    return;
  }

  for (const item of news) {
    const short =
      item.content.length > 100
        ? item.content.slice(0, 100) + "…"
        : item.content;

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
    textShort.textContent = short;

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

async function loadNews() {
  const container = document.querySelector("#news-container");
  const spinner = document.querySelector("#spinner");
  
  if (spinner) spinner.classList.remove("d-none");

  try {
    const res = await fetch(`${API}/news`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const news = await res.json();
    renderNews(news, container);
  } catch (err) {

    console.error("Помилка з'єднання:", err); 
    
    container.textContent = ""; 
    container.className = "text-center mt-4";
    const alertBox = document.createElement("div");
    alertBox.className = "alert alert-danger w-75 mx-auto";
    alertBox.setAttribute("role", "alert");
    
    if (err.message === "Failed to fetch") {
      alertBox.textContent = "Немає підключення до інтернету або сервер недоступний. Перевірте з'єднання.";
    } else {
      alertBox.textContent = "Сталася помилка при завантаженні новин. Спробуйте пізніше.";
    }

    container.append(alertBox);
  } finally {
    if (spinner) spinner.classList.add("d-none");
  }
}

async function loadPostOptions() {
  try {
    const res = await fetch(`${API}/news`);
    const news = await res.json();
    const select = document.querySelector("#post-select");

    select.textContent = "";

    for (const item of news) {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = item.title;
      select.append(option);
    }
  } catch (err) {
    console.log(err);
  } 
}

async function loadComments() {
  const list = document.querySelector("#comments-list");
  const spinner = document.querySelector("#comments-spinner");

  if (spinner) spinner.classList.remove("d-none");

  try {
    const res = await fetch(`${API}/feedback`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const comments = await res.json();

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
      title.className = "card-title text-danger";
      title.textContent = c.author;

      const newsTitle = document.createElement("h6");
      newsTitle.className = "card-subtitle mb-2 text-muted";
      newsTitle.textContent = `До новини: ${c.news_title}`;

      const message = document.createElement("p");
      message.className = "card-text mt-3";
      message.textContent = c.message;

      cardBody.append(title, newsTitle, message);
      card.append(cardBody);
      list.append(card);
    }
  } catch (err) {
    console.error(err);

    list.textContent = "";

    const alertBox = document.createElement("div");
    alertBox.className = "alert alert-danger text-center";
    alertBox.setAttribute("role", "alert");

    if (err.message === "Failed to fetch") {
      alertBox.textContent = "Немає підключення до інтернету. Перевірте з'єднання.";
    } else {
      alertBox.textContent = "Сталася помилка при завантаженні відгуків. Спробуйте пізніше.";
    }

    list.append(alertBox);
  } finally {
    if (spinner) spinner.classList.add("d-none");
  }
}

function checkAuth() {
  const token = localStorage.getItem("token");
  const loginBtn = document.querySelector("#login-btn");

  if (token) {
    loginBtn.textContent = "Вийти";
    loginBtn.href = "#";
    loginBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.reload();
    });
  }
}

checkAuth();
loadNews();
loadPostOptions();
loadComments();

setInterval(() => {
  if (!document.querySelector("#search-input").value.trim()) loadNews();
  loadComments();
}, 20000);

document.querySelector("#feedback-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  const newsId = document.querySelector("#post-select").value;
  const message = document.querySelector("#message").value;

  try {
    const res = await fetch(`${API}/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ news_id: Number(newsId), message }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    document.querySelector("#message").value = "";
    loadComments();

    const successMsg = document.createElement("p");
    successMsg.textContent = "Відгук надіслано!";
    successMsg.className = "text-success mt-2";
    document.querySelector("#feedback-form").append(successMsg);

    setTimeout(() => successMsg.remove(), 3000);
  } catch (err) {
    console.log(err);
  }
});

document.querySelector("#search-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = document.querySelector("#search-input").value.trim();
  const searchBtn = document.querySelector("#search-button");
  const container = document.querySelector("#news-container");

  searchBtn.disabled = true;
  searchBtn.textContent = "";

  const spinner = document.createElement("span");
  spinner.className = "spinner-border spinner-border-sm";
  spinner.setAttribute("aria-hidden", "true");

  searchBtn.append(spinner);
  searchBtn.append(" Пошук...");

  try {
    const res = await fetch(`${API}/news?search=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    const news = await res.json();
    renderNews(news, container);
  } catch (err) {
    console.error(err);
    container.className = "text-center mt-4";
    container.textContent = "";

    const alertBox = document.createElement("div");
    alertBox.className = "alert alert-danger";
    alertBox.setAttribute("role", "alert");
    alertBox.textContent = "Не вдалося завантажити дані, зачекайте будь ласка.";

    container.append(alertBox);
  } finally {
    searchBtn.disabled = false;
    searchBtn.textContent = "Пошук";
  }
});

document.querySelector("#quiz-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const answers = { q1: "b", q2: "c", q3: "a" };
  let score = 0;

  for (const q in answers) {
    const picked = document.querySelector(`input[name="${q}"]:checked`);
    if (picked && picked.value === answers[q]) score++;
  }

  const result = document.querySelector("#quiz-result");
  result.textContent = `Ваш результат: ${score} з 3`;
  result.className =
    score === 3 ? "mt-3 fw-bold text-success" : "mt-3 fw-bold text-danger";
});