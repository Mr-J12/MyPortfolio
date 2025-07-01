import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <div className="logo">
            Yashwant Singh Rawat
        </div>
        <div className="menu">
          <Link to="/">Home</Link>
          <Link to="/experience">Experience</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/skills">Skills</Link>
        </div>
        <div className="contact">
          <a href="https://www.linkedin.com/in/yashwant-singh-rawat-695348320/">LinkedIn</a>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
      </Routes>
    </Router>
  );
}

export default App;