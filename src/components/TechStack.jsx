import React from 'react';
import { motion } from 'framer-motion';

const TechStack = () => {
  const skills = [
    { name: "PYTHON", color: "var(--primary)" },
    { name: "RAG ARCHITECTURE", color: "var(--secondary)" },
    { name: "N8N AUTOMATION", color: "var(--accent)" },
    { name: "VECTOR DATABASES", color: "var(--primary)" },
    { name: "SYSTEM DESIGN", color: "var(--secondary)" },
    { name: "AGILE MGMT", color: "var(--accent)" },
    { name: "CLOUDFLARE WORKERS", color: "var(--primary)" },
    { name: "FLUTTER / DART", color: "var(--secondary)" },
    { name: "REACT / HTML / CSS / JS", color: "var(--accent)" }
  ];

  return (
    <section id="stack">
      <span className="section-label">Core Architecture</span>
      <h2 className="section-title">TECHNICAL <span className="gradient-text">ARSENAL</span></h2>
      
      <div className="stack-container">
        {skills.map((skill, index) => (
          <motion.span 
            key={index}
            className="stack-item"
            style={{ color: skill.color }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            {skill.name}
          </motion.span>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
