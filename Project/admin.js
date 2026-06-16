const API = "http://localhost:8000";

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token || role !== "admin") {
  window.location.href = "index.html";
}

const form = document.getElementById("news-form");
const formTitle = document.getElementById("form-title");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");
const imageInput = document.getElementById("image");

async function loadNews() {
  const res = await fetch(`${API}/news`);
  const news = await res.json();
  const list = document.getElementById("news-list");

  list.innerHTML = "";

  for (const item of news) {
    const col = document.createElement("div");
    col.className = "col-12 col-md-6";
    col.innerHTML = `
      <div class="card h-100">
        <img src="${API}/${item.img}" class="card-img-top" />
        <div class="card-body">
          <h3 class="card-title">${item.title}</h3>
          <p class="card-text">${item.content}</p>
        </div>
        <div class="card-footer d-flex gap-2">
          <button class="btn btn-outline-light btn-sm" data-edit="${item.id}">
            Редагувати
          </button>
          <button class="btn btn-danger btn-sm" data-delete="${item.id}">
            Видалити
          </button>
        </div>
      </div>
    `;
    list.append(col);
  }
}

function resetForm() {
  form.reset();
  document.getElementById("news-id").value = "";
  imageInput.required = true;
  formTitle.textContent = "Створити новину";
  submitBtn.textContent = "Створити";
  cancelBtn.classList.add("d-none");
}

async function editNews(id) {
  const res = await fetch(`${API}/news/${id}`);
  const item = await res.json();

  document.getElementById("news-id").value = item.id;
  document.getElementById("title").value = item.title;
  document.getElementById("content").value = item.content;

  imageInput.required = false;
  formTitle.textContent = "Редагувати новину";
  submitBtn.textContent = "Зберегти";
  cancelBtn.classList.remove("d-none");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function deleteNews(id) {
  const res = await fetch(`${API}/news/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) loadNews();
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("news-id").value;

  const formData = new FormData();
  formData.append("title", document.getElementById("title").value);
  formData.append("content", document.getElementById("content").value);

  const image = imageInput.files[0];
  if (image) formData.append("img", image);

  // Якщо є id — оновлюємо (PUT), якщо немає — створюємо (POST)
  const url = id ? `${API}/news/${id}` : `${API}/news`;
  const method = id ? "PUT" : "POST";

  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (res.ok) {
    resetForm();
    loadNews();
  }
});

document.getElementById("news-list").addEventListener("click", (e) => {
  if (e.target.dataset.edit) editNews(e.target.dataset.edit);
  if (e.target.dataset.delete) deleteNews(e.target.dataset.delete);
});

cancelBtn.addEventListener("click", resetForm);

loadNews();