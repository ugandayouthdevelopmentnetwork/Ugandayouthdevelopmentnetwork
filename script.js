:root {
  --emerald-900: #0a2d1f;
  --emerald-800: #0d3a2d;
  --emerald-700: #0f5b46;
  --emerald-600: #137a5f;
  --emerald-500: #1f9d73;
  --gold-500: #d4af59;
  --gold-400: #e1c06b;
  --black-950: #0b120f;
  --text-900: #11241b;
  --text-700: #274a3b;
  --line: rgba(13, 59, 46, 0.12);
  --surface: rgba(255, 255, 255, 0.7);
  --surface-strong: rgba(255, 255, 255, 0.82);
  --white: #ffffff;
  --shadow-soft: 0 18px 45px rgba(7, 23, 18, 0.12);
  --shadow-strong: 0 32px 60px rgba(7, 23, 18, 0.18);
  --banner-height: 122px;
}

* { box-sizing: border-box; }

html {
  scroll-behavior: smooth;
  scroll-padding-top: 160px;
}

body {
  margin: 0;
  font: 16px/1.6 Arial, Helvetica, sans-serif;
  color: var(--text-900);
  background: linear-gradient(180deg, #edf8f1 0%, #f6faf7 100%);
  position: relative;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 0;
  background-image: url('uganda-coat-of-arms.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  opacity: 0.08;
  pointer-events: none;
}

body > * {
  position: relative;
  z-index: 1;
}

img { max-width: 100%; display: block; }

a { color: inherit; }

button, input, textarea {
  font: inherit;
}

.container {
  width: min(1160px, calc(100% - 32px));
  margin: 0 auto;
}

.top-account-banner {
  position: sticky;
  top: 0;
  z-index: 120;
  background: linear-gradient(135deg, rgba(11, 45, 31, 0.98), rgba(13, 62, 48, 0.96));
  border-bottom: 1px solid rgba(212, 175, 89, 0.8);
  box-shadow: 0 12px 28px rgba(8, 27, 21, 0.22);
}

.banner-shell {
  width: min(1280px, calc(100% - 24px));
  margin: 0 auto;
  padding: 16px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.banner-block {
  flex: 1;
  min-width: 0;
}

.banner-label {
  display: block;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  margin-bottom: 8px;
  font-weight: 700;
}

.banner-row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  flex-wrap: wrap;
}

.banner-number {
  color: var(--gold-400);
  font-size: clamp(1.2rem, 2vw, 2rem);
  font-weight: 800;
  letter-spacing: 0.04em;
  text-shadow: 0 0 18px rgba(212, 175, 89, 0.35);
}

.copy-account-button {
  background: rgba(212, 175, 89, 0.12);
  color: var(--white);
  border: 1px solid rgba(212, 175, 89, 0.8);
  border-radius: 999px;
  padding: 0.7rem 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
}

.copy-account-button:hover,
.copy-account-button:focus-visible {
  background: rgba(212, 175, 89, 0.2);
  transform: translateY(-1px);
}

.banner-divider {
  width: 1px;
  height: 76px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(212, 175, 89, 0.9), rgba(255, 255, 255, 0.02));
}

.banner-whatsapp-row {
  justify-content: flex-start;
}

.whatsapp-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #28cd64, #1ea14a);
  color: var(--white);
  font-weight: 800;
  box-shadow: 0 10px 22px rgba(31, 158, 89, 0.35);
}

.whatsapp-banner-button,
.dashboard-whatsapp-button,
.dashboard-group-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: 999px;
  font-weight: 800;
  letter-spacing: 0.02em;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.whatsapp-banner-button {
  background: linear-gradient(135deg, #25d366, #1fa552);
  color: var(--white);
  box-shadow: 0 10px 26px rgba(37, 211, 102, 0.36);
  padding: 0.8rem 1.2rem;
  margin-top: 10px;
}

.site-header {
  position: sticky;
  top: var(--banner-height);
  z-index: 110;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--line);
  box-shadow: 0 12px 26px rgba(14, 38, 30, 0.08);
}

.navwrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 86px;
  gap: 20px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand img {
  width: 54px;
  height: 54px;
  border-radius: 16px;
  object-fit: cover;
  box-shadow: 0 12px 22px rgba(7, 20, 16, 0.16);
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand-text strong {
  font-size: clamp(1.2rem, 2vw, 1.65rem);
  color: var(--emerald-900);
}

.brand-text small {
  color: #4d6a5d;
  font-size: 0.7rem;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.header-nav a {
  text-decoration: none;
  font-weight: 700;
  color: var(--emerald-800);
  opacity: 0.8;
  transition: opacity 0.2s ease, color 0.2s ease;
}

.header-nav a:hover,
.header-nav a:focus-visible {
  opacity: 1;
  color: var(--emerald-600);
}

.dashboard-menu-toggle {
  position: fixed;
  top: calc(var(--banner-height) + 16px);
  right: 20px;
  width: 56px;
  height: 56px;
  z-index: 130;
  border: 0;
  border-radius: 18px;
  background: linear-gradient(135deg, var(--emerald-800), var(--emerald-600));
  box-shadow: 0 18px 34px rgba(8, 42, 30, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
}

.dashboard-menu-toggle span {
  width: 22px;
  height: 2.5px;
  border-radius: 999px;
  background: var(--white);
  display: block;
}

.dashboard-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(8, 15, 13, 0.42);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
  z-index: 110;
}

.dashboard-backdrop.is-visible {
  opacity: 1;
  pointer-events: auto;
}

.dashboard-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: min(380px, 88vw);
  height: 100vh;
  background: rgba(8, 25, 20, 0.96);
  border-left: 1px solid rgba(212, 175, 89, 0.7);
  box-shadow: -28px 0 48px rgba(3, 12, 9, 0.28);
  transform: translateX(106%);
  transition: transform 0.28s ease;
  z-index: 140;
  padding: 18px 18px 24px;
  overflow-y: auto;
}

.dashboard-panel.is-open {
  transform: translateX(0);
}

.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(212, 175, 89, 0.25);
}

.dashboard-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--white);
  font-weight: 800;
}

.dashboard-brand img {
  width: 42px;
  height: 42px;
  border-radius: 12px;
}

.dashboard-close {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.06);
  color: var(--white);
  font-size: 1.8rem;
  cursor: pointer;
}

.dashboard-whatsapp-card {
  margin-top: 18px;
  padding: 16px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(20, 113, 81, 0.85), rgba(12, 71, 56, 0.82));
  border: 1px solid rgba(212, 175, 89, 0.6);
  box-shadow: 0 18px 32px rgba(15, 90, 70, 0.25);
}

.dashboard-whatsapp-card p {
  margin: 0 0 12px;
  color: rgba(255, 255, 255, 0.84);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 700;
}

.dashboard-whatsapp-button,
.dashboard-group-button {
  width: 100%;
  padding: 0.9rem 1rem;
  margin-top: 10px;
  font-size: 0.78rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dashboard-whatsapp-button {
  background: linear-gradient(135deg, #25d366, #1ea84d);
  color: var(--white);
}

.dashboard-group-button {
  background: linear-gradient(135deg, rgba(212, 175, 89, 0.18), rgba(9, 50, 36, 0.5));
  color: var(--white);
}

.dashboard-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 18px;
}

.dashboard-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 0.9rem 0.95rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  color: var(--white);
  text-align: left;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.dashboard-item:hover,
.dashboard-item:focus-visible {
  background: rgba(212, 175, 89, 0.09);
  transform: translateX(-2px);
}

.dashboard-icon {
  width: 22px;
  text-align: center;
  display: inline-block;
}

main {
  padding-bottom: 48px;
}

.hero {
  background: linear-gradient(135deg, rgba(10, 45, 31, 0.92), rgba(14, 82, 67, 0.8)), url('uganda-flag.jpg') center/cover no-repeat;
  color: var(--white);
  padding: 82px 0 72px;
}

.hero-inner {
  width: min(1160px, calc(100% - 32px));
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;
  gap: 30px;
}

.eyebrow {
  display: inline-block;
  margin-bottom: 16px;
  letter-spacing: 0.12em;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 800;
}

.hero h1 {
  margin: 0;
  font-size: clamp(2.5rem, 5vw, 5rem);
  line-height: 0.98;
  letter-spacing: -0.04em;
}

.hero h1 em {
  color: var(--gold-400);
  font-style: normal;
}

.lead {
  margin: 18px 0 0;
  max-width: 650px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.08rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1.4rem;
  border-radius: 999px;
  border: 1px solid transparent;
  text-decoration: none;
  font-weight: 800;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.btn:hover,
.btn:focus-visible {
  transform: translateY(-1px);
}

.btn-primary {
  background: linear-gradient(135deg, var(--gold-500), var(--gold-400));
  color: #102912;
  box-shadow: 0 14px 28px rgba(212, 175, 89, 0.26);
}

.btn-secondary,
.btn-plain {
  border-color: rgba(255, 255, 255, 0.22);
  background: rgba(255, 255, 255, 0.06);
  color: var(--white);
}

.hero-card {
  padding: 28px 22px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(212, 175, 89, 0.7);
  box-shadow: 0 18px 38px rgba(6, 23, 20, 0.18);
}

.hero-card h2 {
  margin: 0 0 16px;
  font-size: 1.4rem;
  color: var(--gold-400);
}

.hero-card ul {
  margin: 0;
  padding-left: 18px;
  color: rgba(255, 255, 255, 0.9);
}

.hero-card li + li {
  margin-top: 10px;
}

.section {
  padding: 70px 0;
}

.section.tint {
  background: rgba(224, 239, 231, 0.8);
}

.section.dark {
  background: linear-gradient(135deg, rgba(13, 23, 19, 0.98), rgba(8, 46, 35, 0.96));
  color: var(--white);
}

.section-title {
  max-width: 760px;
  margin: 0 auto 28px;
  text-align: center;
}

.section-title span {
  display: inline-block;
  margin-bottom: 10px;
  color: var(--emerald-700);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 800;
}

.section-title h2 {
  margin: 0;
  font-size: clamp(1.8rem, 3vw, 3rem);
  color: var(--emerald-900);
}

.section.dark .section-title h2,
.section.dark .section-title span {
  color: var(--white);
}

.info-box,
.card,
.contact-card,
.account-detail-card,
.whatsapp-community-card {
  position: relative;
  border-radius: 24px;
}

.glass-panel {
  background: var(--surface);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(212, 175, 89, 0.5);
  box-shadow: var(--shadow-soft);
}

.info-box,
.card {
  padding: 26px 22px;
}

.intro-grid,
.grid-3,
.two-col,
.contact-grid {
  display: grid;
  gap: 24px;
}

.intro-grid,
.grid-3 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.two-col {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.card small {
  display: inline-block;
  color: var(--emerald-700);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.card h3,
.info-box h3 {
  margin-top: 0;
  color: var(--emerald-900);
}

.card p,
.info-box p,
.contact-card p,
.contact-card a {
  color: inherit;
}

.section.dark .contact-card,
.contact-card-light {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(212, 175, 89, 0.35);
  box-shadow: 0 12px 24px rgba(8, 25, 19, 0.18);
}

.list {
  margin: 0;
  padding-left: 18px;
}

.list li + li {
  margin-top: 10px;
}

.photo-frame {
  width: min(1160px, calc(100% - 32px));
  margin: 0 auto 36px;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  border: 1px solid rgba(212, 175, 89, 0.5);
}

.site-photo {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.account-detail-card {
  width: min(760px, 100%);
  margin: 0 auto;
  padding: 28px 24px;
}

.account-detail-label {
  margin: 0 0 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.72rem;
  font-weight: 800;
  color: var(--emerald-700);
}

.account-detail-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
}

.account-detail-row strong {
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  color: var(--emerald-900);
  letter-spacing: 0.06em;
}

.copy-status {
  min-height: 1.2em;
  margin: 12px 0 0;
  color: var(--emerald-700);
  font-weight: 700;
}

.whatsapp-community-card {
  width: min(780px, 100%);
  margin: 0 auto;
  padding: 28px 22px;
  background: linear-gradient(135deg, rgba(15, 90, 70, 0.96), rgba(38, 56, 34, 0.9));
  border: 1px solid rgba(212, 175, 89, 0.7);
  box-shadow: 0 18px 34px rgba(15, 75, 60, 0.2);
}

.whatsapp-community-header {
  display: flex;
  align-items: center;
  gap: 18px;
  color: var(--white);
}

.whatsapp-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 18px;
  background: linear-gradient(135deg, #25d366, #1fa552);
  color: var(--white);
  font-weight: 900;
  font-size: 1.2rem;
}

.whatsapp-community-header h3 {
  margin: 0;
  color: var(--white);
}

.whatsapp-community-header p {
  margin: 4px 0 0;
  color: rgba(255, 255, 255, 0.82);
  font-weight: 700;
}

.whatsapp-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 18px;
}

.dashboard-whatsapp-button,
.dashboard-group-button {
  text-transform: uppercase;
  font-size: 0.76rem;
}

.contact-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.contact-card {
  padding: 26px 24px;
}

.contact-logo {
  width: 72px;
  height: 72px;
  object-fit: contain;
  margin-bottom: 16px;
  border-radius: 14px;
}

#uydnetComments {
  margin-top: 16px;
}

.footer {
  background: linear-gradient(135deg, rgba(11, 45, 31, 0.96), rgba(13, 62, 48, 0.96));
  color: rgba(255, 255, 255, 0.9);
  border-top: 1px solid rgba(212, 175, 89, 0.8);
}

.footer-inner {
  width: min(1160px, calc(100% - 32px));
  margin: 0 auto;
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.socials {
  display: flex;
  gap: 10px;
  align-items: center;
}

.socials a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(212, 175, 89, 0.15);
  border: 1px solid rgba(212, 175, 89, 0.8);
  color: var(--white);
  font-weight: 800;
  text-decoration: none;
}

body.dashboard-open {
  overflow: hidden;
}

.btn-plain {
  color: var(--emerald-900);
  background: linear-gradient(135deg, rgba(212, 175, 89, 0.12), rgba(19, 122, 95, 0.08));
  border-color: rgba(19, 122, 95, 0.24);
}

.dashboard-section,
.body-dashboard-open .overview-section {
  display: none;
}

.dashboard-section.is-visible {
  display: block;
}

.body-home-shown .overview-section {
  display: block;
}

.return-home {
  margin-top: 28px;
}

@media (max-width: 980px) {
  .banner-shell {
    flex-direction: column;
    align-items: flex-start;
  }

  .banner-divider {
    display: none;
  }

  .site-header {
    top: 164px;
  }

  .hero-inner,
  .two-col,
  .contact-grid,
  .intro-grid,
  .grid-3 {
    grid-template-columns: 1fr;
  }

  .dashboard-menu-toggle {
    top: calc(var(--banner-height) + 18px);
  }
}

@media (max-width: 700px) {
  :root {
    --banner-height: 176px;
  }

  .top-account-banner {
    min-height: var(--banner-height);
  }

  .navwrap {
    min-height: 78px;
  }

  .header-nav {
    display: none;
  }

  .brand-text small {
    display: none;
  }

  .hero {
    padding-top: 60px;
  }

  .account-detail-row,
  .whatsapp-community-header,
  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .dashboard-menu-toggle {
    right: 14px;
    top: calc(var(--banner-height) + 12px);
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

@media (max-width: 420px) {
  .whatsapp-banner-button,
  .dashboard-whatsapp-button,
  .dashboard-group-button,
  .copy-account-button {
    width: 100%;
  }

  .banner-row {
    width: 100%;
  }
}
