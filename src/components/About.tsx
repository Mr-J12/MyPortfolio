import { useEffect } from 'react';

function About() {

  const scrollToContent = () => {
    document.getElementById('reach1')?.scrollIntoView({ behavior: 'smooth' });
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

  const projectItems = document.querySelectorAll('.experience-item');
  projectItems.forEach((item, index) => {
    if (item instanceof HTMLElement) {
      item.style.opacity = '0';
      item.style.transform = 'translateY(50px)';
      item.style.transition = `all 0.8s ease ${index * 0.3}s`;
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
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
          background: var(--body-bg);
          color: var(--text-color);
        }

        header {
          width: 100vw;
          height: 100vh;
          margin: 0;
          padding: 0;
          position: relative;
          background: var(--header-bg);
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
            radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
          animation: pulse 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .h-text {
          max-width: 800px;
          width: 100%;
          text-align: center;
          color: white;
          padding: 0 20px;
          z-index: 10;
        }

        .h-text h1 {
          font-size: clamp(2.5em, 5vw, 4em);
          margin-bottom: 30px;
          font-weight: 800;
          background: linear-gradient(135deg, #ffffff, #3b82f6, #8b5cf6);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: slideIn 1s ease-out;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        #scrollButton {
          padding: 16px 32px;
          font-size: 18px;
          background: linear-gradient(135deg, #8b5cf6, #3b82f6);
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          overflow: hidden;
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
          box-shadow: 0 15px 35px rgba(139, 92, 246, 0.4);
        }

        .experience-container {
          background: var(--wrapper-bg);
          width: 100%;
          padding: 80px 5%;
          position: relative;
        }

        .experience-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: var(--wrapper-border);
        }

        .experience-item {
          background: var(--work-item-bg);
          backdrop-filter: blur(20px);
          padding: 50px;
          margin-bottom: 30px;
          border-radius: 20px;
          transition: all 0.4s ease;
          border: 1px solid var(--work-item-border);
          position: relative;
          overflow: hidden;
        }

        .experience-item::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: var(--back-to-top-bg);
        }

        .experience-item::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(59, 130, 246, 0.05));
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .experience-item:hover::after {
          opacity: 1;
        }

        .experience-item:hover {
          transform: translateY(-10px);
          box-shadow: var(--work-item-hover-shadow);
          border-color: var(--work-item-hover-border);
        }

        .experience-item h2 {
          color: var(--text-color);
          font-size: 32px;
          margin-bottom: 15px;
          font-weight: 700;
          background: linear-gradient(135deg, #ffffff, #8b5cf6);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .experience-item h3 {
          color: var(--accent-color);
          font-size: 20px;
          margin-bottom: 25px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .experience-item h3::before {
          content: "🚀";
          font-size: 18px;
        }

        .experience-item ul {
          list-style-type: none;
          padding: 0;
        }

        .experience-item ul li {
          color: #aacdff;
          font-size: 18px;
          margin-bottom: 15px;
          padding-left: 30px;
          position: relative;
          line-height: 1.7;
          transition: color 0.3s ease;
        }

        .experience-item ul li:before {
          content: "⚡";
          color: var(--secondary-accent);
          font-weight: bold;
          position: absolute;
          left: 0;
          top: 0;
          font-size: 16px;
        }

        .back-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background: var(--back-to-top-bg);
          color: white;
          border: none;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: var(--back-to-top-shadow);
          z-index: 1000;
          font-size: 20px;
        }

        .back-to-top:hover {
          transform: translateY(-5px) scale(1.1);
          box-shadow: var(--back-to-top-hover-shadow);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .experience-container {
            padding: 60px 20px;
          }
          
          .experience-item {
            padding: 35px 25px;
          }
          
          .experience-item h2 {
            font-size: 26px;
          }
          
          .experience-item h3 {
            font-size: 18px;
          }
          
          .experience-item ul li {
            font-size: 16px;
          }
        }
      `}</style>

      <header>
        <section className="h-text">
          <h1>Experience Journey</h1>
          <button id="scrollButton" onClick={scrollToContent}>
            View Experience
          </button>
        </section>
      </header>

      <div id="text" data-section="about">
        <div id="reach1" className="experience-container" data-section="experience">

          <div className="experience-item">
            <div className="experience-header">
              <h2>Data Science Intern | Null Class</h2>
              <span>Oct 2025 - Nov 2025</span>
            </div>
            <ul>
              <li>Developed and deployed a predictive machine learning model i.e car color prediction model, nationality detection model to forecast object detection and face recognition with 80% accuracy.</li>
              <li>•	Engineered features and performed extensive data cleaning/preprocessing on large-scale datasets and Visualized the model performance using different evaluation metrics.</li>
            </ul>
          </div>

          <div className="experience-item">
            <div className="experience-header">
              <h2>Graphics Designer | AIEC Society (IITM)</h2>
              <span>Aug 2025 - Present</span>
            </div>
            <ul>
              <li>Designed graphics, event posters, and social media creatives.</li>
              <li>Ensured brand consistency and visual appeal across various platforms.</li>
            </ul>
          </div>

          <div className="experience-item">
            <div className="experience-header">
              <h2>Video Editor | Nexverse Society (IITM)</h2>
              <span>Oct/2024 - Apr/2025</span>
            </div>
            <ul>
              <li>Collaborated with the team to conceptualize and execute video projects from start to finish.</li>
              <li>Managed and organized video assets, ensuring a streamlined post-production workflow.</li>
            </ul>
          </div>

          <div className="experience-item">
            <div className="experience-header">
              <h2>Promotional Reel Editor | IITM</h2>
              <span>May/2025 - June/2025</span>
            </div>
            <ul>
              <li>Edited and produced engaging video content for institute events and promotional activities.</li>
              <li>Collaborated with teams for scripting, visuals, and post-production work.</li>
            </ul>
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

export default About;