import React, { useState, useEffect } from 'react';
import './Portfolio.css';

const AnimatedCounter = ({ end, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(end);
      return;
    }

    const duration = 900;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [end]);

  return <span className="metric-num">{count}{suffix}</span>;
};

const CopyButton = ({ textToCopy, label = "Copy details" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      type="button"
      className="copy-btn"
      onClick={handleCopy}
      aria-label={`${label}: ${textToCopy}`}
      aria-live="polite"
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
};

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['top', 'work', 'projects', 'skills', 'background', 'contact'];
      let current = sections[0];

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) {
          current = id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Skip Link for WCAG / GIGW 3.0 Compliance */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Mobile Top Navigation */}
      <header className="mobile-topbar" role="banner">
        <span className="id-name">R. Naveenkumar</span>
        <button
          id="menuToggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobileMenu"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={toggleMenu}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </header>

      <nav
        className={`mobile-menu ${menuOpen ? 'open' : ''}`}
        id="mobileMenu"
        aria-label="Mobile Navigation"
      >
        <a href="#work" onClick={closeMenu}>Experience</a>
        <a href="#projects" onClick={closeMenu}>Projects</a>
        <a href="#skills" onClick={closeMenu}>Skills</a>
        <a href="#background" onClick={closeMenu}>Background</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
      </nav>

      <div className="shell">
        {/* Sticky Accessible Sidebar */}
        <aside className="sidebar" aria-label="Sidebar Identification">
          <div className="sidebar-top">
            <div className="status-pill" role="status" aria-label="Current work availability status">
              <span className="dot" aria-hidden="true"></span>Open to work
            </div>
            <h1 className="id-name">R.&nbsp;Naveenkumar</h1>
            <p className="id-role">Software Developer</p>
            <p className="id-loc">Coimbatore, Tamil Nadu, India</p>

            <nav className="side-nav" aria-label="Primary Desktop Navigation">
              <ul>
                <li>
                  <a href="#top" className={activeSection === 'top' ? 'active' : ''}>
                    Overview
                  </a>
                </li>
                <li>
                  <a href="#work" className={activeSection === 'work' ? 'active' : ''}>
                    Experience
                  </a>
                </li>
                <li>
                  <a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>
                    Skills
                  </a>
                </li>
                <li>
                  <a href="#background" className={activeSection === 'background' ? 'active' : ''}>
                    Background
                  </a>
                </li>
                <li>
                  <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="sidebar-bottom">

            <a href="mailto:naveenkumarr722@gmail.com" aria-label="Email Naveenkumar">
  <svg 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
  <span>naveenkumarr722@gmail.com</span>
</a>
            <a href="tel:+919942677752" aria-label="Call Naveenkumar at +91 99426 77752">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>+91 99426 77752</span>
            </a>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="main" id="main-content">
          {/* HERO */}
          <section id="top" aria-labelledby="hero-heading">
            <h2 id="hero-heading" className="hero-lede">
              Software Developer keeping <em>60+ production sites</em> secure, fast, and online.
            </h2>
            <p className="hero-sub">
              Five years building and hardening web applications — from government multi-site platforms to client CMS portals — with a track record of zero critical downtime and 100% on-time delivery.
            </p>

            <div className="metric-grid" role="region" aria-label="Key Performance Indicators">
              <div className="metric-tile">
                <AnimatedCounter end={100} suffix="%" />
                <span className="metric-label">On-time delivery across all government-facing projects</span>
              </div>
              <div className="metric-tile">
                <AnimatedCounter end={60} suffix="+" />
                <span className="metric-label">Live production sites built &amp; maintained</span>
              </div>
              <div className="metric-tile">
                <span className="metric-num">10K+</span>
                <span className="metric-label">Users supported on hardened applications</span>
              </div>
              <div className="metric-tile">
                <AnimatedCounter end={100} suffix="+" />
                <span className="metric-label">Security vulnerabilities audited and resolved</span>
              </div>
            </div>

            <div className="cta-row">
              <a className="btn-solid" href="mailto:naveenkumarr722@gmail.com">Get in touch</a>
              <a className="btn-outline" href="#projects">See the work</a>
            </div>
          </section>

          {/* EXPERIENCE */}
          <section id="work" aria-labelledby="exp-heading">
            <p className="section-label">Where I've worked</p>
            <h2 id="exp-heading" className="section-title">Experience</h2>

            <div className="exp-panel">
              <div className="exp-head">
                <h3 className="exp-role">Software Developer</h3>
                <span className="exp-period mono">2021 — Present</span>
              </div>
              <p className="exp-org">Ardhas Technology, Coimbatore</p>

              <ul className="achieve-list">
                <li>Developed and maintained <b>60+ live web applications</b> on Laravel MVC — government portals, content sites, and admin dashboards.</li>
                <li>Engineered high-compliance UI/UX for official government embassy portals adhering to DBIM, GIGW 3.0, and WCAG accessibility standards across all device viewports.</li>
                <li>Designed RESTful APIs across services, cutting data retrieval times by <b>20%</b>.</li>
                <li>Integrated third-party APIs (Facebook, Twitter, News, Weather), lifting user engagement by <b>30%</b>.</li>
                <li>Optimized MySQL databases for a <b>25%</b> improvement in data retrieval speed.</li>
                <li>Shipped <b>20+ responsive, mobile-first</b> sites, increasing mobile traffic by <b>40%</b>.</li>
                <li>Built CMS systems and admin panels, improving system efficiency by <b>30%</b> and cutting admin workload by <b>20%</b>.</li>
                <li>Updated and modernized <b>30+ existing sites</b>, reducing downtime by <b>35%</b>.</li>
                <li>Hardened security for <b>10,000+ users</b> — HTTPS, CSP, CSRF protection, and role-based access control.</li>
                <li>Identified and remediated critical vulnerabilities (XSS, SQL injection, file upload flaws) before deployment.</li>
                <li>Mentored <b>10 junior developers</b> through code review, lifting team productivity by <b>40%</b>.</li>
              </ul>
            </div>
          </section>

          {/* PROJECTS */}
          <section id="projects" aria-labelledby="proj-heading">
            <p className="section-label">What I've built</p>
            <h2 id="proj-heading" className="section-title">Selected Projects</h2>

            <div className="project-grid">
              <article className="project-card wide">
                <p className="project-kicker">GOVERNMENT WEB PLATFORM · 60+ LIVE SITES</p>
                <h3 className="project-title">Embassy of India — Multi-Site Platform</h3>
                <ul className="project-desc">
                  <li>Managed and redeveloped 60+ official government websites with zero critical downtime.</li>
                  <li>Architected and aligned front-end interfaces to strictly comply with DBIM (Design for Bharat / Indian Missions), GIGW 3.0 (Guidelines for Indian Government Websites), and WCAG 2.1/2.2 AA accessibility standards.</li>
                  <li>Built a centralized admin dashboard enabling embassy staff to manage content without technical friction.</li>
                  <li>Audited and resolved 100+ vulnerabilities — HTTPS, CSP, XSS, SQL injection, and CSRF.</li>
                  <li>Implemented role-based access control (RBAC) for multi-team content management.</li>
                  <li>Cut overall downtime by 35% through proactive monitoring and performance tuning.</li>
                </ul>
                <div className="tag-row" aria-label="Technologies used">
                  <span className="tag">HTML5</span>
                  <span className="tag">CSS</span>
                  <span className="tag">JavaScript</span>
                  <span className="tag">Laravel</span>
                  <span className="tag">Blade</span>
                  <span className="tag">React Js</span>
                  <span className="tag">MySQL</span>
                  <span className="tag">Bootstrap 5</span>
                  <span className="tag">Git</span>
                </div>
              </article>

              <article className="project-card">
                <p className="project-kicker">ADMIN PANEL · CMS</p>
                <h3 className="project-title">Client Data Management Portal</h3>
                <ul className="project-desc">
                  <li>Self-service CMS for clients to view, insert, update, and manage records securely.</li>
                  <li>Automated manual workflows, lifting data management efficiency by 35%.</li>
                  <li>Structured role-based permissions (Admin, Editor, Viewer) with comprehensive audit logging.</li>
                  <li>Engineered dynamic tables with search, filter, pagination, and CSV export functionality.</li>
                </ul>
                <div className="tag-row" aria-label="Technologies used">
                  <span className="tag">Laravel</span>
                  <span className="tag">MySQL</span>
                  <span className="tag">AJAX</span>
                </div>
              </article>

              <article className="project-card">
                <p className="project-kicker">FULL STACK</p>
                <h3 className="project-title">Responsive Full-Stack Website</h3>
                <ul className="project-desc">
                  <li>Mobile-first platform pairing a robust Laravel backend with a React.js client interface.</li>
                  <li>Increased mobile traffic by 40% and reduced page load times by 25%.</li>
                  <li>Boosted client satisfaction by 30% through caching and front-end performance tuning.</li>
                </ul>
                <div className="tag-row" aria-label="Technologies used">
                  <span className="tag">Laravel</span>
                  <span className="tag">React.js</span>
                  <span className="tag">REST</span>
                </div>
              </article>

              <article className="project-card">
                <p className="project-kicker">BACKEND AUTOMATION</p>
                <h3 className="project-title">Bulk Email &amp; Notification System</h3>
                <ul className="project-desc">
                  <li>Leveraged Laravel Queues to dispatch targeted communications asynchronously to the full user base.</li>
                  <li>Lifted user engagement by 25% through event-driven automated triggers and scheduling.</li>
                  <li>Implemented resilient contact workflows with immediate auto-notifications, improving response times.</li>
                </ul>
                <div className="tag-row" aria-label="Technologies used">
                  <span className="tag">Laravel</span>
                  <span className="tag">Queue</span>
                  <span className="tag">SMTP</span>
                </div>
              </article>

              <article className="project-card">
                <p className="project-kicker">API INTEGRATION · WEB &amp; MOBILE</p>
                <h3 className="project-title">Third-Party API Integration Platform</h3>
                <ul className="project-desc">
                  <li>Integrated external social, news, and weather data services across web and mobile surfaces.</li>
                  <li>Delivered real-time content feeds, increasing end-user retention by 30%.</li>
                  <li>Built reusable Laravel service classes for clean architectural isolation and maintainability.</li>
                </ul>
                <div className="tag-row" aria-label="Technologies used">
                  <span className="tag">Laravel</span>
                  <span className="tag">React Native</span>
                  <span className="tag">REST APIs</span>
                </div>
              </article>
            </div>
          </section>

          {/* SKILLS */}
          <section id="skills" aria-labelledby="skills-heading">
            <p className="section-label">How I work</p>
            <h2 id="skills-heading" className="section-title">Skills &amp; Competencies</h2>

            <div className="skill-grid">
              <div className="skill-cell">
                <p className="skill-cat">Languages</p>
                <div className="skill-tags">
                  <span className="tag">PHP</span>
                  <span className="tag">JavaScript</span>
                  <span className="tag">Java</span>
                  <span className="tag">HTML5</span>
                  <span className="tag">CSS3</span>
                </div>
              </div>
              <div className="skill-cell">
                <p className="skill-cat">Frameworks &amp; Libraries</p>
                <div className="skill-tags">
                  <span className="tag">Laravel 5–12</span>
                  <span className="tag">React.js</span>
                  <span className="tag">React Native</span>
                  <span className="tag">jQuery</span>
                </div>
              </div>
              <div className="skill-cell">
                <p className="skill-cat">Databases</p>
                <div className="skill-tags">
                  <span className="tag">MySQL</span>
                </div>
              </div>
              <div className="skill-cell">
                <p className="skill-cat">APIs &amp; Tools</p>
                <div className="skill-tags">
                  <span className="tag">RESTful APIs</span>
                  <span className="tag">AJAX</span>
                  <span className="tag">GitHub</span>
                  <span className="tag">WordPress</span>
                  <span className="tag">Composer</span>
                  <span className="tag">NPM</span>
                </div>
              </div>
              <div className="skill-cell">
                <p className="skill-cat">Security &amp; Standards</p>
                <div className="skill-tags">
                  <span className="tag">OWASP Top 10</span>
                  <span className="tag">HTTPS/SSL</span>
                  <span className="tag">CSP</span>
                  <span className="tag">CSRF</span>
                  <span className="tag">XSS</span>
                  <span className="tag">SQLi Prevention</span>
                  <span className="tag">RBAC</span>
                  <span className="tag">GIGW / WCAG</span>
                </div>
              </div>
              <div className="skill-cell">
                <p className="skill-cat">Admin &amp; Architecture</p>
                <div className="skill-tags">
                  <span className="tag">Custom Dashboards</span>
                  <span className="tag">CMS Portals</span>
                  <span className="tag">CRUD</span>
                  <span className="tag">Data Tables</span>
                </div>
              </div>
            </div>
          </section>

          {/* BACKGROUND */}
          <section id="background" aria-labelledby="bg-heading">
            <p className="section-label">Where it started</p>
            <h2 id="bg-heading" className="section-title">Background &amp; Education</h2>

            <div className="bg-columns">
              <div>
                <ol className="timeline">
                  <li className="tl-item">
                    <span className="tl-year">2019</span>
                    <div className="tl-body">
                      <b>Master of Computer Applications (MCA)</b>
                      <span>Hindusthan College of Arts and Science, Coimbatore — First Class, 73%</span>
                    </div>
                  </li>
                  <li className="tl-item">
                    <span className="tl-year">2017</span>
                    <div className="tl-body">
                      <b>Bachelor of Computer Applications (BCA)</b>
                      <span>Hindusthan College of Arts and Science, Coimbatore — First Class, 65%</span>
                    </div>
                  </li>
                  <li className="tl-item">
                    <span className="tl-year">2014</span>
                    <div className="tl-body">
                      <b>Higher Secondary Course (HSC)</b>
                      <span>Thiruvalluvar Govt. Higher Secondary School, Tirupur — 69%</span>
                    </div>
                  </li>
                  <li className="tl-item">
                    <span className="tl-year">2012</span>
                    <div className="tl-body">
                      <b>Secondary School Leaving Certificate (SSLC)</b>
                      <span>Thiruvalluvar Govt. Higher Secondary School, Tirupur — 86%</span>
                    </div>
                  </li>
                </ol>

                <div className="lang-row" aria-label="Languages known">
                  <div className="lang-item"><b>Tamil</b><span>Native</span></div>
                  <div className="lang-item"><b>English</b><span>Professional Working</span></div>
                </div>
              </div>

              <div>
                <p className="skill-cat" style={{ marginBottom: '0.8rem' }}>Professional Internship</p>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
                  <b style={{ color: 'var(--text)', display: 'block', marginBottom: '0.25rem' }}>Android Application Developer Intern</b>
                  Accent Techno Soft, Coimbatore — Dec 2018 to Mar 2019. Developed native mobile application interfaces using Java, Android SDK, and standard UI/UX patterns.
                </p>

                <p className="skill-cat" style={{ marginBottom: '0.8rem' }}>Certifications &amp; Workshops</p>
                <ul className="cert-list">
                  <li><b>Android Development Internship</b>Accent Techno Soft, Coimbatore</li>
                  <li><b>Internet of Things (IoT)</b>National-level technical workshop</li>
                  <li><b>Technological Innovations in Computer Science</b>National-level seminar</li>
                  <li><b>Ethical Hacking &amp; Cyber Security</b>National-level hands-on workshop</li>
                </ul>
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" aria-labelledby="contact-heading">
            <div className="contact-panel">
              <div>
                <h2 id="contact-heading" className="contact-lede">
                  Looking for a Software Developer who has maintained <em>government-scale infrastructure</em> secure and online?
                </h2>
                <p className="contact-note">
                  I am currently open to new technical opportunities. Feel free to reach out via email or phone for direct inquiries.
                </p>
              </div>

              <div className="contact-list" role="region" aria-label="Contact Information">
                <div className="contact-row">
                  <div>
                    <span className="clabel">Email</span>
                    <div className="cval">naveenkumarr722@gmail.com</div>
                  </div>
                  <CopyButton textToCopy="naveenkumarr722@gmail.com" label="Copy Email Address" />
                </div>
                <div className="contact-row">
                  <div>
                    <span className="clabel">Phone</span>
                    <div className="cval">+91 99426 77752</div>
                  </div>
                  <CopyButton textToCopy="+919942677752" label="Copy Phone Number" />
                </div>
                <div className="contact-row">
                  <div>
                    <span className="clabel">Location</span>
                    <div className="cval">Coimbatore, Tamil Nadu, India</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <footer role="contentinfo">
        <span>R. Naveenkumar — Software Developer</span>
        <span>&copy; {new Date().getFullYear()} All Rights Reserved.</span>
      </footer>
    </>
  );
}