import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code2, Database, Network, Brain, Users, Monitor, Mail, Paintbrush } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
const Projects = () => {
  const projects = [
    {
      tag: "Local Deployment",
      tagClass: "tag-active",
      title: "Dealogikal Compliance AI",
      role: "AI Engineer @ Dealogikal",
      description: "An automation website RAG (Retrieval-Augmented Generation) system. Deployed completely locally.",
      icons: [<Code2 size={18}/>, <Database size={18}/>, <Network size={18}/>, <Brain size={18}/>],
      link: null,
      image: "/proj1.png"
    },
    {
      tag: "Capstone Leadership",
      tagClass: "tag-leadership",
      title: "KODI CODE",
      role: "Project Manager",
      description: "Leading the end-to-end strategy for an intelligent programming plagiarism checker. Coordinating development sprints and system validation across the team.",
      icons: [<Users size={18}/>, <Network size={18}/>],
      link: { url: "https://github.com/JethroDungog", icon: <FaGithub size={18}/> },
      image: "/proj2.png"
    },
    {
      tag: "Client Solution",
      tagClass: "tag-client",
      title: "Aella & Emman",
      role: "Web Developer",
      description: "Designed and deployed a professional business portfolio for a signage making firm. Integrated a seamless Gmail-based inquiry system for lead generation.",
      icons: [<Monitor size={18}/>, <Mail size={18}/>, <Paintbrush size={18}/>],
      link: { url: "https://foraellaandemman01-ui.github.io/FOR-AELLA-EMMAN/", icon: <ExternalLink size={18}/> },
      image: "/proj3.png"
    },
    {
      tag: "Local Deployment",
      tagClass: "tag-client",
      title: "GT Dental Clinic",
      role: "System Developer",
      description: "Developed and deployed a completely localized Dental Clinic Management System. Engineered a 100% offline, highly readable application customized specifically for their daily business operations and record keeping.",
      icons: [<Database size={18}/>, <Monitor size={18}/>],
      link: null
    }
  ];

  return (
    <section id="projects">
      <div style={{ textAlign: 'center' }}>
        <span className="section-label">Selected Works</span>
        <h2 className="section-title">DEPLOYED <span className="gradient-text">SYSTEMS</span></h2>
      </div>
      
      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div 
            key={index}
            className="project-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {project.image && (
              <div className="project-image-wrapper">
                <img src={project.image} alt={project.title} className="project-image" />
              </div>
            )}
            <span className={`card-tag ${project.tagClass}`}>{project.tag}</span>
            <h3>
              {project.title}
              <small>{project.role}</small>
            </h3>
            <p>{project.description}</p>
            
            <div className="card-footer">
              <div className="tech-icons">
                {project.icons.map((icon, i) => <span key={i}>{icon}</span>)}
              </div>
              {project.link && (
                <a href={project.link.url} target="_blank" rel="noopener noreferrer" className="card-link">
                  {project.link.icon}
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
