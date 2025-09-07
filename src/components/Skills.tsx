import { useEffect, useRef } from 'react';

function Skills() {
  const skillsRef = useRef(null);

  const scrollToContent = () => {
    document.getElementById('reach4')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.progress-bar');
            bars.forEach((bar, index) => {
              setTimeout(() => {
                const progress = bar.getAttribute('data-progress');
                if (progress) {
                  const el = bar as HTMLElement;
                  bar.classList.add('animate');
                  el.style.setProperty('--progress-width', `${progress}%`);

                  const label = el.querySelector('.progress-label') as HTMLElement | null;
                  if (label) label.textContent = `${progress}%`;
                }
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => observer.disconnect();
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
            radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
          animation: pulse 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
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
          background: linear-gradient(135deg, #ffffff, #a855f7, #3b82f6);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: slideIn 1s ease-out;
        }

        .h-text p {
          font-size: 1.3em;
          margin-bottom: 40px;
          color: var(--subtitle-color);
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
          background: var(--back-to-top-bg);
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
          box-shadow: var(--back-to-top-hover-shadow);
        }

        .skills-container {
          padding: 80px 5%;
          background: var(--wrapper-bg);
          position: relative;
        }

        .skills-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: var(--wrapper-border);
        }

        .skill-category {
          background: var(--work-item-bg);
          backdrop-filter: blur(20px);
          padding: 50px;
          margin-bottom: 40px;
          border-radius: 25px;
          transition: all 0.4s ease;
          border: 1px solid var(--work-item-border);
          position: relative;
          overflow: hidden;
        }

        .skill-category::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.05), rgba(59, 130, 246, 0.05));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .skill-category:hover::before {
          opacity: 1;
        }

        .skill-category:hover {
          transform: translateY(-10px);
          box-shadow: var(--work-item-hover-shadow);
          border-color: var(--work-item-hover-border);
        }

        .skill-category h2 {
          color: var(--text-color);
          font-size: 32px;
          margin-bottom: 40px;
          text-align: center;
          position: relative;
          font-weight: 700;
          background: linear-gradient(135deg, #ffffff, #a855f7);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .skill-category h2::after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: var(--back-to-top-bg);
          border-radius: 2px;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 35px;
        }

        .skill-item {
          background: var(--skill-item-bg);
          backdrop-filter: blur(10px);
          padding: 25px;
          border-radius: 15px;
          transition: all 0.3s ease;
          border: 1px solid var(--skill-item-border);
          position: relative;
          overflow: hidden;
        }

        .skill-item::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .skill-item:hover::before {
          opacity: 1;
        }

        .skill-item:hover {
          transform: translateY(-5px);
          border-color: var(--skill-item-hover-border);
          box-shadow: var(--skill-item-hover-shadow);
        }

        .skill-item h3 {
          color: var(--text-color);
          font-size: 22px;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          z-index: 1;
          position: relative;
        }

        .skill-percentage {
          font-size: 14px;
          color: var(--secondary-accent);
          font-weight: 700;
          background: var(--skill-percentage-bg);
          backdrop-filter: blur(10px);
          padding: 6px 12px;
          border-radius: 15px;
          border: 1px solid var(--skill-percentage-border);
        }

        .progress-bar {
          height: 12px;
          background: var(--progress-bar-bg);
          border-radius: 6px;
          overflow: hidden;
          position: relative;
          margin-top: 15px;
          z-index: 1;
        }

        .progress-bar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: var(--progress-width, 0%);
          background: linear-gradient(135deg, #a855f7, #3b82f6, #06b6d4);
          transition: width 1.5s ease-in-out;
          border-radius: 6px;
          z-index: 1;
        }

        .progress-bar::after {
          content: '';
          position: absolute;
          top: 0;
          left: -50%;
          height: 100%;
          width: 50%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          animation: shine 2.5s infinite;
          border-radius: 6px;
          z-index: 2;
        }

        @keyframes shine {
          0% { left: -50%; }
          100% { left: 100%; }
        }

        .skill-level {
          font-size: 13px;
          color: var(--subtitle-color);
          margin-top: 10px;
          font-style: italic;
          font-weight: 500;
          z-index: 1;
          position: relative;
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

        @media (max-width: 768px) {
          .h-text h1 {
            font-size: 2.5em;
          }

          .skills-container {
            padding: 60px 20px;
          }

          .skill-category {
            padding: 35px 25px;
          }

          .skills-grid {
            grid-template-columns: 1fr;
            gap: 25px;
          }
        }
      `}</style>

      <header>
        <section className="h-text">
          <h1>Technical Arsenal</h1>
          <p>Mastering cutting-edge technologies in artificial intelligence and machine learning</p>
          <button id="scrollButton" onClick={scrollToContent}>
            View AI Skills
          </button>
        </section>
      </header>

      <div id="reach4" ref={skillsRef} className="skills-container" data-section="skills">
        {[
          {
            category: 'Machine Learning & AI',
            skills: [
              { name: 'Python', level: 'Expert Level', value: 90 },
              { name: 'TensorFlow/Keras', level: 'Advanced Level', value: 85 },
              { name: 'Scikit-learn', level: 'Advanced Level', value: 88 },
              { name: 'PyTorch', level: 'Intermediate Level', value: 75 },
            ],
          },
          {
            category: 'Data Science & Analytics',
            skills: [
              { name: 'Pandas/NumPy', level: 'Expert Level', value: 92 },
              { name: 'Data Visualization', level: 'Advanced Level', value: 85 },
              { name: 'Statistical Analysis', level: 'Advanced Level', value: 80 },
              { name: 'Feature Engineering', level: 'Advanced Level', value: 82 },
            ],
          },
          {
            category: 'Deep Learning & NLP',
            skills: [
              { name: 'Neural Networks', level: 'Advanced Level', value: 85 },
              { name: 'Natural Language Processing', level: 'Advanced Level', value: 80 },
              { name: 'Computer Vision', level: 'Intermediate Level', value: 75 },
              { name: 'LSTM/RNN', level: 'Intermediate Level', value: 70 },
            ],
          },
          {
            category: 'Development & Deployment',
            skills: [
              { name: 'React/TypeScript', level: 'Advanced Level', value: 85 },
              { name: 'Cloud Platforms (AWS/Azure)', level: 'Intermediate Level', value: 70 },
              { name: 'Docker/MLOps', level: 'Intermediate Level', value: 72 },
              { name: 'API Development', level: 'Intermediate Level', value: 70 },
            ],
          },
        ].map((section) => (
          <section className="skill-category" key={section.category}>
            <h2>{section.category}</h2>
            <div className="skills-grid">
              {section.skills.map((skill) => (
                <div className="skill-item" key={skill.name}>
                  <h3>
                    {skill.name}
                    <span className="skill-percentage">{skill.value}%</span>
                  </h3>
                  <div className="progress-bar" data-progress={skill.value}>
                    <span className="progress-label"></span>
                  </div>
                  <div className="skill-level">{skill.level}</div>
                </div>
              ))}
            </div>
          </section>
        ))}
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

export default Skills;