/* ============================================================
   effects.js — scrollytelling, mouse tracking, transitions
   Called from App.jsx after React mounts.
   ============================================================ */

let cleanups = [];

export function cleanupEffects() {
  while (cleanups.length > 0) {
    const cb = cleanups.pop();
    try {
      cb();
    } catch (e) {
      console.error("Error running cleanup", e);
    }
  }
}

export function initEffects() {
  if (typeof window === 'undefined') return;
  cleanupEffects();

  const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Page curtain: only run once on initial page load
  if (!window.__pageCurtainRan) {
    window.__pageCurtainRan = true;
    pageCurtain();
  }

  if (!reduce) {
    const controller = new AbortController();
    const signal = controller.signal;
    cleanups.push(() => controller.abort());

    customCursor(signal);
    revealObserver();
    heroParallax(signal);
    heroStagger();
    rasamTilt(signal);
    magneticButtons(signal);
    scrollProgress(signal);
    chapterDots();
    sectionTone();
    navHide(signal);
  }

  /* ---------- 1. Page-load curtain ---------- */
  function pageCurtain() {
    const c = document.createElement("div");
    c.className = "page-curtain";
    c.innerHTML = `
      <div class="page-curtain-panel left"></div>
      <div class="page-curtain-panel right"></div>
      <div class="page-curtain-mark">
        <span class="m1">PHOTO</span>
        <span class="m2">×</span>
        <span class="m3">XTREME</span>
      </div>
    `;
    document.body.appendChild(c);
    requestAnimationFrame(() => {
      c.classList.add("lift");
      setTimeout(() => c.remove(), 1800);
    });
  }

  /* ---------- 2. Custom cursor ---------- */
  function customCursor(signal) {
    if (!hasFinePointer) return;
    const dot = document.createElement("div"); dot.className = "cursor-dot";
    const ring = document.createElement("div"); ring.className = "cursor-ring";
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    document.documentElement.classList.add("has-custom-cursor");

    cleanups.push(() => {
      dot.remove();
      ring.remove();
      document.documentElement.classList.remove("has-custom-cursor");
      document.documentElement.classList.remove("cursor-grow");
    });

    let mx = -100, my = -100, rx = -100, ry = -100;
    window.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; }, { signal });
    window.addEventListener("mouseleave", () => { mx = my = -100; }, { signal });

    let active = true;
    cleanups.push(() => { active = false; });

    function tick() {
      if (!active) return;
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    }
    tick();

    const growSel = 'a, button, [data-cursor="grow"], .gallery-item, .rasam-card, .service-card, input, textarea, select';
    document.addEventListener("mouseover", e => {
      if (e.target.closest(growSel)) document.documentElement.classList.add("cursor-grow");
    }, { signal });
    document.addEventListener("mouseout", e => {
      if (e.target.closest(growSel)) document.documentElement.classList.remove("cursor-grow");
    }, { signal });
  }

  /* ---------- 3. Reveal observer (scrollytelling) ---------- */
  function revealObserver() {
    const autoTags = [
      [".section-eyebrow", "up"],
      [".section-title", "up"],
      [".section-aside", "up"],
      [".about-signature", "scale"],
      [".about-headline", "up"],
      [".about-body", "up"],
      [".about-photo", "mask"],
      [".manifesto h2", "up"],
      [".manifesto-text", "up"],
      [".manifesto-photo", "mask"],
      [".rasams-title", "up"],
      [".rasams-sub", "up"],
      [".rasam-chapter-no", "left"],
      [".rasam-chapter-title", "up"],
      [".rasam-chapter-blurb", "up"],
      [".service-card", "up"],
      [".testimonial-text", "up"],

      [".contact-script", "left"],
      [".contact-title", "up"],
      [".contact-blurb", "up"],
      [".form-row, .contact-form .field, .form-submit", "up"],
    ];
    autoTags.forEach(([sel, kind]) => {
      document.querySelectorAll(sel).forEach((el, i) => {
        if (el.hasAttribute("data-reveal")) return;
        el.setAttribute("data-reveal", kind);
        el.style.setProperty("--reveal-delay", `${(i % 8) * 60}ms`);
      });
    });

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("revealed");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.0, rootMargin: "0px 0px -60px 0px" });

    document.querySelectorAll("[data-reveal]").forEach(el => io.observe(el));
    cleanups.push(() => io.disconnect());

    const chapObservers = [];
    document.querySelectorAll(".rasam-chapter").forEach(chap => {
      const cards = chap.querySelectorAll(".rasam-card");
      const chapIo = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            cards.forEach((c, i) => {
              c.style.transitionDelay = `${i * 90}ms`;
              c.classList.add("revealed");
            });
            chapIo.disconnect();
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -80px 0px" });
      chapIo.observe(chap);
      chapObservers.push(chapIo);
    });
    cleanups.push(() => chapObservers.forEach(co => co.disconnect()));
  }

  /* ---------- 4. Hero mouse parallax ---------- */
  function heroParallax(signal) {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const layers = hero.querySelectorAll(".hero-img .ph");
    let tx = 0, ty = 0, cx = 0, cy = 0;
    hero.addEventListener("mousemove", e => {
      const r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    }, { signal });
    hero.addEventListener("mouseleave", () => { tx = ty = 0; }, { signal });

    let active = true;
    cleanups.push(() => active = false);

    function tick() {
      if (!active) return;
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      layers.forEach((el, i) => {
        const depth = (i === 0 ? -1 : 1) * 14;
        el.style.transform = `translate3d(${cx * depth}px, ${cy * depth}px, 0) scale(1.06)`;
      });
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        const t = scrollY * 0.25;
        layers.forEach(el => {
          el.style.setProperty("--scroll-y", `${t}px`);
        });
      }
      requestAnimationFrame(tick);
    }
    tick();
  }

  /* ---------- 5. Hero h1 word stagger ---------- */
  function heroStagger() {
    const h1 = document.querySelector(".hero h1");
    if (!h1) return;
    h1.classList.add("stagger-ready");
    const lines = h1.innerHTML.split("<br>");
    h1.innerHTML = lines.map(l => `<span class="line"><span class="line-inner">${l}</span></span>`).join("");
    requestAnimationFrame(() => h1.classList.add("stagger-go"));

    const sub = document.querySelector(".hero-sub");
    const cta = document.querySelector(".hero-cta");
    const eyebrow = document.querySelector(".hero-eyebrow");
    [eyebrow, sub, cta].forEach((el, i) => {
      if (!el) return;
      el.classList.add("hero-fade");
      el.style.transitionDelay = `${800 + i * 150}ms`;
      requestAnimationFrame(() => el.classList.add("hero-fade-in"));
    });
  }

  /* ---------- 6. Rasam card tilt ---------- */
  function rasamTilt(signal) {
    if (!hasFinePointer) return;
    document.querySelectorAll(".rasam-card, .service-card, .journal-card").forEach(card => {
      const photo = card.querySelector(".rasam-photo, .ph, .img");
      if (!photo) return;
      let rx = 0, ry = 0;
      card.addEventListener("mousemove", e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        rx = -py * 6;
        ry = px * 6;
        photo.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`;
      }, { signal });
      card.addEventListener("mouseleave", () => {
        photo.style.transform = "";
      }, { signal });
    });
  }

  /* ---------- 7. Magnetic buttons ---------- */
  function magneticButtons(signal) {
    if (!hasFinePointer) return;
    const sel = ".hero-cta, .about-cta, .form-submit, .nav-cta, .gallery-filter";
    document.querySelectorAll(sel).forEach(btn => {
      btn.classList.add("magnetic");
      const strength = 0.35;
      btn.addEventListener("mousemove", e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * strength;
        const y = (e.clientY - r.top - r.height / 2) * strength;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      }, { signal });
      btn.addEventListener("mouseleave", () => { btn.style.transform = ""; }, { signal });
    });
  }

  /* ---------- 8. Scroll progress bar ---------- */
  function scrollProgress(signal) {
    const bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.appendChild(bar);
    cleanups.push(() => bar.remove());

    const update = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
      bar.style.transform = `scaleX(${Math.max(0, Math.min(1, p))})`;
    };
    window.addEventListener("scroll", update, { passive: true, signal });
    update();
  }

  /* ---------- 9. Chapter dot indicator (right side) ---------- */
  function chapterDots() {
    const sections = [
      { sel: "#top", label: "Home" },
      { sel: "#about", label: "About" },
      { sel: "#rasams", label: "Rasams" },
      { sel: "#services", label: "Investment" },
      { sel: "#gallery", label: "Portfolio" },
      { sel: "#contact", label: "Contact" },
    ];

    const nav = document.createElement("nav");
    nav.className = "chapter-dots";
    sections.forEach((s) => {
      const id = s.sel.slice(1);
      nav.insertAdjacentHTML("beforeend",
        `<a href="${s.sel}" data-target="${id}" aria-label="${s.label}">
          <span class="dot"></span>
          <span class="label">${s.label}</span>
        </a>`);
    });
    document.body.appendChild(nav);
    cleanups.push(() => nav.remove());

    const links = nav.querySelectorAll("a");
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id;
          links.forEach(l => l.classList.toggle("active", l.dataset.target === id));
        }
      });
    }, {
      rootMargin: "-49% 0px -49% 0px",
      threshold: 0
    });
    sections.forEach(s => {
      const el = document.querySelector(s.sel);
      if (el) io.observe(el);
    });
    cleanups.push(() => io.disconnect());
  }

  /* ---------- 10. Section background tone transitions ---------- */
  function sectionTone() {
    const map = {
      "hero":        "var(--ink)",
      "trust":       "var(--bone)",
      "about":       "var(--bone)",
      "manifesto":   "var(--oxblood)",
      "rasams":      "var(--bone)",
      "services":    "var(--ink)",
      "gallery":     "var(--bone)",
      "testimonials":"var(--ink)",
      "contact":     "#F4EAD9",
      "footer":      "var(--ink)",
    };
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && e.intersectionRatio > 0.4) {
          const cls = [...e.target.classList].find(c => map[c]);
          if (cls) document.documentElement.style.setProperty("--page-tone", map[cls]);
        }
      });
    }, { threshold: [0.4, 0.6, 0.8] });
    document.querySelectorAll("section, footer").forEach(s => io.observe(s));
    cleanups.push(() => io.disconnect());
  }

  /* ---------- 11. Nav hide on scroll-down ---------- */
  function navHide(signal) {
    const nav = document.querySelector(".nav");
    if (!nav) return;
    let last = 0;
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (y > 240 && y > last) nav.classList.add("nav-hidden");
      else nav.classList.remove("nav-hidden");
      last = y;
    }, { passive: true, signal });
  }
}
