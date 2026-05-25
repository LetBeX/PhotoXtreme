import React, { useState, useEffect, useRef } from 'react';
import { initEffects, cleanupEffects } from './effects';
import {
  TweaksPanel,
  useTweaks,
  TweakSection,
  TweakRadio,
  TweakToggle
} from './components/TweaksPanel';

// Hero and Manifesto photo imports
import imgHeroLeft from './assets/photos/Left-Hero.webp';
import imgHeroRight from './assets/photos/Right-hero.webp';
import imgLife from './assets/photos/life.webp';
import imgContactBg from './assets/photos/Contact.webp';
import imgAboutMain from './assets/photos/About-main.webp';
import imgAboutPolaroid from './assets/photos/bcdd41b9-7998-40ea-a39b-887534f77fc5.jpg';

// Services photo imports
import imgHeirloom from './assets/photos/Heirloom.webp';
import imgElopement from './assets/photos/Elopement.webp';
import imgFilm35mm from './assets/photos/FILM & 35mm.webp';

// New Rasams photo imports
import rasamRoka from './assets/photos/Roka.webp';
import rasamHaldi from './assets/photos/Haldi.webp';
import rasamMehndi from './assets/photos/Mehndi.webp';
import rasamTilak from './assets/photos/Tilak.webp';
import rasamSangeet from './assets/photos/Sangeet.webp';
import rasamBaraat from './assets/photos/Baraat.webp';
import rasamJaimala from './assets/photos/Jaimala.webp';
import rasamKanyadaan from './assets/photos/Kanyadaan.webp';
import rasamMangalsutra from './assets/photos/Mangalsutra.webp';
import rasamSaatPhere from './assets/photos/Saat Phere.webp';
import rasamSindoor from './assets/photos/Sindoor.webp';
import rasamVidaai from './assets/photos/Vidaai.webp';
import rasamGrihaPravesh from './assets/photos/Griha Pravesh.webp';
import rasamRingFinding from './assets/photos/Ring Finding Ceremony.webp';
import rasamMoohDikhai from './assets/photos/Mooh Dikhai.webp';
import rasamPagPhera from './assets/photos/Pag Phera.webp';


const IMG = {
  heroL: imgHeroLeft,
  heroR: imgHeroRight,
  manifesto: imgLife,
  contactBg: imgContactBg,
  aboutMain: imgAboutMain,
  aboutPolaroid: imgAboutPolaroid,

  // services
  svc1: imgHeirloom,
  svc2: imgElopement,
  svc3: imgFilm35mm,

  // rasams (16) — use the new unique images
  r_roka: rasamRoka,
  r_haldi: rasamHaldi,
  r_mehndi: rasamMehndi,
  r_chuda: rasamTilak,
  r_sangeet: rasamSangeet,
  r_baraat: rasamBaraat,
  r_jaimala: rasamJaimala,
  r_kanyadaan: rasamKanyadaan,
  r_mangal: rasamMangalsutra,
  r_phere: rasamSaatPhere,
  r_sindoor: rasamSindoor,
  r_vidaai: rasamVidaai,
  r_griha: rasamGrihaPravesh,
  r_ring: rasamRingFinding,
  r_mooh: rasamMoohDikhai,
  r_pag: rasamPagPhera,
};

/* ============================================================
   NAV
   ============================================================ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <a href="#top" className="brand">PHOTO<span className="amp">×</span>XTREME</a>
      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#rasams">Rasams</a></li>
        <li><a href="#services">Investment</a></li>
        <li><a href="#gallery">Portfolio</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <a href="#contact" className="nav-cta">Enquire</a>
    </nav>
  );
}

/* ============================================================
   HERO
   ============================================================ */
function Hero() {
  return (
    <section className="hero" id="top" data-screen-label="01 Hero">
      <div className="hero-img left">
        <div className="ph" style={{ backgroundImage: `linear-gradient(rgba(26,23,20,0.35), rgba(26,23,20,0.35)), url(${IMG.heroL})` }} />
      </div>
      <div className="hero-center">
        <h1>
          FROM MEHNDI<br />
          TO VIDAAI,<br />
          <span className="italic">every ritual remembered.</span>
        </h1>
        <p className="hero-sub">
          Cinematic Indian wedding photography for couples who want their day
          told like a film — every rasam, every laugh, every grandparent's
          glance held forever in light and grain.
        </p>
        <a href="#contact" className="hero-cta">
          Book a Consultation <span className="arrow">→</span>
        </a>
        <div className="hero-tag br">est. 2017</div>
        <div className="hero-scroll">SCROLL</div>
      </div>
      <div className="hero-img right">
        <div className="ph" style={{ backgroundImage: `linear-gradient(rgba(91,26,34,0.2), rgba(26,23,20,0.4)), url(${IMG.heroR})` }} />
      </div>
    </section>
  );
}

/* ============================================================
   TRUST STRIP
   ============================================================ */
function Trust() {
  return (
    <section className="trust">
      <div className="trust-inner">
        <div className="trust-label">As Featured In</div>
        <div className="trust-logo serif">Wedding&nbsp;Sutra</div>
        <div className="trust-logo bold">VOGUE INDIA</div>
        <div className="trust-logo">WEDMEGOOD</div>
        <div className="trust-logo serif">The&nbsp;Knot&nbsp;India</div>
        <div className="trust-logo bold">BRIDES TODAY</div>
        <div className="trust-logo">SHAADISAGA</div>
        <div className="trust-logo serif">Bridal&nbsp;Asia</div>
      </div>
    </section>
  );
}

/* ============================================================
   ABOUT
   ============================================================ */
function About() {
  return (
    <section className="about" id="about" data-screen-label="02 About">
      <div className="about-inner">
        <div className="about-collage">
          <div className="about-photo main" style={{ backgroundImage: `url(${IMG.aboutMain})` }} />
          <div className="about-photo polaroid" style={{
            backgroundImage: `linear-gradient(var(--bone), var(--bone)), url(${IMG.aboutPolaroid})`
          }} />
        </div>
        <div className="about-content">
          <div className="about-hi">NAMASTE, I'M</div>
          <div className="about-signature">Anshul Saini</div>
          <h2 className="about-headline">
            I photograph Indian weddings the way nani tells stories — <em>slowly, with detail, and from the heart.</em>
          </h2>
          <p className="about-body">
            For nearly a decade I've documented our quietest rituals — the way a
            mother oils her daughter's hair before haldi, the half-second before
            the saat phere, the way a father's hand trembles during kanyadaan.
            My work lives somewhere between a Sanjay Leela Bhansali frame and
            your grandparents' wedding album.
          </p>
          <p className="about-body">
            Trained at NID Ahmedabad and shooting mostly on medium-format film,
            I take eighteen weddings a year — never more — across India and
            wherever a passport will take us.
          </p>
          <a href="#contact" className="about-cta">More About Me →</a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   MANIFESTO (oxblood)
   ============================================================ */
function Manifesto() {
  return (
    <section className="manifesto" data-screen-label="03 Manifesto">
      <div className="manifesto-inner">
        <div className="manifesto-script">for couples who want their wedding to feel like —</div>
        <h2>
          A LONG, GOLDEN<br />
          AFTERNOON<span className="ornament" style={{ backgroundImage: `url(${IMG.manifesto})` }} />WHERE<br />
          NOTHING IS <em style={{ fontFamily: "var(--serif)", fontStyle: "italic", textTransform: "none" }}>rushed</em> &amp;<br />
          EVERYTHING IS <em style={{ fontFamily: "var(--serif)", fontStyle: "italic", textTransform: "none" }}>remembered.</em>
        </h2>
        <div className="manifesto-body">
          <div className="manifesto-photo" style={{ backgroundImage: `url(${IMG.manifesto})` }} />
          <p className="manifesto-text">
            I believe Indian wedding photos shouldn't look like Indian wedding
            photos — they should look like <strong>your life</strong>, only on
            the most beautiful day of it. No stiff stage portraits, no
            forty-grinning-aunty permutations. Just enough direction to make you
            look like yourselves, and the rest is mine to find — the diya, the
            dupatta, the dadi crying behind a marigold curtain.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   RASAMS — three-chapter story
   ============================================================ */
const RASAMS = {
  pre: {
    chapter: "CHAPTER ONE",
    title: "Before the Wedding",
    titleItalic: "the blessings",
    blurb: "Rituals of purification, blessings, and preparing the couple — the days when the house smells of marigold and turmeric.",
    accent: "saffron",
    items: [
      { hindi: "रोका", name: "ROKA / SAGAI", italic: "the engagement", desc: "The formal engagement — families exchange gifts and quietly, officially, say yes.", img: IMG.r_roka },
      { hindi: "हल्दी", name: "HALDI", italic: "the golden paste", desc: "Turmeric, oil and water applied to the bride and groom — for glowing skin, and an old kind of protection.", img: IMG.r_haldi },
      { hindi: "मेहंदी", name: "MEHNDI", italic: "henna nights", desc: "Intricate designs drawn on the bride's hands and feet — love, joy, and a name hidden somewhere for the groom to find.", img: IMG.r_mehndi },
      { hindi: "चूड़ा", name: "TILAK · CHUDA · KALIRE", italic: "the bangles", desc: "Close relatives bless the couple; the bride is given red and ivory bangles and silver kalire to dance from her wrists.", img: IMG.r_chuda },
      { hindi: "संगीत", name: "SANGEET / GARBA", italic: "the music night", desc: "Both families come together — choreographed dances, dholaks, late-night gossip, the floor sticky with mithai.", img: IMG.r_sangeet },
    ]
  },
  day: {
    chapter: "CHAPTER TWO",
    title: "The Wedding Day",
    titleItalic: "the vows",
    blurb: "The Vedic rituals that bind the couple — fire, fabric, garlands, and seven careful steps.",
    accent: "oxblood",
    items: [
      { hindi: "बारात", name: "BAARAAT", italic: "the procession", desc: "The groom arrives with a band, a horse, and a hundred uncles dancing in the street — half ceremony, half parade.", img: IMG.r_baraat },
      { hindi: "जयमाला", name: "JAIMALA / VARMALA", italic: "the garlands", desc: "Floral garlands exchanged — a quiet promise made between two people the whole hall is watching.", img: IMG.r_jaimala },
      { hindi: "कन्यादान", name: "KANYADAAN", italic: "the giving", desc: "The bride's father places her hand into the groom's — the moment every father has rehearsed and dreaded in equal measure.", img: IMG.r_kanyadaan },
      { hindi: "मंगलसूत्र", name: "MANGALYA / MANGALSUTRA", italic: "the sacred thread", desc: "The groom ties the holy thread around the bride's neck — a knot meant to outlast them.", img: IMG.r_mangal },
      { hindi: "सात फेरे", name: "SAPTAPADI · SAAT PHERE", italic: "the seven steps", desc: "Seven steps around the holy fire — seven vows for love, duty, prosperity, and a life still being written.", img: IMG.r_phere },
      { hindi: "सिंदूर", name: "SINDOOR", italic: "the red line", desc: "The groom places vermilion in the parting of the bride's hair — the smallest, loudest gesture of the day.", img: IMG.r_sindoor },
    ]
  },
  post: {
    chapter: "CHAPTER THREE",
    title: "After the Wedding",
    titleItalic: "the new home",
    blurb: "Farewells, welcomes, and the careful, joyful work of folding one family into another.",
    accent: "plum",
    items: [
      { hindi: "विदाई", name: "VIDAAI", italic: "the farewell", desc: "The bride leaves her parents' home — handfuls of rice thrown over her shoulder, and a quiet so heavy you can hear it.", img: IMG.r_vidaai },
      { hindi: "गृह प्रवेश", name: "GRIHA PRAVESH", italic: "the welcome", desc: "She steps into her new home — a pot of rice tipped over the threshold, a promise of abundance scattered at her feet.", img: IMG.r_griha },
      { hindi: "अंगूठी", name: "RING FINDING", italic: "the first game", desc: "A bowl of milk and rose petals; a ring lost somewhere in it. Whoever finds it first rules the marriage — or so the aunties say.", img: IMG.r_ring },
      { hindi: "मुँह दिखाई", name: "MOOH DIKHAI", italic: "the unveiling", desc: "The bride is introduced, one by one, to the groom's extended family — blessings, an envelope, a slow handing-over of love.", img: IMG.r_mooh },
      { hindi: "पग फेरा", name: "PAG PHERA", italic: "the return", desc: "She comes back to her childhood home for a day — and her parents remember, briefly, the daughter she used to be.", img: IMG.r_pag },
    ]
  }
};

function StoryChapter({ data }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const items = data.items;
  const stageVh = 70;

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = Math.max(1, r.height - vh);
        const scrolled = Math.max(0, -r.top);
        const progress = Math.min(0.9999, scrolled / total);
        const idx = Math.min(items.length - 1, Math.floor(progress * items.length));
        setActive(prev => prev === idx ? prev : idx);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items.length]);

  const active_r = items[active];

  return (
    <section
      ref={ref}
      className={`story-chapter accent-${data.accent}`}
      style={{ height: `${items.length * stageVh + 30}vh` }}
    >
      <div className="story-sticky">
        <div className="story-left">
          <div className="story-chapter-meta">
            <div className="story-chapter-tag">{data.chapter}</div>
            <div className="story-chapter-name">
              {data.title} <em>— {data.titleItalic}</em>
            </div>
          </div>

          <div className="story-cards">
            {items.map((r, i) => (
              <article key={i} className={`story-card ${i === active ? "is-active" : ""} ${i < active ? "is-past" : ""}`}>
                <div className="story-card-hindi" lang="hi">{r.hindi}</div>
                <h3 className="story-card-name">{r.name}</h3>
                <div className="story-card-italic">{r.italic}</div>
                <p className="story-card-desc">{r.desc}</p>
              </article>
            ))}
          </div>

          <div className="story-progress">
            <span className="story-progress-num">{String(active + 1).padStart(2, "0")}</span>
            <span className="story-progress-line">
              <span style={{ width: `${((active + 1) / items.length) * 100}%` }} />
            </span>
            <span className="story-progress-num muted">{String(items.length).padStart(2, "0")}</span>
          </div>
        </div>

        <div className="story-right" aria-hidden="true">
          <div
            className="story-arc"
            style={{ "--active": active, "--total": items.length }}
          >
            {items.map((r, i) => (
              <div
                key={i}
                className={`story-arc-item ${i === active ? "is-active" : ""}`}
                style={{ "--i": i, backgroundImage: `url(${r.img})` }}
              >
                <span className="arc-hindi" lang="hi">{r.hindi}</span>
                <span className="arc-no">№ {String(i + 1).padStart(2, "0")}</span>
                <span className="arc-name">{active_r && i === active ? r.italic : ""}</span>
              </div>
            ))}
          </div>
          <div className="story-right-chrome">
            <span>{data.chapter}</span>
            <span>{String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Rasams() {
  return (
    <div id="rasams" data-screen-label="04 Rasams">
      <section className="rasams-intro">
        <div className="rasams-inner">
          <div className="rasams-head">
            <div className="section-eyebrow">A WEDDING, IN THREE CHAPTERS</div>
            <h2 className="rasams-title">
              THE <em>rasams.</em>
            </h2>
            <p className="rasams-sub">
              Every Indian wedding is a film told across many days. Scroll on —
              these are the rituals I love photographing most, told one frame at
              a time.
            </p>
            <div className="rasams-scroll-hint">
              <span /> scroll to begin
            </div>
          </div>
        </div>
      </section>
      <StoryChapter data={RASAMS.pre} />
      <StoryChapter data={RASAMS.day} />
      <StoryChapter data={RASAMS.post} />
    </div>
  );
}

/* ============================================================
   SERVICES
   ============================================================ */
const SERVICES = [
  {
    kicker: "FULL SHAADI · 3 DAYS",
    title: "THE",
    titleItalic: "Heirloom",
    blurb: "Mehndi through vidaai — two photographers, hand-bound proof album, every rasam covered.",
    price: "from ₹4,80,000",
    img: () => IMG.svc1
  },
  {
    kicker: "INTIMATE · 1 DAY",
    title: "THE",
    titleItalic: "Elopement",
    blurb: "A court wedding, a temple, or a quiet ceremony in your parents' living room.",
    price: "from ₹1,80,000",
    img: () => IMG.svc2
  },
  {
    kicker: "EDITORIAL · ADD-ON",
    title: "FILM",
    titleItalic: "& 35mm",
    blurb: "A second body loaded with Portra 400 — twelve to twenty hand-scanned frames.",
    price: "add ₹65,000",
    img: () => IMG.svc3
  }
];

function Services() {
  return (
    <section className="services" id="services" data-screen-label="05 Services">
      <div className="services-inner">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">THE INVESTMENT</div>
            <h2 className="section-title">Three ways to <em>begin.</em></h2>
          </div>
          <p className="section-aside">
            Each collection is a starting point — I'd rather build something
            that fits your shaadi than sell you a package.
          </p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div className="service-card" key={i}>
              <div className="ph" style={{ backgroundImage: `url(${s.img()})` }} />
              <div className="service-card-content">
                <div className="service-card-kicker">{s.kicker}</div>
                <div className="service-card-title">
                  {s.title} <em>{s.titleItalic}</em>
                </div>
                <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 15, lineHeight: 1.5, opacity: 0.85, marginTop: 10, maxWidth: 300 }}>
                  {s.blurb}
                </div>
                <div className="service-card-meta">
                  <span>Enquire →</span>
                  <span className="price">{s.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   GALLERY (filterable)
   ============================================================ */
const GALLERY = [
  { cat: "Ceremony", size: "s-1x2", img: rasamRoka, label: "Roka Ceremony" },
  { cat: "Haldi & Mehndi", size: "s-1x1", img: rasamHaldi, label: "Golden Haldi" },
  { cat: "Haldi & Mehndi", size: "s-1x1", img: rasamMehndi, label: "Intricate Mehndi" },
  { cat: "Ceremony", size: "s-1x2", img: rasamTilak, label: "Tilak Ritual" },
  { cat: "Reception", size: "s-1x2", img: rasamSangeet, label: "Sangeet Night" },
  { cat: "Ceremony", size: "s-2x1", img: rasamBaraat, label: "Baraat Procession" },
  { cat: "Ceremony", size: "s-1x1", img: rasamJaimala, label: "Jaimala Exchange" },
  { cat: "Ceremony", size: "s-2x2", img: rasamKanyadaan, label: "Kanyadaan" },
  { cat: "Ceremony", size: "s-1x2", img: rasamMangalsutra, label: "Mangalsutra Moment" },
  { cat: "Ceremony", size: "s-2x1", img: rasamSaatPhere, label: "Saat Phere" },
  { cat: "Ceremony", size: "s-1x1", img: rasamSindoor, label: "Sindoor Ritual" },
  { cat: "Ceremony", size: "s-1x2", img: rasamVidaai, label: "Emotional Vidaai" },
  { cat: "Ceremony", size: "s-1x1", img: rasamGrihaPravesh, label: "Griha Pravesh" },
  { cat: "Reception", size: "s-2x2", img: rasamRingFinding, label: "Ring Finding Game" },
  { cat: "Portraits", size: "s-1x1", img: rasamMoohDikhai, label: "Mooh Dikhai" },
  { cat: "Portraits", size: "s-1x2", img: rasamPagPhera, label: "Pag Phera Return" },
  { cat: "Ceremony", size: "s-1x1", img: imgElopement, label: "Intimate Elopement" }
];

function Gallery() {
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Haldi & Mehndi", "Ceremony", "Portraits", "Reception"];
  const items = filter === "All" ? GALLERY : GALLERY.filter(g => g.cat === filter);

  return (
    <section className="gallery" id="gallery" data-screen-label="06 Gallery">
      <div className="gallery-inner">
        <div className="section-head" style={{ marginBottom: 32 }}>
          <div>
            <div className="section-eyebrow">SELECTED WORK · 2022—2026</div>
            <h2 className="section-title">The <em>archive.</em></h2>
          </div>
        </div>
        <div className="gallery-filters">
          {cats.map(c => (
            <button
              key={c}
              className={`gallery-filter ${filter === c ? "active" : ""}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
          <div className="gallery-count">
            <em>{items.length}</em> frames
          </div>
        </div>
        <div className="gallery-grid">
          {items.map((g, i) => (
            <div
              className={`gallery-item ${g.size} s-fade`}
              key={`${filter}-${i}`}
              data-label={g.label}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="ph" style={{ backgroundImage: `url(${g.img})` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TESTIMONIALS
   ============================================================ */
const TESTIMONIALS = [
  {
    text: "Aarav doesn't take pictures — he catches the air around the moment. We opened our album and my mother cried for an hour. Then she called her sisters and they cried too.",
    name: "Ananya & Vikram",
    meta: "MARRIED IN UDAIPUR · NOVEMBER 2025"
  },
  {
    text: "Our pandit ji ran the saat phere fast, our cousins ran the sangeet faster, and Aarav was somehow ahead of all of them. Every frame is a small story.",
    name: "Riya & Aditya",
    meta: "DELHI WEDDING · FEBRUARY 2025"
  },
  {
    text: "We told him not to pose us, and he didn't. The vidaai photos are unflinching — my whole family in one frame, all of us a little broken open. I'll keep them forever.",
    name: "Meher & Arjun",
    meta: "JAIPUR · OCTOBER 2024"
  }
];

function Testimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(t);
  }, []);
  const t = TESTIMONIALS[idx];
  return (
    <section className="testimonials" data-screen-label="07 Testimonials">
      <div className="testimonials-inner">
        <div className="testimonial-quote-mark">"</div>
        <div className="testimonial-text" key={idx}>{t.text}</div>
        <div className="testimonial-meta">
          <span className="name">— {t.name}</span>
          {t.meta}
        </div>
        <div className="testimonial-dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`testimonial-dot ${i === idx ? "active" : ""}`}
              onClick={() => setIdx(i)}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}



/* ============================================================
   CONTACT
   ============================================================ */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", date: "", type: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="contact" id="contact" data-screen-label="09 Contact">
      <div className="contact-bg" style={{ backgroundImage: `url(${IMG.contactBg})` }} />
      <div className="contact-inner">
        <div>
          <div className="contact-script">let's begin —</div>
          <h2 className="contact-title">TELL ME<br /><em>your story.</em></h2>
          <p className="contact-blurb">
            I take eighteen weddings a year and reply to every enquiry myself,
            usually within two days. There are no wrong questions — start
            wherever you'd like.
          </p>
          <div className="contact-details">
            <strong>Studio</strong>
            Hauz Khas Village, New Delhi
            <strong>Hours</strong>
            By appointment · Tues — Fri
            <strong>Direct</strong>
            hello@photoxtreme.studio<br />
            +91 98100 — 88456
          </div>
        </div>

        <form className="contact-form" onSubmit={submit}>
          <div className="form-row">
            <div className="field">
              <input type="text" placeholder=" " value={form.name} onChange={e => set("name", e.target.value)} required />
              <label>Your Name</label>
            </div>
            <div className="field">
              <input type="email" placeholder=" " value={form.email} onChange={e => set("email", e.target.value)} required />
              <label>Email</label>
            </div>
          </div>
          <div className="form-row">
            <div className="field">
              <input type="text" placeholder=" " value={form.date} onChange={e => set("date", e.target.value)} />
              <label>Wedding Date</label>
            </div>
            <div className="field">
              <select value={form.type} onChange={e => set("type", e.target.value)} required style={{ paddingRight: 20 }}>
                <option value="">—</option>
                <option>The Heirloom (3-day)</option>
                <option>The Elopement (1-day)</option>
                <option>Film add-on</option>
                <option>Not sure yet</option>
              </select>
              <label>Collection</label>
            </div>
          </div>
          <div className="field">
            <textarea placeholder=" " value={form.message} onChange={e => set("message", e.target.value)} rows={4} />
            <label>Tell me about your shaadi</label>
          </div>
          <button type="submit" className={`form-submit ${sent ? "sent" : ""}`}>
            {sent ? "✓  Sent — I'll be in touch" : "Send Enquiry →"}
          </button>
        </form>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-huge-text-wrap">
        <div className="footer-huge-text" style={{ backgroundImage: `url(${IMG.r_baraat})` }}>
          PHOTO
        </div>
        <div className="footer-huge-text" style={{ backgroundImage: `url(${IMG.r_mehndi})`, backgroundPosition: 'center 40%' }}>
          XTREME
        </div>
      </div>
      <div className="footer-mid">
        <div className="footer-locations">
          <div className="location-item">
            <span className="location-dot">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </span>
            DELHI
          </div>
          <div className="location-item">
            <span className="location-dot">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </span>
            MUMBAI
          </div>
          <div className="location-item">
            <span className="location-dot">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </span>
            UDAIPUR
          </div>
          <div className="location-item">
            <span className="location-dot">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </span>
            JAIPUR
          </div>
          <div className="location-item">
            <span className="location-dot">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </span>
            GOA
          </div>
        </div>

        <div className="footer-cols">
          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#rasams">Rasams</a></li>
              <li><a href="#services">Investment</a></li>
              <li><a href="#gallery">Portfolio</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Elsewhere</h4>
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Pinterest</a></li>
              <li><a href="#">Substack</a></li>
              <li><a href="#">YouTube</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Studio</h4>
            <ul>
              <li><a href="mailto:hello@photoxtreme.studio">hello@photoxtreme.studio</a></li>
              <li><a href="#">Hauz Khas, New Delhi</a></li>
              <li><a href="#contact">Enquire →</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© MMXXVI PHOTOXTREME · ALL RIGHTS RESERVED</span>
        <span>SITE BY Anshul&nbsp;&amp;&nbsp;Saini</span>
      </div>
    </footer>
  );
}

/* ============================================================
   MAIN APP CONFIG & BOOT
   ============================================================ */
const PALETTES = {
  Sindoor: { bone: "#f4ead8", ink: "#1a1714", accent: "#8a1c1c", sage: "#c89a5e" },
  Marigold: { bone: "#f6e9c7", ink: "#1c1612", accent: "#c2410c", sage: "#b08a3a" },
  Oxblood: { bone: "#efe7d8", ink: "#1a1714", accent: "#5b1a22", sage: "#a8a48f" },
  Saffron: { bone: "#f5e9c8", ink: "#1f1810", accent: "#a64e1e", sage: "#bda06a" },
  Plum: { bone: "#efe6d8", ink: "#1c1518", accent: "#5a1d3a", sage: "#a89aa4" },
};

const TYPE_PAIRS = {
  Editorial: {
    display: '"Italiana", serif',
    serif: '"Cormorant Garamond", serif',
    script: '"Mrs Saint Delafield", cursive',
    sans: '"Inter", system-ui, sans-serif'
  },
  Vintage: {
    display: '"Playfair Display", serif',
    serif: '"EB Garamond", serif',
    script: '"Pinyon Script", cursive',
    sans: '"DM Mono", monospace'
  },
  Modern: {
    display: '"DM Serif Display", serif',
    serif: '"Lora", serif',
    script: '"Allura", cursive',
    sans: '"Inter", system-ui, sans-serif'
  }
};

const TWEAK_DEFAULTS = {
  palette: "Sindoor",
  typePair: "Editorial",
  grain: true,
  filmTone: true
};

export default function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const p = PALETTES[t.palette] || PALETTES.Oxblood;
    const tp = TYPE_PAIRS[t.typePair] || TYPE_PAIRS.Editorial;
    const r = document.documentElement.style;
    r.setProperty("--bone", p.bone);
    r.setProperty("--ink", p.ink);
    r.setProperty("--oxblood", p.accent);
    r.setProperty("--sage", p.sage);
    r.setProperty("--display", tp.display);
    r.setProperty("--serif", tp.serif);
    r.setProperty("--script", tp.script);
    r.setProperty("--sans", tp.sans);
  }, [t.palette, t.typePair]);

  useEffect(() => {
    document.body.style.setProperty("--grain-opacity", t.grain ? "0.06" : "0");
    document.body.dataset.grain = t.grain ? "on" : "off";
    document.body.dataset.filmTone = t.filmTone ? "on" : "off";
    document.documentElement.style.setProperty(
      "--photo-filter",
      t.filmTone ? "sepia(0.12) contrast(1.04)" : "none"
    );
  }, [t.grain, t.filmTone]);

  useEffect(() => {
    initEffects();
    return () => cleanupEffects();
  }, []);

  return (
    <React.Fragment>
      <Nav />
      <Hero />
      <Trust />
      <About />
      <Manifesto />
      <Rasams />
      <Services />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette">
          <TweakRadio
            label="Mood"
            value={t.palette}
            options={Object.keys(PALETTES)}
            onChange={v => setTweak("palette", v)}
          />
        </TweakSection>
        <TweakSection label="Typography">
          <TweakRadio
            label="Type pair"
            value={t.typePair}
            options={Object.keys(TYPE_PAIRS)}
            onChange={v => setTweak("typePair", v)}
          />
        </TweakSection>
        <TweakSection label="Treatment">
          <TweakToggle
            label="Film grain overlay"
            value={t.grain}
            onChange={v => setTweak("grain", v)}
          />
          <TweakToggle
            label="Sepia photo tone"
            value={t.filmTone}
            onChange={v => setTweak("filmTone", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>
  );
}
