import { API } from "../api/config.js";

export function renderAdminNews(news, list) {
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
    text.textContent =
      item.content.length > 100 ? item.content.substring(0, 100) + "..." : item.content;

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

export function fillFormForEdit(item, els) {
  els.idInput.value = item.id;
  els.titleInput.value = item.title;
  els.contentInput.value = item.content;
  els.imageInput.required = false;
  els.formTitle.textContent = "Редагувати новину";
  els.submitBtn.textContent = "Зберегти";
  els.cancelBtn.classList.remove("d-none");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function resetAdminForm(form, els) {
  form.reset();
  els.idInput.value = "";
  els.imageInput.required = true;
  els.formTitle.textContent = "Створити новину";
  els.submitBtn.textContent = "Створити";
  els.cancelBtn.classList.add("d-none");
}
