document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.menu a');

  links.forEach(link => {
    link.addEventListener('mouseenter', function () {
      this.classList.add('hovered');
    });
    link.addEventListener('mouseleave', function () {
      this.classList.remove('hovered');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyE') {
      document.querySelector('h1').classList.toggle('glow');
    }
  });
});