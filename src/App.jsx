import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery3D from './components/Gallery3D';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import AIChatbot from './components/AIChatbot';
import BackgroundEffects from './components/BackgroundEffects';
import './index.css';

function App() {
  return (
    <>
      <BackgroundEffects />
      <Navbar />
      <main>
        <Hero />
        <Gallery3D />
        <Projects />
        <TechStack />
        <Contact />
      </main>
      <AIChatbot />
    </>
  );
}

export default App;
