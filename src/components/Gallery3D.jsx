import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, DoubleSide } from 'three';

// Images array pointing to the public folder
const images = [
  '/proj2.png',
  '/proj3.png',
  '/proj4.png'
];

const CarouselItem = ({ index, total, texture }) => {
  const meshRef = useRef(null);
  const angle = (index / total) * Math.PI * 2;
  
  // Fade in effect
  const [opacity, setOpacity] = useState(0);
  
  useFrame(() => {
    if (opacity < 1) {
      setOpacity(prev => Math.min(prev + 0.05, 1));
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[Math.cos(angle) * 2.5, Math.sin(angle * 2) * 0.3, Math.sin(angle) * 2.5]}
      rotation={[0, -angle + Math.PI / 2, 0]}
    >
      <planeGeometry args={[2.5, 1.5]} />
      <meshStandardMaterial 
        map={texture} 
        roughness={0.3} 
        metalness={0.2} 
        transparent={true} 
        opacity={opacity}
        side={DoubleSide}
      />
    </mesh>
  );
};

const Carousel = () => {
  const groupRef = useRef();
  const textures = useLoader(TextureLoader, images);
  
  // Interaction state
  const isDragging = useRef(false);
  const previousPointer = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (groupRef.current) {
      // Auto rotation + drag velocity
      groupRef.current.rotation.y += 0.002 + velocity.current.x * 0.1;
      // Pitch adjustment based on vertical drag
      groupRef.current.rotation.x += (velocity.current.y * 0.5 - groupRef.current.rotation.x) * 0.1;
      
      // Damping
      velocity.current.x *= 0.95;
      velocity.current.y *= 0.95;
    }
  });

  const handlePointerDown = (e) => {
    isDragging.current = true;
    previousPointer.current = { x: e.clientX, y: e.clientY };
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - previousPointer.current.x;
    const deltaY = e.clientY - previousPointer.current.y;
    velocity.current.x += deltaX * 0.01;
    velocity.current.y += deltaY * 0.01;
    previousPointer.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e) => {
    isDragging.current = false;
    e.target.releasePointerCapture(e.pointerId);
  };

  return (
    <group 
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {textures.map((texture, i) => (
        <CarouselItem key={i} index={i} total={textures.length} texture={texture} />
      ))}
    </group>
  );
};

// WebGL Support Detector
const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
};

// React Error Boundary for 3D Canvas
class GalleryErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("3D Gallery Canvas Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// 2D Premium Fallback Carousel
const Gallery2DFallback = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const projectDetails = [
    { title: "KODI CODE", role: "Project Manager", desc: "Leading end-to-end strategy for programming plagiarism checker. Coordinating sprints and validation.", img: "/proj2.png" },
    { title: "Aella & Emman", role: "Web Developer", desc: "Designed and deployed a professional business portfolio with inquiry system for signage firm.", img: "/proj3.png" },
    { title: "GT Dental Clinic", role: "System Developer", desc: "Developed localized offline Dental Clinic Management System customized for daily record keeping.", img: "/proj4.png" }
  ];

  return (
    <div className="gallery-2d-container">
      <div className="gallery-2d-slider">
        {projectDetails.map((proj, idx) => (
          <div 
            key={idx} 
            className={`gallery-2d-card ${idx === activeIdx ? 'active' : ''}`}
            onClick={() => setActiveIdx(idx)}
          >
            <img src={proj.img} alt={proj.title} className="gallery-2d-img" />
            <div className="gallery-2d-overlay">
              <h3>{proj.title}</h3>
              <p className="role">{proj.role}</p>
              <p className="desc">{proj.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="gallery-2d-dots">
        {projectDetails.map((_, idx) => (
          <span 
            key={idx} 
            className={`dot ${idx === activeIdx ? 'active' : ''}`} 
            onClick={() => setActiveIdx(idx)}
          />
        ))}
      </div>
    </div>
  );
};

const Gallery3D = () => {
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    setWebglAvailable(isWebGLAvailable());
  }, []);

  return (
    <section id="gallery">
      <span className="section-label">Interactive Gallery</span>
      <h2 className="section-title">
        {webglAvailable ? "DRAG TO " : "CLICK TO "}<span className="gradient-text">EXPLORE</span>
      </h2>
      
      {webglAvailable ? (
        <div id="three-canvas-container">
          <GalleryErrorBoundary fallback={<Gallery2DFallback />}>
            <Canvas camera={{ position: [0, 0, 5], fov: 55, near: 0.1, far: 100 }}>
              <ambientLight intensity={0.4} color="#ffffff" />
              <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
              <pointLight position={[-3, 2, 2]} intensity={1.5} distance={10} color="#0066ff" />
              <pointLight position={[3, -2, 2]} intensity={1.2} distance={10} color="#ffffff" />
              
              <React.Suspense fallback={null}>
                <Carousel />
              </React.Suspense>
            </Canvas>
          </GalleryErrorBoundary>
        </div>
      ) : (
        <Gallery2DFallback />
      )}
    </section>
  );
};

export default Gallery3D;
