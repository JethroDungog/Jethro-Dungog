import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={scrolled ? 'nav-scrolled' : ''}>
      <div className="logo">
        IVAN <b>JETHRO</b>
      </div>
      <div className="nav-links">
        <a href="#projects">WORKS</a>
        <a href="#stack">STACK</a>
        <a href="#contact">CONTACT</a>
        <a href="https://github.com/JethroDungog" target="_blank" rel="noopener noreferrer">
          <FaGithub size={20} />
        </a>
        <a href="https://www.linkedin.com/in/dungog-jethro-c-0b940638a" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={20} />
        </a>
        <div className="badge">
          <div className="status-dot"></div>
          AVAILABLE
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
