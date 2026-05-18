import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import { Send, X, MessageCircle, User, Brain, Rocket, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: `**Hi! I am Ivan's AI dY\`<**\n\nYour interactive portfolio guide.`
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatHistoryRef = useRef(null);

  useEffect(() => {
    // Auto open after a delay
    const timer = setTimeout(() => {
      if (!isOpen) setIsOpen(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const logToSupabase = async (userMsg, aiMsg) => {
    try {
      if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
        await supabase.from('chat_logs').insert([{ user_message: userMsg, ai_response: aiMsg }]);
      }
    } catch (err) {
      console.log('Supabase logging skipped (not configured or error)');
    }
  };

  const getResponse = (q) => {
    const l = q.toLowerCase();
    if (l.includes("experience") || l.includes("background")) {
      return "I specialize in AI Systems Engineering, currently working at Dealogikal. I architect RAG solutions, optimize vector databases, and lead teams in building scalable, intelligent software. I have a BSIT from UCLM.";
    }
    if (l.includes("stack") || l.includes("tech")) {
      return "My core stack revolves around Python, RAG architectures, Vector Databases, and N8N automation. For frontend and mobile, I use React, HTML/CSS/JS, and Flutter/Dart. I deploy on Cloudflare Workers and manage agile teams.";
    }
    if (l.includes("project")) {
      return "Key projects include:\n1) **Dealogikal Compliance AI** (Multi-Modal RAG for regulations)\n2) **KODI CODE** (plagiarism checker, Capstone Lead)\n3) **Aella & Emman** (Business UI with Gmail lead gen integration).";
    }
    if (l.includes("contact") || l.includes("connect")) {
      return "You can reach me via email at dungogjethro@gmail.com, call +63 992 633 3771, or connect on LinkedIn. Links are in the nav and contact section!";
    }
    return "I'm currently optimized to answer questions about Ivan's background, projects, tech stack, and contact info. Could you ask about one of those?";
  };

  const handleSend = async (text) => {
    if (!text.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInputValue('');
    setIsTyping(true);

    const response = getResponse(text);

    // Log interaction to Supabase in the background
    logToSupabase(text, response);

    // Simulate AI thinking delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'ai', content: response }]);
    }, 1000);
  };

  const quickPrompts = [
    { text: "Tell me about your background and experience.", label: "About Me", icon: <User size={14} color="var(--secondary)" /> },
    { text: "Can you elaborate on your RAG architecture and tech stack?", label: "Tech Stack", icon: <Brain size={14} color="var(--primary)" /> },
    { text: "What are key projects you have built?", label: "Projects", icon: <Rocket size={14} color="var(--accent)" /> },
    { text: "How can I contact Jethro for collaboration?", label: "Contact & Connect", icon: <Mail size={14} color="var(--primary)" /> }
  ];

  return (
    <div className="chatbot-wrapper">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div className="avatar">
                <img src="/profile.png" alt="Ivan" onError={(e) => e.target.style.display='none'} />
                <div className="status-indicator"></div>
              </div>
              <div>
                <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>IVAN Assistant</p>
                <p style={{ fontSize: '0.65rem', color: 'var(--primary)' }}>CONNECTED</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>

          <div className="chat-history" ref={chatHistoryRef}>
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === 'ai' ? 'msg-ai' : 'msg-user'}>
                {msg.role === 'ai' && (
                  <div className="avatar">
                    <img src="/profile.png" alt="Ivan" onError={(e) => e.target.style.display='none'} />
                  </div>
                )}
                <div 
                  className={msg.role === 'ai' ? 'bubble-ai' : 'bubble-user'}
                  dangerouslySetInnerHTML={{ __html: marked.parse(msg.content) }}
                />
              </div>
            ))}
            
            {messages.length === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginLeft: '3.3rem' }}>
                {quickPrompts.map((p, i) => (
                  <button key={i} className="quick-prompt" onClick={() => handleSend(p.text)}>
                    {p.icon} {p.label}
                  </button>
                ))}
              </div>
            )}

            {isTyping && (
              <div className="msg-ai">
                <div className="avatar">
                  <img src="/profile.png" alt="Ivan" onError={(e) => e.target.style.display='none'} />
                </div>
                <div className="bubble-ai" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <div className="status-dot" style={{ animationDelay: '0s' }}></div>
                  <div className="status-dot" style={{ animationDelay: '0.2s' }}></div>
                  <div className="status-dot" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
          </div>

          <div className="chat-input-area">
            <input 
              type="text" 
              className="chat-input" 
              placeholder="Ask anything..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
            />
            <button className="send-btn" onClick={() => handleSend(inputValue)}>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <div className="toggle-wrapper">
          <div className="toggle-ping"></div>
          <div className="toggle-glow"></div>
          <button className="chat-toggle-btn" onClick={() => setIsOpen(true)}>
            <MessageCircle size={28} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AIChatbot;
