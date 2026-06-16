const API = "http://localhost:8000";

async function loadNews() {
  const spinner = document.getElementById("spinner");
  spinner.classList.remove("d-none");

  try {
    const res = await fetch(`${API}/news`);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const news = await res.json();

    const container = document.getElementById("news-container");

    if (news.length === 0) {
      container.className = "text-center";
      container.innerHTML = "<p>Новин поки немає</p>";
      return;
    }

    for (const item of news) {
      const col = document.createElement("div");
      col.className = "col-12 col-sm-6 col-md-3";
      col.innerHTML = `
                <div class="card h-100">
                    <img src="${API}/${item.img}" class="card-img-top">
                    <div class="card-body">
                        <h3 class="card-title">${item.title}</h3>
                        <p class="card-text">${item.content}</p>
                    </div>
                </div>
            `;
      container.append(col);
    }
  } catch (err) {
    console.log(err);
  } finally {
    spinner.classList.add("d-none");
  }
}

async function loadPostOptions() {
  try {
    const res = await fetch(`${API}/news`);
    const news = await res.json();
    const select = document.getElementById("post-select");

    select.innerHTML = "";
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
  try {
    const res = await fetch(`${API}/feedback`);
    const comments = await res.json();
    const list = document.getElementById("comments-list");

    list.innerHTML = "";

    if (comments.length === 0) {
      list.innerHTML = "<p class='text-center'>Відгуків поки немає</p>";
      return;
    }

    for (const c of comments) {
      const card = document.createElement("div");
      card.className = "card mb-3";
      card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${c.author}</h5>
          <p class="news-title mb-2">Новина: ${c.news_title}</p>
          <p class="card-text">${c.message}</p>
        </div>
      `;
      list.append(card);
    }
  } catch (err) {
    console.log(err);
  }
}

function checkAuth() {
  const token = localStorage.getItem("token");
  const loginBtn = document.getElementById("login-btn");

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

document
  .getElementById("feedback-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "login.html";
      return;
    }

    const newsId = document.getElementById("post-select").value;
    const message = document.getElementById("message").value;

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

      document.getElementById("message").value = "";
      loadComments();

      const successMsg = document.createElement("p");
      successMsg.textContent = "Відгук надіслано!";
      successMsg.className = "text-success mt-2";
      document.getElementById("feedback-form").append(successMsg);

      setTimeout(() => successMsg.remove(), 3000);
    } catch (err) {
      console.log(err);
    }
  });

document.getElementById("search-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const query = document.getElementById("search-input").value.toLowerCase();
  const cards = document.querySelectorAll("#news-container .col-12");

  cards.forEach((card) => {
    const title = card.querySelector(".card-title").textContent.toLowerCase();
    card.style.display = title.includes(query) ? "block" : "none";
  });
});