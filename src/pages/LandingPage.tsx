import { useNavigate } from 'react-router-dom';
import { scrapbookTemplates } from '../data/templates';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="layout-container">
        <div className="content-wrapper">
          <div className="max-width-container">
            {/* Header */}
            <header className="landing-header">
              <div className="header-left">
                <div className="logo-icon">
                  <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_6_543)">
                      <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"/>
                      <path clipRule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z" fill="currentColor" fillRule="evenodd"/>
                    </g>
                    <defs><clipPath id="clip0_6_543"><rect fill="white" height="48" width="48"/></clipPath></defs>
                  </svg>
                </div>
                <h2 className="site-title">Scrapbook Memories</h2>
              </div>
              <div className="header-right">
                <button className="login-button">Login</button>
              </div>
            </header>

            {/* Hero Section */}
            <main className="main-content">
              <section className="hero-section">
                <div className="floating-elements">
                  <div className="floating-item paper-1"></div>
                  <div className="floating-item paper-2"></div>
                  <div className="floating-item tape-1"></div>
                  <div className="floating-item origami-1"></div>
                  <div className="floating-item origami-2"></div>
                  <div className="floating-item sticker-1"></div>
                  <div className="floating-item photo-frame"></div>
                </div>
                <div className="hero-content-wrapper">
                  <div className="hero-text">
                    <h1 className="hero-title">
                      Scrapbook.io, a place to design and create memories.
                    </h1>
                    <div className="hero-features">
                      <span className="hero-feature">✓ Web-Based</span>
                      <span className="hero-feature">✓ Real-time</span>
                      <span className="hero-feature">✓ Collaborative</span>
                    </div>
                    <button className="cta-button" onClick={() => navigate('/create')}>
                      <span>Get started — it's free →</span>
                    </button>
                    <p className="hero-hint">Press and drag to orbit</p>
                  </div>
                </div>
              </section>

              {/* Features Section */}
              <section className="features-section">
                <div className="features-header">
                  <h2 className="features-title">Start with a Template</h2>
                  <p className="features-subtitle">Choose from our curated collection of scrapbook layouts</p>
                </div>
                <div className="templates-grid">
                  {scrapbookTemplates.map((template) => (
                    <div 
                      key={template.id} 
                      className="template-card"
                      onClick={() => navigate('/create', { state: { templateId: template.id } })}
                    >
                      <div className="template-preview">
                        <div className="template-canvas">
                          {template.elements.map((element, idx) => (
                            <div
                              key={idx}
                              className={`template-element template-${element.type}`}
                              style={{
                                left: `${element.x}%`,
                                top: `${element.y}%`,
                                width: `${element.width}%`,
                                height: `${element.height}%`,
                                transform: `rotate(${element.rotation}deg)`,
                                zIndex: element.zIndex,
                                border: element.style?.border,
                                boxShadow: element.style?.shadow,
                                opacity: element.style?.opacity,
                              }}
                            >
                              {element.type === 'text' && (
                                <span className="template-text">{element.content}</span>
                              )}
                              {element.type === 'sticker' && element.content}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="template-info">
                        <h3 className="template-title">{template.name}</h3>
                        <p className="template-description">{template.description}</p>
                        <button className="template-use-btn">Use Template</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </main>

            {/* Footer */}
            <footer className="landing-footer">
              <div className="footer-links">
                <a href="#" className="footer-link">About</a>
                <a href="#" className="footer-link">Contact</a>
                <a href="#" className="footer-link">Privacy Policy</a>
                <a href="#" className="footer-link">Terms of Service</a>
              </div>
              <div className="footer-social">
                <a href="#" className="social-link">
                  <img alt="Instagram" className="social-icon" src="https://cdn-icons-png.flaticon.com/512/174/174855.png" />
                </a>
                <a href="#" className="social-link">
                  <img alt="Pinterest" className="social-icon" src="https://cdn-icons-png.flaticon.com/512/220/220214.png" />
                </a>
                <a href="#" className="social-link">
                  <img alt="Twitter" className="social-icon" src="https://cdn-icons-png.flaticon.com/512/733/733579.png" />
                </a>
              </div>
              <p className="footer-copyright">© 2024 Scrapbook Memories. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
