import { useEffect, useRef } from 'react';

function Home() {
  const HomeRef = useRef(null);

  const scrollToContent = () => {
    document.getElementById('reach').scrollIntoView({ behavior: 'smooth' });
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
          width: 100vw;
          height: 100vh;
          margin: 0;
          padding: 0;
          position: relative;
          background: linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.2)), url('src/assets/12.jpg');
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

        .h-text span {
          letter-spacing: 5px;
          font-size: 24px;
          color: #4CAF50;
        }

        .h-text h1 {
          font-size: 4em;
          margin: 20px 0;
        }

        #scrollButton {
          padding: 15px 30px;
          font-size: 18px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: 0.3s;
        }

        #scrollButton:hover {
          background-color:rgb(37, 158, 41);
          transform: translateY(-2px);
        }

        .wrapper {
          padding: 40px 10%;
          background-color: white;
        }

        .wrapper h2 {
          font-size: 36px;
          color: #333;
          margin-bottom: 30px;
          text-align: center;
        }

        .wrapper p {
          font-size: 18px;
          line-height: 1.6;
          color: #666;
          margin-bottom: 30px;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .work-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        .work-item {
          background-color: #f9f9f9;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          transition: 0.3s;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .work-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .work-item img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 5px;
          margin-bottom: 20px;
        }

        .work-item h3 {
          font-size: 24px;
          color: #333;
          margin-bottom: 15px;
        }

        .work-item p {
          font-size: 16px;
          color: #666;
          margin-bottom: 0;
        }
          .back-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background-color: #4CAF50;
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
          background-color: #4CAF50;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(33, 150, 243, 0.4);
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
          <span>Front-End-Developer</span>
          <h1>Creating Digital Solutions<br />That Matter</h1>
          <button id="scrollButton" onClick={scrollToContent}>View My Work</button>
        </section>
      </header>

      <div id="reach">
        <div className="wrapper">
          <h2>About Me</h2>
          <p>
            I'm a driven BCA student from New Delhi with hands-on programming experience across multiple languages including Java, C++, and web technologies 
            which brings practical industry exposure through the freelance testing role with Microsoft and has developed diverse projects ranging from travel blogs to AI-based spam detection systems. <br />
            My technical skills are complemented by creative interests in video editing, music production, and AI image generation. 
            While still early in career, I strong demonstrates learning ability and initiative, though he would benefit from building more substantial professional experience and quantifying his technical achievements.
          </p>
        </div>

        <div className="wrapper">
          <h2>Featured Projects</h2>
          <div className="work-grid">
            <div className="work-item">
              <img src="/src/assets/123.jpg" alt="E-Commerce Platform" />
              <h3>Paranormal Website</h3>
              <p>A full-featured online platform for paranormal enthusiastics</p>
            </div>
            <div className="work-item">
              <img src="/src/assets/126.jpg" alt="Task Management App" />
              <h3>Spam SMS Detection</h3>
              <p>An AI model used for sms spam detection and protection </p>
            </div>
            <div className="work-item">
              <img src="/src/assets/155.webp" alt="Portfolio Website" />
              <h3>Portfolio Website</h3>
              <p>A responsive portfolio website showcasing modern web design</p>
            </div>
          </div>
        </div>
      </div>
    </>
    <button
      className="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
        ↑
      </button></>
  );
}

export default Home;