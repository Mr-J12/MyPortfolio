import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <>
      <nav>
        <div className="logo">
            Yashwant Singh Rawat
        </div>
        <div className="menu">
          <a href="#about">About Me</a>
          <a href="#experience">Experience Journey</a>
          <a href="#projects">Project Showcase</a>
          <a href="#skills">Technical Arsenal</a>
        </div>
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