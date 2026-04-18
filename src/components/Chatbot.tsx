import { useState, useRef, useEffect } from 'react';

// ===== PORTFOLIO KNOWLEDGE BASE =====
const KB: Record<string, string> = {
  default:
    "I'm the Portfolio AI Assistant for Yashwant Singh Rawat! I can tell you about his skills, projects, experience, and how to contact him. What would you like to know? 😊",
  greet:
    "Hey there! 👋 I'm the Portfolio AI Assistant! Yashwant is an AI/ML developer and BCA student from New Delhi. Ask me anything about his work, skills, or projects!",

  // Skills / Tech
  skills:
    "Yashwant's core skills include:\n🐍 Python (Expert, 90%)\n🧠 TensorFlow/Keras (Advanced, 85%)\n📊 Scikit-learn (Advanced, 88%)\n🔥 PyTorch (Intermediate, 75%)\n🐼 Pandas/NumPy (Expert, 92%)\n⚛️ React/TypeScript (Advanced, 85%)\n🚀 Streamlit, Docker, and cloud platforms too!",
  technologies:
    "He works with Python, TensorFlow, PyTorch, Scikit-learn, Pandas/NumPy, React, TypeScript, Node.js, Supabase, Streamlit, YOLOv8, and various ML/NLP frameworks.",
  python:
    "Python is Yashwant's primary language — he uses it for ML model development, data science, NLP, and computer vision projects. Expert-level (90%).",

  // Projects
  projects:
    "Yashwant has built 9 impressive projects:\n1. 🌌 Void Whispers — Paranormal analysis with AI\n2. 🧘 Serenify — Mental healthcare platform\n3. 💎 Crystalytics — Diamond carat predictor\n4. 🫀 RiskGuard — Stroke prediction ML model\n5. 🚗 CCDC-X — Car color detector (YOLOv8)\n6. 🤖 Nix — Mental healthcare chatbot\n7. 📱 TextGuard — SMS spam detector (95% accuracy)\n8. 📋 EDV Vault — Intelligent data validator\n9. ⚡ Autonomous AI Platform — In development",
  ml:
    "His ML projects include: Diamond Carat Prediction (regression), Stroke Prediction (classification), Car Color Detection (YOLOv8 + CV), SMS Spam Detection (LSTM, 95% accuracy), and Paranormal Analysis NLP.",
  ai:
    "Yashwant specializes in AI/ML — building models for NLP, computer vision, classification, and regression. He's built chatbots, medical prediction tools, and object detection systems.",
  web:
    "On the web development side, he built Serenify (a full-stack mental health app) and Void Whispers (a paranormal platform) using React, TypeScript, Node.js, and Supabase.",

  // Experience
  experience:
    "Yashwant's experience:\n📊 Data Science Intern @ Null Class (Oct–Nov 2025)\n🔬 Research Intern @ Suvidha Foundation (Sept–Oct 2025) — focused on LLMs & transformers\n🎨 Graphics Designer @ AIEC Society, IITM (Aug 2025–Present)\n🎬 Video Editor @ Nexverse Society, IITM (Oct 2024–Apr 2025)\n📽️ Promo Reel Editor @ IITM (May–Jun 2025)",
  internship:
    "He's completed internships at Null Class (Data Science — built ML models with 80% accuracy) and Suvidha Foundation (Research — studied LLMs and transformer architectures).",
  work:
    "He currently works as a Graphics Designer at AIEC Society (IITM) while pursuing his BCA degree. He also has experience as a Video Editor and Reel Editor.",

  // Contact / Links
  contact:
    "You can reach Yashwant via:\n🔗 LinkedIn: linkedin.com/in/yashwant-singh-rawat-695348320\n🗃️ GitHub: github.com/Mr-J12\nOr scroll to the footer of this page for quick links!",
  linkedin:
    "His LinkedIn profile: https://www.linkedin.com/in/yashwant-singh-rawat-695348320/ — feel free to connect!",
  github:
    "His GitHub: https://github.com/Mr-J12 — where all his project code lives. Check it out!",
  email:
    "For business inquiries, connect with him on LinkedIn or check the footer of this portfolio for contact details.",

  // About
  about:
    "Yashwant Singh Rawat is a BCA student from New Delhi, India, passionate about AI/ML, data science, and building intelligent systems. He transforms data into insights and algorithms into real-world solutions.",
  education:
    "He's pursuing a BCA (Bachelor of Computer Applications) degree, with a focus on AI/ML, data science, and software development.",
  location:
    "Yashwant is based in New Delhi, India. 🇮🇳",

  // Fun / catch-all
  fun:
    "Fun fact — Yashwant once built a paranormal analysis website powered by AI! 👻 He also created a mental health chatbot and a stroke prediction model. Pretty diverse range for an undergrad! 🚀",
  help:
    "I can answer questions like:\n• 'What projects has he built?'\n• 'What technologies does he use?'\n• 'How can I contact him?'\n• 'What's his experience?'\n• 'What are his skills?'\nJust ask! 💬",
};

function matchResponse(input: string): string {
  const q = input.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|sup|yo|howdy|greetings)/.test(q)) return KB.greet;
  if (/help|what can|what do you|options/.test(q)) return KB.help;

  // Skills / tech
  if (/technolog|stack|tools|languag|framework/.test(q)) return KB.technologies;
  if (/skill/.test(q)) return KB.skills;
  if (/python/.test(q)) return KB.python;

  // Projects
  if (/project|built|made|creat|develop|work/.test(q) && !/work exp|experience at/.test(q)) return KB.projects;
  if (/machine learn|ml model/.test(q)) return KB.ml;
  if (/\bai\b|artificial intel/.test(q)) return KB.ai;
  if (/web dev|full.?stack|website|frontend|backend/.test(q)) return KB.web;

  // Experience
  if (/work exp|intern|experience at|null class|suvidha|aiec|nexverse/.test(q)) return KB.experience;
  if (/intern/.test(q)) return KB.internship;
  if (/job|current(ly)? work|role|position/.test(q)) return KB.work;

  // Contact
  if (/contact|reach|email|hire|get in touch/.test(q)) return KB.contact;
  if (/linkedin/.test(q)) return KB.linkedin;
  if (/github/.test(q)) return KB.github;
  if (/mail/.test(q)) return KB.email;

  // About
  if (/about|who is|who are|tell me about/.test(q)) return KB.about;
  if (/educat|degree|bca|college|stud/.test(q)) return KB.education;
  if (/where|location|from|city/.test(q)) return KB.location;
  if (/fun|interest|hobbies|cool/.test(q)) return KB.fun;

  // Fallback
  return `I'm not sure about that specific detail, but I can tell you about Yashwant's **projects**, **skills**, **experience**, or how to **contact** him. What would you like to know? 😊`;
}

interface Message {
  id: number;
  role: 'user' | 'ai';
  text: string;
}

const EXAMPLE_PROMPTS = [
  'What projects has he built?',
  'What technologies does he use?',
  'How can I contact him?',
  'Tell me about his experience',
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: 'ai', text: KB.default },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = { id: Date.now(), role: 'user', text: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = matchResponse(trimmed);
      const aiMsg: Message = { id: Date.now() + 1, role: 'ai', text: response };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
      if (voiceEnabled) speak(response);
    }, 900 + Math.random() * 400);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  // TTS
  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleaned = text.replace(/[🐍🧠📊🔥🐼⚛️🚀🌌🧘💎🫀🚗🤖📱📋⚡📽️🎬🎨🔬🔗🗃️👋😊🇮🇳🗓📂👻💬•\n]/g, ' ');
    const utter = new SpeechSynthesisUtterance(cleaned);
    utter.rate = 0.95;
    utter.pitch = 1;
    utter.volume = 1;
    setIsSpeaking(true);
    utter.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utter);
  };

  // Voice input
  const startVoice = () => {
    const SpeechRecognition =
      (window as typeof window & { SpeechRecognition?: typeof window.SpeechRecognition; webkitSpeechRecognition?: typeof window.SpeechRecognition }).SpeechRecognition ||
      (window as typeof window & { webkitSpeechRecognition?: typeof window.SpeechRecognition }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice input is not supported in your browser.');
      return;
    }

    const recog = new SpeechRecognition();
    recog.lang = 'en-US';
    recog.interimResults = false;
    recog.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      sendMessage(transcript);
    };
    recog.onerror = () => {};
    recog.start();
    recognitionRef.current = recog;
  };

  // Format AI text (bold **...**, newlines)
  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line.split(/(\*\*[^*]+\*\*)/).map((chunk, j) =>
          chunk.startsWith('**') && chunk.endsWith('**')
            ? <strong key={j}>{chunk.slice(2, -2)}</strong>
            : chunk
        )}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <>
      <style>{`
        /* ===== CHATBOT ===== */
        /* Floating button */
        .chatbot-btn {
          position: fixed;
          bottom: 28px;
          right: 28px;
          width: 62px;
          height: 62px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border: none;
          cursor: pointer;
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          box-shadow: 0 0 25px rgba(168,85,247,0.5), 0 8px 25px rgba(0,0,0,0.4);
          transition: all 0.3s ease;
          color: white;
        }

        .chatbot-btn:hover {
          transform: scale(1.12);
          box-shadow: 0 0 40px rgba(168,85,247,0.7), 0 12px 35px rgba(0,0,0,0.4);
        }

        /* Pulse ring */
        .chatbot-btn::before {
          content: '';
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 2px solid rgba(168,85,247,0.4);
          animation: btnPulse 2.5s ease-in-out infinite;
        }

        .chatbot-btn::after {
          content: '';
          position: absolute;
          inset: -12px;
          border-radius: 50%;
          border: 1px solid rgba(168,85,247,0.2);
          animation: btnPulse 2.5s ease-in-out infinite 0.4s;
        }

        @keyframes btnPulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50%       { transform: scale(1.15); opacity: 0; }
        }

        /* Chat window */
        .chatbot-window {
          position: fixed;
          bottom: 104px;
          right: 28px;
          width: 380px;
          max-width: calc(100vw - 40px);
          height: 540px;
          max-height: calc(100vh - 140px);
          z-index: 1999;
          display: flex;
          flex-direction: column;
          background: rgba(10, 0, 20, 0.92);
          border: 1px solid rgba(168,85,247,0.3);
          border-radius: 24px;
          overflow: hidden;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow: 0 0 50px rgba(168,85,247,0.2), 0 30px 60px rgba(0,0,0,0.6);
          transform-origin: bottom right;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease;
        }

        .chatbot-window.closed {
          transform: scale(0.6) translateY(20px);
          opacity: 0;
          pointer-events: none;
        }

        .chatbot-window.open {
          transform: scale(1) translateY(0);
          opacity: 1;
        }

        /* Header */
        .chat-header {
          background: linear-gradient(135deg, rgba(124,58,237,0.3), rgba(168,85,247,0.15));
          border-bottom: 1px solid rgba(168,85,247,0.25);
          padding: 16px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .chat-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          box-shadow: 0 0 15px rgba(168,85,247,0.5);
          flex-shrink: 0;
          animation: centerPulse2 3s ease-in-out infinite;
        }

        @keyframes centerPulse2 {
          0%, 100% { box-shadow: 0 0 15px rgba(168,85,247,0.5); }
          50%       { box-shadow: 0 0 25px rgba(168,85,247,0.8); }
        }

        .chat-header-info { flex: 1; min-width: 0; }

        .chat-header-name {
          font-size: 14px;
          font-weight: 700;
          color: #e0d4ff;
          font-family: 'Poppins', sans-serif;
        }

        .chat-header-status {
          font-size: 11px;
          color: #10b981;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .chat-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          animation: statusBlink 2s ease-in-out infinite;
          box-shadow: 0 0 6px #10b981;
        }

        @keyframes statusBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }

        .chat-header-controls {
          display: flex;
          gap: 6px;
        }

        .chat-ctrl-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid rgba(168,85,247,0.3);
          background: rgba(168,85,247,0.1);
          color: #c084fc;
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
          flex-shrink: 0;
        }

        .chat-ctrl-btn:hover {
          background: rgba(168,85,247,0.2);
          border-color: rgba(168,85,247,0.5);
          box-shadow: 0 0 10px rgba(168,85,247,0.3);
        }

        .chat-ctrl-btn.active {
          background: rgba(168,85,247,0.25);
          border-color: rgba(168,85,247,0.7);
          color: #e0d4ff;
        }

        /* Messages area */
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          scrollbar-width: thin;
          scrollbar-color: rgba(168,85,247,0.3) transparent;
        }

        .chat-messages::-webkit-scrollbar { width: 4px; }
        .chat-messages::-webkit-scrollbar-thumb {
          background: rgba(168,85,247,0.3);
          border-radius: 2px;
        }

        /* Quick prompts */
        .chat-prompts {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          padding: 8px 16px;
          border-bottom: 1px solid rgba(168,85,247,0.1);
          flex-shrink: 0;
        }

        .chat-prompt-chip {
          background: rgba(168,85,247,0.08);
          border: 1px solid rgba(168,85,247,0.2);
          border-radius: 50px;
          padding: 4px 12px;
          font-size: 11px;
          color: #c084fc;
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
        }

        .chat-prompt-chip:hover {
          background: rgba(168,85,247,0.18);
          border-color: rgba(168,85,247,0.45);
          color: #e0d4ff;
          box-shadow: 0 0 10px rgba(168,85,247,0.2);
        }

        /* Bubbles */
        .msg-bubble-wrap {
          display: flex;
          flex-direction: column;
          gap: 4px;
          animation: msgFadeIn 0.3s ease;
        }

        @keyframes msgFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .msg-bubble-wrap.user { align-items: flex-end; }
        .msg-bubble-wrap.ai   { align-items: flex-start; }

        .msg-bubble {
          max-width: 82%;
          padding: 11px 15px;
          border-radius: 18px;
          font-size: 13px;
          line-height: 1.65;
          word-break: break-word;
          font-family: 'Poppins', sans-serif;
        }

        .msg-bubble.user {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: white;
          border-bottom-right-radius: 4px;
          box-shadow: 0 0 15px rgba(168,85,247,0.3);
        }

        .msg-bubble.ai {
          background: rgba(168,85,247,0.1);
          border: 1px solid rgba(168,85,247,0.2);
          color: #e0d4ff;
          border-bottom-left-radius: 4px;
        }

        .msg-time {
          font-size: 10px;
          color: rgba(168,85,247,0.45);
          padding: 0 4px;
        }

        /* Typing indicator */
        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 12px 15px;
          background: rgba(168,85,247,0.08);
          border: 1px solid rgba(168,85,247,0.2);
          border-radius: 18px;
          border-bottom-left-radius: 4px;
          width: fit-content;
          animation: msgFadeIn 0.3s ease;
        }

        .typing-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #a855f7;
          animation: typingBounce 1.2s ease-in-out infinite;
          box-shadow: 0 0 6px rgba(168,85,247,0.6);
        }

        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30%            { transform: translateY(-8px); opacity: 1; }
        }

        /* Input area */
        .chat-input-area {
          border-top: 1px solid rgba(168,85,247,0.2);
          padding: 12px 14px;
          display: flex;
          gap: 10px;
          align-items: center;
          flex-shrink: 0;
          background: rgba(10,0,20,0.5);
        }

        .chat-input {
          flex: 1;
          background: rgba(168,85,247,0.08);
          border: 1px solid rgba(168,85,247,0.2);
          border-radius: 50px;
          padding: 10px 18px;
          color: #e0d4ff;
          font-size: 13px;
          outline: none;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
        }

        .chat-input::placeholder { color: rgba(192,132,252,0.4); }

        .chat-input:focus {
          border-color: rgba(168,85,247,0.55);
          box-shadow: 0 0 15px rgba(168,85,247,0.15);
          background: rgba(168,85,247,0.12);
        }

        .chat-action-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .chat-send-btn {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: white;
          box-shadow: 0 0 15px rgba(168,85,247,0.4);
        }

        .chat-send-btn:hover {
          box-shadow: 0 0 25px rgba(168,85,247,0.6);
          transform: scale(1.08);
        }

        .chat-send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .chat-voice-btn {
          background: rgba(168,85,247,0.1);
          border: 1px solid rgba(168,85,247,0.25);
          color: #c084fc;
        }

        .chat-voice-btn:hover {
          background: rgba(168,85,247,0.2);
          box-shadow: 0 0 12px rgba(168,85,247,0.3);
        }

        .chat-voice-btn.recording {
          background: rgba(239,68,68,0.2);
          border-color: rgba(239,68,68,0.5);
          color: #ef4444;
          animation: recordPulse 1s ease-in-out infinite;
        }

        @keyframes recordPulse {
          0%, 100% { box-shadow: 0 0 0 rgba(239,68,68,0.4); }
          50%       { box-shadow: 0 0 15px rgba(239,68,68,0.4); }
        }

        @media (max-width: 480px) {
          .chatbot-window {
            right: 16px;
            bottom: 96px;
            width: calc(100vw - 32px);
          }
          .chatbot-btn {
            right: 16px;
            bottom: 16px;
          }
        }
      `}</style>

      {/* ===== FLOATING BUTTON ===== */}
      <button
        id="chatbot-toggle-btn"
        className="chatbot-btn"
        onClick={() => setIsOpen(p => !p)}
        aria-label="Toggle AI chatbot"
        aria-expanded={isOpen}
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {/* ===== CHAT WINDOW ===== */}
      <div className={`chatbot-window ${isOpen ? 'open' : 'closed'}`} role="dialog" aria-label="Portfolio AI Assistant">
        {/* Header */}
        <div className="chat-header">
          <div className="chat-avatar">🤖</div>
          <div className="chat-header-info">
            <div className="chat-header-name">Portfolio AI Assistant</div>
            <div className="chat-header-status">
              <span className="chat-status-dot" />
              {isSpeaking ? 'Speaking…' : 'Online · Always here to help'}
            </div>
          </div>
          <div className="chat-header-controls">
            <button
              className={`chat-ctrl-btn ${voiceEnabled ? 'active' : ''}`}
              title={voiceEnabled ? 'Disable TTS' : 'Enable TTS'}
              onClick={() => { setVoiceEnabled(p => !p); if (isSpeaking) window.speechSynthesis?.cancel(); }}
            >
              🔊
            </button>
            <button
              className="chat-ctrl-btn"
              title="Clear chat"
              onClick={() => setMessages([{ id: 0, role: 'ai', text: KB.default }])}
            >
              🗑️
            </button>
          </div>
        </div>

        {/* Quick prompts */}
        <div className="chat-prompts">
          {EXAMPLE_PROMPTS.map((p, i) => (
            <button key={i} className="chat-prompt-chip" onClick={() => sendMessage(p)}>
              {p}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`msg-bubble-wrap ${msg.role}`}>
              <div className={`msg-bubble ${msg.role}`}>
                {formatText(msg.text)}
              </div>
              <div className="msg-time">
                {new Date(msg.id || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="msg-bubble-wrap ai">
              <div className="typing-indicator">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-input-area">
          <button
            className="chat-action-btn chat-voice-btn"
            title="Voice input"
            onClick={startVoice}
            aria-label="Voice input"
          >
            🎙️
          </button>
          <input
            ref={inputRef}
            className="chat-input"
            placeholder="Ask me anything…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            aria-label="Chat message input"
          />
          <button
            className="chat-action-btn chat-send-btn"
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            aria-label="Send message"
          >
            ➤
          </button>
        </div>
      </div>
    </>
  );
}
