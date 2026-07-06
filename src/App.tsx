import { useState, useEffect } from 'react';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import './App.css';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [calmTheme, setCalmTheme] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('theme-mode') === 'calm';
  });

  useEffect(() => {
    const themeMode = calmTheme ? 'calm' : 'glow';
    document.documentElement.dataset.themeMode = themeMode;
    localStorage.setItem('theme-mode', themeMode);
  }, [calmTheme]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNavbar = () => {
      const nav = document.querySelector('nav');
      if (!nav) return;

      setScrolled(window.scrollY > 50);

      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        nav.classList.add('nav-hidden');
      } else {
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
    const setupMobileMenu = () => {
      const nav = document.querySelector('nav');
      if (!nav) return;

      let mobileToggle = nav.querySelector('.mobile-menu-toggle') as HTMLElement | null;
      if (!mobileToggle) {
        mobileToggle = document.createElement('div');
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.innerHTML = '<span></span><span></span><span></span>';
        nav.insertBefore(mobileToggle, nav.querySelector('.theme-toggle'));
      }

      const menu = nav.querySelector('.menu') as HTMLElement | null;
      if (!menu) return;

      const handleToggle = () => {
        mobileToggle?.classList.toggle('active');
        menu.classList.toggle('active');
      };

      mobileToggle.addEventListener('click', handleToggle);

      const menuLinks = menu.querySelectorAll('a');
      menuLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileToggle?.classList.remove('active');
          menu.classList.remove('active');
        });
      });

      return () => {
        mobileToggle?.removeEventListener('click', handleToggle);
      };
    };

    const cleanup = setupMobileMenu();
    return cleanup;
  }, []);

  useEffect(() => {
    const handleNavClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId || '');
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      }
    };
    document.addEventListener('click', handleNavClick);
    return () => document.removeEventListener('click', handleNavClick);
  }, []);

  return (
    <>
      <nav style={{ background: scrolled ? 'rgba(6,17,31,0.95)' : 'rgba(6,17,31,0.6)' }}>
        <div className="logo">Yashwant Singh Rawat</div>
        <div className="menu">
          <a href="#home" id="nav-home">Home</a>
          <a href="#about" id="nav-about">About</a>
          <a href="#work" id="nav-work">Work</a>
          <a href="#contact" id="nav-contact">Contact</a>
        </div>
        <button
          className="theme-toggle"
          type="button"
          aria-label={`Switch to ${calmTheme ? 'glow' : 'calm'} theme`}
          aria-pressed={calmTheme}
          title={`Switch to ${calmTheme ? 'glow' : 'calm'} theme`}
          onClick={() => setCalmTheme(current => !current)}
        >
          <span className="theme-toggle-track" aria-hidden="true">
            <span className="theme-toggle-thumb" />
          </span>
          <span className="theme-toggle-text">{calmTheme ? 'Calm' : 'Glow'}</span>
        </button>
      </nav>

      <div id="home"><Home /></div>
      <div id="about"><About /></div>
      <div id="work"><Projects /></div>
      <div id="skills"><Skills /></div>
      <div id="contact"><Footer /></div>

      <Chatbot />
    </>
  );
}

export default App;
