import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="hero">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="section-label">AI Systems & Technical Problem Solving</span>
        <h1 className="hero-title">
          BUILT<br />
          <span className="gradient-text">WITH PURPOSE.</span>
        </h1>
        <p className="hero-subtitle">
          I am <span>Ivan Jethro Dungog</span>. Currently architecting RAG solutions at Dealogikal and leading technical teams. I build software that thinks and systems that work.
        </p>
        <div className="btn-group">
          <a href="#gallery" className="btn-primary">
            VIEW 3D GALLERY
          </a>
          <a href="#contact" className="btn-secondary">
            LET'S CONNECT
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
