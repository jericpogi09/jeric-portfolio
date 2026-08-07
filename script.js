const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isVisible = navLinks.getAttribute('data-visible') === 'true';
    navLinks.setAttribute('data-visible', String(!isVisible));
    navToggle.setAttribute('aria-expanded', String(!isVisible));
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (navLinks && navToggle && navLinks.getAttribute('data-visible') === 'true') {
        navLinks.setAttribute('data-visible', 'false');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

const modalOverlay = document.querySelector('.modal-overlay');
const certificateFile = document.getElementById('certificate-file');
const certificateTitle = document.getElementById('certificate-title');
const closeModalButton = document.querySelector('.modal-close');
const viewCertificateButtons = document.querySelectorAll('.view-certificate');

const resetModal = () => {
  if (!certificateFile) return;
  certificateFile.innerHTML = '<p class="modal-placeholder">Select a certificate below to view it here.</p>';
};

const closeModal = () => {
  if (!modalOverlay) return;
  modalOverlay.style.display = 'none';
  resetModal();
};

viewCertificateButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const src = button.dataset.src;
    const title = button.dataset.title || 'Certificate preview';

    if (!modalOverlay || !certificateFile || !certificateTitle) return;

    certificateTitle.textContent = title;
    certificateFile.innerHTML = '';

    const extension = src.split('.').pop().toLowerCase();
    const fileWrapper = document.createElement('div');
    fileWrapper.className = 'certificate-file';

    if (extension === 'pdf') {
      const iframe = document.createElement('iframe');
      iframe.src = src.includes('#') ? src : `${src}#zoom=page-width`;
      iframe.title = title;
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      fileWrapper.appendChild(iframe);
    } else {
      const img = document.createElement('img');
      img.src = src;
      img.alt = title;
      img.style.width = '100%';
      img.style.height = '100%';
      fileWrapper.appendChild(img);
    }

    certificateFile.appendChild(fileWrapper);
    modalOverlay.style.display = 'grid';
  });
});

closeModalButton?.addEventListener('click', closeModal);
modalOverlay?.addEventListener('click', (event) => {
  if (event.target === modalOverlay) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modalOverlay && !modalOverlay.hidden) {
    closeModal();
  }
});
