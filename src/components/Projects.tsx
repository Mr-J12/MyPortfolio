import { useEffect, useRef } from 'react';

function Projects() {
  const projectsRef = useRef(null);

  const scrollToContent = () => {
    document.getElementById('reach')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach((item, index) => {
      item.style.opacity = '0'; 
      item.style.transform = 'translateY(50px)';
      item.style.transition = `all 0.6s ease ${index * 0.2}s`;
      observer.observe(item);
    });

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
                      url('src/assets/5.jpg');
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
          background-color: #2196F3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(33, 150, 243, 0.3);
        }

        #scrollButton:hover {
          background-color: #1976D2;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(33, 150, 243, 0.4);
        }

        .projects-container {
          max-width: 1200px;
          margin: 80px auto;
          padding: 0 20px;
        }

        .project-item {
          display: flex;
          background-color: white;
          margin-bottom: 40px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 15px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          position: relative;
        }

        .project-item:hover {
          transform: translateY(-10px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .project-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(45deg,rgb(28, 131, 215), #21CBF3);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-item:hover::before {
          opacity: 1;
        }

        .project-item img {
          width: 400px;
          height: 400px;
          object-fit: cover;
          transition: transform 0.3s ease;
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
        }

        .project-details h2 {
          color: #333;
          font-size: 28px;
          margin-bottom: 15px;
          position: relative;
          transition: color 0.3s ease;
        }

        .project-item:hover .project-details h2 {
          color: #2196F3;
        }

        .tech-stack {
          color: #2196F3;
          font-size: 18px;
          margin-bottom: 20px;
          font-weight: 600;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tech-stack::before {
          content: '🛠️';
          margin-right: 8px;
        }

        .description {
          color: #666;
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .project-links {
          display: flex;
          gap: 15px;
          margin-top: auto;
        }

        .project-link {
          padding: 10px 20px;
          border-radius: 5px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .github-link {
          background-color: #333;
          color: white;
        }

        .github-link:hover {
          background-color: #555;
          transform: translateY(-2px);
        }

        .live-link {
          background-color: #2196F3;
          color: white;
        }

        .live-link:hover {
          background-color: #1976D2;
          transform: translateY(-2px);
        }

        .project-status-live {
          position: absolute;
          top: 20px;
          right: 20px;
          color: white;
          background-color: #4CAF50;
          padding: 5px 12px;
          border-radius: 15px;
          font-size: 12px;
          font-weight: 600;
        }
          .project-status-beta{
          position: absolute;
          top: 20px;
          right: 20px;
          color: white;
          background-color:rgb(210, 201, 20);
          padding: 5px 12px;
          border-radius: 15px;
          font-size: 12px;
          font-weight: 600;
          }
          .project-status-alpha{
          position: absolute;
          top: 20px;
          right: 20px;
          color: white;
          background-color:rgb(210, 20, 74);
          padding: 5px 12px;
          border-radius: 15px;
          font-size: 12px;
          font-weight: 600;
          }

        .back-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background-color: #2196F3;
          color: white;
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(33, 150, 243, 0.3);
          z-index: 1000;
        }

        .back-to-top:hover {
          background-color: #1976D2;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(33, 150, 243, 0.4);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .h-text h1 {
            font-size: 2.5em;
          }

          .projects-container {
            margin: 40px auto;
            padding: 0 15px;
          }

          .project-item {
            flex-direction: column;
            margin-bottom: 30px;
          }

          .project-item img {
            width: 100%;
            height: 250px;
          }

          .project-details {
            padding: 25px;
          }

          .project-details h2 {
            font-size: 24px;
          }

          .tech-stack {
            font-size: 16px;
          }

          .project-links {
            flex-direction: column;
            gap: 10px;
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
          <h1>Project Portfolio</h1>
          <p>Showcasing innovative solutions and technical expertise</p>
          <button id="scrollButton" onClick={scrollToContent}>
            View Projects
          </button>
        </section>
      </header>

      <div id="reach" ref={projectsRef} className="projects-container">
        <div className="project-item">
          <img src="/src/assets/123.jpg" alt="E-Commerce Platform" />
          <div className="project-details">
            <div className="project-status-live">Live</div>
            <h2>Paranormal Website</h2>
            <p className="tech-stack">HTML/CSS • Bootstrap • PHP • MySQL</p>
            <p className="description">
Step into the mysterious world of the unexplained with our comprehensive paranormal information platform. 
This website serves as a digital gateway for enthusiasts, researchers, and curious minds seeking authentic information about supernatural phenomena, unexplained mysteries, and paranormal investigations. 
Features include detailed case studies, historical accounts, scientific perspectives on paranormal claims, and an interactive community forum where users can share experiences and discuss theories.

            </p>
            <div className="project-links">
              <a href="https://github.com/Mr-J12/Paranormal-" className="project-link github-link" target="_blank" rel="noopener noreferrer">
                📂 GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="project-item">
          <img src="/src/assets/126.jpg" alt="Task Management System" />
          <div className="project-details">
            <div className="project-status-live">Live</div>
            <h2>Spam SMS Detection</h2>
            <p className="tech-stack">Streamlit • Python </p>
            <p className="description">
A sophisticated machine learning-powered solution designed to automatically identify and filter spam messages with remarkable accuracy. 
This system leverages advanced natural language processing and pattern recognition algorithms to analyze message content, sender behavior, and communication patterns. 
Features include customizable filtering levels, learning capabilities that improve over time, and seamless integration possibilities with existing messaging platforms.
            </p>
            <div className="project-links">
              <a href="https://github.com/Mr-J12/SMSspamdetectionAIbot/tree/main/SMS%20spam%20detector%20project" className="project-link github-link" target="_blank" rel="noopener noreferrer">
                📂 GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="project-item">
          <img src="/src/assets/222.jpg" alt="Social Media Dashboard" />
          <div className="project-details">
            <div className="project-status-beta">Beta</div>
            <h2>Mental Healthcare Bot</h2>
            <p className="tech-stack">React • Python • Node.js • MongoBD</p>
            <p className="description">
An empathetic AI-powered chatbot designed to provide immediate mental health support and resources to users seeking emotional assistance. 
This intelligent companion offers 24/7 availability for crisis intervention, mood tracking, personalized coping strategies, and guided meditation sessions.
 The bot utilizes evidence-based therapeutic techniques, maintains strict confidentiality protocols, and can escalate to human professionals when necessary.
            </p>
            <div className="project-links">
              <a href="https://github.com/Mr-J12/Mentalcarebot" className="project-link github-link" target="_blank" rel="noopener noreferrer">
                📂 GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="project-item">
          <img src="/src/assets/555.jpg" alt="Fitness Tracking App" />
          <div className="project-details">
            <div className="project-status-alpha">Under Developing</div>
            <h2>Automation AI App</h2>
            <p className="tech-stack">React • Next.js • PostgreSQL • Java</p>
            <p className="description">
A comprehensive automation platform that harnesses artificial intelligence to simplify daily tasks and optimize productivity workflows. 
This versatile application combines smart scheduling, task management, and intelligent decision-making to automate routine activities across personal and professional environments. 
The AI learns user preferences and patterns to suggest optimizations, automate repetitive processes, and integrate seamlessly with various digital tools and platforms.
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