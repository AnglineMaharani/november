
// =================================
// HALAMAN PEMBUKA + MUSIK
// =================================

const intro = document.getElementById('intro');
const lookBtn = document.getElementById('lookBtn');
const bgMusic = document.getElementById('bgMusic');

if (lookBtn) {
  lookBtn.addEventListener('click', (e) => {
    e.stopPropagation();

    if (intro) {
      intro.classList.add('hide');
    }

    document.body.classList.add('garden-open');

    if (bgMusic) {
      bgMusic.volume = 0.5;

      bgMusic.play().catch(error => {
        console.log('Musik belum dapat diputar:', error);
      });
    }
  });
}


// =================================
// RANDOM HELPER
// =================================

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


// =================================
// BINTANG
// =================================

const starsEl = document.getElementById('stars');

if (starsEl) {
  for (let i = 0; i < 120; i++) {
    const s = document.createElement('div');

    s.className = 'star';

    const size = rand(0.5, 3);

    s.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      top: ${Math.random() * 80}%;
      left: ${Math.random() * 100}%;
      --a: ${rand(0.2, 0.8).toFixed(2)};
      --d: ${rand(1.5, 4.5).toFixed(2)}s;
      animation-delay: ${rand(0, 3).toFixed(2)}s;
    `;

    starsEl.appendChild(s);
  }
}


// =================================
// KUNANG-KUNANG
// =================================

for (let i = 0; i < 8; i++) {
  const f = document.createElement('div');

  f.className = 'firefly';

  f.style.cssText = `
    left: ${rand(0, 90)}%;
    top: ${rand(20, 80)}%;
    --dur: ${rand(2, 5).toFixed(2)}s;
    --dx: ${rand(-40, 40).toFixed(0)}px;
    --dy: ${rand(-30, 30).toFixed(0)}px;
    animation-delay: ${rand(0, 2).toFixed(2)}s;
  `;

  document.body.appendChild(f);
}


// =================================
// MEMBUAT SEMAK-SEMAK
// =================================

const bushes = document.getElementById('bushes');

if (bushes) {
  for (let i = 0; i < 22; i++) {
    const bush = document.createElement('div');

    bush.className = 'bush';

    const width = rand(35, 85);
    const height = rand(35, 75);

    bush.style.cssText = `
      width: ${width}px;
      height: ${height}px;
      left: ${i * 5 + rand(-15, 15)}%;
      bottom: ${rand(-15, 5)}px;
      z-index: ${Math.floor(rand(1, 4))};
    `;

    bushes.appendChild(bush);
  }
}


// =================================
// KONFIGURASI WARNA BUNGA
// =================================

const PALETTES = [
  {
    petals: ['#ff6b9d', '#ff8fb1', '#ffb3c6'],
    center: '#fff176',
    stem: '#4caf50',
    leaf: '#388e3c'
  },
  {
    petals: ['#ffb347', '#ffd166', '#ffe599'],
    center: '#ef5350',
    stem: '#558b2f',
    leaf: '#33691e'
  },
  {
    petals: ['#a78bfa', '#c4b5fd', '#ddd6fe'],
    center: '#fdd835',
    stem: '#4caf50',
    leaf: '#2e7d32'
  },
  {
    petals: ['#67e8f9', '#a5f3fc', '#cffafe'],
    center: '#fff9c4',
    stem: '#43a047',
    leaf: '#1b5e20'
  },
  {
    petals: ['#fca5a5', '#fecaca', '#fee2e2'],
    center: '#ffd54f',
    stem: '#66bb6a',
    leaf: '#388e3c'
  },
  {
    petals: ['#86efac', '#bbf7d0', '#dcfce7'],
    center: '#ff8a65',
    stem: '#4caf50',
    leaf: '#2e7d32'
  },
  {
    petals: ['#fed7aa', '#fdba74', '#fb923c'],
    center: '#e53935',
    stem: '#558b2f',
    leaf: '#33691e'
  },
  {
    petals: ['#f9a8d4', '#fbcfe8', '#fce7f3'],
    center: '#ffe082',
    stem: '#43a047',
    leaf: '#1b5e20'
  }
];

const PETAL_COUNTS = [5, 6, 7, 8, 10, 12];

const garden = document.getElementById('garden');

let flowerCount = 0;


// =================================
// MEMBUAT BUNGA
// =================================

function createFlower(x, groundRelY) {

  const palette = pick(PALETTES);
  const nPetals = pick(PETAL_COUNTS);

  const stemH = rand(80, 200);
  const petalSize = rand(22, 40);
  const centerR = petalSize * 0.42;

  const totalH = stemH + petalSize * 2;

  const wrapper = document.createElement('div');

  wrapper.className = 'flower';

  wrapper.style.cssText = `
    left: ${x}px;
    bottom: ${groundRelY}px;
    height: ${totalH}px;
    width: ${petalSize * 2.5}px;
    margin-left: ${-petalSize * 1.25}px;
  `;


  // BATANG

  const stemWrap = document.createElement('div');

  stemWrap.className = 'stem-wrap';
  stemWrap.style.height = totalH + 'px';


  const stem = document.createElement('div');

  stem.className = 'stem';

  stem.style.cssText = `
    height: ${stemH}px;
    background: linear-gradient(
      to right,
      ${palette.stem}aa,
      ${palette.stem}
    );
  `;


  // DAUN

  ['left', 'right'].forEach(side => {

    const leaf = document.createElement('div');

    leaf.className = `leaf ${side}`;

    leaf.style.background =
      `radial-gradient(
        ellipse at 30% 40%,
        ${palette.leaf}cc,
        ${palette.leaf}
      )`;

    stem.appendChild(leaf);

  });


  // KELOPAK BUNGA

  const petalsEl = document.createElement('div');

  petalsEl.className = 'petals';

  petalsEl.style.cssText = `
    width: ${petalSize * 2}px;
    height: ${petalSize * 2}px;
    position: relative;
    flex-shrink: 0;
    order: -1;
  `;


  for (let i = 0; i < nPetals; i++) {

    const angle = (360 / nPetals) * i;

    const petal = document.createElement('div');

    petal.className = 'petal';

    const pColor =
      palette.petals[i % palette.petals.length];

    petal.style.cssText = `
      width: ${petalSize * 0.55}px;
      height: ${petalSize}px;

      background: radial-gradient(
        ellipse at 30% 20%,
        ${pColor}ff,
        ${pColor}aa
      );

      left: 50%;
      top: 50%;

      margin-left: ${-petalSize * 0.275}px;
      margin-top: ${-petalSize}px;

      transform: rotate(${angle}deg);
      --r: ${angle}deg;

      box-shadow:
        inset 0 2px 4px rgba(255,255,255,0.3);
    `;

    petalsEl.appendChild(petal);

  }


  // BAGIAN TENGAH BUNGA

  const center = document.createElement('div');

  center.className = 'center';

  center.style.cssText = `
    width: ${centerR * 2}px;
    height: ${centerR * 2}px;
    left: 50%;
    top: 50%;
    background: radial-gradient(
      circle at 40% 40%,
      #fff8e1,
      ${palette.center}
    );
  `;

  petalsEl.appendChild(center);


  // GABUNGKAN BUNGA

  stemWrap.appendChild(petalsEl);
  stemWrap.appendChild(stem);

  wrapper.appendChild(stemWrap);

  if (garden) {
    garden.appendChild(wrapper);
  }


  // ANIMASI MEKAR

  requestAnimationFrame(() => {
    wrapper.classList.add('blooming');
  });


  // KLIK BUNGA

  wrapper.addEventListener('click', (e) => {

    e.stopPropagation();

    wrapper.classList.remove('clicked');

    void wrapper.offsetWidth;

    wrapper.classList.add('clicked');

    spawnParticles(
      e.clientX,
      e.clientY,
      palette.petals[0]
    );

    windEffect(
      e.clientX,
      e.clientY,
      palette.petals
    );

  });


  // HITUNG JUMLAH BUNGA

  flowerCount++;

  const countEl = document.getElementById('count');

  if (countEl) {
    countEl.textContent = flowerCount;
  }

  return wrapper;
}


// =================================
// PARTIKEL BUNGA
// =================================

function spawnParticles(cx, cy, color) {

  for (let i = 0; i < 8; i++) {

    const p = document.createElement('div');

    p.className = 'particle';

    const size = rand(4, 10);

    const angle = rand(0, 360) * Math.PI / 180;

    const dist = rand(20, 60);

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${color};

      position: fixed;

      left: ${cx + Math.cos(angle) * dist}px;
      top: ${cy + Math.sin(angle) * dist}px;

      box-shadow: 0 0 6px ${color};

      animation:
        floatUp ${rand(0.5, 1)}s ease-out
        ${rand(0, 0.3)}s forwards;
    `;

    document.body.appendChild(p);

    setTimeout(() => p.remove(), 1200);

  }
}


// =================================
// EFEK ANGIN
// =================================

function windEffect(cx, cy, colors) {

  for (let i = 0; i < 5; i++) {

    const w = document.createElement('div');

    w.className = 'wind-particle';

    const size = rand(3, 7);

    w.style.cssText = `
      width: ${size}px;
      height: ${size}px;

      background: ${pick(colors)};

      left: ${cx + rand(-30, 30)}px;
      top: ${cy + rand(-20, 20)}px;

      animation-duration:
        ${rand(0.8, 1.5).toFixed(2)}s;

      animation-delay:
        ${rand(0, 0.3).toFixed(2)}s;
    `;

    document.body.appendChild(w);

    setTimeout(() => w.remove(), 2000);

  }
}


// =================================
// KLIK UNTUK MENANAM BUNGA
// =================================

document.addEventListener('click', (e) => {

  if (!document.body.classList.contains('garden-open')) {
    return;
  }

  // Abaikan klik pada elemen tertentu
  if (
    e.target.closest('.notes-container') ||
    e.target.closest('.notes-message') ||
    e.target.closest('#notesContent') ||
    e.target.closest('button') ||
    e.target.closest('.intro') ||
    e.target.closest('audio')
  ) {
    return;
  }

  // Jangan menanam bunga baru saat bunga lama diklik
  if (e.target.closest('.flower')) {
    return;
  }

  if (!garden) return;

  const gardenRect = garden.getBoundingClientRect();

  const x = e.clientX - gardenRect.left;

  const groundY = rand(0, 30);

  createFlower(x, groundY);

});


// =================================
// ANIMASI ANGIN PADA BUNGA
// =================================

setInterval(() => {

  const flowers = document.querySelectorAll('.flower');

  if (!flowers.length) return;

  const f = flowers[
    Math.floor(Math.random() * flowers.length)
  ];

  f.style.animation = 'sway 1.5s ease-in-out';

  setTimeout(() => {
    f.style.animation = '';
  }, 1600);

}, 2000);


// =================================
// NOTES POPUP
// =================================

const notesBtn = document.getElementById('notesBtn');
const notesOverlay = document.getElementById('notesContent');
const closeNotesBtn = document.querySelector('.close-notes');


// Pastikan popup tertutup saat halaman pertama dibuka
if (notesOverlay) {
  notesOverlay.classList.remove('show');
}


// BUKA NOTES

function openNotes() {

  if (!notesOverlay) return;

  notesOverlay.classList.add('show');

  const notesMessage =
    notesOverlay.querySelector('.notes-message');

  if (notesMessage) {
    notesMessage.scrollTop = 0;
  }

}


// TUTUP NOTES

function closeNotesPopup() {

  if (!notesOverlay) return;

  notesOverlay.classList.remove('show');

}


// TOMBOL NOTES

if (notesBtn && notesOverlay) {

  notesBtn.addEventListener('click', function (event) {

    event.preventDefault();
    event.stopPropagation();

    if (notesOverlay.classList.contains('show')) {
      closeNotesPopup();
    } else {
      openNotes();
    }

  });

} else {

  console.error(
    'Tombol Notes atau popup tidak ditemukan. Periksa ID HTML.'
  );

}


// TOMBOL X

if (closeNotesBtn) {

  closeNotesBtn.addEventListener('click', function (event) {

    event.preventDefault();
    event.stopPropagation();

    closeNotesPopup();

  });

}


// KLIK AREA LUAR POPUP

if (notesOverlay) {

  notesOverlay.addEventListener('click', function (event) {

    if (event.target === notesOverlay) {
      closeNotesPopup();
    }

  });

}


// KLIK DI DALAM SURAT TIDAK MENUTUP POPUP

const notesPaper = notesOverlay
  ? notesOverlay.querySelector('.notes-paper')
  : null;

if (notesPaper) {

  notesPaper.addEventListener('click', function (event) {
    event.stopPropagation();
  });

}


// TUTUP DENGAN ESCAPE

document.addEventListener('keydown', function (event) {

  if (event.key === 'Escape') {
    closeNotesPopup();
  }

});


// =================================
// SELESAI
// =================================
