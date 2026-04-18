import { useEffect, useRef } from 'react';

const ORBIT_SKILLS = [
  { label: 'Python',      icon: '🐍', angle: 0   },
  { label: 'React',       icon: '⚛️', angle: 40  },
  { label: 'TensorFlow',  icon: '🧠', angle: 80  },
  { label: 'PyTorch',     icon: '🔥', angle: 120 },
  { label: 'Scikit',      icon: '📊', angle: 160 },
  { label: 'Pandas',      icon: '🐼', angle: 200 },
  { label: 'TypeScript',  icon: '📘', angle: 240 },
  { label: 'Streamlit',   icon: '🚀', angle: 280 },
  { label: 'Docker',      icon: '🐳', angle: 320 },
];

const SKILL_DATA = [
  {
    category: 'Machine Learning & AI',
    icon: '🤖',
    skills: [
      { name: 'Python',           value: 90, level: 'Expert' },
      { name: 'TensorFlow/Keras', value: 85, level: 'Advanced' },
      { name: 'Scikit-learn',     value: 88, level: 'Advanced' },
      { name: 'PyTorch',          value: 75, level: 'Intermediate' },
    ],
  },
  {
    category: 'Data Science & Analytics',
    icon: '📊',
    skills: [
      { name: 'Pandas / NumPy',    value: 92, level: 'Expert' },
      { name: 'Data Visualization',value: 85, level: 'Advanced' },
      { name: 'Statistical Analysis', value: 80, level: 'Advanced' },
      { name: 'Feature Engineering', value: 82, level: 'Advanced' },
    ],
  },
  {
    category: 'Deep Learning & NLP',
    icon: '🧠',
    skills: [
      { name: 'Neural Networks',    value: 85, level: 'Advanced' },
      { name: 'NLP / Transformers', value: 80, level: 'Advanced' },
      { name: 'Computer Vision',    value: 75, level: 'Intermediate' },
      { name: 'LSTM / RNN',         value: 70, level: 'Intermediate' },
    ],
  },
  {
    category: 'Development & Deployment',
    icon: '💻',
    skills: [
      { name: 'React / TypeScript',       value: 85, level: 'Advanced' },
      { name: 'Cloud (AWS / Azure)',       value: 70, level: 'Intermediate' },
      { name: 'Docker / MLOps',           value: 72, level: 'Intermediate' },
      { name: 'API Development',          value: 70, level: 'Intermediate' },
    ],
  },
];

function Skills() {
  const skillsRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  // Progress bars animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.skill-bar-fill');
            bars.forEach((bar, idx) => {
              setTimeout(() => {
                if (bar instanceof HTMLElement) {
                  const val = bar.dataset.val || '0';
                  bar.style.width = `${val}%`;
                }
              }, idx * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => observer.disconnect();
  }, []);

  // Cards fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.08 }
    );

    const cards = document.querySelectorAll('.skill-cat-card');
    cards.forEach((c, i) => {
      if (c instanceof HTMLElement) {
        c.style.opacity = '0';
        c.style.transform = 'translateY(40px)';
        c.style.transition = `all 0.7s ease ${i * 0.15}s`;
        observer.observe(c);
      }
    });

    return () => cards.forEach(c => observer.unobserve(c));
  }, []);

  return (
    <>
      <style>{`
        /* ===== SKILLS SECTION ===== */
        .skills-section {
          padding: 100px 6%;
          background: linear-gradient(180deg, #0a0010, #0d001a 50%, #0a0010);
          position: relative;
        }

        .skills-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(168,85,247,0.5), transparent);
        }

        .skills-header {
          text-align: center;
          margin-bottom: 70px;
        }

        .skills-header .neon-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(168,85,247,0.08);
          border: 1px solid rgba(168,85,247,0.25);
          border-radius: 50px;
          padding: 6px 20px;
          font-size: 12px;
          font-weight: 700;
          color: #a855f7;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 16px;
          box-shadow: 0 0 15px rgba(168,85,247,0.1);
        }

        .skills-header h2 {
          font-size: clamp(2em, 4vw, 2.8em);
          font-weight: 800;
          background: linear-gradient(135deg, #fff, #c084fc, #8b5cf6);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 14px;
        }

        .skills-header p { color: #8e80b0; font-size: 1.05em; }

        /* ===== ORBIT ===== */
        .orbit-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 80px;
          position: relative;
          width: 400px;
          height: 400px;
        }

        /* Glow behind orbit */
        .orbit-container::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%);
          animation: orbitGlow 4s ease-in-out infinite;
        }

        @keyframes orbitGlow {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50%       { transform: scale(1.05); opacity: 1; }
        }

        /* Ring tracks */
        .orbit-track {
          position: absolute;
          width: 340px;
          height: 340px;
          border: 1px dashed rgba(168,85,247,0.2);
          border-radius: 50%;
          animation: trackSpin 40s linear infinite;
        }

        .orbit-track-2 {
          width: 390px;
          height: 390px;
          border-style: solid;
          border-color: rgba(168,85,247,0.1);
          animation-duration: 60s;
          animation-direction: reverse;
        }

        @keyframes trackSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* Center logo */
        .orbit-center {
          position: absolute;
          width: 90px;
          height: 90px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1em;
          font-weight: 900;
          color: white;
          z-index: 10;
          box-shadow: 0 0 30px rgba(168,85,247,0.6), 0 0 60px rgba(124,58,237,0.3);
          animation: centerPulse 3s ease-in-out infinite;
          font-family: 'Poppins', sans-serif;
          letter-spacing: 1px;
        }

        @keyframes centerPulse {
          0%, 100% { box-shadow: 0 0 30px rgba(168,85,247,0.6), 0 0 60px rgba(124,58,237,0.3); }
          50%       { box-shadow: 0 0 50px rgba(168,85,247,0.8), 0 0 90px rgba(124,58,237,0.5); }
        }

        /* Orbiting skill nodes */
        .orbit-wrapper {
          position: absolute;
          width: 340px;
          height: 340px;
          border-radius: 50%;
          animation: orbitSpin 20s linear infinite;
        }

        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .orbit-skill {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          /* Counter-rotate label so it stays upright */
          animation: counterSpin 20s linear infinite;
        }

        @keyframes counterSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }

        .orbit-skill-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(10,0,20,0.9);
          border: 2px solid rgba(168,85,247,0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2em;
          box-shadow: 0 0 15px rgba(168,85,247,0.3);
          transition: box-shadow 0.3s ease;
        }

        .orbit-skill-icon:hover {
          box-shadow: 0 0 25px rgba(168,85,247,0.7);
          border-color: rgba(168,85,247,0.8);
        }

        .orbit-skill-label {
          font-size: 9px;
          font-weight: 700;
          color: #c084fc;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
          text-shadow: 0 0 8px rgba(168,85,247,0.6);
        }

        /* ===== SKILL CATEGORY CARDS ===== */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(460px, 1fr));
          gap: 28px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .skill-cat-card {
          background: linear-gradient(135deg, rgba(124,58,237,0.1), rgba(168,85,247,0.05));
          border: 1px solid rgba(168,85,247,0.2);
          border-radius: 20px;
          padding: 30px;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(12px);
        }

        .skill-cat-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(168,85,247,0.07), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .skill-cat-card:hover::before { opacity: 1; }

        .skill-cat-card:hover {
          transform: translateY(-8px);
          border-color: rgba(168,85,247,0.45);
          box-shadow: 0 0 35px rgba(168,85,247,0.2), 0 20px 40px rgba(0,0,0,0.4);
        }

        .skill-cat-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }

        .skill-cat-icon {
          font-size: 1.6em;
          filter: drop-shadow(0 0 6px rgba(168,85,247,0.5));
        }

        .skill-cat-title {
          font-size: 1.1em;
          font-weight: 700;
          background: linear-gradient(135deg, #fff, #c084fc);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Skill rows */
        .skill-rows {
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: relative;
          z-index: 1;
        }

        .skill-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .skill-row-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .skill-row-name {
          font-size: 0.9em;
          font-weight: 600;
          color: #c4b5fd;
        }

        .skill-row-meta {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .skill-badge {
          font-size: 11px;
          font-weight: 600;
          color: #8b5cf6;
          background: rgba(139,92,246,0.1);
          border: 1px solid rgba(139,92,246,0.25);
          border-radius: 50px;
          padding: 2px 10px;
        }

        .skill-pct {
          font-size: 12px;
          font-weight: 700;
          color: #a855f7;
        }

        /* Progress track */
        .skill-bar-track {
          height: 8px;
          background: rgba(168,85,247,0.12);
          border-radius: 4px;
          overflow: visible;
          position: relative;
        }

        .skill-bar-fill {
          height: 100%;
          width: 0;
          border-radius: 4px;
          background: linear-gradient(90deg, #7c3aed, #a855f7, #c084fc);
          transition: width 1.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          box-shadow: 0 0 10px rgba(168,85,247,0.5);
        }

        /* Shine */
        .skill-bar-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: -50%;
          height: 100%;
          width: 50%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
          animation: barShine 2.5s ease-in-out infinite 0.5s;
          border-radius: inherit;
        }

        @keyframes barShine {
          0%   { left: -50%; }
          100% { left: 150%; }
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 900px) {
          .orbit-container { width: 320px; height: 320px; }
          .orbit-track { width: 270px; height: 270px; }
          .orbit-track-2 { width: 310px; height: 310px; }
          .orbit-wrapper { width: 270px; height: 270px; }
          .skills-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 600px) {
          .skills-section { padding: 70px 5%; }
          .orbit-container { width: 280px; height: 280px; }
          .orbit-track { width: 230px; height: 230px; }
          .orbit-track-2 { width: 270px; height: 270px; }
          .orbit-wrapper { width: 230px; height: 230px; }
          .orbit-center { width: 70px; height: 70px; font-size: 0.9em; }
          .orbit-skill-icon { width: 38px; height: 38px; font-size: 1em; }
        }
      `}</style>

      <section id="reach4" className="skills-section">
        <div className="skills-header">
          <div className="neon-tag">✦ Technical Arsenal</div>
          <h2>Skills & Expertise</h2>
          <p>Mastering cutting-edge technologies in AI, ML, and web development</p>
        </div>

        {/* ORBIT VISUALIZATION */}
        <div className="orbit-container" ref={orbitRef}>
          <div className="orbit-track orbit-track-2" />
          <div className="orbit-track" />

          <div className="orbit-center">YSR</div>

          {/* Orbiting skill nodes */}
          <div className="orbit-wrapper">
            {ORBIT_SKILLS.map((skill, i) => {
              const rad = (skill.angle * Math.PI) / 180;
              const r = 170; // orbit radius (half of 340px)
              const x = Math.cos(rad) * r;
              const y = Math.sin(rad) * r;
              return (
                <div
                  key={i}
                  className="orbit-skill"
                  style={{
                    left: `calc(50% + ${x}px - 24px)`,
                    top: `calc(50% + ${y}px - 24px)`,
                  }}
                >
                  <div className="orbit-skill-icon">{skill.icon}</div>
                  <span className="orbit-skill-label">{skill.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* SKILL CARDS WITH PROGRESS BARS */}
        <div className="skills-grid" ref={skillsRef}>
          {SKILL_DATA.map((cat, ci) => (
            <div key={ci} className="skill-cat-card">
              <div className="skill-cat-header">
                <span className="skill-cat-icon">{cat.icon}</span>
                <span className="skill-cat-title">{cat.category}</span>
              </div>
              <div className="skill-rows">
                {cat.skills.map((skill, si) => (
                  <div key={si} className="skill-row">
                    <div className="skill-row-top">
                      <span className="skill-row-name">{skill.name}</span>
                      <div className="skill-row-meta">
                        <span className="skill-badge">{skill.level}</span>
                        <span className="skill-pct">{skill.value}%</span>
                      </div>
                    </div>
                    <div className="skill-bar-track">
                      <div
                        className="skill-bar-fill"
                        data-val={skill.value}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Skills;