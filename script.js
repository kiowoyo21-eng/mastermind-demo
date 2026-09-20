const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');
const navLinks = [...document.querySelectorAll('.nav-link[href^="#"]')];

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

navLinks.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
}));

const sections = navLinks
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
  sections.forEach(section => observer.observe(section));
}

const bookingForm = document.querySelector('#visit-request-form');
const preview = document.querySelector('#request-preview');
const copyButton = document.querySelector('#copy-request');
let requestText = '';

function buildRequest(form) {
  const data = new FormData(form);
  return [
    'Hi Mastermind Autoworks, I would like to request a service visit.',
    '',
    `Name: ${data.get('name') || ''}`,
    `Mobile: ${data.get('mobile') || ''}`,
    `Service: ${data.get('service') || 'Not sure yet'}`,
    `Vehicle: ${data.get('vehicle') || ''}`,
    `Concern: ${data.get('concern') || ''}`,
    `Preferred date: ${data.get('date') || ''}`,
    `Preferred time: ${data.get('time') || 'Any available time'}`,
    '',
    'Please let me know the next available schedule. I understand this request is not confirmed until the team replies.'
  ].join('\n');
}

bookingForm?.addEventListener('submit', event => {
  event.preventDefault();
  if (!bookingForm.reportValidity()) return;
  requestText = buildRequest(bookingForm);
  if (preview) {
    preview.textContent = requestText;
    preview.classList.add('visible');
  }
  const separator = /iPhone|iPad|iPod/i.test(navigator.userAgent) ? '&' : '?';
  window.location.href = `sms:+639176290000${separator}body=${encodeURIComponent(requestText)}`;
});

copyButton?.addEventListener('click', async () => {
  if (!bookingForm) return;
  requestText = buildRequest(bookingForm);
  if (preview) {
    preview.textContent = requestText;
    preview.classList.add('visible');
  }
  try {
    await navigator.clipboard.writeText(requestText);
    copyButton.textContent = 'Copied';
    setTimeout(() => { copyButton.textContent = 'Copy request'; }, 1600);
  } catch {
    copyButton.textContent = 'Select text below';
  }
});


const serviceField = document.querySelector('#service');
if (serviceField) {
  const requestedService = new URLSearchParams(window.location.search).get('service');
  if (requestedService && [...serviceField.options].some(option => option.value === requestedService)) {
    serviceField.value = requestedService;
  }
}
