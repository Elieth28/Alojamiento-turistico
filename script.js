// ── Año dinámico ──────────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── Navbar scroll ─────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Menú hamburguesa ──────────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

function closeMobile() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Scroll reveal ─────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = (i * 0.08) + 's';
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Validación del formulario ─────────────────────────────────
const form = document.getElementById('contactForm');

function showError(id, show) {
  const msg   = document.getElementById('err-' + id);
  const input = document.getElementById(id);
  if (!msg || !input) return;
  msg.style.display = show ? 'block' : 'none';
  input.classList.toggle('input-error', show);
}

function validateEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function validateDates() {
  const llegada = document.getElementById('llegada').value;
  const salida  = document.getElementById('salida').value;
  const today   = new Date().toISOString().split('T')[0];
  if (!llegada || llegada < today) return false;
  if (!salida  || salida <= llegada) return false;
  return true;
}

// Limpia error al escribir/cambiar
['nombre', 'apellido', 'email', 'llegada', 'salida', 'alojamiento'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('input',  () => showError(id, false));
  el.addEventListener('change', () => showError(id, false));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  if (!document.getElementById('nombre').value.trim()) {
    showError('nombre', true); valid = false;
  }
  if (!document.getElementById('apellido').value.trim()) {
    showError('apellido', true); valid = false;
  }
  if (!validateEmail(document.getElementById('email').value)) {
    showError('email', true); valid = false;
  }
  if (!validateDates()) {
    showError('llegada', true);
    showError('salida',  true);
    valid = false;
  }
  if (!document.getElementById('alojamiento').value) {
    showError('alojamiento', true); valid = false;
  }

  if (valid) {
    const btn = form.querySelector('.btn-submit');
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    setTimeout(() => {
      document.getElementById('successMsg').style.display = 'block';
      form.reset();
      btn.textContent = 'Enviar solicitud de reserva';
      btn.disabled = false;
    }, 1200);
  }
});
