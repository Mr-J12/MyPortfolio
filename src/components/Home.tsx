import { useEffect, useRef, useState } from 'react';

const TYPING_STRINGS = [
  'Data Scientist',
  'Full Stack Developer',
  'ML Engineer',
  'IOT Architect'
];

const WORK_SERVICES = [
  {
    icon: '🤖',
    title: 'AI & Machine Learning',
    desc: 'Building intelligent models — from neural networks to NLP systems that solve real-world problems.',
  },
  {
    icon: '💻',
    title: 'Web Development',
    desc: 'Crafting modern, responsive web apps using React, TypeScript, and cutting-edge frameworks.',
  },
  {
    icon: '📊',
    title: 'Data Science',
    desc: 'Transforming raw data into actionable insights through visualization and statistical analysis.',
  },
  {
    icon: '🧠',
    title: 'Deep Learning',
    desc: 'Designing CNN, LSTM and transformer-based architectures for computer vision and NLP tasks.',
  },
  {
    icon: '🎨',
    title: 'UI/UX & Design',
    desc: 'Creating stunning visual identities, event posters, and digital creatives for communities.',
  },
  {
    icon: '🎬',
    title: 'Video Editing',
    desc: 'Producing high-quality promotional reels and event videos for institutes and societies.',
  },
];

function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [typedText, setTypedText] = useState('');
  const [currentStringIdx, setCurrentStringIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---- Typing Effect ---- */
  useEffect(() => {
    const currentString = TYPING_STRINGS[currentStringIdx];
    const speed = isDeleting ? 50 : 90;
    const pause = isDeleting ? 0 : 1800;

    if (!isDeleting && typedText === currentString) {
      typingRef.current = setTimeout(() => setIsDeleting(true), pause);
      return;
    }

    if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setCurrentStringIdx(prev => (prev + 1) % TYPING_STRINGS.length);
      return;
    }

    typingRef.current = setTimeout(() => {
      setTypedText(prev =>
        isDeleting ? prev.slice(0, -1) : currentString.slice(0, prev.length + 1)
      );
    }, speed);

    return () => { if (typingRef.current) clearTimeout(typingRef.current); };
  }, [typedText, isDeleting, currentStringIdx]);

  /* ---- Particle Canvas ---- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const NUM = 80;
    const particles = Array.from({ length: NUM }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.6 + 0.15,
      color: ['#3b82f6', '#2563eb', '#93c5fd', '#60a5fa', '#38bdf8'][Math.floor(Math.random() * 5)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = '#3b82f6';
            ctx.globalAlpha = (1 - dist / 120) * 0.12;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  /* ---- Intersection Observer for work cards ---- */
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

    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, i) => {
      if (card instanceof HTMLElement) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = `all 0.7s ease ${i * 0.1}s`;
        observer.observe(card);
      }
    });

    return () => cards.forEach(card => observer.unobserve(card));
  }, []);

  return (
    <>
      <style>{`
        /* ===== HERO ===== */
        .hero {
          width: 100vw;
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--header-bg);
          overflow: hidden;
          padding-top: 80px;
        }

        .hero-canvas {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        /* Radial glow blobs */
        .hero::before {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(29,78,216,0.18) 0%, transparent 70%);
          top: -100px;
          left: -100px;
          border-radius: 50%;
          animation: blobFloat 8s ease-in-out infinite;
          z-index: 0;
        }

        .hero::after {
          content: '';
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%);
          bottom: -80px;
          right: -80px;
          border-radius: 50%;
          animation: blobFloat 10s ease-in-out infinite reverse;
          z-index: 0;
        }

        @keyframes blobFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(30px, -20px) scale(1.05); }
          66%       { transform: translate(-20px, 15px) scale(0.97); }
        }

        .hero-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 80px;
          max-width: 1200px;
          width: 100%;
          padding: 0 6%;
        }

        /* ===== AVATAR / LEFT ===== */
        .hero-avatar-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .avatar-orbit {
          position: relative;
          width: 280px;
          height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .orbit-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(59,130,246,0.3);
          animation: spin linear infinite;
        }

        .orbit-ring-1 {
          width: 100%;
          height: 100%;
          animation-duration: 12s;
          border-color: rgba(59,130,246,0.35);
          box-shadow: 0 0 20px rgba(59,130,246,0.15) inset;
        }

        .orbit-ring-2 {
          width: 116%;
          height: 116%;
          animation-duration: 18s;
          animation-direction: reverse;
          border-color: rgba(147,197,253,0.2);
        }

        .orbit-ring-3 {
          width: 132%;
          height: 132%;
          animation-duration: 25s;
          border-color: rgba(37,99,235,0.15);
          border-style: dashed;
        }

        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .orbit-dot {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--neon-blue, #3b82f6);
          box-shadow: 0 0 12px rgba(59,130,246,0.8);
          top: -5px;
          left: calc(50% - 5px);
          transform-origin: 5px calc(140px + 5px);
        }

        .orbit-dot-2 {
          background: #93c5fd;
          box-shadow: 0 0 12px rgba(147,197,253,0.8);
          top: calc(50% - 5px);
          right: -5px;
          left: auto;
          transform-origin: calc(-163px) 5px;
        }

        .avatar-img-wrap {
          position: relative;
          z-index: 2;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid rgba(59,130,246,0.6);
          box-shadow: 0 0 30px rgba(59,130,246,0.4), 0 0 60px rgba(29,78,216,0.2);
          animation: avatarPulse 4s ease-in-out infinite;
        }

        @keyframes avatarPulse {
          0%, 100% { box-shadow: 0 0 30px rgba(59,130,246,0.4), 0 0 60px rgba(29,78,216,0.2); }
          50%       { box-shadow: 0 0 50px rgba(59,130,246,0.6), 0 0 90px rgba(29,78,216,0.35); }
        }

        .avatar-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Floating badges around avatar */
        .avatar-badge {
          position: absolute;
          background: rgba(6,17,31,0.85);
          border: 1px solid rgba(59,130,246,0.4);
          border-radius: 12px;
          padding: 8px 14px;
          font-size: 12px;
          font-weight: 600;
          color: #93c5fd;
          backdrop-filter: blur(12px);
          white-space: nowrap;
          box-shadow: 0 0 15px rgba(59,130,246,0.2);
          animation: badgeFloat 3s ease-in-out infinite;
        }

        .badge-ai { top: 10px; right: -30px; animation-delay: 0s; }
        .badge-ml { bottom: 20px; left: -40px; animation-delay: 1.2s; }
        .badge-dl { top: 50%; right: -100px; transform: translateY(-50%); animation-delay: 0.6s; }
        .badge-iot { top: 80%; right: -50px; transform: translateY(-50%); animation-delay: 0.6s; }
        .badge-fs { top: 0%; right: 140px; transform: translateY(-50%); animation-delay: 0.6s; }

        @keyframes badgeFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }
        .badge-dl { animation: badgeFloatMid 3s ease-in-out infinite 0.6s; }
        @keyframes badgeFloatMid {
          0%, 100% { transform: translateY(-50%); }
          50%       { transform: translateY(calc(-50% - 8px)); }
        }

        /* ===== HERO TEXT / RIGHT ===== */
        .hero-text {
          max-width: 560px;
        }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(59,130,246,0.1);
          border: 1px solid rgba(59,130,246,0.3);
          border-radius: 50px;
          padding: 6px 18px;
          font-size: 13px;
          font-weight: 600;
          color: #93c5fd;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 24px;
          animation: fadeSlideDown 0.8s ease both;
          box-shadow: 0 0 15px rgba(59,130,246,0.15);
        }

        .hero-tag::before { content: '✦'; font-size: 10px; }

        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hero-name {
          font-size: clamp(2.8em, 5vw, 4.5em);
          font-weight: 900;
          line-height: 1.1;
          background: linear-gradient(135deg, #ffffff 30%, #93c5fd 70%, #2563eb 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 12px;
          animation: fadeSlideUp 0.9s ease 0.2s both;
          letter-spacing: -1px;
        }

        .hero-typing-wrap {
          font-size: clamp(1.3em, 2.5vw, 1.8em);
          font-weight: 700;
          color: #9bb7e5;
          margin-bottom: 20px;
          min-height: 2.2em;
          animation: fadeSlideUp 0.9s ease 0.35s both;
        }

        .hero-typing-text {
          background: linear-gradient(90deg, #3b82f6, #93c5fd);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-cursor {
          display: inline-block;
          width: 3px;
          height: 1.2em;
          background: #3b82f6;
          margin-left: 4px;
          vertical-align: middle;
          border-radius: 2px;
          animation: blink 1s step-end infinite;
          box-shadow: 0 0 8px rgba(59,130,246,0.8);
        }

        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(25px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hero-desc {
          font-size: 1.05em;
          color: #a8c0ea;
          line-height: 1.8;
          margin-bottom: 36px;
          animation: fadeSlideUp 0.9s ease 0.5s both;
        }

        .hero-cta-wrap {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          animation: fadeSlideUp 0.9s ease 0.65s both;
        }

        .btn-primary {
          padding: 14px 32px;
          font-size: 15px;
          font-weight: 700;
          background: linear-gradient(135deg, #1d4ed8, #3b82f6);
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          text-decoration: none;
          display: inline-block;
          font-family: 'Poppins', sans-serif;
          box-shadow: 0 0 20px rgba(59,130,246,0.4);
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          left: -100%;
          transition: left 0.5s ease;
        }

        .btn-primary:hover::before { left: 100%; }
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 0 35px rgba(59,130,246,0.6);
        }

        .btn-outline {
          padding: 14px 32px;
          font-size: 15px;
          font-weight: 600;
          background: transparent;
          color: #93c5fd;
          border: 1px solid rgba(59,130,246,0.4);
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          font-family: 'Poppins', sans-serif;
        }

        .btn-outline:hover {
          background: rgba(59,130,246,0.1);
          border-color: rgba(59,130,246,0.7);
          box-shadow: 0 0 20px rgba(59,130,246,0.25);
          transform: translateY(-3px);
          color: #93c5fd;
        }

        /* Scroll indicator */
        .scroll-indicator {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          z-index: 2;
          animation: fadeIn 1.5s ease 1.5s both;
        }

        .scroll-mouse {
          width: 26px;
          height: 42px;
          border: 2px solid rgba(59,130,246,0.4);
          border-radius: 13px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 6px;
        }

        .scroll-wheel {
          width: 4px;
          height: 8px;
          background: #3b82f6;
          border-radius: 2px;
          animation: scrollWheel 2s ease-in-out infinite;
          box-shadow: 0 0 6px rgba(59,130,246,0.8);
        }

        @keyframes scrollWheel {
          0%   { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(12px); }
        }

        .scroll-text {
          font-size: 10px;
          color: rgba(59,130,246,0.5);
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ===== SERVICES / WORK SECTION ===== */
        .services-section {
          padding: 100px 6%;
          background: linear-gradient(180deg, #06111f 0%, #071a33 50%, #06111f 100%);
          position: relative;
        }

        .services-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent);
        }

        .latest-ui-label {
          text-align: center;
          margin-bottom: 60px;
        }

        .latest-ui-label .ui-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(59,130,246,0.08);
          border: 1px solid rgba(59,130,246,0.25);
          border-radius: 50px;
          padding: 8px 24px;
          font-size: 12px;
          font-weight: 700;
          color: #3b82f6;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 18px;
        }

        .latest-ui-label h2 {
          font-size: clamp(2em, 4vw, 2.8em);
          font-weight: 800;
          background: linear-gradient(135deg, #fff, #93c5fd, #2563eb);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 14px;
        }

        .latest-ui-label p {
          color: #8fb4e8;
          font-size: 1.05em;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 28px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .service-card {
          background: linear-gradient(135deg, rgba(29,78,216,0.1), rgba(59,130,246,0.05));
          backdrop-filter: blur(16px);
          border: 1px solid rgba(59,130,246,0.2);
          border-radius: 20px;
          padding: 34px 30px;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
          cursor: default;
        }

        .service-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(59,130,246,0.08), rgba(147,197,253,0.05));
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: inherit;
        }

        .service-card:hover::before { opacity: 1; }

        .service-card:hover {
          transform: translateY(-10px);
          border-color: rgba(59,130,246,0.55);
          box-shadow: 0 0 40px rgba(59,130,246,0.25), 0 20px 50px rgba(0,0,0,0.4);
        }

        /* Neon corner accent */
        .service-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #3b82f6, transparent);
          border-radius: 0 0 3px 3px;
          opacity: 0;
          transition: opacity 0.3s ease, width 0.4s ease;
        }

        .service-card:hover::after {
          opacity: 1;
          width: 120px;
        }

        .service-icon {
          font-size: 2.5em;
          margin-bottom: 18px;
          display: block;
          filter: drop-shadow(0 0 8px rgba(59,130,246,0.5));
          transition: transform 0.3s ease;
        }

        .service-card:hover .service-icon { transform: scale(1.1) rotate(-5deg); }

        .service-card h3 {
          font-size: 1.2em;
          font-weight: 700;
          color: #dbeafe;
          margin-bottom: 10px;
          position: relative;
          z-index: 1;
        }

        .service-card p {
          font-size: 0.93em;
          color: #8fb4e8;
          line-height: 1.7;
          position: relative;
          z-index: 1;
        }

        /* ===== BACK TO TOP ===== */
        .back-to-top {
          position: fixed;
          bottom: 110px;
          right: 28px;
          background: linear-gradient(135deg, #1d4ed8, #3b82f6);
          color: white;
          border: none;
          border-radius: 50%;
          width: 52px;
          height: 52px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 0 20px rgba(59,130,246,0.5);
          z-index: 999;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .back-to-top:hover {
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 0 35px rgba(59,130,246,0.7);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 900px) {
          .hero-content {
            flex-direction: column;
            text-align: center;
            gap: 50px;
            padding-top: 20px;
          }
          .hero-cta-wrap { justify-content: center; }
          .hero-tag { margin: 0 auto 24px; }
          .avatar-badge { display: none; }
        }

        @media (max-width: 600px) {
          .hero { padding-top: 70px; min-height: 100svh; }
          .avatar-orbit { width: 220px; height: 220px; }
          .avatar-img-wrap { width: 160px; height: 160px; }
          .services-section { padding: 70px 5%; }
          .services-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ===== HERO ===== */}
      <section className="hero">
        <canvas ref={canvasRef} className="hero-canvas" />

        <div className="hero-content">
          {/* LEFT: Avatar */}
          <div className="hero-avatar-wrap">
            <div className="avatar-orbit">
              <div className="orbit-ring orbit-ring-3"></div>
              <div className="orbit-ring orbit-ring-2"></div>
              <div className="orbit-ring orbit-ring-1">
                <div className="orbit-dot"></div>
              </div>
              <div className="avatar-img-wrap">
                <img src="/photo.png" alt="Yashwant Singh Rawat" />
              </div>
            </div>
            <div className="avatar-badge badge-ai">🤖 AI/ML Engineer</div>
            <div className="avatar-badge badge-ml">📊 Data Scientist</div>
            <div className="avatar-badge badge-dl">🧠 Deep Learning</div>
            <div className="avatar-badge badge-fs">𓉩 Full Stack Developer</div>
            <div className="avatar-badge badge-iot">𓉩 IOT Architect</div>
          </div>

          {/* RIGHT: Text */}
          <div className="hero-text">
            <div className="hero-tag">Portfolio 2026</div>
            <h1 className="hero-name">
              Yashwant<br />Singh Rawat
            </h1>
            <div className="hero-typing-wrap">
              I'm a{' '}
              <span className="hero-typing-text">{typedText}</span>
              <span className="hero-cursor" />
            </div>
            <p className="hero-desc">
              BCA student from New Delhi, passionate about AI/ML and building
              intelligent systems. I transform data into insights and algorithms
              into real-world solutions.
            </p>
            <div className="hero-cta-wrap">
              <a href="#work" className="btn-primary">Explore My Work ✦</a>
              <a href="#contact" className="btn-outline">Get In Touch →</a>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span className="scroll-text">Scroll</span>
        </div>
      </section>

      {/* ===== SERVICES / WORK CARDS ===== */}
      <section className="services-section">
        <div className="latest-ui-label">
          <div className="ui-badge">✦ Latest UI Components</div>
          <h2>What I Do</h2>
          <p>From intelligent systems to beautiful interfaces — here's my expertise</p>
        </div>

        <div className="services-grid">
          {WORK_SERVICES.map((s, i) => (
            <div key={i} className="service-card">
              <span className="service-icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

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
