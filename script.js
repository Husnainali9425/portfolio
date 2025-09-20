/* script.js
   Small interactive behavior:
   - mobile nav toggle
   - project modal open/close via dataset
   - contact form submit (Formspree optional) + mailto fallback
   - copy email button
   - fill current year
*/

(() => {
  // Config: if you have a Formspree form ID, paste it here (e.g. 'xyznabc')
  const FORM_SPPREE_ID = ''; // set to 'your-id' to enable fetch to formspree

  // DOM refs
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');
  const projectCards = Array.from(document.querySelectorAll('.project-card'));
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalImage = document.getElementById('modal-image');
  const modalLive = document.getElementById('modal-live');
  const modalClose = document.getElementById('modal-close');
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const copyEmailBtn = document.getElementById('copy-email');
  const mailtoLink = document.getElementById('mailto');
  const yearEl = document.getElementById('year');

  // Fill current year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    navList.classList.toggle('show');
  });

  // Close nav when link clicked
  navList.addEventListener('click', (e) => {
    if(e.target.tagName === 'A'){
      navList.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Project modal open
  function openModalFromCard(card) {
    const title = card.dataset.title || '';
    const desc = card.dataset.desc || '';
    const image = card.dataset.image || '';
    const live = card.dataset.live || '';

    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalImage.src = image;
    modalImage.alt = title;
    if (live) {
      modalLive.style.display = 'inline-block';
      modalLive.href = live;
    } else {
      modalLive.style.display = 'none';
    }

    modal.setAttribute('aria-hidden', 'false');
    // trap focus to close button quickly
    modalClose.focus();
    document.body.style.overflow = 'hidden';
  }

  projectCards.forEach(card => {
    card.addEventListener('click', () => openModalFromCard(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModalFromCard(card);
      }
    });
  });

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });

  // Contact form behavior
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formStatus.textContent = '';
    const formData = new FormData(contactForm);
    const name = formData.get('name')?.trim();
    const email = formData.get('email')?.trim();
    const message = formData.get('message')?.trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Please complete all fields.';
      return;
    }

    formStatus.textContent = 'Sending…';

    try {
      if (FORM_SPPREE_ID) {
        // send to Formspree
        const res = await fetch(`https://formspree.io/f/${FORM_SPPREE_ID}`, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData
        });
        const json = await res.json();
        if (json.ok || res.ok) {
          formStatus.textContent = 'Message sent — thank you!';
          contactForm.reset();
        } else {
          formStatus.textContent = 'Could not send message. Try email instead.';
        }
      } else {
        // fallback to mailto
        const subject = encodeURIComponent(`Portfolio message from ${name}`);
        const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
        window.location.href = `mailto:${mailtoLink.href.replace('mailto:','')}?subject=${subject}&body=${body}`;
        formStatus.textContent = '';
      }
    } catch (err) {
      console.error(err);
      formStatus.textContent = 'An error occurred. Try again or use email.';
    }
  });

  // Copy email button
  copyEmailBtn.addEventListener('click', async () => {
    const email = mailtoLink.href.replace('mailto:', '');
    try {
      await navigator.clipboard.writeText(email);
      formStatus.textContent = 'Email copied to clipboard!';
    } catch (err) {
      // fallback: select and copy
      const input = document.createElement('input');
      input.value = email;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();
      formStatus.textContent = 'Email copied to clipboard!';
    }
    setTimeout(() => formStatus.textContent = '', 2500);
  });

})();
