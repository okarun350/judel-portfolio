import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Briefcase,
  Code2,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  Menu,
  Phone,
  Sparkles,
  X,
} from 'lucide-react'
import QRCode from 'qrcode'
import portfolio from './data/portfolio'
import './App.css'

const currentYear = new Date().getFullYear()

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [expandedProject, setExpandedProject] = useState(0)
  const [resumeAvailable, setResumeAvailable] = useState(null)
  const [qrUrl, setQrUrl] = useState(portfolio.publicPortfolioUrl)
  const [qrDataUrl, setQrDataUrl] = useState('')

  const resumeHref = portfolio.resumePath || '/resume.pdf'

  useEffect(() => {
    document.title = `${portfolio.fullName} | Personal Portfolio`

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Judel J. Quintero is an aspiring IT professional focused on web development, system development, and practical technology solutions.',
      )
    }

    const themeColor = document.querySelector('meta[name="theme-color"]')
    if (themeColor) {
      themeColor.setAttribute('content', '#050b16')
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting)
        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      { threshold: 0.45 },
    )

    const sections = document.querySelectorAll('main section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const checkResume = async () => {
      try {
        const response = await fetch(resumeHref, { method: 'HEAD' })
        const isPdf = response.headers
          .get('content-type')
          ?.toLowerCase()
          .includes('application/pdf')
        setResumeAvailable(response.ok && Boolean(isPdf))
      } catch {
        setResumeAvailable(false)
      }
    }

    checkResume()
  }, [resumeHref])

  useEffect(() => {
    const generateQR = async () => {
      try {
        const value = qrUrl.trim() || portfolio.publicPortfolioUrl
        const image = await QRCode.toDataURL(value, {
          width: 220,
          margin: 1,
          errorCorrectionLevel: 'M',
          color: { dark: '#0f172a', light: '#ffffff' },
        })
        setQrDataUrl(image)
      } catch {
        setQrDataUrl('')
      }
    }

    const timer = setTimeout(generateQR, 200)
    return () => clearTimeout(timer)
  }, [qrUrl])

  const socialLinks = useMemo(
    () => [
      { label: 'GitHub', href: portfolio.githubUrl, icon: Code2 },
      { label: 'LinkedIn', href: portfolio.linkedinUrl, icon: Briefcase },
      { label: 'Email', href: `mailto:${portfolio.email}`, icon: Mail },
    ],
    [],
  )

  const openResume = (event) => {
    if (!resumeAvailable) {
      event.preventDefault()
    }
  }

  const downloadQRCode = () => {
    if (!qrDataUrl) {
      return
    }

    const link = document.createElement('a')
    link.href = qrDataUrl
    link.download = 'judel-portfolio-qr.png'
    link.click()
  }

  return (
    <div className="portfolio-shell">
      <header className="site-header">
        <div className="container nav-wrap">
          <a href="#home" className="brand" aria-label="Home">
            <span className="brand-mark">JQ</span>
            <span>{portfolio.fullName}</span>
          </a>

          <button
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className={`nav-panel ${menuOpen ? 'open' : ''}`}>
            <nav aria-label="Main navigation">
              <ul className="nav-list">
                {portfolio.navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={activeSection === link.href.slice(1) ? 'active' : ''}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <a
              href={resumeAvailable ? resumeHref : '#'}
              className={`button primary nav-button ${!resumeAvailable ? 'disabled' : ''}`}
              download={resumeAvailable ? 'resume.pdf' : undefined}
              onClick={openResume}
            >
              <Download size={18} />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">{portfolio.fullName}</p>
              <h1>
                {portfolio.professionalTitle}
                <span className="highlight">.</span>
              </h1>
              <p className="intro">{portfolio.intro}</p>

              <div className="cta-row">
                <a href="#projects" className="button primary">
                  <span>View My Projects</span>
                  <ArrowRight size={18} />
                </a>
                <a href="#contact" className="button secondary">
                  Contact Me
                </a>
              </div>

              <div className="hero-meta">
                <span className="status-pill">
                  <Sparkles size={14} />
                  {portfolio.status}
                </span>
              </div>

              {resumeAvailable === false && (
                <p className="setup-note">
                  Resume PDF is not available yet. Add your final PDF to the public folder as
                  <strong> /resume.pdf </strong>
                  or update the resume path in the personal data file.
                </p>
              )}

              <ul className="social-row" aria-label="Social profiles">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
                      <Icon size={18} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hero-visual" aria-label="Profile preview">
              <div className="profile-card">
                <div className="image-wrap">
                  <img
                    src={portfolio.profileImage}
                    alt="Judel J. Quintero in a professional suit and tie"
                  />
                </div>
                <div className="profile-body">
                  <div className="mini-label">Available for opportunities</div>
                  <h2>{portfolio.fullName}</h2>
                  <p>{portfolio.headline}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container section-shell">
            <div className="section-header">
              <p className="section-tag">About</p>
              <h2>Technology student with a practical, problem-solving mindset.</h2>
            </div>

            <div className="about-grid">
              <div className="about-copy">
                <p>{portfolio.about}</p>
              </div>

              <div className="info-cards">
                <article className="info-card">
                  <span className="card-icon">
                    <GraduationCap size={20} />
                  </span>
                  <div>
                    <h3>Current Program</h3>
                    <p>{portfolio.education[0].program}</p>
                  </div>
                </article>

                <article className="info-card">
                  <span className="card-icon">
                    <Code2 size={20} />
                  </span>
                  <div>
                    <h3>Areas of Interest</h3>
                    <p>{portfolio.areasOfInterest.join(', ')}</p>
                  </div>
                </article>

                <article className="info-card">
                  <span className="card-icon">
                    <Briefcase size={20} />
                  </span>
                  <div>
                    <h3>Career Objective</h3>
                    <p>
                      To grow as a web developer and IT professional through meaningful projects,
                      responsible teamwork, and continued learning.
                    </p>
                  </div>
                </article>

                <article className="info-card">
                  <span className="card-icon">
                    <Sparkles size={20} />
                  </span>
                  <div>
                    <h3>Professional Strengths</h3>
                    <p>{portfolio.strengths.join(', ')}</p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section alt-section">
          <div className="container section-shell">
            <div className="section-header">
              <p className="section-tag">Skills</p>
              <h2>Core technical strengths and practical tools.</h2>
            </div>

            <div className="skills-grid">
              {portfolio.skillCategories.map((category) => (
                <article key={category.title} className="skill-card">
                  <h3>{category.title}</h3>
                  <ul>
                    {category.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="container section-shell">
            <div className="section-header">
              <p className="section-tag">Projects</p>
              <h2>Selected work demonstrating real-world problem solving.</h2>
            </div>

            <div className="projects-grid">
              {portfolio.projects.map((project, index) => {
                const isExpanded = expandedProject === index

                return (
                  <article key={project.title} className="project-card">
                    <div className="project-media">
                      <div className="project-badge">{project.highlight}</div>
                      {project.image ? (
                        <img className="project-preview" src={project.image} alt={`${project.title} live system screenshot`} />
                      ) : (
                        <div className="project-graphic" aria-hidden="true">
                          <Code2 size={52} />
                        </div>
                      )}
                    </div>

                    <div className="project-body">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>

                      <div className="tech-row">
                        {project.technologies.map((technology) => (
                          <span key={technology} className="tech-pill">
                            {technology}
                          </span>
                        ))}
                      </div>

                      <div className="project-actions">
                        <button
                          type="button"
                          className="button tertiary"
                          onClick={() => setExpandedProject(isExpanded ? null : index)}
                        >
                          {isExpanded ? 'Hide Details' : 'View Details'}
                        </button>

                        {project.liveUrl && (
                          <a href={project.liveUrl} className="text-link" target="_blank" rel="noreferrer">
                            Live Demo <ExternalLink size={16} />
                          </a>
                        )}

                        {project.manuscriptUrl && (
                          <a
                            href={project.manuscriptUrl}
                            className="text-link"
                            target="_blank"
                            rel="noreferrer"
                          >
                            View Manuscript <ExternalLink size={16} />
                          </a>
                        )}

                        {project.githubUrl && (
                          <a href={project.githubUrl} className="text-link" target="_blank" rel="noreferrer">
                            Source Code <ExternalLink size={16} />
                          </a>
                        )}
                      </div>

                      {isExpanded && (
                        <div className="project-details">
                          <h4>Key features</h4>
                          <ul>
                            {project.features.map((feature) => (
                              <li key={feature}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section id="education" className="section alt-section">
          <div className="container section-shell">
            <div className="section-header">
              <p className="section-tag">Education</p>
              <h2>Academic foundation and growing technical focus.</h2>
            </div>

            <div className="education-grid">
              {portfolio.education.map((item) => (
                <article key={item.program} className="education-card">
                  <div className="education-topline">
                    <GraduationCap size={22} />
                    <span>{item.school}</span>
                  </div>
                  <h3>{item.program}</h3>
                  <p className="education-major">{item.major}</p>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="qr" className="section">
          <div className="container section-shell qr-layout">
            <div className="section-header">
              <p className="section-tag">QR Portfolio</p>
              <h2>Quick access for recruiters and project evaluators.</h2>
            </div>

            <div className="qr-card">
              <div className="qr-display">
                {qrDataUrl ? (
                  <img src={qrDataUrl} alt="QR code to the portfolio website" />
                ) : (
                  <div className="qr-placeholder">Generating QR code…</div>
                )}
              </div>

              <div className="qr-controls">
                <label htmlFor="qr-url">Portfolio URL</label>
                <input
                  id="qr-url"
                  type="url"
                  value={qrUrl}
                  onChange={(event) => setQrUrl(event.target.value)}
                  placeholder="https://your-portfolio-domain.vercel.app"
                />
                <p className="qr-note">
                  Update the URL in the personal data file when the deployed domain changes.
                </p>
                <button type="button" className="button primary" onClick={downloadQRCode}>
                  <Download size={18} />
                  Download QR PNG
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section alt-section">
          <div className="container section-shell">
            <div className="section-header">
              <p className="section-tag">Contact</p>
              <h2>Let’s discuss how I can contribute to your team.</h2>
            </div>

            <div className="contact-grid">
              <div className="contact-card">
                <div className="contact-item">
                  <Mail size={18} />
                  <div>
                    <span>Email</span>
                    <a href={`mailto:${portfolio.email}`}>{portfolio.email}</a>
                  </div>
                </div>
                <div className="contact-item">
                  <Code2 size={18} />
                  <div>
                    <span>GitHub</span>
                    <a href={portfolio.githubUrl} target="_blank" rel="noreferrer">
                      {portfolio.githubUrl}
                    </a>
                  </div>
                </div>
                <div className="contact-item">
                  <Briefcase size={18} />
                  <div>
                    <span>LinkedIn</span>
                    <a href={portfolio.linkedinUrl} target="_blank" rel="noreferrer">
                      {portfolio.linkedinUrl}
                    </a>
                  </div>
                </div>
                <div className="contact-item">
                  <Phone size={18} />
                  <div>
                    <span>Phone</span>
                    <a href={`tel:${portfolio.phone}`}>{portfolio.phone}</a>
                  </div>
                </div>
              </div>

              <div className="contact-cta">
                <p>
                  I’m seeking an entry-level IT role where I can apply my skills in web development,
                  systems development, and database management. I’m committed to delivering reliable
                  solutions, collaborating effectively, and growing as an IT professional.
                </p>
                <a href={`mailto:${portfolio.email}`} className="button primary">
                  <Mail size={18} />
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-wrap">
          <div>
            <p className="footer-name">{portfolio.fullName}</p>
            <p className="footer-tagline">{portfolio.tagline}</p>
          </div>

          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>

          <p className="copyright">© {currentYear} {portfolio.fullName}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
