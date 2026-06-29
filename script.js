/* ─── LOADER ─────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    launchConfetti();
    spawnPetals();
    startHearts();
  }, 1800);
});



/* ─── POPUPS ─────────────────────────────────────── */
function openWish()    { showPopup('wishPopup'); }
function openGallery() { showPopup('galleryPopup'); }
function openLetter()  { showPopup('letterPopup'); typeLetter(); }
function openVideo()   { showPopup('videoPopup'); }
function openTimeline(){ showPopup('timelinePopup'); }
function openQuiz()    { showPopup('quizPopup'); startQuiz(); }

function showPopup(id) {
  closeAll(false);
  const el = document.getElementById(id);
  el.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeAll(restore = true) {
  document.querySelectorAll('.popup').forEach(p => p.style.display = 'none');
  if (restore) document.body.style.overflow = 'hidden';
  const v = document.getElementById('birthdayVideo');
  if (v) v.pause();
  clearTyping();
  closeLightbox();
}

// Close on backdrop click
document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('click', e => { if (e.target === popup) closeAll(); });
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (document.getElementById('lightbox').classList.contains('open')) closeLightbox();
    else closeAll();
  }
  if (e.key === 'ArrowLeft')  lbNav(-1);
  if (e.key === 'ArrowRight') lbNav(1);
});

/* ─── TYPEWRITER LETTER ──────────────────────────── */
const letterContent = [
  { type:'line', text:' Happy Birthday, Cecilia❤️' },
  { type:'line', text:'You are the most beautiful part of my life. Every smile you give, every laugh you share, it makes the whole world feel lighter and warmer.' },

  { type:'line', text:'Every moment with you feels like a blessing I don\'t deserve, yet I\'m endlessly grateful for. You have shown me what it means to truly love someone.' },
 
  { type:'line', text:'I promise to always love, respect, and cherish you, not just today, but every single day for the rest of my life.' },
  { type:'line', text:'Enjoy your special day, my love. You deserve every joy this world has to offer.' },
  { type:'br' },
  { type:'line', text:'Yours Beloved, Jay  ❤️' },
];

let typingTimer = setTimeout(typeLetter, 2000);

function clearTyping() {
  if (typingTimer) clearTimeout(typingTimer);
  const el = document.getElementById('letterText');
  const cursor = document.getElementById('cursor');
  if (el) el.innerHTML = '';
  if (cursor) cursor.classList.remove('hidden');
}

function typeLetter() {
  clearTyping();
  const el     = document.getElementById('letterText');
  const cursor = document.getElementById('cursor');
  if (!el) return;

  let lineIdx = 0, charIdx = 0;

  function typeNext() {
    if (lineIdx >= letterContent.length) {
      cursor.classList.add('hidden');
      return;
    }
    const segment = letterContent[lineIdx];
    if (segment.type === 'br') {
      el.innerHTML += '<br><br>';
      lineIdx++; charIdx = 0;
      typingTimer = setTimeout(typeNext, 80);
    } else {
      if (charIdx < segment.text.length) {
        el.innerHTML += segment.text.charAt(charIdx) === '\n' ? '<br>' : segment.text.charAt(charIdx);
        charIdx++;
        typingTimer = setTimeout(typeNext, 20);
      } else {
        el.innerHTML += '<br>';
        lineIdx++; charIdx = 0;
        typingTimer = setTimeout(typeNext, 60);
      }
    }
  }
  typeNext();
}

/* ─── LIGHTBOX ──────────────────────────────────── */
const galleryImages = [
  'images/us1.jpg','images/us2.jpg','images/us3.jpg','images/us4.jpg','images/us5.jpg'
];
let lbIndex = 0;

function openLightbox(idx) {
  lbIndex = idx;
  document.getElementById('lbImg').src = galleryImages[idx];
  document.getElementById('lbCounter').textContent = `${idx + 1} / ${galleryImages.length}`;
  document.getElementById('lightbox').classList.add('open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

function lbNav(dir, e) {
  if (e) e.stopPropagation();
  lbIndex = (lbIndex + dir + galleryImages.length) % galleryImages.length;
  const img = document.getElementById('lbImg');
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = galleryImages[lbIndex];
    document.getElementById('lbCounter').textContent = `${lbIndex + 1} / ${galleryImages.length}`;
    img.style.opacity = '1';
  }, 150);
}

/* ─── QUIZ ──────────────────────────────────────── */
const quizData = [
  {
    q: 'What is Jay\'s biggest dream?',
    opts: ['To travel the world','To build something great and be with you forever','To become a chef','To become a famous footballer'],
    ans: 1
  },
  {
    q: 'What does Jay think about every morning?',
    opts: ['Food ','Work ','You, always you ','Football '],
    ans: 2
  },
  {
    q: 'What makes Jay the happiest?',
    opts: ['Sleeping in','Your smile and laughter','Video games','A sunny day'],
    ans: 1
  },
  {
    q: 'How does Jay feel about you?',
    opts: ['You\'re just a friend','Deeply, completely in love ','It\'s complicated','Tjay hasn\'t decided yet'],
    ans: 1
  },
  {
    q: 'What does Jay wish for you on your birthday?',
    opts: ['Good grades','Nothing specific','A lifetime of joy, love, and success','Free Wi-Fi'],
    ans: 2
  }
];

let qIndex = 0, score = 0, answered = false;

function startQuiz() {
  qIndex = 0; score = 0; answered = false;
  renderQuestion();
}

function renderQuestion() {
  const c = document.getElementById('quizContainer');
  if (qIndex >= quizData.length) {
    renderResult(); return;
  }
  const q = quizData[qIndex];
  c.innerHTML = `
    <p class="quiz-progress">Question ${qIndex + 1} of ${quizData.length}</p>
    <p class="quiz-q">${q.q}</p>
    <div class="quiz-options">
      ${q.opts.map((o, i) => `<button class="quiz-opt" onclick="answerQuiz(${i})">${o}</button>`).join('')}
    </div>
  `;
  answered = false;
}

function answerQuiz(chosen) {
  if (answered) return;
  answered = true;
  const q    = quizData[qIndex];
  const opts = document.querySelectorAll('.quiz-opt');
  opts[q.ans].classList.add('correct');
  if (chosen !== q.ans) opts[chosen].classList.add('wrong');
  else score++;
  opts.forEach(o => o.disabled = true);
  setTimeout(() => { qIndex++; renderQuestion(); }, 1200);
}

function renderResult() {
  const pct = Math.round((score / quizData.length) * 100);
  let msg, icon;
  if (pct === 100) {
    msg  = 'You know Jay perfectly! You two are truly meant for each other.';
    icon = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f496.svg';
    launchConfetti();
  } else if (pct >= 60) {
    msg  = 'Pretty good! You clearly pay attention. Keep learning about each other every day.';
    icon = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f31f.svg';
  } else {
    msg  = 'More time together will help! Every day is a chance to know each other better.';
    icon = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4a1.svg';
  }

  document.getElementById('quizContainer').innerHTML = `
    <div class="quiz-result">
      <img src="${icon}" alt="result">
      <h3>${score} / ${quizData.length} — ${pct}%</h3>
      <p>${msg}</p>
      <button class="quiz-restart" onclick="startQuiz()">Try Again</button>
    </div>
  `;
}

/* ─── FLOATING HEARTS ────────────────────────────── */
const HEARTS = ['💖','💕','💗','💓','🌸','✨','💝','🌹'];

function startHearts() {
  setInterval(() => {
    const layer = document.getElementById('hearts-layer');
    const heart = document.createElement('img');
    heart.classList.add('heart');
    heart.src = `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${twemojiCode(HEARTS[Math.floor(Math.random()*HEARTS.length)])}.svg`;
    heart.alt = 'heart';

    const size     = 14 + Math.random() * 18;
    const left     = Math.random() * 96;
    const duration = 5 + Math.random() * 5;
    const delay    = Math.random() * 2;

    heart.style.cssText = `left:${left}vw;width:${size}px;height:${size}px;animation-duration:${duration}s;animation-delay:${delay}s;`;
    layer.appendChild(heart);
    setTimeout(() => heart.remove(), (duration + delay + 0.5) * 1000);
  }, 500);
}

function twemojiCode(emoji) {
  const map = {
    '💖':'1f496','💕':'1f495','💗':'1f497','💓':'1f493',
    '🌸':'1f338','✨':'2728','💝':'1f49d','🌹':'1f339'
  };
  return map[emoji] || '1f496';
}

/* ─── FALLING PETALS ─────────────────────────────── */
function spawnPetals() {
  const container = document.getElementById('petals');
  const codes = ['1f338','1f33a','1f337','1f339'];
  for (let i = 0; i < 16; i++) {
    const p    = document.createElement('img');
    p.classList.add('petal');
    p.src = `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${codes[Math.floor(Math.random()*codes.length)]}.svg`;
    p.alt = 'petal';
    const size     = 14 + Math.random() * 14;
    const left     = Math.random() * 100;
    const duration = 9 + Math.random() * 10;
    const delay    = Math.random() * 14;
    p.style.cssText = `left:${left}vw;width:${size}px;height:${size}px;animation-duration:${duration}s;animation-delay:${delay}s;`;
    container.appendChild(p);
  }
}

/* ─── CONFETTI ───────────────────────────────────── */
function launchConfetti() {
  const colors = ['#f43f72','#e8b96a','#9b59b6','#2ecc71','#ff8caa','#3498db'];
  confetti({ particleCount:80, spread:70, origin:{y:.6}, colors });
  setTimeout(() => {
    confetti({ particleCount:55, spread:100, origin:{x:.08,y:.5}, angle:60, colors });
    confetti({ particleCount:55, spread:100, origin:{x:.92,y:.5}, angle:120, colors });
  }, 400);
}

/* ─── TOAST ─────────────────────────────────────── */
function showToast(msg, duration = 3000) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}