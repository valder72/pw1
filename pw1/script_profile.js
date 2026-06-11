document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.createElement('button');
  themeBtn.textContent = 'Світла тема';
  themeBtn.id = 'theme-toggle';
  document.body.appendChild(themeBtn);

  const homeBtn = document.createElement('a');
  homeBtn.textContent = 'На головну';
  homeBtn.href = 'index.html';
  homeBtn.id = 'home-toggle';
  document.body.appendChild(homeBtn);

  themeBtn.addEventListener('click', function () {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    this.textContent = isLight ? 'Темна тема' : 'Світла тема';
  });

  homeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = homeBtn.href;
  });

  const headings = document.querySelectorAll('.toggle-heading');
  headings.forEach(heading => {
    const section = heading.nextElementSibling;
    section.classList.add('hidden');
    heading.addEventListener('click', () => {
      section.classList.toggle('hidden');
    });
  });
});