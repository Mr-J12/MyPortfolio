import { useEffect } from 'react';

function About() {
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
      { threshold: 0.1 }
    );

    const items = document.querySelectorAll('.exp-card');
    items.forEach((item, i) => {
      if (item instanceof HTMLElement) {
        item.style.opacity = '0';
        item.style.transform = 'translateY(40px)';
        item.style.transition = `all 0.7s ease ${i * 0.15}s`;
        observer.observe(item);
      }
    });

    return () => items.forEach(item => observer.unobserve(item));
  }, []);

  const experiences = [
    {
      role: 'Data Science and ML Intern',
      company: 'Infyntrek Systemes',
      period: 'May 2026 – Present',
      icon: '🤖',
      color: '#3b82f6',
      points: [
        'Developed and deployed a machine learning-based movie recommendation system using a large-scale movie dataset to generate personalized recommendations based on user preferences and viewing patterns.',
        'Performed data cleaning, preprocessing, feature engineering, and exploratory data analysis on movie metadata and user interaction datasets to improve recommendation quality and model performance.',
      ],
    },
    {
      role: 'Data Analyst  Intern',
      company: 'Innovexis',
      period: 'Apr 2026 – Present',
      icon: '📈',
      color: '#2563eb',
      points: [
        'Analyzed large-scale datasets using Python, SQL, and Excel to extract meaningful insights and support data-driven decision-making and performed data cleaning, preprocessing, and feature engineering to improve data quality and analytical accuracy.',
        'Created interactive dashboards and visualizations using Power BI to monitor KPIs and present trends effectively and conducted exploratory data analysis (EDA) and evaluated data patterns using statistical and analytical techniques',
      ],
    },
    {
      role: 'Data Science Intern',
      company: 'Null Class',
      period: 'Oct 2025 – Nov 2025',
      icon: '📊',
      color: '#60a5fa',
      points: [
        'Developed and deployed a predictive ML model — car color prediction & nationality detection with 80% accuracy.',
        'Engineered features and performed extensive data cleaning/preprocessing on large-scale datasets; visualized model performance using evaluation metrics.',
      ],
    },
    {
      role: 'Research Intern',
      company: 'Suvidha Foundation',
      period: 'Sept 2025 – Oct 2025',
      icon: '🔬',
      color: '#1d4ed8',
      points: [
        'Completed a research internship focused on Large Language Models (LLMs) and modern transformer architectures (encoder-only, decoder-only, encoder-decoder).',
        'Strengthened conceptual foundations in deep learning–based language systems.',
      ],
    },
    {
      role: 'Graphics Designer',
      company: 'AIEC Society (IITM)',
      period: 'Aug 2025 – June 2026',
      icon: '🎨',
      color: '#93c5fd',
      points: [
        'Designed graphics, event posters, and social media creatives for the society.',
        'Ensured brand consistency and visual appeal across various platforms.',
      ],
    },
    {
      role: 'Video Editor',
      company: 'Nexverse Society (IITM)',
      period: 'Oct 2024 – Apr 2025',
      icon: '🎬',
      color: '#3b82f6',
      points: [
        'Collaborated with the team to conceptualize and execute video projects from start to finish.',
        'Managed and organized video assets, ensuring a streamlined post-production workflow.',
      ],
    },
    {
      role: 'Promotional Reel Editor',
      company: 'IITM',
      period: 'May 2025 – Jun 2025',
      icon: '📽️',
      color: '#2563eb',
      points: [
        'Edited and produced engaging video content for institute events and promotional activities.',
        'Collaborated with teams for scripting, visuals, and post-production work.',
      ],
    },
  ];

  return (
    <>
      <style>{`
        /* ===== ABOUT / EXPERIENCE SECTION ===== */
        .about-section {
          padding: 100px 6%;
          background: linear-gradient(180deg, #06111f, #071a33 50%, #06111f);
          position: relative;
        }

        .about-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent);
        }

        .about-header {
          text-align: center;
          margin-bottom: 70px;
        }

        .about-header .neon-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(59,130,246,0.08);
          border: 1px solid rgba(59,130,246,0.25);
          border-radius: 50px;
          padding: 6px 20px;
          font-size: 12px;
          font-weight: 700;
          color: #60a5fa;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 16px;
          box-shadow: 0 0 15px rgba(59,130,246,0.1);
        }

        .about-header h2 {
          font-size: clamp(2em, 4vw, 2.8em);
          font-weight: 800;
          background: linear-gradient(135deg, #fff, #93c5fd, #3b82f6);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 14px;
        }

        .about-header p {
          color: #9bb7e5;
          font-size: 1.05em;
          max-width: 550px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* ===== TIMELINE ===== */
        .exp-timeline {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
        }

        .exp-timeline::before {
          content: '';
          position: absolute;
          left: 28px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, #1d4ed8, #3b82f6, #60a5fa, transparent);
          border-radius: 1px;
        }

        .exp-card {
          margin-bottom: 32px;
          padding-left: 72px;
          position: relative;
        }

        /* Timeline dot */
        .exp-card::before {
          content: '';
          position: absolute;
          left: 19px;
          top: 28px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1d4ed8, #3b82f6);
          box-shadow: 0 0 15px rgba(59,130,246,0.6);
          border: 3px solid #06111f;
          z-index: 1;
          transition: box-shadow 0.3s ease;
        }

        .exp-card:hover::before {
          box-shadow: 0 0 25px rgba(59,130,246,0.9);
        }

        .exp-inner {
          background: linear-gradient(135deg, rgba(29,78,216,0.1), rgba(59,130,246,0.05));
          border: 1px solid rgba(59,130,246,0.2);
          border-radius: 18px;
          padding: 28px 30px;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
          backdrop-filter: blur(12px);
        }

        .exp-inner::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(180deg, var(--exp-color, #3b82f6), transparent);
          border-radius: 4px 0 0 4px;
          opacity: 0.7;
        }

        .exp-inner::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(59,130,246,0.06), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: inherit;
        }

        .exp-card:hover .exp-inner::after { opacity: 1; }

        .exp-card:hover .exp-inner {
          border-color: rgba(59,130,246,0.5);
          box-shadow: 0 0 35px rgba(59,130,246,0.2), 0 15px 40px rgba(0,0,0,0.4);
          transform: translateX(6px);
        }

        .exp-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 4px;
          flex-wrap: wrap;
        }

        .exp-icon {
          font-size: 1.8em;
          margin-bottom: 10px;
          display: block;
          filter: drop-shadow(0 0 6px rgba(59,130,246,0.5));
        }

        .exp-role {
          font-size: 1.2em;
          font-weight: 700;
          background: linear-gradient(135deg, #fff, #93c5fd);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 4px;
          position: relative;
          z-index: 1;
        }

        .exp-company {
          font-size: 0.95em;
          color: #60a5fa;
          font-weight: 600;
          position: relative;
          z-index: 1;
        }

        .exp-period {
          background: rgba(59,130,246,0.1);
          border: 1px solid rgba(59,130,246,0.25);
          border-radius: 50px;
          padding: 4px 14px;
          font-size: 12px;
          font-weight: 600;
          color: #93c5fd;
          white-space: nowrap;
          flex-shrink: 0;
          align-self: flex-start;
          position: relative;
          z-index: 1;
        }

        .exp-points {
          list-style: none;
          padding: 0;
          margin-top: 16px;
          position: relative;
          z-index: 1;
        }

        .exp-points li {
          font-size: 0.93em;
          color: #a8c0ea;
          line-height: 1.75;
          padding-left: 20px;
          position: relative;
          margin-bottom: 8px;
          transition: color 0.3s ease;
        }

        .exp-points li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: #3b82f6;
          font-size: 12px;
          top: 2px;
          text-shadow: 0 0 8px rgba(59,130,246,0.6);
        }

        .exp-card:hover .exp-points li {
          color: #dbeafe;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 600px) {
          .about-section { padding: 70px 5%; }
          .exp-timeline::before { left: 20px; }
          .exp-card { padding-left: 54px; }
          .exp-card::before { left: 12px; }
          .exp-inner { padding: 22px 20px; }
          .exp-top { flex-direction: column; gap: 8px; }
        }
      `}</style>

      <section id="reach1" className="about-section">
        <div className="about-header">
          <div className="neon-tag">✦ Experience</div>
          <h2>Experience Journey</h2>
          <p>My professional path through internships, research, and creative roles</p>
        </div>

        <div className="exp-timeline">
          {experiences.map((exp, i) => (
            <div key={i} className="exp-card">
              <div className="exp-inner" style={{ '--exp-color': exp.color } as React.CSSProperties}>
                <span className="exp-icon">{exp.icon}</span>
                <div className="exp-top">
                  <div>
                    <div className="exp-role">{exp.role}</div>
                    <div className="exp-company">{exp.company}</div>
                  </div>
                  <div className="exp-period">🗓 {exp.period}</div>
                </div>
                <ul className="exp-points">
                  {exp.points.map((pt, j) => (
                    <li key={j}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default About;