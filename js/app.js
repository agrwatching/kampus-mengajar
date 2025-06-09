const pages = ['home', 'about', 'contact'];
let currentPage = 'home';
let isAnimating = false;

function loadHTMLWithAnimation(newPage, isInitial = false) {
  if (isAnimating || (newPage === currentPage && !isInitial)) return;
  isAnimating = true;

  const mainContent = document.getElementById('main-content');
  const currentIndex = pages.indexOf(currentPage);
  const newIndex = pages.indexOf(newPage);
  const direction = isInitial ? 'right' : (newIndex > currentIndex ? 'right' : 'left');

  const outgoing = mainContent.firstElementChild;
  const incoming = document.createElement('div');

  incoming.classList.add(
    'absolute', 'top-0', 'left-0', 'w-full', 'h-full',
    'transition-transform', 'duration-500', 'ease-in-out',
    direction === 'right' ? 'translate-x-full' : '-translate-x-full'
  );

  fetch(`partials/${newPage}.html`)
    .then(res => res.text())
    .then(html => {
      incoming.innerHTML = html;
      mainContent.appendChild(incoming);

      requestAnimationFrame(() => {
        // Animasi masuk: dari kanan/ kiri ke tengah (translate-x-0)
        incoming.classList.remove('translate-x-full', '-translate-x-full');
        incoming.classList.add('translate-x-0');

        if (outgoing && !isInitial) {
          outgoing.classList.add('transition-transform', 'duration-500', 'ease-in-out');
          // Animasi keluar: dari tengah ke kiri/ kanan
          outgoing.classList.add(direction === 'right' ? '-translate-x-full' : 'translate-x-full');
        }
      });

      setTimeout(() => {
        if (outgoing && !isInitial) mainContent.removeChild(outgoing);
        currentPage = newPage;
        isAnimating = false;
      }, 500);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('partials/navbar.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('navbar').innerHTML = html;
    });

  // Load halaman home otomatis dengan animasi masuk
  loadHTMLWithAnimation('home', true);
});

document.addEventListener('click', e => {
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    const page = e.target.getAttribute('data-link');
    if (page !== currentPage) loadHTMLWithAnimation(page);
  }
});
