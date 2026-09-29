import React, { useState, useEffect } from 'react';
import './Portfolio.css';

const AnimatedCounter = ({ end, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
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

const CopyButton = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <button className="copy-btn" onClick={handleCopy} aria-label={`Copy ${textToCopy}`}>
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
      
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) {
          current = id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="mobile-topbar">
        <span className="id-name">R. Naveenkumar</span>
        <button 
          id="menuToggle" 
          aria-expanded={menuOpen} 
          aria-controls="mobileMenu"
          onClick={toggleMenu}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      <nav className={`mobile-menu ${menuOpen ? 'open' : ''}`} id="mobileMenu">
        <a href="#work" onClick={closeMenu}>Experience</a>
        <a href="#projects" onClick={closeMenu}>Projects</a>
        <a href="#skills" onClick={closeMenu}>Skills</a>
        <a href="#background" onClick={closeMenu}>Background</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
      </nav>

      <div className="shell">
        <aside className="sidebar">
          <div className="sidebar-top">
            <div className="status-pill"><span className="dot"></span>Open to work</div>
            <div className="id-name">R.&nbsp;Naveenkumar</div>
            <div className="id-role">Software Developer</div>
            <div className="id-loc">Coimbatore, Tamil Nadu, India</div>

            <nav className="side-nav">
              <a href="#top" className={activeSection === 'top' ? 'active' : ''}>Overview</a>
              <a href="#work" className={activeSection === 'work' ? 'active' : ''}>Experience</a>
              <a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>Projects</a>
              <a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>Skills</a>
              <a href="#background" className={activeSection === 'background' ? 'active' : ''}>Background</a>
              <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
            </nav>
          </div>

          <div className="sidebar-bottom">
            <a href="mailto:naveenkumarr722@gmail.com">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v16H4z"/><path d="M22 6l-10 7L2 6"/></svg>
              naveenkumarr722@gmail.com
            </a>
            <a href="tel:+919942677752">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +91 99426 77752
            </a>
          </div>
        </aside>

        <main className="main" id="top">
          {/* HERO */}
          <section>
            <p className="hero-lede">Software Developer keeping <em>60+ production sites</em> secure, fast, and online.</p>
            <p className="hero-sub">Five years building and hardening Web applications — from government multi-site platforms to client CMS portals — with a track record of zero critical downtime and 100% on-time delivery.</p>

            <div className="metric-grid">
              <div className="metric-tile">
                <AnimatedCounter end={100} suffix="%" />
                <span className="metric-label">on-time delivery across all government-facing projects</span>
              </div>
              <div className="metric-tile">
                <AnimatedCounter end={60} suffix="+" />
                <span className="metric-label">live production sites built &amp; maintained</span>
              </div>
              <div className="metric-tile">
                <span className="metric-num">10K+</span>
                <span className="metric-label">users on hardened applications</span>
              </div>
              <div className="metric-tile">
                <AnimatedCounter end={100} suffix="+" />
                <span className="metric-label">security vulnerabilities resolved</span>
              </div>
            </div>

            <div className="cta-row">
              <a className="btn-solid" href="mailto:naveenkumarr722@gmail.com">Get in touch</a>
              <a className="btn-outline" href="#projects">See the work</a>
            </div>
          </section>

          {/* EXPERIENCE */}
          <section id="work">
            <p className="section-label">Where I've worked</p>
            <h2 className="section-title">Experience</h2>

            <div className="exp-panel">
              <div className="exp-head">
                <span className="exp-role">Software Developer</span>
                <span className="exp-period mono">2021 — Present</span>
              </div>
              <p className="exp-org">Ardhas Technology, Coimbatore</p>

              <ul className="achieve-list">
                <li>Developed and maintained <b>60+ live web applications</b> on Laravel MVC — government portals, content sites, and admin dashboards.</li>
                <li>Designed RESTful APIs across services, cutting data retrieval times by <b>20%</b>.</li>
                <li>Integrated third-party APIs (Facebook, Twitter, News, Weather), lifting user engagement by <b>30%</b>.</li>
                <li>Optimized MySQL databases for a <b>25%</b> improvement in data retrieval speed.</li>
                <li>Shipped <b>20+ responsive, mobile-first</b> sites, increasing mobile traffic by <b>40%</b>.</li>
                <li>Built CMS systems and admin panels, improving system efficiency by <b>30%</b> and cutting admin workload by <b>20%</b>.</li>
                <li>Updated and modernized <b>50+ existing sites</b>, reducing downtime by <b>35%</b>.</li>
                <li>Hardened security for <b>10,000+ users</b> — HTTPS, CSP, CSRF protection, and role-based access control.</li>
                <li>Found and fixed critical vulnerabilities (XSS, SQL injection, file upload flaws) before they became breaches.</li>
                <li>Mentored <b>10 junior developers</b> through code review, lifting team productivity by <b>40%</b>.</li>
              </ul>
            </div>
          </section>

          {/* PROJECTS */}
          <section id="projects">
            <p className="section-label">What I've built</p>
            <h2 className="section-title">Selected projects</h2>

            <div className="project-grid">
              <div className="project-card wide">
                <p className="project-kicker">GOVERNMENT WEB PLATFORM · 60+ LIVE SITES</p>
                <h3 className="project-title">Embassy of India — Multi-Site Platform</h3>
                <ul className="project-desc">
                  <li>Managed and redeveloped 60+ official government websites with zero critical downtime.</li>
                  <li>Built a centralized admin dashboard so embassy staff can manage content without technical help.</li>
                  <li>Audited and fixed 100+ vulnerabilities — HTTPS, CSP, XSS, SQL injection, CSRF.</li>
                  <li>Implemented role-based access control for multi-team content management.</li>
                  <li>Cut overall downtime by 35% through proactive monitoring and performance tuning.</li>
                </ul>
                <div className="tag-row">
                  <span className="tag">Laravel</span><span className="tag">Blade</span><span className="tag">MySQL</span><span className="tag">Bootstrap 5</span><span className="tag">Git</span>
                </div>
              </div>

              <div className="project-card">
                <p className="project-kicker">ADMIN PANEL · CMS</p>
                <h3 className="project-title">Client Data Management Portal</h3>
                <ul className="project-desc">
                  <li>Self-service CMS for clients to view, insert, update, and delete their own data.</li>
                  <li>Automated manual workflows, lifting data-management efficiency by 35%.</li>
                  <li>Role-based permissions (Admin, Editor, Viewer) with audit logging.</li>
                  <li>Dynamic tables with search, filter, pagination, and CSV export.</li>
                </ul>
                <div className="tag-row">
                  <span className="tag">Laravel</span><span className="tag">MySQL</span><span className="tag">AJAX</span>
                </div>
              </div>

              <div className="project-card">
                <p className="project-kicker">FULL STACK</p>
                <h3 className="project-title">Responsive Full-Stack Website</h3>
                <ul className="project-desc">
                  <li>Mobile-first site pairing a Laravel backend with a React.js frontend.</li>
                  <li>Increased mobile traffic by 40% and cut page load times by 25%.</li>
                  <li>Improved client satisfaction by 30% through performance tuning.</li>
                </ul>
                <div className="tag-row">
                  <span className="tag">Laravel</span><span className="tag">React.js</span><span className="tag">REST</span>
                </div>
              </div>

              <div className="project-card">
                <p className="project-kicker">BACKEND AUTOMATION</p>
                <h3 className="project-title">Bulk Email &amp; Notification System</h3>
                <ul className="project-desc">
                  <li>Laravel Queues to send targeted messages to the full user base.</li>
                  <li>Lifted engagement by 25% through automated triggers and scheduling.</li>
                  <li>Smart contact forms with auto-notifications improved client satisfaction by 20%.</li>
                </ul>
                <div className="tag-row">
                  <span className="tag">Laravel</span><span className="tag">Queue</span><span className="tag">SMTP</span>
                </div>
              </div>

              <div className="project-card">
                <p className="project-kicker">API INTEGRATION · WEB &amp; MOBILE</p>
                <h3 className="project-title">Third-Party API Integration Platform</h3>
                <ul className="project-desc">
                  <li>Wired up Facebook, Twitter, News, and Weather APIs across web and mobile.</li>
                  <li>Real-time feeds lifted user engagement by 30%.</li>
                  <li>Built reusable Laravel service classes per API for clean, future-proof architecture.</li>
                </ul>
                <div className="tag-row">
                  <span className="tag">Laravel</span><span className="tag">React Native</span><span className="tag">REST APIs</span>
                </div>
              </div>
            </div>
          </section>

          {/* SKILLS */}
          <section id="skills">
            <p className="section-label">How I work</p>
            <h2 className="section-title">Skills</h2>

            <div className="skill-grid">
              <div className="skill-cell">
                <p className="skill-cat">Languages</p>
                <div className="skill-tags">
                  <span className="tag">PHP</span><span className="tag">JavaScript</span><span className="tag">Java</span><span className="tag">HTML5</span><span className="tag">CSS3</span>
                </div>
              </div>
              <div className="skill-cell">
                <p className="skill-cat">Frameworks</p>
                <div className="skill-tags">
                  <span className="tag">Laravel 5–12</span><span className="tag">React.js</span><span className="tag">React Native</span><span className="tag">jQuery</span>
                </div>
              </div>
              <div className="skill-cell">
                <p className="skill-cat">Databases</p>
                <div className="skill-tags">
                  <span className="tag">MySQL</span>
                </div>
              </div>
              <div className="skill-cell">
                <p className="skill-cat">APIs &amp; tools</p>
                <div className="skill-tags">
                  <span className="tag">RESTful APIs</span><span className="tag">AJAX</span><span className="tag">GitHub</span><span className="tag">WordPress</span><span className="tag">Composer</span><span className="tag">NPM</span>
                </div>
              </div>
              <div className="skill-cell">
                <p className="skill-cat">Security</p>
                <div className="skill-tags">
                  <span className="tag">OWASP Top 10</span><span className="tag">HTTPS/SSL</span><span className="tag">CSP</span><span className="tag">CSRF</span><span className="tag">XSS</span><span className="tag">SQLi prevention</span><span className="tag">RBAC</span>
                </div>
              </div>
              <div className="skill-cell">
                <p className="skill-cat">Admin &amp; CMS</p>
                <div className="skill-tags">
                  <span className="tag">Custom dashboards</span><span className="tag">CMS portals</span><span className="tag">CRUD</span><span className="tag">Dynamic tables</span>
                </div>
              </div>
            </div>
          </section>

          {/* BACKGROUND */}
          <section id="background">
            <p className="section-label">Where it started</p>
            <h2 className="section-title">Background</h2>

            <div className="bg-columns">
              <div>
                <div className="timeline">
                  <div className="tl-item">
                    <span className="tl-year">2019</span>
                    <div className="tl-body">
                      <b>Master of Computer Applications (MCA)</b>
                      <span>Hindusthan College of Arts and Science, Coimbatore — First Class, 73%</span>
                    </div>
                  </div>
                  <div className="tl-item">
                    <span className="tl-year">2017</span>
                    <div className="tl-body">
                      <b>Bachelor of Computer Applications (BCA)</b>
                      <span>Hindusthan College of Arts and Science, Coimbatore — First Class, 65%</span>
                    </div>
                  </div>
                  <div className="tl-item">
                    <span className="tl-year">2014</span>
                    <div className="tl-body">
                      <b>Higher Secondary Course (HSC)</b>
                      <span>Thiruvalluvar Govt. Higher Secondary School, Tirupur — 69%</span>
                    </div>
                  </div>
                  <div className="tl-item">
                    <span className="tl-year">2012</span>
                    <div className="tl-body">
                      <b>SSLC</b>
                      <span>Thiruvalluvar Govt. Higher Secondary School, Tirupur — 86%</span>
                    </div>
                  </div>
                </div>

                <div className="lang-row">
                  <div className="lang-item"><b>Tamil</b><span>Native</span></div>
                  <div className="lang-item"><b>English</b><span>Professional</span></div>
                </div>
              </div>

              <div>
                <p className="skill-cat" style={{ marginBottom: '1rem' }}>Internship</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
                  <b style={{ color: 'var(--text)', display: 'block', marginBottom: '0.2rem' }}>Android Application Developer</b>
                  Accent Techno Soft, Coimbatore — Dec 2018 to Mar 2019. Built an Android app hands-on, working with the Android SDK, Java, and mobile UI/UX.
                </p>

                <p className="skill-cat" style={{ marginBottom: '1rem' }}>Certifications &amp; workshops</p>
                <ul className="cert-list">
                  <li><b>Android Development Internship</b>Accent Techno Soft, Coimbatore</li>
                  <li><b>Internet of Things</b>National-level workshop</li>
                  <li><b>Technological Innovations in Computer Field</b>National-level workshop</li>
                  <li><b>Ethical Hacking</b>National-level workshop</li>
                </ul>
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact">
            <div className="contact-panel">
              <div>
                <p className="contact-lede">Looking for a Software developer who has already kept <em>government-scale infrastructure</em> secure and online?</p>
                <p className="contact-note">I'm currently open to new roles. The fastest way to reach me is email or phone — I usually reply within a day.</p>
              </div>

              <div className="contact-list">
                <div className="contact-row">
                  <div>
                    <div className="clabel">Email</div>
                    <div className="cval">naveenkumarr722@gmail.com</div>
                  </div>
                  <CopyButton textToCopy="naveenkumarr722@gmail.com" />
                </div>
                <div className="contact-row">
                  <div>
                    <div className="clabel">Phone</div>
                    <div className="cval">+91 99426 77752</div>
                  </div>
                  <CopyButton textToCopy="+919942677752" />
                </div>
                <div className="contact-row">
                  <div>
                    <div className="clabel">Location</div>
                    <div className="cval">Coimbatore, Tamil Nadu, India</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <footer>
        <span>R. Naveenkumar — Software Developer</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </>
  );
}