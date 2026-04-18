
function Footer() {
  return (
    <>
      <style>{`
        /* ===== FOOTER ===== */
        .footer {
          background: linear-gradient(180deg, #0d001a, #080012);
          padding: 80px 6% 40px;
          position: relative;
          overflow: hidden;
        }

        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(168,85,247,0.6), transparent);
        }

        /* Background glow blob */
        .footer::after {
          content: '';
          position: absolute;
          width: 500px;
          height: 300px;
          background: radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%);
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
        }

        .footer-content {
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        /* Tag */
        .footer-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(168,85,247,0.08);
          border: 1px solid rgba(168,85,247,0.25);
          border-radius: 50px;
          padding: 6px 20px;
          font-size: 12px;
          font-weight: 700;
          color: #a855f7;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 20px;
          box-shadow: 0 0 15px rgba(168,85,247,0.1);
        }

        .footer-title {
          font-size: clamp(1.8em, 3.5vw, 2.6em);
          font-weight: 800;
          background: linear-gradient(135deg, #fff, #c084fc, #8b5cf6);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 14px;
          line-height: 1.2;
        }

        .footer-subtitle {
          font-size: 1em;
          color: #7c6fa0;
          line-height: 1.7;
          margin-bottom: 50px;
        }

        /* Social Icons */
        .social-links {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 50px;
          flex-wrap: wrap;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 26px;
          background: rgba(168,85,247,0.08);
          border: 1px solid rgba(168,85,247,0.22);
          border-radius: 50px;
          color: #c4b5fd;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.35s ease;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(12px);
          font-family: 'Poppins', sans-serif;
        }

        .social-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(168,85,247,0.12), rgba(192,132,252,0.08));
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: inherit;
        }

        .social-link:hover::before { opacity: 1; }

        .social-link:hover {
          transform: translateY(-5px);
          color: #e0d4ff;
        }

        /* Individual hover glows */
        .social-link.linkedin:hover {
          border-color: rgba(0,119,181,0.7);
          box-shadow: 0 0 25px rgba(0,119,181,0.3), 0 10px 30px rgba(0,0,0,0.4);
        }

        .social-link.github:hover {
          border-color: rgba(168,85,247,0.7);
          box-shadow: 0 0 25px rgba(168,85,247,0.3), 0 10px 30px rgba(0,0,0,0.4);
        }

        .social-link.resume:hover {
          border-color: rgba(251,191,36,0.7);
          box-shadow: 0 0 25px rgba(251,191,36,0.3), 0 10px 30px rgba(0,0,0,0.4);
        }

        /* SVG icons */
        .social-svg {
          width: 22px;
          height: 22px;
          fill: currentColor;
          flex-shrink: 0;
        }

        /* Divider */
        .footer-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent);
          margin: 0 0 28px;
        }

        .footer-bottom {
          font-size: 13px;
          color: #4a3d6a;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .footer-heart {
          color: #a855f7;
          animation: heartbeat 1.8s ease-in-out infinite;
          display: inline-block;
          font-size: 14px;
          text-shadow: 0 0 8px rgba(168,85,247,0.6);
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25%       { transform: scale(1.3); }
          50%       { transform: scale(1); }
          75%       { transform: scale(1.15); }
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 600px) {
          .footer { padding: 60px 5% 34px; }
          .social-links { flex-direction: column; align-items: center; gap: 14px; }
          .social-link { width: 100%; max-width: 280px; justify-content: center; }
          .footer-title { font-size: 1.8em; }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-tag">✦ Let's Connect</div>

          <h2 className="footer-title">Let's Build Something<br />Amazing Together</h2>
          <p className="footer-subtitle">
            Ready to collaborate on innovative AI/ML projects?<br />
            Reach out — let's shape the future together.
          </p>

          <div className="social-links">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/yashwant-singh-rawat-695348320/"
              className="social-link linkedin"
              target="_blank"
              rel="noopener noreferrer"
              id="footer-linkedin"
            >
              <svg className="social-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Mr-J12"
              className="social-link github"
              target="_blank"
              rel="noopener noreferrer"
              id="footer-github"
            >
              <svg className="social-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              GitHub
            </a>

            {/* Resume */}
            <a
              href="/resume.pdf"
              download="Yashwant_Singh_Rawat_Resume.pdf"
              className="social-link resume"
              id="footer-resume"
            >
              <svg className="social-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15h8v1H8zm0-3h8v1H8zm0-3h5v1H8z" />
              </svg>
              Resume
            </a>
          </div>

          <div className="footer-divider" />

          <div className="footer-bottom">
            <span>© 2025 Yashwant Singh Rawat</span>
            <span>•</span>
            <span>Made with <span className="footer-heart">♥</span> & a lot of Python</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;