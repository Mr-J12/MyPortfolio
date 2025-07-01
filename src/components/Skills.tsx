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
                bar.style.setProperty('--progress-width', progress + '%');
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
      <style jsx>{`
        header {
          width: 100vw;
          height: 100vh;
          margin: 0;
          padding: 0;
          position: relative;
          background: linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.2)), 
                      url('src/assets/51.jpg');
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
          background-color : white;
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
          background: linear-gradient(90deg, #9C27B0, #E1BEE7);
          width: var(--progress-width, 0%);
          transition: width 1.2s ease-in-out;
          border-radius: 5px;
        }

        .progress-bar::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: var(--progress-width, 0%);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shine 2s infinite;
          border-radius: 5px;
        }

        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
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
        <section className="skill-category">
          <h2>Frontend Development</h2>
          <div className="skills-grid">
            <div className="skill-item">
              <h3>
                HTML/CSS
                <span className="skill-percentage">95%</span>
              </h3>
              <div className="progress-bar" data-progress="95"></div>
              <div className="skill-level">Expert Level</div>
            </div>
            <div className="skill-item">
              <h3>
                Javascript
                <span className="skill-percentage">70%</span>
              </h3>
              <div className="progress-bar" data-progress="70"></div>
              <div className="skill-level">Intermediate Level</div>
            </div>
            <div className="skill-item">
              <h3>
                React.js
                <span className="skill-percentage">60%</span>
              </h3>
              <div className="progress-bar" data-progress="60"></div>
              <div className="skill-level">basic Level</div>
            </div>
            
          </div>
        </section>

        <section className="skill-category">
          <h2>Backend Development</h2>
          <div className="skills-grid">
            <div className="skill-item">
              <h3>
                Node.js
                <span className="skill-percentage">80%</span>
              </h3>
              <div className="progress-bar" data-progress="80"></div>
              <div className="skill-level">Advanced Level</div>
            </div>
            <div className="skill-item">
              <h3>
                Python
                <span className="skill-percentage">80%</span>
              </h3>
              <div className="progress-bar" data-progress="80"></div>
              <div className="skill-level">Advanced Level</div>
            </div>
            <div className="skill-item">
              <h3>
                PHP
                <span className="skill-percentage">75%</span>
              </h3>
              <div className="progress-bar" data-progress="75"></div>
              <div className="skill-level">Advanced Level</div>
            </div>
          </div>
        </section>

        <section className="skill-category">
          <h2>Databases</h2>
          <div className="skills-grid">
            <div className="skill-item">
              <h3>
                SQL
                <span className="skill-percentage">90%</span>
              </h3>
              <div className="progress-bar" data-progress="90"></div>
              <div className="skill-level">Expert Level</div>
            </div>
            <div className="skill-item">
              <h3>
                MariaDB
                <span className="skill-percentage">80%</span>
              </h3>
              <div className="progress-bar" data-progress="80"></div>
              <div className="skill-level">Advanced Level</div>
            </div>
            <div className="skill-item">
              <h3>
                MongoDB
                <span className="skill-percentage">65%</span>
              </h3>
              <div className="progress-bar" data-progress="65"></div>
              <div className="skill-level">basic Level</div>
            </div>
          </div>
        </section>

        <section className="skill-category">
          <h2>Tools & Technologies</h2>
          <div className="skills-grid">
            <div className="skill-item">
              <h3>
                Git
                <span className="skill-percentage">90%</span>
              </h3>
              <div className="progress-bar" data-progress="90"></div>
              <div className="skill-level">Expert Level</div>
            </div>
            <div className="skill-item">
              <h3>
                C/C++
                <span className="skill-percentage">85%</span>
              </h3>
              <div className="progress-bar" data-progress="85"></div>
              <div className="skill-level">Advanced Level</div>
            </div>
             <div className="skill-item">
              <h3>
                Docker
                <span className="skill-percentage">70%</span>
              </h3>
              <div className="progress-bar" data-progress="70"></div>
              <div className="skill-level">Intermediate Level</div>
            </div>  
          </div>
        </section>
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