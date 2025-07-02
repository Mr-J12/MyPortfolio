import { useEffect, useRef } from 'react';

function Skills() {
  const skillsRef = useRef(null);

  const scrollToContent = () => {
    document.getElementById('reach')?.scrollIntoView({ behavior: 'smooth' });
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
              }, index * 150);
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
          background: linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.2)), 
                      url('51.jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .h-text {
          max-width: 800px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          text-align: center;
          color: white;
        }

        .h-text h1 {
          font-size: 4em;
          margin-bottom: 30px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }

        .h-text p {
          font-size: 1.2em;
          margin-bottom: 40px;
          opacity: 0.9;
        }

        #scrollButton {
          padding: 15px 30px;
          font-size: 18px;
          background-color: #9C27B0;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(156, 39, 176, 0.3);
        }

        #scrollButton:hover {
          background-color: #7B1FA2;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(156, 39, 176, 0.4);
        }

        .skills-container {
          padding: 0 20px;
          background-color: white;
        }

        .skill-category {
          background-color: white;
          padding: 40px;
          margin-bottom: 5px;
          border-radius: 10px;
          box-shadow: 0 2px 15px rgba(0,0,0,0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .skill-category:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .skill-category h2 {
          color: #333;
          font-size: 28px;
          margin-bottom: 30px;
          text-align: center;
          position: relative;
        }

        .skill-category h2::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background-color: #9C27B0;
          border-radius: 2px;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .skill-item {
          background-color: #f9f9f9;
          padding: 20px;
          border-radius: 8px;
          transition: all 0.3s ease;
          border-left: 4px solid #9C27B0;
        }

        .skill-item:hover {
          background-color: #f5f5f5;
          transform: translateX(5px);
        }

        .skill-item h3 {
          color: #333;
          font-size: 20px;
          margin-bottom: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .skill-percentage {
          font-size: 14px;
          color: #9C27B0;
          font-weight: bold;
          background-color: rgba(156, 39, 176, 0.1);
          padding: 4px 8px;
          border-radius: 12px;
        }

        .progress-bar {
          height: 10px;
          background-color: #e0e0e0;
          border-radius: 5px;
          overflow: hidden;
          position: relative;
          margin-top: 10px;
        }

        .progress-bar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: var(--progress-width, 0%);
          background: linear-gradient(90deg, #9C27B0, #E1BEE7);
          transition: width 1.2s ease-in-out;
          border-radius: 5px;
          z-index: 1;
        }

        .progress-bar::after {
          content: '';
          position: absolute;
          top: 0;
          left: -40%;
          height: 100%;
          width: 40%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          animation: shine 2s infinite;
          border-radius: 5px;
          z-index: 2;
        }

        .progress-label {
          position: absolute;
          top: -20px;
          right: 0;
          font-size: 12px;
          font-weight: bold;
          color: #9C27B0;
          z-index: 3;
        }

        @keyframes shine {
          0% {
            left: -40%;
          }
          100% {
            left: 100%;
          }
        }

        .skill-level {
          font-size: 12px;
          color: #666;
          margin-top: 5px;
          font-style: italic;
        }

        .back-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background-color: #9C27B0;
          color: white;
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(156, 39, 176, 0.3);
          z-index: 1000;
        }

        .back-to-top:hover {
          background-color: #7B1FA2;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(156, 39, 176, 0.4);
        }

        @media (max-width: 768px) {
          .h-text h1 {
            font-size: 2.5em;
          }

          .skills-container {
            margin: 40px auto;
            padding: 0 15px;
          }

          .skill-category {
            padding: 25px;
          }

          .skills-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>

      <header>
        <section className="h-text">
          <h1>Technical Expertise</h1>
          <p>Showcasing my proficiency across various technologies and frameworks</p>
          <button id="scrollButton" onClick={scrollToContent}>
            View Skills
          </button>
        </section>
      </header>

      <div id="reach" ref={skillsRef} className="skills-container">
        {[
          {
            category: 'Frontend Development',
            skills: [
              { name: 'HTML/CSS', level: 'Expert Level', value: 95 },
              { name: 'Javascript', level: 'Intermediate Level', value: 70 },
              { name: 'React.js', level: 'Basic Level', value: 60 },
            ],
          },
          {
            category: 'Backend Development',
            skills: [
              { name: 'Node.js', level: 'Advanced Level', value: 80 },
              { name: 'Python', level: 'Advanced Level', value: 80 },
              { name: 'PHP', level: 'Advanced Level', value: 75 },
            ],
          },
          {
            category: 'Databases',
            skills: [
              { name: 'SQL', level: 'Expert Level', value: 90 },
              { name: 'MariaDB', level: 'Advanced Level', value: 80 },
              { name: 'MongoDB', level: 'Basic Level', value: 65 },
            ],
          },
          {
            category: 'Tools & Technologies',
            skills: [
              { name: 'Git', level: 'Expert Level', value: 90 },
              { name: 'C/C++', level: 'Advanced Level', value: 85 },
              { name: 'Docker', level: 'Intermediate Level', value: 70 },
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
