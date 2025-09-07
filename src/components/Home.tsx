import { useEffect } from 'react';

function Home() {
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNavbar = () => {
      const nav = document.querySelector('nav');
      if (!nav) return;

      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        // Scrolling down
        nav.classList.add('nav-hidden');
      } else {
        // Scrolling up
        nav.classList.remove('nav-hidden');
      }
      lastScrollY = window.scrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Mobile menu functionality
    const setupMobileMenu = () => {
      const nav = document.querySelector('nav');
      if (!nav) return;

      // Create mobile menu toggle if it doesn't exist
      let mobileToggle = nav.querySelector('.mobile-menu-toggle');
      if (!mobileToggle) {
        mobileToggle = document.createElement('div');
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.innerHTML = '<span></span><span></span><span></span>';
        nav.appendChild(mobileToggle);
      }

      const menu = nav.querySelector('.menu');
      if (!menu) return;

      const handleToggle = () => {
        mobileToggle?.classList.toggle('active');
        menu.classList.toggle('active');
      };

      mobileToggle.addEventListener('click', handleToggle);

      // Close menu when clicking on a link
      const menuLinks = menu.querySelectorAll('a');
      menuLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileToggle?.classList.remove('active');
          menu.classList.remove('active');
        });
      });

      return () => {
        mobileToggle?.removeEventListener('click', handleToggle);
        menuLinks.forEach(link => {
          link.removeEventListener('click', handleToggle);
        });
      };
    };

    const cleanup = setupMobileMenu();
    return cleanup;
  }, []);

  useEffect(() => {
    // Smooth scrolling for navigation links
    const handleNavClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId || '');
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 100; // Account for fixed nav
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleNavClick);
    return () => document.removeEventListener('click', handleNavClick);
  }, []);

  const scrollToContent = () => {
    document.getElementById('reach')?.scrollIntoView({ behavior: 'smooth' });
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

  const projectItems = document.querySelectorAll('.work-item, .floating-element');
  projectItems.forEach((item, index) => {
    if (item instanceof HTMLElement) {
      item.style.opacity = '0';
      item.style.transform = 'translateY(50px)';
      item.style.transition = `all 0.8s ease ${index * 0.2}s`;
      observer.observe(item);
    }
  });

  // Floating animation for AI elements
  const floatingElements = document.querySelectorAll('.floating-element');
  floatingElements.forEach((element, index) => {
    if (element instanceof HTMLElement) {
      element.style.animationDelay = `${index * 0.5}s`;
    }
  });

  return () => {
    projectItems.forEach(item => {
      if (item instanceof HTMLElement) {
        observer.unobserve(item);
      }
    });
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
          background: #0f172a;
          color: #e2e8f0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

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
            radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(6, 182, 212, 0.05) 0%, transparent 50%);
          animation: pulse 4s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        .floating-element {
          position: absolute;
          opacity: 0.1;
          animation: float 6s ease-in-out infinite;
        }

        .floating-element:nth-child(1) {
          top: 10%;
          left: 10%;
          font-size: 24px;
          animation-duration: 8s;
        }

        .floating-element:nth-child(2) {
          top: 20%;
          right: 15%;
          font-size: 18px;
          animation-duration: 6s;
        }

        .floating-element:nth-child(3) {
          bottom: 30%;
          left: 20%;
          font-size: 20px;
          animation-duration: 7s;
        }

        .floating-element:nth-child(4) {
          bottom: 20%;
          right: 10%;
          font-size: 22px;
          animation-duration: 9s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(5deg); }
          66% { transform: translateY(10px) rotate(-3deg); }
        }

        .h-text {
          max-width: 900px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          text-align: center;
          color: white;
          z-index: 10;
        }

        .h-text span {
          letter-spacing: 3px;
          font-size: 18px;
          font-weight: 600;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: block;
          margin-bottom: 20px;
          animation: slideInFromTop 1s ease-out;
        }

        .h-text h1 {
          font-size: clamp(2.5em, 5vw, 4.5em);
          margin: 30px 0;
          font-weight: 800;
          line-height: 1.2;
          background: linear-gradient(135deg, #ffffff, #e2e8f0, #3b82f6);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: slideInFromBottom 1s ease-out 0.3s both;
        }

        .h-text .subtitle {
          font-size: 1.2em;
          color: #94a3b8;
          margin-bottom: 40px;
          animation: fadeIn 1s ease-out 0.6s both;
        }

        @keyframes slideInFromTop {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInFromBottom {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        #scrollButton {
          padding: 16px 32px;
          font-size: 16px;
          font-weight: 600;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          animation: fadeIn 1s ease-out 0.9s both;
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
          box-shadow: 0 15px 35px rgba(59, 130, 246, 0.4);
        }

        .wrapper {
          padding: 80px 5%;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          position: relative;
        }

        .wrapper::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #3b82f6, transparent);
        }

        .wrapper h2 {
          font-size: clamp(2em, 4vw, 3em);
          color: #ffffff;
          margin-bottom: 30px;
          text-align: center;
          font-weight: 700;
          background: linear-gradient(135deg, #ffffff, #3b82f6);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .wrapper p {
          font-size: 18px;
          line-height: 1.8;
          color: #94a3b8;
          margin-bottom: 50px;
          text-align: center;
          max-width: 900px;
          margin: 0 auto 50px;
        }

        .work-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 40px;
          margin-top: 60px;
        }

        .work-item {
          background: linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(51, 65, 85, 0.6));
          backdrop-filter: blur(20px);
          padding: 30px;
          border-radius: 20px;
          text-align: center;
          transition: all 0.4s ease;
          border: 1px solid rgba(59, 130, 246, 0.2);
          position: relative;
          overflow: hidden;
        }

        .work-item::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .work-item:hover::before {
          opacity: 1;
        }

        .work-item:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.5);
        }

        .work-item img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          border-radius: 15px;
          margin-bottom: 25px;
          transition: transform 0.3s ease;
        }

        .work-item:hover img {
          transform: scale(1.05);
        }

        .work-item h3 {
          font-size: 24px;
          color: #ffffff;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .work-item p {
          font-size: 16px;
          color: #94a3b8;
          margin-bottom: 0;
          line-height: 1.6;
        }

        .back-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          border: none;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
          z-index: 1000;
          font-size: 20px;
        }

        .back-to-top:hover {
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 15px 35px rgba(59, 130, 246, 0.4);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .wrapper {
            padding: 60px 20px;
          }
          
          .work-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          .work-item {
            padding: 25px;
          }
        }
      `}</style>

      <header>
        <div className="floating-element">🤖</div>
        <div className="floating-element">⚡</div>
        <div className="floating-element">🧠</div>
        <div className="floating-element">💡</div>
        <div className="floating-element">🔬</div>
        <div className="floating-element">📊</div>

        <section className="h-text">
          <span>AI/ML Developer</span>
          <h1>Building Intelligent Solutions<br />for Tomorrow</h1>
          <p className="subtitle">Transforming data into insights, algorithms into intelligence</p>
          <button id="scrollButton" onClick={scrollToContent}>Explore My AI Journey</button>
        </section>
      </header>

      <div id="reach">
        <div className="wrapper">
          <h2>About Me</h2>
          <p>
            I'm a passionate AI/ML developer and BCA student from New Delhi, specializing in machine learning, artificial intelligence, and data science. 
            With hands-on experience in Python, deep learning frameworks, and AI model development, I create intelligent solutions that solve real-world problems. 
            My expertise spans from natural language processing and computer vision to predictive analytics and neural networks. 
            I'm constantly exploring cutting-edge AI technologies and contributing to the future of artificial intelligence through innovative projects and research.
          </p>
        </div>

        <div className="wrapper">
          <h2>Featured AI Projects</h2>
          <div className="work-grid">
            <div className="work-item">
              <img src="123.jpg" alt="AI-Powered Paranormal Analysis" />
              <h3> Paranormal Website</h3>
              <p>An intelligent platform using machine learning to analyze and categorize paranormal phenomena with data-driven insights.</p>
            </div>
            <div className="work-item">
              <img src="211.jpg" alt="Mental Healthcare Bot" />
              <h3>Mental Healthcare Bot</h3>
              <p>Your confidential AI companion for mental and emotional support, available 24/7. Chat with it for real-time mental health support.</p>
            </div>
            <div className="work-item">
              <img src="512.jpg" alt="Neural Network Portfolio" />
              <h3>Diamond Carat Prediction</h3>
              <p>Developed a machine learning regression model to predict diamond carat weight based on physical dimensions and quality metrics.</p>
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

export default Home;