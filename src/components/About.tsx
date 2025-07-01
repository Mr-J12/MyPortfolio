import { useEffect, useRef } from 'react';

function About() {
  const ProjectsRef = useRef(null);

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
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
        }

        header {
          width: 100vw;
          height: 100vh;
          margin: 0;
          padding: 0;
          position: relative;
          background: linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.2)), 
                      url('src/assets/11.jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .h-text {
          max-width: 800px;
          width: 100%;
          text-align: center;
          color: white;
          padding: 0 20px;
        }

        .h-text h1 {
          font-size: clamp(2.5em, 5vw, 4em);
          margin-bottom: 30px;
          font-weight: 700;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }

        #scrollButton {
          padding: 15px 30px;
          font-size: 18px;
          background-color: #FF5722;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        #scrollButton:hover {
          background-color: rgb(204, 70, 29);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 87, 34, 0.4);
        }

        .experience-container {
          background-color : white;
          width: 100%;
          padding: 0 20px;
        }

        .experience-item {
          background-color: white;
          padding: 40px;
          margin-bottom: 5px;
          border-radius: 15px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          border-left: 5px solid #FF5722;
        }

        .experience-item:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.15);
        }

        .experience-item h2 {
          color: #333;
          font-size: 28px;
          margin-bottom: 10px;
          font-weight: 700;
        }

        .experience-item h3 {
          color: #FF5722;
          font-size: 20px;
          margin-bottom: 20px;
          font-weight: 600;
        }

        .experience-item ul {
          list-style-type: none;
          padding: 0;
        }

        .experience-item ul li {
          color: #666;
          font-size: 18px;
          margin-bottom: 12px;
          padding-left: 25px;
          position: relative;
          line-height: 1.6;
        }

        .experience-item ul li:before {
          content: "▶";
          color: #FF5722;
          font-weight: bold;
          position: absolute;
          left: 0;
          top: 0;
        }

        .back-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background-color: #FF5722;
          color: white;
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 87, 34, 0.3);
          z-index: 1000;

        }

        .back-to-top:hover {
          background-color: rgb(222, 74, 29);
          transform: translateY(-3px) scale(1.1);
          box-shadow: 0 6px 25px rgba(255, 87, 34, 0.4);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .experience-item {
            padding: 30px 20px;
          }
          
          .experience-item h2 {
            font-size: 24px;
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
          <h1>Professional Experience</h1>
          <button id="scrollButton" onClick={scrollToContent}>
            View Details
          </button>
        </section>
      </header>

      <div id="text">
        <div id="reach" className="experience-container">
          <div className="experience-item">
            <h2>Trial Developer</h2>
            <h3>Microsoft | 11/2023-01/2025</h3>
            <ul>
              <li>Used latest Microsoft Office 365 for test purposes</li>
              <li>Deeply learning the components of the products and its usages</li>
            </ul>
          </div>

          <div className="experience-item">
            <h2>Graphics Designer</h2>
            <h3>Geekroom | 09/2023-04/2025</h3>
            <ul>
              <li>Developed and maintained multiple templates</li>
              <li>Implemented responsive design for events</li>
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