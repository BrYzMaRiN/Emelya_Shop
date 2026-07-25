// Emelya Shop — Catalog JS (multi-image gallery)
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.catalog-card');
  const modal = document.querySelector('.modal');
  const modalMainImg = document.querySelector('.modal-main-img img');
  const modalThumbs = document.querySelector('.modal-thumbs');
  const modalCategory = document.querySelector('.modal-cat');
  const modalTitle = document.querySelector('.modal-title');
  const modalDesc = document.querySelector('.modal-desc');
  const modalClose = document.querySelector('.modal-close');
  let currentImages = [];
  let currentIndex = 0;

  // Filters
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Build image list for a card
  function getCardImages(card) {
    const mainImg = card.querySelector('.catalog-card-img img');
    const images = [mainImg.src];
    const extraAttr = card.dataset.images;
    if (extraAttr) {
      extraAttr.split(',').forEach(src => {
        const trimmed = src.trim();
        if (trimmed) images.push(trimmed);
      });
    }
    return images;
  }

  // Render thumbnails
  function renderThumbs(images) {
    modalThumbs.innerHTML = '';
    if (images.length <= 1) return;

    images.forEach((src, i) => {
      const thumb = document.createElement('button');
      thumb.className = 'modal-thumb' + (i === 0 ? ' active' : '');
      thumb.innerHTML = '<img src="' + src + '" alt="">';
      thumb.addEventListener('click', () => {
        currentIndex = i;
        updateMainImage();
      });
      modalThumbs.appendChild(thumb);
    });
  }

  // Update main image
  function updateMainImage() {
    modalMainImg.src = currentImages[currentIndex];
    modalMainImg.alt = modalTitle.textContent;
    const thumbs = modalThumbs.querySelectorAll('.modal-thumb');
    thumbs.forEach((t, i) => t.classList.toggle('active', i === currentIndex));
  }

  // Modal open
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const badge = card.querySelector('.catalog-badge');
      const category = badge ? badge.textContent : '';
      const title = card.querySelector('.catalog-card-title').textContent;
      const desc = card.querySelector('.catalog-card-desc').textContent;

      currentImages = getCardImages(card);
      currentIndex = 0;

      modalMainImg.src = currentImages[0];
      modalMainImg.alt = title;
      modalCategory.textContent = category;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;

      renderThumbs(currentImages);

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => {
    if (!modal || !modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight' && currentImages.length > 1) {
      currentIndex = (currentIndex + 1) % currentImages.length;
      updateMainImage();
    }
    if (e.key === 'ArrowLeft' && currentImages.length > 1) {
      currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
      updateMainImage();
    }
  });

  // Apply filter from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const filterParam = urlParams.get('filter');
  if (filterParam) {
    const targetBtn = document.querySelector('.filter-btn[data-filter="' + filterParam + '"]');
    if (targetBtn) {
      targetBtn.click();
    }
  }
});
