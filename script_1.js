const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

let currentIndex = 0;
let visibleItems = [];

// Filter Gallery
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      if (filter === 'all' || item.classList.contains(filter)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Open Lightbox
galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    visibleItems = Array.from(document.querySelectorAll('.gallery-item'))
      .filter(i => i.style.display !== 'none');

    currentIndex = visibleItems.indexOf(item);
    showLightbox(currentIndex);
  });
});

function showLightbox(index) {
  const img = visibleItems[index].querySelector('img');
  lightboxImg.src = img.src;
  lightbox.style.display = 'flex';
}

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Navigation
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % visibleItems.length;
  showLightbox(currentIndex);
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  showLightbox(currentIndex);
});
