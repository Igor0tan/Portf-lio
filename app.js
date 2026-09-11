const projects = [
  {
    name: "Desafio-DIO",
    desc: "Ransomware simulado e keylogger simulado em Python — implementação e documentação com propósito exclusivamente educacional de cibersegurança.",
    lang: "Python",
    cat: "security",
    icon: "💣",
    home: "segurança ofensiva · educacional",
    url: "https://github.com/Igor0tan/Desafio-DIO",
  },
  {
    name: "bruteforce-dio",
    desc: "Desafio DIO de ataques de Brute Force — processo, conceitos e execução prática de métodos de força bruta.",
    lang: "Python",
    cat: "security",
    icon: "🔓",
    home: "pentest · brute force",
    url: "https://github.com/Igor0tan/bruteforce-dio",
  },
  {
    name: "Fokus1",
    desc: "Foco e produtividade em formato web — cronômetro de foco para manter a concentração nos estudos e no trabalho.",
    lang: "JS",
    cat: "web",
    icon: "⏱",
    home: "produtividade",
    url: "https://github.com/Igor0tan/Fokus1",
  },
  {
    name: "Project",
    desc: "Projeto de exploração e prática de front-end em constante evolução.",
    lang: "Web",
    cat: "web",
    icon: "🧩",
    home: "desenvolvimento",
    url: "https://github.com/Igor0tan/Project",
  },
  {
    name: "Fokus",
    desc: "Versão base do cronômetro de foco, técnica pomodoro para gerenciar tempo e atenção.",
    lang: "Web",
    cat: "web",
    icon: "🍅",
    home: "produtividade · pomodoro",
    url: "https://github.com/Igor0tan/Fokus",
  },
  {
    name: "Dark-mode",
    desc: "Implementação de tema claro/escuro: alternância dinâmica de cores e persistência de preferência.",
    lang: "CSS",
    cat: "web",
    icon: "🌓",
    home: "ui · tema",
    url: "https://github.com/Igor0tan/Dark-mode",
  },
  {
    name: "Solem",
    desc: "Página temática com identidade visual própria, explorando layout e estilo em HTML.",
    lang: "HTML",
    cat: "web",
    icon: "☀️",
    home: "landing page",
    url: "https://github.com/Igor0tan/Solem",
  },
  {
    name: "Numero-Secreto",
    desc: "Jogo interativo de adivinhar o número secreto, com lógica de interação e feedback em tela.",
    lang: "JS",
    cat: "web",
    icon: "🎲",
    home: "jogo",
    url: "https://github.com/Igor0tan/Numero-Secreto",
  },
  {
    name: "Ultron",
    desc: "Página de interface com temática futurista, exercitando estruturação e responsividade.",
    lang: "HTML",
    cat: "web",
    icon: "🤖",
    home: "ui · futurista",
    url: "https://github.com/Igor0tan/Ultron",
  },
  {
    name: "AluraBook",
    desc: "Catálogo de livros com carrossel e boas práticas de layout responsivo.",
    lang: "HTML",
    cat: "web",
    icon: "📚",
    home: "catálogo · responsivo",
    url: "https://github.com/Igor0tan/AluraBook",
  },
  {
    name: "aluraplus",
    desc: "Landing page de streaming combinando plataformas, seções de destaque e chamadas para ação.",
    lang: "HTML",
    cat: "web",
    icon: "🎬",
    home: "landing page",
    url: "https://github.com/Igor0tan/aluraplus",
  },
];

const container = document.querySelector("#projects");
const filters = document.querySelectorAll(".filter");

function render(filter) {
  const list = filter === "all" ? projects : projects.filter((p) => p.cat === filter);
  container.innerHTML = list
    .map(
      (p, i) => `
      <article class="card card-${p.cat} reveal">
        <div class="card-top">
          <span class="card-icon">${p.icon}</span>
          <span class="card-idx">0${String(i + 1).padStart(1, "0")}.repo</span>
        </div>
        <div class="card-home">${p.home}</div>
        <h4 class="card-name">${p.name}</h4>
        <p class="card-desc">${p.desc}</p>
        <div class="card-links">
          <span class="card-lang">${p.lang}</span>
          <a class="card-go" href="${p.url}" target="_blank" rel="noopener">ver código <span>↗</span></a>
        </div>
      </article>`
    )
    .join("");
  observeReveal();
}

filters.forEach((btn) =>
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    render(btn.dataset.filter);
  })
);

/* ---------- Reveal on scroll ---------- */
let io;
function observeReveal() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in-view"));
    return;
  }
  if (io) io.disconnect();
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

/* ---------- Matrix rain ---------- */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
const glyphs = "アイウエオカキクケコサシスセソタチツテト01010110IGORSECURITAS".split("");

function sizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
sizeCanvas();
window.addEventListener("resize", sizeCanvas);

const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = new Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(5, 7, 15, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = glyphs[Math.floor(Math.random() * glyphs.length)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;
    ctx.fillStyle = i % 3 === 0 ? "#00ff9d" : "#00f0ff";
    ctx.shadowBlur = 8;
    ctx.shadowColor = "#00f0ff";
    ctx.fillText(text, x, y);
    ctx.shadowBlur = 0;
    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(drawMatrix, 46);

/* ---------- Typewriter ---------- */
const typeLines = [
  "Estudante de programação em evolução constante",
  "Focado em cibersegurança e segurança ofensiva",
  "Pentest · vulnerabilidades · segurança da informação",
];
const typeEl = document.getElementById("typewriter");
let li = 0;
let ci = 0;
let deleting = false;

function type() {
  const line = typeLines[li];
  if (!deleting) {
    typeEl.textContent = line.slice(0, ++ci);
    if (ci === line.length) deleting = true;
  } else {
    typeEl.textContent = line.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      li = (li + 1) % typeLines.length;
    }
  }
  setTimeout(type, deleting ? 35 : 70);
}

/* ---------- Status text ---------- */
const statusText = document.getElementById("status-text");
const statuses = ["system online", "scanning...", "security module active", "pentest ready"];
let si = 0;
setInterval(() => {
  si = (si + 1) % statuses.length;
  statusText.textContent = statuses[si];
}, 2600);

document.addEventListener("DOMContentLoaded", () => {
  render("all");
  observeReveal();
  setTimeout(type, 400);
});
