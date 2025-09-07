import { useEffect } from 'react';

function Footer() {
  return (
    <>
      <style>{`
        .footer {
          background: linear-gradient(135deg, #0f172a, #1e293b);
          padding: 60px 5% 40px;
          border-top: 1px solid rgba(59, 130, 246, 0.2);
          position: relative;
        }

        .footer::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #3b82f6, transparent);
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .footer-title {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #ffffff, #3b82f6, #8b5cf6);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .footer-subtitle {
          font-size: 18px;
          color: #94a3b8;
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-bottom: 40px;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px 25px;
          background: linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(51, 65, 85, 0.6));
          backdrop-filter: blur(20px);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 50px;
          color: #e2e8f0;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .social-link::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .social-link:hover::before {
          opacity: 1;
        }

        .social-link:hover {
          transform: translateY(-5px);
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 0 15px 35px rgba(59, 130, 246, 0.3);
          color: #3b82f6;
        }

        .social-icon {
          font-size: 24px;
          transition: transform 0.3s ease;
        }

        .social-link:hover .social-icon {
          transform: scale(1.2);
        }

        .linkedin-link:hover {
          color: #0077b5;
          border-color: rgba(0, 119, 181, 0.5);
          box-shadow: 0 15px 35px rgba(0, 119, 181, 0.3);
        }

        .github-link:hover {
          color: #f0f6fc;
          border-color: rgba(240, 246, 252, 0.5);
          box-shadow: 0 15px 35px rgba(240, 246, 252, 0.2);
        }

        .footer-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
          margin: 40px 0 30px;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #64748b;
          font-size: 14px;
        }

        .copyright {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .made-with-love {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .heart {
          color: #ef4444;
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .footer {
            padding: 50px 4% 30px;
          }

          .footer-title {
            font-size: 28px;
          }

          .footer-subtitle {
            font-size: 16px;
          }

          .social-links {
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }

          .social-link {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .footer {
            padding: 40px 3% 25px;
          }

          .footer-title {
            font-size: 24px;
          }

          .footer-subtitle {
            font-size: 15px;
          }

          .social-link {
            padding: 12px 20px;
            font-size: 15px;
          }

          .social-icon {
            font-size: 20px;
          }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-content">
          <h2 className="footer-title">Let's Connect</h2>
          <p className="footer-subtitle">
            Ready to collaborate on innovative AI/ML projects? Let's build the future together.
          </p>
          
          <div className="social-links">
            <a 
              href="https://www.linkedin.com/in/yashwant-singh-rawat-695348320/" 
              className="social-link linkedin-link"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <span className="social-icon">💼</span>
              LinkedIn
            </a>
            <a 
              href="https://github.com/Mr-J12" 
              className="social-link github-link"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <span className="social-icon">🐙</span>
              GitHub
            </a>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-bottom">
            <div className="copyright">
              <span>© 2025 Yashwant Singh Rawat</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;