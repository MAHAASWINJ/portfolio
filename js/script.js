// ==========================================================
// Interactive terminal
// ==========================================================
const terminalBody = document.getElementById('terminalBody');

if (terminalBody) {

  const banner =
`███╗   ███╗ █████╗ ██╗  ██╗ █████╗  █████╗ ███████╗
████╗ ████║██╔══██╗██║  ██║██╔══██╗██╔══██╗██╔════╝
██╔████╔██║███████║███████║███████║███████║███████╗
██║╚██╔╝██║██╔══██║██╔══██║██╔══██║██╔══██║╚════██║
██║ ╚═╝ ██║██║  ██║██║  ██║██║  ██║██║  ██║███████║

Cybersecurity Portfolio
Type 'help' to begin`;

  const blocks = {
    'help': [
      "Available commands:",
      "  help              show this list",
      "  cat about.txt     who I am",
      "  cat projects.txt  things I've built",
      "  cat contact.txt   how to reach me",
      "  neofetch          system info card",
      "  sudo hire-me      ;)",
      "  hacktheplanet     don't",
      "  banner            show the banner again",
      "  clear             clear the terminal"
    ].join('\n'),

    'cat about.txt':
`Mahaaswin J

Computer Science & Engineering
Specialization: Cybersecurity

Passionate about building secure, scalable
and efficient systems.

Areas of Interest:
• Cybersecurity
• Full Stack Development
• System Design
• Automation

Mission:
Build systems that are fast,
reliable and hard to break.`,

    'cat projects.txt':
`Projects

1. Food Delivery Management System

Repository:
https://github.com/MAHAASWINJ/food-delivery

Use:
open project`,

    'cat contact.txt':
`Contact Information

Email:
mahaaswinj@gmail.com

GitHub:
https://github.com/MAHAASWINJ

LinkedIn:
(Add later)`,

    'neofetch':
`User      : Mahaaswin J
Role      : CSE Student
Specialty : Cybersecurity
Editor    : VS Code
OS        : Linux Mint
GitHub    : MAHAASWINJ
Coffee    : Required`,

    'sudo hire-me':
`[sudo] password for recruiter:

Access Granted.

✔ Cybersecurity Enthusiast
✔ Full Stack Developer
✔ Fast Learner
✔ Problem Solver
✔ Team Player

Welcome aboard.`,

    'hacktheplanet':
`Initializing attack...

Connecting...
Bypassing firewall...
Escalating privileges...

ERROR:
Ethical hacker detected.

Access denied.`,

    'banner': banner
  };

  let history = [];
  let historyIndex = -1;

  function addCommandLine(text) {
    const line = document.createElement('div');
    line.className = 'line';
    const promptEl = document.createElement('span');
    promptEl.className = 'prompt';
    promptEl.textContent = '$';
    const textEl = document.createElement('span');
    textEl.className = 'highlight';
    textEl.textContent = text;
    line.appendChild(promptEl);
    line.appendChild(textEl);
    terminalBody.insertBefore(line, terminalBody.querySelector('.terminal__inputline'));
  }

  function addBlock(text) {
    const pre = document.createElement('pre');
    pre.className = 'terminal__block';
    pre.textContent = text;
    terminalBody.insertBefore(pre, terminalBody.querySelector('.terminal__inputline'));
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function typeBanner(text, onDone) {
    const pre = document.createElement('pre');
    pre.className = 'terminal__block';
    terminalBody.appendChild(pre);
    let i = 0;
    const speed = 4;
    const timer = setInterval(() => {
      pre.textContent += text[i];
      i++;
      terminalBody.scrollTop = terminalBody.scrollHeight;
      if (i >= text.length) {
        clearInterval(timer);
        if (onDone) onDone();
      }
    }, speed);
  }

  function runCommand(raw) {
    const input = raw.trim();
    if (!input) return;

    addCommandLine(input);
    history.push(input);
    historyIndex = history.length;

    const cmd = input.toLowerCase();

    if (cmd === 'clear') {
      terminalBody.querySelectorAll('.line:not(.terminal__inputline), .terminal__block').forEach(el => el.remove());
      return;
    }

    if (cmd === 'open project' || cmd === 'github') {
      addBlock('Opening github.com/MAHAASWINJ/food-delivery ...');
      window.open('https://github.com/MAHAASWINJ/food-delivery', '_blank', 'noopener');
      return;
    }

    if (blocks[cmd]) {
      addBlock(blocks[cmd]);
      return;
    }

    addBlock(`command not found: ${input}\ntype 'help' for options`);
  }

  function buildInputLine() {
    const line = document.createElement('div');
    line.className = 'line terminal__inputline';

    const promptEl = document.createElement('span');
    promptEl.className = 'prompt';
    promptEl.textContent = '$';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'terminal__input';
    input.id = 'terminalInput';
    input.autocomplete = 'off';
    input.spellcheck = false;
    input.setAttribute('aria-label', 'Terminal command input');

    line.appendChild(promptEl);
    line.appendChild(input);
    terminalBody.appendChild(line);

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        runCommand(input.value);
        input.value = '';
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (history.length && historyIndex > 0) {
          historyIndex--;
          input.value = history[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < history.length - 1) {
          historyIndex++;
          input.value = history[historyIndex];
        } else {
          historyIndex = history.length;
          input.value = '';
        }
      }
    });

    terminalBody.addEventListener('click', () => input.focus());
    return input;
  }

  typeBanner(banner, () => {
    const input = buildInputLine();
    setTimeout(() => input.focus(), 100);
  });
}

// ==========================================================
// Scroll reveal
// ==========================================================
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// ==========================================================
// Mobile nav
// ==========================================================
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav__links');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const open = navLinks.style.display === 'flex';
    navLinks.style.display = open ? 'none' : 'flex';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '58px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.flexDirection = 'column';
    navLinks.style.background = 'rgba(10,15,15,.98)';
    navLinks.style.padding = '20px';
    navLinks.style.borderBottom = '1px solid var(--border)';
    navLinks.style.gap = '18px';
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => { navLinks.style.display = 'none'; });
  });
}

// ==========================================================
// Gallery lightbox
// ==========================================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery__item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = item.dataset.caption || '';
    lightbox.classList.add('is-open');
  });
});

function closeLightbox() { lightbox.classList.remove('is-open'); }

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

