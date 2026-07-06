import { useEffect, useRef } from 'react';

const PROJECTS = [
  {
    img: '123.jpg',
    status: 'Live',
    statusColor: '#10b981',
    title: 'Void Whispers',
    subtitle: 'Paranormal Website',
    stack: ['TypeScript', 'React', 'Node.js', 'Supabase'],
    desc: 'Advanced AI system analyzing paranormal phenomena using NLP and computer vision. Deep learning models categorize supernatural reports, identify patterns in eyewitness accounts, and provide data-driven insights into unexplained events.',
    github: 'https://github.com/Mr-J12/horrorweb',
    live: 'https://voidwhispers.vercel.app/',
  },
  {
    img: '622.jpg',
    status: 'In Dev',
    statusColor: '#b91010',
    title: 'Serenify',
    subtitle: 'Mental Healthcare Website',
    stack: ['TypeScript', 'React', 'Node.js', 'Supabase'],
    desc: 'A safe and welcoming space for mental well-being. Offers personalized therapy sessions, mood tracking, a supportive community, and comprehensive features for users on their journey to mental wellness.',
    github: 'https://github.com/Mr-J12/Serenify',
    live: null,
  },
  {
    img: '512.jpg',
    status: 'Live',
    statusColor: '#10b981',
    title: 'Crystalytics',
    subtitle: 'Diamond Carat Predictor',
    stack: ['Python', 'Streamlit', 'Machine Learning', 'Regression'],
    desc: 'Data-driven diamond valuation using ML regression. Analyzes physical dimensions and quality metrics to predict carat weight — a powerful tool for buyers and sellers making valuation efficient and accessible.',
    github: 'https://github.com/Mr-J12/DiamondCaratPrediction',
    live: 'https://diacarpredmod.streamlit.app/',
  },
  {
    img: 'st.png',
    status: 'Live',
    statusColor: '#10b981',
    title: 'RiskGuard',
    subtitle: 'Stroke Prediction Model',
    stack: ['Python', 'Streamlit', 'Machine Learning', 'Classification'],
    desc: 'Advanced ensemble ML model predicting stroke likelihood from health and lifestyle factors. Identifies high-risk individuals with classification algorithms, feature scaling, encoding, and imbalance-handling techniques.',
    github: 'https://github.com/Mr-J12/stroke-prediction-sv',
    live: 'https://strokepredmod.streamlit.app/',
  },
  {
    img: 'cc.png',
    status: 'Beta',
    statusColor: '#f59e0b',
    title: 'CCDC-X',
    subtitle: 'Car Color Detector & Counter',
    stack: ['Python', 'Streamlit', 'YOLOv8', 'Computer Vision'],
    desc: 'Pre-trained YOLOv8 model detecting car colors from images. Uses thresholding, contour detection, and color classification to achieve high accuracy in diverse lighting conditions, outputting detected colors with counts.',
    github: 'https://github.com/Mr-J12/car-color-detector',
    live: null,
  },
  {
    img: '222.jpg',
    status: 'Live',
    statusColor: '#10b981',
    title: 'Nix',
    subtitle: 'Mental Healthcare Bot',
    stack: ['Sentiment Analysis', 'Python', 'Streamlit', 'NLP'],
    desc: 'Empathetic AI chatbot powered by advanced NLP and sentiment analysis for mental health support. Features mood tracking, crisis detection, and evidence-based therapeutic interventions with secure privacy protection.',
    github: 'https://github.com/Mr-J12/mentalhealthcareBot',
    live: 'https://mentalhealthcarebot.streamlit.app/',
  },
  {
    img: 'sms.jpg',
    status: 'Live',
    statusColor: '#10b981',
    title: 'TextGuard',
    subtitle: 'SMS Spam Detector',
    stack: ['Scikit-learn', 'Python', 'Streamlit', 'LSTM'],
    desc: 'Neural network achieving 95% accuracy in spam detection using advanced NLP. Employs LSTM networks, word embeddings, and feature engineering with tokenization, stemming, and TF-IDF vectorization.',
    github: 'https://github.com/Mr-J12/SMSspamdectection',
    live: 'https://smsspamdectection.streamlit.app/',
  },
  {
    img: '9.jpg',
    status: 'Beta',
    statusColor: '#f59e0b',
    title: 'EDV Vault',
    subtitle: 'Intelligent Data Validator',
    stack: ['Data Science', 'React', 'TypeScript', 'Supabase'],
    desc: 'Data-driven validation system using ML algorithms for data quality and consistency. Employs anomaly detection, pattern recognition, and predictive validation with automated cleansing and intelligent error correction.',
    github: 'https://github.com/Mr-J12/EDV',
    live: null,
  },
  {
    img: '555.jpg',
    status: 'In Dev',
    statusColor: '#ef4444',
    title: 'Omni AI',
    subtitle: 'AI Automation System',
    stack: ['Ollama', 'Ngrok', 'Python', 'Node.js'],
    desc: 'A local AI platform enabling autonomous task execution and decision-making. Integrates advanced ML models, natural language processing, and automation frameworks for intelligent operations without cloud dependency.',
    github: null,
    live: 'https://omnilocal.netlify.app',
  },
];

function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
          }
        });
      },
      { threshold: 0.08 }
    );

    const cards = document.querySelectorAll('.proj-card');
    cards.forEach((card, i) => {
      if (card instanceof HTMLElement) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.97)';
        card.style.transition = `all 0.7s ease ${i * 0.1}s`;
        observer.observe(card);
      }
    });

    return () => cards.forEach(c => observer.unobserve(c));
  }, []);

  return (
    <>
      <style>{`
        /* ===== PROJECTS SECTION ===== */
        .projects-section {
          padding: 100px 6%;
          background: linear-gradient(180deg, #071a33, #06111f 50%, #071a33);
          position: relative;
        }

        .projects-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent);
        }

        .projects-header {
          text-align: center;
          margin-bottom: 70px;
        }

        .projects-header .neon-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(59,130,246,0.08);
          border: 1px solid rgba(59,130,246,0.25);
          border-radius: 50px;
          padding: 6px 20px;
          font-size: 12px;
          font-weight: 700;
          color: #3b82f6;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 16px;
          box-shadow: 0 0 15px rgba(59,130,246,0.1);
        }

        .projects-header h2 {
          font-size: clamp(2em, 4vw, 2.8em);
          font-weight: 800;
          background: linear-gradient(135deg, #fff, #93c5fd, #2563eb);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 14px;
        }

        .projects-header p {
          color: #8fb4e8;
          font-size: 1.05em;
        }

        /* ===== PROJECT GRID ===== */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 28px;
          max-width: 1250px;
          margin: 0 auto;
        }

        /* ===== PROJECT CARD ===== */
        .proj-card {
          background: linear-gradient(135deg, rgba(29,78,216,0.1), rgba(59,130,246,0.05));
          border: 1px solid rgba(59,130,246,0.2);
          border-radius: 22px;
          overflow: hidden;
          transition: all 0.45s ease;
          position: relative;
          cursor: default;
          backdrop-filter: blur(12px);
          display: flex;
          flex-direction: column;
        }

        .proj-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(59,130,246,0.08), rgba(147,197,253,0.05));
          opacity: 0;
          transition: opacity 0.35s ease;
          z-index: 0;
        }

        .proj-card:hover::before { opacity: 1; }

        .proj-card:hover {
          transform: translateY(-12px) scale(1.01);
          border-color: rgba(59,130,246,0.55);
          box-shadow: 0 0 50px rgba(59,130,246,0.25), 0 30px 60px rgba(0,0,0,0.5);
        }

        /* Image wrapper */
        .proj-img-wrap {
          position: relative;
          overflow: hidden;
          height: 220px;
          flex-shrink: 0;
        }

        .proj-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
          display: block;
        }

        .proj-card:hover .proj-img-wrap img {
          transform: scale(1.08);
        }

        /* Gradient overlay on image */
        .proj-img-wrap::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 80px;
          background: linear-gradient(transparent, rgba(6,17,31,0.9));
        }

        /* Status badge */
        .proj-status {
          position: absolute;
          top: 14px;
          right: 14px;
          padding: 5px 14px;
          border-radius: 50px;
          font-size: 11px;
          font-weight: 700;
          z-index: 2;
          backdrop-filter: blur(8px);
          letter-spacing: 0.5px;
        }

        /* Card body */
        .proj-body {
          padding: 24px 26px;
          display: flex;
          flex-direction: column;
          flex: 1;
          position: relative;
          z-index: 1;
        }

        .proj-title {
          font-size: 1.2em;
          font-weight: 800;
          background: linear-gradient(135deg, #fff, #93c5fd);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 2px;
          line-height: 1.3;
        }

        .proj-subtitle {
          font-size: 0.82em;
          color: #3b82f6;
          font-weight: 600;
          margin-bottom: 12px;
          letter-spacing: 0.5px;
        }

        /* Tech stack pills */
        .proj-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-bottom: 14px;
        }

        .proj-tag {
          background: rgba(59,130,246,0.12);
          border: 1px solid rgba(59,130,246,0.25);
          border-radius: 50px;
          padding: 3px 11px;
          font-size: 11px;
          font-weight: 600;
          color: #93c5fd;
          letter-spacing: 0.3px;
          transition: all 0.3s ease;
        }

        .proj-card:hover .proj-tag {
          border-color: rgba(59,130,246,0.45);
          background: rgba(59,130,246,0.18);
          box-shadow: 0 0 8px rgba(59,130,246,0.2);
        }

        .proj-desc {
          font-size: 0.88em;
          color: #8fb4e8;
          line-height: 1.7;
          margin-bottom: 20px;
          flex: 1;
          transition: color 0.3s ease;
        }

        .proj-card:hover .proj-desc { color: #a8c7f0; }

        /* Links */
        .proj-links {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .proj-link {
          padding: 9px 20px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          font-family: 'Poppins', sans-serif;
        }

        .proj-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          left: -100%;
          transition: left 0.5s ease;
          border-radius: inherit;
        }

        .proj-link:hover::before { left: 100%; }

        .proj-link-gh {
          background: rgba(8,24,48,0.9);
          color: #dbeafe;
          border: 1px solid rgba(59,130,246,0.3);
        }

        .proj-link-gh:hover {
          border-color: rgba(59,130,246,0.6);
          color: #93c5fd;
          box-shadow: 0 0 18px rgba(59,130,246,0.3);
          transform: translateY(-2px);
        }

        .proj-link-live {
          background: linear-gradient(135deg, #1d4ed8, #3b82f6);
          color: white;
          border: none;
        }

        .proj-link-live:hover {
          opacity: 0.9;
          box-shadow: 0 0 25px rgba(59,130,246,0.5);
          transform: translateY(-2px);
          color: white;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .projects-section { padding: 70px 5%; }
          .projects-grid { grid-template-columns: 1fr; gap: 22px; }
          .proj-img-wrap { height: 190px; }
        }

        @media (max-width: 480px) {
          .proj-body { padding: 20px; }
        }
      `}</style>

      <section id="reach3" ref={sectionRef} className="projects-section">
        <div className="projects-header">
          <div className="neon-tag">✦ My Work</div>
          <h2>Project Showcase</h2>
          <p>Innovative ML solutions and intelligent applications I've built</p>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div key={i} className="proj-card">
              <div className="proj-img-wrap">
                <img src={`/${p.img}`} alt={p.title} />
                <div
                  className="proj-status"
                  style={{
                    background: p.statusColor + '22',
                    color: p.statusColor,
                    border: `1px solid ${p.statusColor}55`,
                  }}
                >
                  ● {p.status}
                </div>
              </div>

              <div className="proj-body">
                <div className="proj-title">{p.title}</div>
                <div className="proj-subtitle">[{p.subtitle}]</div>
                <div className="proj-stack">
                  {p.stack.map((t, j) => (
                    <span key={j} className="proj-tag">{t}</span>
                  ))}
                </div>
                <p className="proj-desc">{p.desc}</p>
                <div className="proj-links">
                  {p.github && (
                    <a
                      href={p.github}
                      className="proj-link proj-link-gh"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      📂 GitHub
                    </a>
                  )}
                  {p.live && (
                    <a
                      href={p.live}
                      className="proj-link proj-link-live"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      🚀 Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Projects;