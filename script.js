// ============================================================
//  script.js — logica del sito. Non serve modificarlo per
//  personalizzare i contenuti: usa config.js per quello.
// ============================================================

const ICONS = {
  discord: '<svg viewBox="0 0 24 24" fill="none"><path d="M20 6.5c-1.4-.7-2.9-1.1-4.5-1.4l-.2.4c1.4.3 2.7.9 3.9 1.6-3.9-1.8-8.6-1.8-12.5 0 1.2-.7 2.5-1.3 3.9-1.6l-.2-.4C8.9 5.4 7.4 5.8 6 6.5 3.6 10 3 13.4 3.2 16.7c1.7 1.3 3.4 2 5 2.5l.6-1.1c-.9-.3-1.7-.7-2.5-1.2l.4-.3c2.7 1.2 5.9 1.2 8.6 0l.4.3c-.8.5-1.6.9-2.5 1.2l.6 1.1c1.6-.5 3.3-1.2 5-2.5.3-3.8-.6-7.1-2.8-10.2ZM9.7 14.7c-.8 0-1.5-.8-1.5-1.7s.6-1.7 1.5-1.7 1.5.8 1.5 1.7-.7 1.7-1.5 1.7Zm4.6 0c-.8 0-1.5-.8-1.5-1.7s.6-1.7 1.5-1.7 1.5.8 1.5 1.7-.6 1.7-1.5 1.7Z" fill="currentColor"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none"><rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.6"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"/></svg>',
  twitter: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 4l7.2 9.6L4.4 20H6l6.1-5.6L16.9 20H20l-7.5-10 6.4-6h-1.6l-5.6 5.1L7.1 4H4z" fill="currentColor"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3a9 9 0 0 0-2.85 17.54c.45.08.62-.2.62-.43v-1.7c-2.5.55-3.03-1.07-3.03-1.07-.4-1.05-1-1.33-1-1.33-.82-.56.06-.55.06-.55.9.06 1.38.94 1.38.94.8 1.38 2.1.98 2.6.75.08-.58.32-.98.57-1.2-2-.23-4.1-1-4.1-4.45 0-.98.35-1.79.92-2.42-.1-.23-.4-1.15.09-2.4 0 0 .75-.24 2.46.92a8.4 8.4 0 0 1 4.48 0c1.7-1.16 2.45-.92 2.45-.92.5 1.25.19 2.17.1 2.4.57.63.91 1.44.91 2.42 0 3.46-2.1 4.22-4.11 4.44.33.29.62.85.62 1.72v2.55c0 .24.16.52.62.43A9 9 0 0 0 12 3z" fill="currentColor"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none"><path d="M9 15l6-6M8.5 8.5l1-1a3.5 3.5 0 0 1 5 5l-1 1M15.5 15.5l-1 1a3.5 3.5 0 0 1-5-5l1-1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>'
};

function renderPage(cfg){
  document.title = cfg.username;
  document.getElementById("username").textContent = cfg.username;
  document.getElementById("username").dataset.text = cfg.username;
  document.getElementById("tagline").textContent = cfg.tagline;
  document.getElementById("avatar").src = cfg.avatar;
  document.getElementById("avatar").alt = cfg.username;

  const badgesEl = document.getElementById("badges");
  badgesEl.innerHTML = "";
  (cfg.badges || []).forEach(b=>{
    const span = document.createElement("span");
    span.className = "badge" + (b.style ? " " + b.style : "");
    span.textContent = b.label;
    badgesEl.appendChild(span);
  });

  const linksEl = document.getElementById("links");
  linksEl.innerHTML = "";
  (cfg.links || []).forEach(l=>{
    const a = document.createElement("a");
    a.className = "link-btn";
    a.href = l.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.innerHTML = `${ICONS[l.icon] || ICONS.link}<span class="lbl">${l.label}</span><span class="arrow">→</span>`;
    linksEl.appendChild(a);
  });

  // view counter
  if(cfg.viewCounter === "local"){
    const key = "tricwtf_views";
    let n = parseInt(localStorage.getItem(key) || "0", 10) + 1;
    localStorage.setItem(key, n);
    document.getElementById("viewcount-num").textContent = n.toLocaleString("it-IT");
  } else {
    document.getElementById("viewcount").hidden = true;
  }

  // player setup
  if(cfg.music && cfg.music.enabled && cfg.music.src){
    document.getElementById("player").hidden = false;
    document.getElementById("trackTitle").textContent = cfg.music.title || "now playing";
    const audio = document.getElementById("audio");
    audio.src = cfg.music.src;
    audio.volume = cfg.music.volume ?? 0.4;
  }
}

function setupGate(cfg){
  const gate = document.getElementById("gate");
  const main = document.getElementById("main");
  gate.addEventListener("click", ()=>{
    gate.style.opacity = "0";
    setTimeout(()=> gate.hidden = true, 500);
    main.hidden = false;

    if(cfg.music && cfg.music.enabled && cfg.music.src && cfg.music.autoplay){
      const audio = document.getElementById("audio");
      audio.play().catch(()=>{/* alcuni browser bloccano comunque */});
      document.getElementById("iconPlay").hidden = true;
      document.getElementById("iconPause").hidden = false;
    }
  }, { once:true });
}

function setupPlayer(){
  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("playBtn");
  const muteBtn = document.getElementById("muteBtn");
  const fill = document.getElementById("playerFill");
  const iconPlay = document.getElementById("iconPlay");
  const iconPause = document.getElementById("iconPause");
  const iconVolOn = document.getElementById("iconVolOn");
  const iconVolOff = document.getElementById("iconVolOff");

  playBtn.addEventListener("click", ()=>{
    if(audio.paused){
      audio.play();
      iconPlay.hidden = true; iconPause.hidden = false;
    } else {
      audio.pause();
      iconPlay.hidden = false; iconPause.hidden = true;
    }
  });

  muteBtn.addEventListener("click", ()=>{
    audio.muted = !audio.muted;
    iconVolOn.hidden = audio.muted;
    iconVolOff.hidden = !audio.muted;
  });

  audio.addEventListener("timeupdate", ()=>{
    if(audio.duration){
      fill.style.width = (audio.currentTime / audio.duration * 100) + "%";
    }
  });
}

// ---------- subtle particle background ----------
function setupFx(){
  const canvas = document.getElementById("fx");
  const ctx = canvas.getContext("2d");
  let w, h, particles;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  function makeParticles(){
    const count = Math.min(60, Math.floor(w/28));
    particles = Array.from({length:count}, ()=>({
      x: Math.random()*w,
      y: Math.random()*h,
      r: Math.random()*1.6 + 0.4,
      vx: (Math.random()-0.5)*0.15,
      vy: (Math.random()-0.5)*0.15,
      c: Math.random() > 0.5 ? "255,46,109" : "0,229,255",
      a: Math.random()*0.5 + 0.15
    }));
  }
  function tick(){
    ctx.clearRect(0,0,w,h);
    particles.forEach(p=>{
      p.x += p.vx; p.y += p.vy;
      if(p.x < 0) p.x = w; if(p.x > w) p.x = 0;
      if(p.y < 0) p.y = h; if(p.y > h) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(${p.c},${p.a})`;
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }

  resize(); makeParticles();
  window.addEventListener("resize", ()=>{ resize(); makeParticles(); });
  if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    tick();
  }
}

// ---------- init ----------
document.addEventListener("DOMContentLoaded", ()=>{
  renderPage(CONFIG);
  setupGate(CONFIG);
  setupPlayer();
  setupFx();
});
