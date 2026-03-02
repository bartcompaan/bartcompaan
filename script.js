const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];

const year = $('#year');
if (year) year.textContent = new Date().getFullYear();

// Mobile nav
const toggle = $('.nav__toggle');
const links = $('#navLinks');
if (toggle && links){
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close on click
  $$('#navLinks a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

// Gallery lightbox
const lightbox = $('#lightbox');
const lightboxImg = $('#lightboxImg');
const lightboxClose = $('#lightboxClose');

function openLightbox(src){
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox(){
  if (!lightbox) return;
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  if (lightboxImg) lightboxImg.src = '';
}

$$('.gallery__item').forEach(btn => {
  btn.addEventListener('click', () => openLightbox(btn.dataset.full));
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// Booking form -> mailto (no backend)
const form = $('#bookingForm');
if (form){
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const date = (data.get('date') || '').toString().trim();
    const location = (data.get('location') || '').toString().trim();
    const eventType = (data.get('eventType') || '').toString().trim();
    const notes = (data.get('notes') || '').toString().trim();

    const subject = encodeURIComponent(`Boekingsaanvraag — ${date} — ${eventType}`);
    const body = encodeURIComponent(
`Hoi Bart,

Ik wil je boeken. Details:
- Naam: ${name}
- Email: ${email}
- Datum: ${date}
- Locatie: ${location}
- Type event: ${eventType}

Wensen / vibe:
${notes || '(geen extra wensen)'}

Groet,
${name}`
    );

    // TODO: zet hier je echte boekingsmail
    const to = 'bartcompaan@example.com';
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
}
