import React, { useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Particles effect specifically for the contact section
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;
    let particles = [];
    let animationId;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      particles = Array.from({ length: 50 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        s: Math.random() * 2 + 1
      }));
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "rgba(45, 212, 191, 0.5)";
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section id="contact">
      <canvas id="pc" ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} />
      
      <div className="contact-content">
        <h2 className="contact-title">
          READY TO<br />
          <span>COLLABORATE?</span>
        </h2>
        
        <a href="mailto:dungogjethro@gmail.com" className="contact-email">
          dungogjethro@gmail.com
        </a>
        <p className="contact-phone">+63 992 633 3771</p>
        
        <div className="social-links">
          <a href="https://github.com/JethroDungog" target="_blank" rel="noopener noreferrer">
            <FaGithub size={24} />
          </a>
          <a href="https://www.linkedin.com/in/dungog-jethro-c-0b940638a" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={24} />
          </a>
        </div>
        
        <p className="copyright">Ivan Jethro Dungog &bull; BSIT &bull; UCLM</p>
      </div>
    </section>
  );
};

export default Contact;
