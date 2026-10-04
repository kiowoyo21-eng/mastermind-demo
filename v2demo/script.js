const nav = document.querySelector('.primary-nav');
const navLinks = [...document.querySelectorAll('.nav-link[href^="#"]')];


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

function cleanField(value, maxLength) {
  return String(value ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength);
}

function buildRequest(form) {
  const data = new FormData(form);
  const service = cleanField(data.get('service'), 80) || 'Not sure yet';
  const time = cleanField(data.get('time'), 80) || 'Any available time';
  return [
    'Hi Mastermind Autoworks, I would like to schedule a service visit.',
    '',
    `Name: ${cleanField(data.get('name'), 80)}`,
    `Mobile: ${cleanField(data.get('mobile'), 30)}`,
    `Service: ${service}`,
    `Vehicle: ${cleanField(data.get('vehicle'), 120)}`,
    `Concern: ${cleanField(data.get('concern'), 1200)}`,
    `Preferred date: ${cleanField(data.get('date'), 20)}`,
    `Preferred time: ${time}`,
    '',
    'Please confirm whether my preferred schedule is available. I understand the appointment is confirmed only when the team replies.'
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


const preferredDateField = document.querySelector('#date');
if (preferredDateField) {
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
  preferredDateField.min = localToday;
  preferredDateField.addEventListener('change', () => {
    if (preferredDateField.value && preferredDateField.value < localToday) {
      preferredDateField.setCustomValidity('Please choose today or a future date.');
    } else {
      preferredDateField.setCustomValidity('');
    }
  });
}
