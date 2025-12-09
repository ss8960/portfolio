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

// -------------------------
//   MOBILE NAV DRAWER
// -------------------------
(function setupMobileNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  // Create hamburger button if absent
  let toggle = nav.querySelector('.nav-toggle');
  if (!toggle) {
    toggle = document.createElement('button');
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-label', 'Open menu');
    toggle.innerHTML = '<span></span><span></span><span></span>';
    nav.appendChild(toggle);
  }

  // Build drawer with same links as top nav
  const linkContainer = nav.querySelector('nav > div, :scope > div');
  const drawer = document.createElement('aside');
  drawer.className = 'side-drawer';
  drawer.innerHTML = (linkContainer ? linkContainer.innerHTML : '');

  const backdrop = document.createElement('div');
  backdrop.className = 'drawer-backdrop';

  document.body.appendChild(drawer);
  document.body.appendChild(backdrop);

  const closeDrawer = () => {
    drawer.classList.remove('open');
    backdrop.classList.remove('show');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  };
  const openDrawer = () => {
    drawer.classList.add('open');
    backdrop.classList.add('show');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  };

  toggle.addEventListener('click', () => {
    if (drawer.classList.contains('open')) closeDrawer();
    else openDrawer();
  });
  backdrop.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

  // Close on resize back to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 720) closeDrawer();
  });
})();

// Removed slide viewer JS
  