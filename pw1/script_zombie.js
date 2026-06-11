document.addEventListener("DOMContentLoaded", () => {
  const homeBtn = document.createElement("a");
  homeBtn.textContent = "На головну";
  homeBtn.href = "index.html";
  homeBtn.id = "home-toggle";
  document.body.appendChild(homeBtn);

  homeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = homeBtn.href;
  });

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Пошук за описом...";
  searchInput.id = "zombie-search";
  document.querySelector("h1").after(searchInput);

  const zombieCards = document.querySelectorAll(".zombie-card");

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();

    zombieCards.forEach((card) => {
      const text = card.querySelector("p").textContent.toLowerCase();
      
      if (text.includes(query)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
});