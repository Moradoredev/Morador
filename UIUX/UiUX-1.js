/* ===========================
   VILLFIIWORKS — main.js
   =========================== */

// ===================== SPOTLIGHT =====================
const spotlight = document.createElement('div');
spotlight.className = 'spotlight';
document.body.appendChild(spotlight);

document.addEventListener('mousemove', (e) => {
  spotlight.style.left = (e.clientX - 200) + 'px';
  spotlight.style.top  = (e.clientY - 200) + 'px';

  // Magnetic button effect
  document.querySelectorAll('.btn-primary').forEach(btn => {
    const rect = btn.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top  + rect.height / 2);
    const dist = Math.hypot(dx, dy);
    if (dist < 100) {
      const angle = Math.atan2(dy, dx);
      const force = (100 - dist) / 100;
      btn.style.transform = `translate(${Math.cos(angle)*force*10}px, ${Math.sin(angle)*force*10}px)`;
    } else {
      btn.style.transform = '';
    }
  });
});

// ===================== OWNER — Toggle Animaciones =====================
const ownerLink  = document.getElementById('ownerLink');
const animStatus = document.getElementById('animStatus');

ownerLink.addEventListener('click', e => {
  e.preventDefault();
  document.body.classList.toggle('animations-active');
  const on = document.body.classList.contains('animations-active');
  animStatus.textContent = on ? '(ON)' : '(OFF)';
  animStatus.style.color = on ? 'var(--red)' : '';
});

// ===================== POSTS DROPDOWN =====================
const postsLink = document.getElementById('postsLink');
const postsMenu = document.getElementById('postsMenu');

postsLink.addEventListener('click', e => {
  e.preventDefault();
  postsMenu.classList.toggle('active');
});

document.addEventListener('click', e => {
  if (!e.target.closest('.posts-dropdown')) postsMenu.classList.remove('active');
});

// ===================== INFO TOOLTIP =====================
const infoLink    = document.getElementById('infoLink');
const infoTooltip = document.getElementById('infoTooltip');
let tipTimeout;

infoLink.addEventListener('click', e => {
  e.preventDefault();
  const r = infoLink.getBoundingClientRect();
  infoTooltip.style.left = (r.left + r.width / 2 - 140) + 'px';
  infoTooltip.style.top  = (r.bottom + 10) + 'px';
  infoTooltip.classList.add('show');
  clearTimeout(tipTimeout);
  tipTimeout = setTimeout(() => infoTooltip.classList.remove('show'), 5000);
});

// ===================== CAMBIAR TEMA =====================
const personajes = {
  'Otros personajes': {
    tag: 'DV MORADOR',
    outline: 'SABER',
    name: 'ARTORIA',
    red: 'PENDRAGON',
    desc: 'Que es el nombre de su Noble Phantasm y lo grite al usar su ataque mas poderoso. Un rey debe ser noble por encima de todo.',
    img: 'UX.IMAN/descarga.jpg',
    red_color: '#e8294a',
    bg: '#0a0a0c',
    bg2: '#111116',
  },
  'Saber herna': {
    tag: 'FATE SERIES',
    outline: 'SABER',
    name: 'ARTORIA',
    red: 'ALTER',
    desc: 'La versión oscura de Artoria. Corrompida por la maldad, su poder supera todos los límites conocidos.',
    img: 'UX.IMAN/saber-alter.jpg',
    red_color: '#e8294a',
    bg: '#0a0a0c',
    bg2: '#111116',
  },
  'Goku': {
    tag: 'DRAGON BALL',
    outline: 'SON',
    name: 'GOKU',
    red: 'ULTRA INSTINCT',
    desc: 'El guerrero más poderoso del universo 7. Su poder no tiene límites cuando alcanza el Ultra Instinto.',
    img: 'UX.IMAN/goku.jpg',
    red_color: '#00d4ff',
    bg: '#0a0e27',
    bg2: '#101829',
  },
  'Naruto': {
    tag: 'KONOHA',
    outline: 'UZUMAKI',
    name: 'NARUTO',
    red: 'HOKAGE',
    desc: 'El ninja que nunca se rinde. Su determinación y el poder del zorro de nueve colas lo llevaron a ser Hokage.',
    img: 'UX.IMAN/naruto.jpg',
    red_color: '#ff6600',
    bg: '#0f0a00',
    bg2: '#1a1000',
  },
  'Luffy': {
    tag: 'STRAW HAT',
    outline: 'MONKEY D.',
    name: 'LUFFY',
    red: 'GEAR FIFTH',
    desc: 'El hombre que será el Rey de los Piratas. Con su Gear Fifth, la libertad no tiene límites.',
    img: 'UX.IMAN/luffy.jpg',
    red_color: '#ff0000',
    bg: '#0a0000',
    bg2: '#150000',
  },
};

function changeTemplate(nombre) {
  const p = personajes[nombre];
  if (!p) return;

  // Cambiar textos
  document.querySelector('.brand-tag').childNodes[document.querySelector('.brand-tag').childNodes.length - 1].textContent = p.tag;
  document.querySelector('.hero-title .outline').textContent = p.outline;
  document.querySelector('.hero-title span:nth-child(2)').textContent = p.name;
  document.querySelector('.hero-title .red').textContent = p.red;
  document.querySelector('.hero-subtitle').textContent = p.desc;

  // Cambiar imagen
  const img = document.querySelector('.anime-figure img');
  if (img) img.src = p.img;

  // Cambiar colores
  const r = document.documentElement;
  r.style.setProperty('--red', p.red_color);
  r.style.setProperty('--bg', p.bg);
  r.style.setProperty('--bg2', p.bg2);

  postsMenu.classList.remove('active');
}

// ===================== PARTÍCULAS =====================
const container = document.createElement('div');
container.className = 'particles';
document.body.appendChild(container);

for (let i = 0; i < 50; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;animation:float ${3+Math.random()*5}s ${Math.random()*2}s ease-in-out infinite`;
  container.appendChild(p);
}

// ===================== SCROLL REVEAL =====================
document.querySelectorAll('.scroll-reveal, .work-card').forEach((el, i) => {
  el.classList.add('scroll-reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('active');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  setTimeout(() => obs.observe(el), i * 50);
});

// ===================== 3D CARD TRACKING =====================
document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top  - r.height/2) / r.height) * 10;
    const ry = ((e.clientX - r.left - r.width/2)  / r.width)  * 10;
    card.style.transform = `perspective(1000px) rotateX(${-rx}deg) rotateY(${ry}deg) translateZ(20px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// ===================== SCROLL PROGRESS + PARALLAX =====================
const bar = document.querySelector('.scroll-progress-bar');

window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  bar.style.width = pct + '%';

  const off = window.scrollY / 12;
  document.querySelector('.hero-left').style.transform    = `translateY(${off}px)`;
  document.querySelector('.hero-right').style.transform   = `translateY(${off/2}px)`;
  document.querySelector('.bg-watermark').style.transform = `translateY(calc(-50% + ${off/1.5}px))`;
});