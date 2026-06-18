const API = "http://localhost:8000";

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token || role !== "admin") {
  window.location.href = "index.html";
}

const form = document.querySelector("#news-form");
const formTitle = document.querySelector("#form-title");
const submitBtn = document.querySelector("#submit-btn");
const cancelBtn = document.querySelector("#cancel-btn");
const imageInput = document.querySelector("#image");

async function loadNews() {
  const res = await fetch(`${API}/news`);
  const news = await res.json();
  const list = document.querySelector("#news-list");

  list.textContent = "";

  for (const item of news) {
    const col = document.createElement("div");
    col.className = "col-12 col-md-6";

    const card = document.createElement("div");
    card.className = "card h-100";

    const img = document.createElement("img");
    img.src = `${API}/${item.img}`;
    img.className = "card-img-top";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = item.title;

    const text = document.createElement("p");
    text.className = "card-text";
    text.textContent = item.content.length > 100 ? item.content.substring(0, 100) + "..." : item.content;

    cardBody.append(title, text);

    const cardFooter = document.createElement("div");
    cardFooter.className = "card-footer d-flex gap-2";

    const btnEdit = document.createElement("button");
    btnEdit.className = "btn btn-outline-light btn-sm";
    btnEdit.dataset.edit = item.id;
    btnEdit.textContent = "Редагувати";

    const btnDelete = document.createElement("button");
    btnDelete.className = "btn btn-danger btn-sm";
    btnDelete.dataset.delete = item.id;
    btnDelete.textContent = "Видалити";

    cardFooter.append(btnEdit, btnDelete);
    card.append(img, cardBody, cardFooter);
    col.append(card);
    list.append(col);
  }
}

function resetForm() {
  form.reset();
  document.querySelector("#news-id").value = "";
  imageInput.required = true;
  formTitle.textContent = "Створити новину";
  submitBtn.textContent = "Створити";
  cancelBtn.classList.add("d-none");
}

async function editNews(id) {
  const res = await fetch(`${API}/news/${id}`);
  const item = await res.json();

  document.querySelector("#news-id").value = item.id;
  document.querySelector("#title").value = item.title;
  document.querySelector("#content").value = item.content;

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

  const id = document.querySelector("#news-id").value;

  const formData = new FormData();
  formData.append("title", document.querySelector("#title").value);
  formData.append("content", document.querySelector("#content").value);

  const image = imageInput.files[0];
  if (image) formData.append("img", image);

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

document.querySelector("#news-list").addEventListener("click", (e) => {
  if (e.target.dataset.edit) editNews(e.target.dataset.edit);
  if (e.target.dataset.delete) deleteNews(e.target.dataset.delete);
});

cancelBtn.addEventListener("click", resetForm);

loadNews();