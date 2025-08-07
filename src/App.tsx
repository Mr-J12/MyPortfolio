import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import './App.css';

function App() {
  return (
    <>
      <nav>
        <div className="logo">
            Yashwant Singh Rawat
        </div>
        <div className="contact">
          <a href="https://www.linkedin.com/in/yashwant-singh-rawat-695348320/">LinkedIn</a>
        </div>
      </nav>
      <Home/>
      <About/>
      <Projects/>
      <Skills/>        
    </>
  );
}

export default App;