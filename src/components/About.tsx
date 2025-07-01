import { useEffect, useRef } from 'react';

function About() {
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
    <><>
      <style>{`
        header {
          width: 100%;
          height: 100vh;
          background-image: linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.2)), url('/src/assets/11.jpg');
          background-size: cover;
          background-position: center;
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
        }

        #scrollButton {
          padding: 15px 30px;
          font-size: 18px;
          background-color: #FF5722;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: 0.3s;
        }

        #scrollButton:hover {
          background-color:rgb(204, 70, 29);
          transform: translateY(-2px);
        }

        .experience-container {
          max-width: 1200px;
          margin: 80px auto;
          padding: 0 20px;
        }

        .experience-item {
          background-color: white;
          padding: 40px;
          margin-bottom: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 15px rgba(0,0,0,0.1);
          transition: 0.3s;
        }

        .experience-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 20px rgba(0,0,0,0.15);
        }

        .experience-item h2 {
          color: #333;
          font-size: 28px;
          margin-bottom: 10px;
        }

        .experience-item h3 {
          color: #FF5722;
          font-size: 20px;
          margin-bottom: 20px;
        }

        .experience-item ul {
          list-style-type: none;
        }

        .experience-item ul li {
          color: #666;
          font-size: 18px;
          margin-bottom: 10px;
          padding-left: 20px;
          position: relative;
        }

        .experience-item ul li:before {
          content: "•";
          color: #FF5722;
          font-weight: bold;
          position: absolute;
          left: 0;
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
          box-shadow: 0 4px 15px rgba(33, 150, 243, 0.3);
          z-index: 1000;
        }
          .back-to-top:hover {
          background-color:rgb(222, 74, 29);
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(33, 150, 243, 0.4);
        }
      `}</style>

      <header>
        <section className="h-text">
          <h1>Professional Experience</h1>
          <button id="scrollButton" onClick={scrollToContent}>View Details</button>
        </section>
      </header>

      <div id="text">
        <div id="reach" className="experience-container">
          <div className="experience-item">
            <h2>Trial Developer</h2>
            <h3>Microsoft | 11/2023-01/2025  </h3>
            <ul>
             <li> used latest Microsoft office 365 for test purposes. </li>
             <li> deeply learning the components of the products and its usages.</li>
            </ul>
          </div>

          <div className="experience-item">
            <h2>Graphics Designer</h2>
            <h3>Geekroom  | 09/2023-04/2025</h3>
            <ul>
              <li>Developed and maintained multiple templates.</li>
              <li>Implemented responsive design for events.</li>
            </ul>
          </div>
        </div>
      </div>
    </><button
      className="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
        ↑
      </button></>
  );
}

export default About;