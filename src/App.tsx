import { useState, useEffect } from 'react';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <nav>
        <div className="logo">
            Yashwant Singh Rawat
        </div>
        <div className="menu">
          <a href="#reach1">About Me</a>
          <a href="#reach1">Experience Journey</a>
          <a href="#reach3">Project Showcase</a>
          <a href="#reach4">Technical Arsenal</a>
        </div>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </nav>
      <Home/>
      <About/>
      <Projects/>
      <Skills/>
      <Footer/>
    </>
  );
}

export default App;