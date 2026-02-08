'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
<<<<<<< HEAD
import dynamic from 'next/dynamic';
import { memo, useMemo, useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

// Lazy load del Canvas 3D para mejor rendimiento inicial
const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
);

const OrbitControls = dynamic(
  () => import('@react-three/drei').then((mod) => mod.OrbitControls),
  { ssr: false }
);

const Float = dynamic(
  () => import('@react-three/drei').then((mod) => mod.Float),
  { ssr: false }
);

const Sphere = dynamic(
  () => import('@react-three/drei').then((mod) => mod.Sphere),
  { ssr: false }
);

const MeshDistortMaterial = dynamic(
  () => import('@react-three/drei').then((mod) => mod.MeshDistortMaterial),
  { ssr: false }
);

const Stars = dynamic(
  () => import('@react-three/drei').then((mod) => mod.Stars),
  { ssr: false }
);

// Hook para detectar si es móvil
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

// Componente 3D animado optimizado
const AnimatedScene = memo(({ theme, isMobile }: { theme: string; isMobile: boolean }) => {
  // Colores memoizados
  const colors = useMemo(() => ({
    primary: theme === 'dark' ? '#7C3AED' : '#9333EA',
    secondary: theme === 'dark' ? '#EC4899' : '#F472B6',
    accent: theme === 'dark' ? '#00D9FF' : '#22D3EE',
    detail: theme === 'dark' ? '#FFD700' : '#FDE047'
  }), [theme]);

  // Configuración optimizada según el dispositivo
  const config = useMemo(() => ({
    // Reducir geometría en móviles (100 -> 32 vértices = ~70% menos polígonos)
    segments: isMobile ? 32 : 64,
    // Menos estrellas en móviles
    starsCount: isMobile ? (theme === 'dark' ? 1500 : 1000) : (theme === 'dark' ? 3000 : 2000),
    // Simplificar distorsión en móviles
    distortSpeed: isMobile ? 1 : 2,
    // Renderizar menos esferas en móviles
    showAllSpheres: !isMobile
  }), [isMobile, theme]);
=======
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import { Suspense } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

// Componente 3D animado
function AnimatedScene() {
  const { theme } = useTheme();
  
  // Colores según el tema
  const primaryColor = theme === 'dark' ? '#7C3AED' : '#9333EA';
  const secondaryColor = theme === 'dark' ? '#EC4899' : '#F472B6';
  const accentColor = theme === 'dark' ? '#00D9FF' : '#22D3EE';
  const detailColor = theme === 'dark' ? '#FFD700' : '#FDE047';
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453

  return (
    <>
      <Stars 
        radius={100} 
        depth={50} 
<<<<<<< HEAD
        count={config.starsCount}
=======
        count={theme === 'dark' ? 5000 : 3000} 
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
        factor={4} 
        saturation={theme === 'dark' ? 0 : 0.3} 
        fade 
        speed={1} 
      />
      
<<<<<<< HEAD
      {/* Esfera principal - siempre visible */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1.5, config.segments, config.segments]} scale={1.5}>
          <MeshDistortMaterial
            color={colors.primary}
            attach="material"
            distort={0.6}
            speed={config.distortSpeed}
=======
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1.5, 100, 100]} scale={1.5}>
          <MeshDistortMaterial
            color={primaryColor}
            attach="material"
            distort={0.6}
            speed={2}
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
            roughness={0.1}
            metalness={0.8}
          />
        </Sphere>
      </Float>

<<<<<<< HEAD
      {/* Esferas secundarias - solo en desktop/tablet */}
      {config.showAllSpheres && (
        <>
          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
            <Sphere args={[0.8, config.segments, config.segments]} scale={1} position={[3, 1, -2]}>
              <MeshDistortMaterial
                color={colors.secondary}
                attach="material"
                distort={0.4}
                speed={1.5}
                roughness={0.1}
                metalness={0.8}
              />
            </Sphere>
          </Float>

          <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
            <Sphere args={[0.6, config.segments, config.segments]} scale={0.8} position={[-3, -1, -1]}>
              <MeshDistortMaterial
                color={colors.accent}
                attach="material"
                distort={0.5}
                speed={1.8}
                roughness={0.1}
                metalness={0.8}
              />
            </Sphere>
          </Float>

          <Float speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
            <Sphere args={[0.4, config.segments, config.segments]} scale={0.6} position={[-2, 2, 1]}>
              <MeshDistortMaterial
                color={colors.detail}
                attach="material"
                distort={0.7}
                speed={2.2}
                roughness={0.1}
                metalness={0.8}
              />
            </Sphere>
          </Float>
        </>
      )}
    </>
  );
});

AnimatedScene.displayName = 'AnimatedScene';

// Componente de social links memoizado
const SocialLinks = memo(({ theme, textColor }: { theme: string; textColor: string }) => {
  const socialData = useMemo(() => [
    { href: 'https://github.com/OliverN77', Icon: Github, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/oliver-nieto-b33127383/', Icon: Linkedin, label: 'LinkedIn' },
    { href: 'mailto:olivernie2626@gmail.com', Icon: Mail, label: 'Email' }
  ], []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      className="flex gap-6 justify-center"
    >
      {socialData.map(({ href, Icon, label }, index) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 backdrop-blur-sm rounded-full transition-all duration-300"
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(31, 41, 55, 0.5)' : 'rgba(255, 255, 255, 0.5)',
            color: textColor
          }}
          aria-label={label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 + index * 0.1 }}
          whileHover={{ 
            scale: 1.2, 
            rotate: 360,
            backgroundColor: theme === 'dark' ? 'rgba(55, 65, 81, 0.5)' : 'rgba(255, 255, 255, 0.8)'
          }}
          whileTap={{ scale: 0.9 }}
        >
          <Icon className="w-6 h-6" />
        </motion.a>
      ))}
    </motion.div>
  );
});

SocialLinks.displayName = 'SocialLinks';
=======
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <Sphere args={[0.8, 100, 100]} scale={1} position={[3, 1, -2]}>
          <MeshDistortMaterial
            color={secondaryColor}
            attach="material"
            distort={0.4}
            speed={1.5}
            roughness={0.1}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
        <Sphere args={[0.6, 100, 100]} scale={0.8} position={[-3, -1, -1]}>
          <MeshDistortMaterial
            color={accentColor}
            attach="material"
            distort={0.5}
            speed={1.8}
            roughness={0.1}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      <Float speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
        <Sphere args={[0.4, 100, 100]} scale={0.6} position={[-2, 2, 1]}>
          <MeshDistortMaterial
            color={detailColor}
            attach="material"
            distort={0.7}
            speed={2.2}
            roughness={0.1}
            metalness={0.8}
          />
        </Sphere>
      </Float>
    </>
  );
}
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453

export default function Hero() {
  const { theme } = useTheme();
  const { t } = useLanguage();
<<<<<<< HEAD
  const isMobile = useIsMobile();
=======
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453

  const scrollToNextSection = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

<<<<<<< HEAD
  // Colores dinámicos memoizados
  const styles = useMemo(() => ({
    bgGradient: theme === 'dark' 
      ? 'linear-gradient(135deg, rgba(88, 28, 135, 0.95) 0%, rgba(49, 46, 129, 0.95) 100%)'
      : 'linear-gradient(135deg, rgba(196, 181, 253, 0.95) 0%, rgba(165, 180, 252, 0.95) 100%)',
    textColor: theme === 'dark' ? '#ffffff' : '#1f2937',
    textSecondary: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : '#ecf0f9',
    buttonBg: theme === 'dark' ? '#1f2937' : '#ffffff',
    buttonText: theme === 'dark' ? '#a78bfa' : '#7c3aed',
    borderColor: theme === 'dark' ? '#9ca3af' : '#7c3aed',
    roleGradient: theme === 'dark'
      ? 'linear-gradient(135deg, #FFD700 0%, #FF6B6B 25%, #4ECDC4 50%, #45B7D1 75%, #96CEB4 100%)'
      : 'linear-gradient(135deg, #F59E0B 0%, #EF4444 25%, #14B8A6 50%, #3B82F6 75%, #10B981 100%)'
  }), [theme]);
=======
  // Colores dinámicos según el tema
  const bgGradient = theme === 'dark' 
    ? 'linear-gradient(135deg, rgba(88, 28, 135, 0.95) 0%, rgba(49, 46, 129, 0.95) 100%)'
    : 'linear-gradient(135deg, rgba(196, 181, 253, 0.95) 0%, rgba(165, 180, 252, 0.95) 100%)';

  const textColor = theme === 'dark' ? '#ffffff' : '#1f2937';
  const textSecondary = theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : '#ecf0f9';
  const buttonBg = theme === 'dark' ? '#1f2937' : '#ffffff';
  const buttonText = theme === 'dark' ? '#a78bfa' : '#7c3aed';
  const borderColor = theme === 'dark' ? '#9ca3af' : '#7c3aed';
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500"
      style={{
<<<<<<< HEAD
        background: styles.bgGradient
      }}
    >
      {/* Three.js 3D Background */}
      {/* Solo renderizar canvas 3D si no es móvil de gama baja */}
      {typeof window !== 'undefined' && (
        <div className={`absolute inset-0 transition-opacity duration-500 ${theme === 'dark' ? 'opacity-80' : 'opacity-60'}`}>
          <Canvas 
            camera={{ position: [0, 0, 8], fov: 75 }}
            dpr={isMobile ? [1, 1.5] : [1, 2]} // Menor pixel ratio en móviles
            performance={{ min: 0.5 }} // Degradación automática si baja FPS
          >
            <ambientLight intensity={theme === 'dark' ? 0.5 : 0.8} />
            <directionalLight position={[10, 10, 5]} intensity={theme === 'dark' ? 0.5 : 1} />
            <AnimatedScene theme={theme} isMobile={isMobile} />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              autoRotate 
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
          </Canvas>
        </div>
      )}
=======
        background: bgGradient
      }}
    >
      {/* Three.js 3D Background */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${theme === 'dark' ? 'opacity-80' : 'opacity-60'}`}>
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <ambientLight intensity={theme === 'dark' ? 0.5 : 0.8} />
          <directionalLight position={[10, 10, 5]} intensity={theme === 'dark' ? 0.5 : 1} />
          <Suspense fallback={null}>
            <AnimatedScene />
          </Suspense>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate 
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl mb-4 transition-colors duration-300"
<<<<<<< HEAD
            style={{ color: styles.textColor }}
=======
            style={{ color: textColor }}
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
          >
            👋 {t('hero.greeting')}
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 transition-colors duration-300"
<<<<<<< HEAD
            style={{ color: styles.textColor }}
=======
            style={{ color: textColor }}
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
          >
            {t('hero.name')}
          </motion.h1>

          {/* Title/Role */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-8 bg-clip-text text-transparent"
            style={{
<<<<<<< HEAD
              backgroundImage: styles.roleGradient,
=======
              backgroundImage: theme === 'dark'
                ? 'linear-gradient(135deg, #FFD700 0%, #FF6B6B 25%, #4ECDC4 50%, #45B7D1 75%, #96CEB4 100%)'
                : 'linear-gradient(135deg, #F59E0B 0%, #EF4444 25%, #14B8A6 50%, #3B82F6 75%, #10B981 100%)',
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {t('hero.role')}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-base md:text-lg lg:text-xl mb-12 max-w-3xl mx-auto leading-relaxed px-4 transition-colors duration-300 backdrop-blur-xl rounded-lg"
<<<<<<< HEAD
            style={{ color: styles.textSecondary }}
=======
            style={{ color: textSecondary }}
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
          >
            {t('hero.description')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 px-4"
          >
            <motion.a
              href="#projects"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition-all duration-300"
              style={{
<<<<<<< HEAD
                backgroundColor: styles.buttonBg,
                color: styles.buttonText
=======
                backgroundColor: buttonBg,
                color: buttonText
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
            >
              {t('hero.viewProjects')}
            </motion.a>
            <motion.a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-lg backdrop-blur-sm transition-all duration-300"
              style={{
<<<<<<< HEAD
                border: `2px solid ${styles.borderColor}`,
                color: styles.textColor,
=======
                border: `2px solid ${borderColor}`,
                color: textColor,
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.3)'
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)'
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
            >
              {t('hero.contactMe')}
            </motion.a>
          </motion.div>

          {/* Social Links */}
<<<<<<< HEAD
          <SocialLinks theme={theme} textColor={styles.textColor} />
=======
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex gap-6 justify-center"
          >
            {[
              { href: 'https://github.com/OliverN77', Icon: Github, label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/oliver-nieto-b33127383/', Icon: Linkedin, label: 'LinkedIn' },
              { href: 'mailto:olivernie2626@gmail.com', Icon: Mail, label: 'Email' }
            ].map(({ href, Icon, label }, index) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 backdrop-blur-sm rounded-full transition-all duration-300"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(31, 41, 55, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                  color: textColor
                }}
                aria-label={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 360,
                  backgroundColor: theme === 'dark' ? 'rgba(55, 65, 81, 0.5)' : 'rgba(255, 255, 255, 0.8)'
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={scrollToNextSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown 
            className="w-8 h-8 opacity-70 hover:opacity-100 transition-all duration-300" 
<<<<<<< HEAD
            style={{ color: styles.textColor }}
=======
            style={{ color: textColor }}
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
          />
        </motion.div>
      </motion.button>
    </section>
  );
}
