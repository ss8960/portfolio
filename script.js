/* V3 script content *//* -------------------------
   MULTI-LAYER PARALLAX ENGINE
------------------------- */

const front = document.querySelector('.layer-front');
const mid = document.querySelector('.layer-mid');
const back = document.querySelector('.layer-back');

let mouseX = 0;
let mouseY = 0;
let scrollYPos = 0;
let rafId = null;

function applyTransforms() {
  if (!front || !mid || !back) return;

  back.style.transform = `translateY(${scrollYPos * 0.12}px)`;
  mid.style.transform = `translateY(${scrollYPos * 0.18}px)`;

  const frontTranslateY = scrollYPos * 0.05;
  front.style.transform = `translate(${mouseX}px, ${mouseY + frontTranslateY}px)`;

  rafId = null;
}

function requestUpdate() {
  if (rafId == null) {
    rafId = requestAnimationFrame(applyTransforms);
  }
}

window.addEventListener('scroll', () => {
  scrollYPos = window.scrollY || window.pageYOffset || 0;
  requestUpdate();
});

/* -------------------------
   SCROLL REVEAL
------------------------- */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  })
}, {threshold: 0.2});

document.querySelectorAll('.card, .fade-up, .fade-in')
  .forEach(el => observer.observe(el));

/* -------------------------
   MOUSE PARALLAX
------------------------- */
document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX - window.innerWidth / 2) / 40;
  mouseY = (e.clientY - window.innerHeight / 2) / 40;
  requestUpdate();
});

/* -------------------------
   CURSOR SPOTLIGHT
------------------------- */
let cursorLight = document.querySelector('.cursor-light');
if (!cursorLight) {
  cursorLight = document.createElement('div');
  cursorLight.className = 'cursor-light';
  document.body.appendChild(cursorLight);
}

document.addEventListener('mousemove', (e) => {
  cursorLight.style.left = `${e.clientX}px`;
  cursorLight.style.top = `${e.clientY}px`;
});

/* Initial transform */
requestUpdate();

// Removed slide viewer JS
  