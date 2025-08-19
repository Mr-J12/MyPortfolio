import { useEffect, useRef } from 'react';

function Projects() {
  const projectsRef = useRef(null);

  const scrollToContent = () => {
    document.getElementById('reach3')?.scrollIntoView({ behavior: 'smooth' });
  };

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target instanceof HTMLElement) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.1 }
  );

  const projectItems = document.querySelectorAll('.project-item');
  projectItems.forEach((item, index) => {
    if (item instanceof HTMLElement) {
      item.style.opacity = '0';
      item.style.transform = 'translateY(50px)';
      item.style.transition = `all 0.8s ease ${index * 0.2}s`;
      observer.observe(item);
    }
  });

  return () => {
    projectItems.forEach(item => observer.unobserve(item));
  };
}, []);

  return (
    <>
      <style>{`
        header {
          width: 100vw;
          height: 100vh;
          margin: 0;
          padding: 0;
          position: relative;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        header::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 25% 75%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 25%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
          animation: pulse 4s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        .h-text {
          max-width: 800px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          text-align: center;
          color: white;
          z-index: 10;
        }

        .h-text h1 {
          font-size: clamp(2.5em, 5vw, 4em);
          margin-bottom: 30px;
          font-weight: 800;
          background: linear-gradient(135deg, #ffffff, #06b6d4, #8b5cf6);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: slideIn 1s ease-out;
        }

        .h-text p {
          font-size: 1.3em;
          margin-bottom: 40px;
          color: #94a3b8;
          animation: fadeIn 1s ease-out 0.3s both;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        #scrollButton {
          padding: 16px 32px;
          font-size: 18px;
          background: linear-gradient(135deg, #06b6d4, #8b5cf6);
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          position: relative;
          overflow: hidden;
          animation: fadeIn 1s ease-out 0.6s both;
        }

        #scrollButton::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        #scrollButton:hover::before {
          left: 100%;
        }

        #scrollButton:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(6, 182, 212, 0.4);
        }

        .projects-container {
          background: linear-gradient(135deg, #0f172a, #1e293b);
          padding: 80px 5%;
          position: relative;
        }

        .projects-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #06b6d4, transparent);
        }

        .project-item {
          display: flex;
          background: linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(51, 65, 85, 0.6));
          backdrop-filter: blur(20px);
          margin-bottom: 40px;
          border-radius: 25px;
          overflow: hidden;
          transition: all 0.4s ease;
          position: relative;
          border: 1px solid rgba(6, 182, 212, 0.2);
        }

        .project-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 6px;
          height: 100%;
          background: linear-gradient(135deg, #06b6d4, #8b5cf6);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-item:hover::before {
          opacity: 1;
        }

        .project-item::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.05), rgba(139, 92, 246, 0.05));
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
        }

        .project-item:hover::after {
          opacity: 1;
        }

        .project-item:hover {
          transform: translateY(-15px);
          box-shadow: 0 30px 60px rgba(6, 182, 212, 0.2);
          border-color: rgba(6, 182, 212, 0.5);
        }

        .project-item img {
          width: 450px;
          height: 400px;
          object-fit: cover;
          transition: transform 0.4s ease;
          z-index: 1;
        }

        .project-item:hover img {
          transform: scale(1.05);
        }

        .project-details {
          padding: 40px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          z-index: 1;
        }

        .project-details h2 {
          color: #ffffff;
          font-size: 32px;
          margin-bottom: 20px;
          font-weight: 700;
          transition: color 0.3s ease;
          background: linear-gradient(135deg, #ffffff, #06b6d4);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .tech-stack {
          color: #06b6d4;
          font-size: 18px;
          margin-bottom: 25px;
          font-weight: 600;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
        }

        .tech-stack::before {
          content: '🤖';
          margin-right: 8px;
          font-size: 20px;
        }

        .description {
          color: #94a3b8;
          font-size: 17px;
          line-height: 1.7;
          margin-bottom: 30px;
          transition: color 0.3s ease;
        }

        .project-item:hover .description {
          color: #e2e8f0;
        }

        .project-links {
          display: flex;
          gap: 20px;
          margin-top: auto;
        }

        .project-link {
          padding: 12px 24px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          position: relative;
          overflow: hidden;
        }

        .project-link::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .project-link:hover::before {
          left: 100%;
        }

        .github-link {
          background: linear-gradient(135deg, #374151, #1f2937);
          color: white;
          border: 1px solid rgba(75, 85, 99, 0.5);
        }

        .github-link:hover {
          background: linear-gradient(135deg, #4b5563, #374151);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        .live-link {
          background: linear-gradient(135deg, #06b6d4, #8b5cf6);
          color: white;
        }

        .live-link:hover {
          background: linear-gradient(135deg, #0891b2, #7c3aed);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(6, 182, 212, 0.4);
        }

        .project-status-live {
          position: absolute;
          top: 25px;
          right: 25px;
          color: white;
          background: linear-gradient(135deg, #10b981, #059669);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          z-index: 2;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        }

        .project-status-beta {
          position: absolute;
          top: 25px;
          right: 25px;
          color: white;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          z-index: 2;
          box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
        }

        .project-status-alpha {
          position: absolute;
          top: 25px;
          right: 25px;
          color: white;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          z-index: 2;
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
        }

        .back-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background: linear-gradient(135deg, #06b6d4, #8b5cf6);
          color: white;
          border: none;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(6, 182, 212, 0.3);
          z-index: 1000;
          font-size: 20px;
        }

        .back-to-top:hover {
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 15px 35px rgba(6, 182, 212, 0.4);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .h-text h1 {
            font-size: 2.5em;
          }

          .projects-container {
            padding: 60px 20px;
          }

          .project-item {
            flex-direction: column;
            margin-bottom: 40px;
          }

          .project-item img {
            width: 100%;
            height: 280px;
          }

          .project-details {
            padding: 30px;
          }

          .project-details h2 {
            font-size: 26px;
          }

          .tech-stack {
            font-size: 16px;
          }

          .project-links {
            flex-direction: column;
            gap: 15px;
          }

          .project-link {
            text-align: center;
            justify-content: center;
          }
        }

        /* Alternating Layout */
        .project-item:nth-child(even) {
          flex-direction: row-reverse;
        }

        @media (max-width: 768px) {
          .project-item:nth-child(even) {
            flex-direction: column;
          }
        }
      `}</style>

      <header>
        <section className="h-text">
          <h1>AI/ML Project Showcase</h1>
          <p>Innovative machine learning solutions and intelligent applications</p>
          <button id="scrollButton" onClick={scrollToContent}>
            Explore AI Projects
          </button>
        </section>
      </header>

      <div id="reach3" ref={projectsRef} className="projects-container">
        <div className="project-item">
          <img src="123.jpg"/>
          <div className="project-details">
            <div className="project-status-live">Live</div>
            <h2>AI-Powered Paranormal Analysis</h2>
            <p className="tech-stack">Machine Learning • NLP • Computer Vision • Python • TensorFlow</p>
            <p className="description">
              Advanced AI system that analyzes paranormal phenomena using natural language processing and computer vision. 
              The platform employs deep learning models to categorize supernatural reports, identify patterns in eyewitness accounts, 
              and provide data-driven insights into unexplained events. Features include sentiment analysis of testimonials, 
              image recognition for anomaly detection, and predictive modeling for phenomenon classification.
            </p>
            <div className="project-links">
              <a href="https://github.com/Mr-J12/Paranormal-" className="project-link github-link" target="_blank" rel="noopener noreferrer">
                📂 GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="project-item">
          <img src="126.jpg" />
          <div className="project-details">
            <div className="project-status-live">Live</div>
            <h2>Neural SMS Spam Detection</h2>
            <p className="tech-stack">Deep Learning • NLP • Scikit-learn • NLTK • Streamlit</p>
            <p className="description">
              Sophisticated neural network model achieving 95% accuracy in spam detection using advanced NLP techniques. 
              The system employs LSTM networks, word embeddings, and feature engineering to analyze message patterns. 
              Includes real-time classification, adaptive learning capabilities, and comprehensive preprocessing pipeline 
              with tokenization, stemming, and TF-IDF vectorization for optimal performance.
            </p>
            <div className="project-links">
              <a href="https://github.com/Mr-J12/SMSspamdetectionAIbot" className="project-link github-link" target="_blank" rel="noopener noreferrer">
                📂 GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="project-item">
          <img src="9.jpg" />
          <div className="project-details">
            <div className="project-status-live">Live</div>
            <h2>Intelligent Data Validator</h2>
            <p className="tech-stack">Machine Learning • Data Science • React • TypeScript • Supabase</p>
            <p className="description">
              AI-driven data validation system that uses machine learning algorithms to ensure data quality and consistency. 
              The platform employs anomaly detection, pattern recognition, and predictive validation to identify data inconsistencies. 
              Features include automated data cleansing, intelligent error correction suggestions, and real-time validation 
              with cloud-based storage and synchronization capabilities.
            </p>
            <div className="project-links">
              <a href="https://github.com/Mr-J12/EDV" className="project-link github-link" target="_blank" rel="noopener noreferrer">
                📂 GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="project-item">
          <img src="222.jpg" />
          <div className="project-details">
            <div className="project-status-beta">Beta</div>
            <h2>AI Mental Health Assistant</h2>
            <p className="tech-stack">NLP • Sentiment Analysis • Neural Networks • React • MongoDB</p>
            <p className="description">
              Empathetic AI chatbot powered by advanced natural language processing and sentiment analysis for mental health support. 
              The system uses transformer models, emotion recognition, and therapeutic conversation patterns to provide personalized assistance. 
              Features include mood tracking algorithms, crisis detection mechanisms, and evidence-based therapeutic interventions 
              with secure data handling and privacy protection.
            </p>
            <div className="project-links">
              <a href="https://github.com/Mr-J12/Mentalcarebot" className="project-link github-link" target="_blank" rel="noopener noreferrer">
                📂 GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="project-item">
          <img src="555.jpg"/>
          <div className="project-details">
            <div className="project-status-alpha">Under Development</div>
            <h2>Autonomous AI Automation Platform</h2>
            <p className="tech-stack">Deep Learning • Computer Vision • NLP • Next.js • PostgreSQL</p>
            <p className="description">
              Comprehensive AI automation platform leveraging multiple machine learning models for intelligent task automation. 
              The system combines computer vision, natural language understanding, and predictive analytics to automate complex workflows. 
              Features include intelligent decision trees, adaptive learning algorithms, multi-modal AI integration, 
              and autonomous process optimization with real-time performance monitoring.
            </p>
            <div className="project-links">
              <a href="https://github.com/Mr-J12/AI-app" className="project-link github-link" target="_blank" rel="noopener noreferrer">
                📂 GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      <button 
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  );
}

export default Projects;