import { fetchNewsById, createNews, updateNews, deleteNews, fetchNews } from "../api/newsApi.js";
import { renderAdminNews, fillFormForEdit, resetAdminForm } from "../ui/adminUI.js";
import { getToken, getRole } from "../storage/storage.js";

export function guardAdmin() {
  const token = getToken();
  const role = getRole();
  if (!token || role !== "admin") {
    window.location.href = "index.html";
  }
  return token;
}

export function initAdminPage() {
  const token = guardAdmin();

  const form = document.querySelector("#news-form");
  const list = document.querySelector("#news-list");
  const els = {
    idInput: document.querySelector("#news-id"),
    titleInput: document.querySelector("#title"),
    contentInput: document.querySelector("#content"),
    imageInput: document.querySelector("#image"),
    formTitle: document.querySelector("#form-title"),
    submitBtn: document.querySelector("#submit-btn"),
    cancelBtn: document.querySelector("#cancel-btn"),
  };

  async function reload() {
    const news = await fetchNews();
    renderAdminNews(news, list);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = els.idInput.value;

    const formData = new FormData();
    formData.append("title", els.titleInput.value);
    formData.append("content", els.contentInput.value);
    const image = els.imageInput.files[0];
    if (image) formData.append("img", image);

    const res = id
      ? await updateNews(id, formData, token)
      : await createNews(formData, token);

    if (res.ok) {
      resetAdminForm(form, els);
      reload();
    }
  });

  list.addEventListener("click", async (e) => {
    if (e.target.dataset.edit) {
      const item = await fetchNewsById(e.target.dataset.edit);
      fillFormForEdit(item, els);
    }
    if (e.target.dataset.delete) {
      const res = await deleteNews(e.target.dataset.delete, token);
      if (res.ok) reload();
    }
  });

  els.cancelBtn.addEventListener("click", () => resetAdminForm(form, els));

  reload();
}
