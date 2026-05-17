'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import { memo, useMemo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/useIsMobile';

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

  return (
    <>
      <Stars 
        radius={100} 
        depth={50} 
        count={config.starsCount}
        factor={4} 
        saturation={theme === 'dark' ? 0 : 0.3} 
        fade 
        speed={1} 
      />
      
      {/* Esfera principal - siempre visible */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1.5, config.segments, config.segments]} scale={1.5}>
          <MeshDistortMaterial
            color={colors.primary}
            attach="material"
            distort={0.6}
            speed={config.distortSpeed}
            roughness={0.1}
            metalness={0.8}
          />
        </Sphere>
      </Float>

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

export default function Hero() {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();

  const scrollToNextSection = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const roleSequence = useMemo(() => {
    return t('hero.roleSequence');
  }, [language, t]);

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

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500"
      style={{
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
            style={{ color: styles.textColor }}
          >
            👋 {t('hero.greeting')}
          </motion.p>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 }}
            className="mb-6"
          >
            <div
              className="relative w-40 h-40 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-4"
              style={{ borderColor: styles.borderColor }}
            >
              <Image
                src="/oliver.jpg"
                alt="Oliver Nieto"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 transition-colors duration-300"
            style={{ color: styles.textColor }}
          >
            {t('hero.name')}
          </motion.h1>

          {/* Title/Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <TypeAnimation
              key={language}
              sequence={roleSequence}
              wrapper="h2"
              speed={50}
              repeat={Infinity}
              className="text-2xl md:text-4xl lg:text-5xl font-semibold bg-clip-text text-transparent"
              style={{
                backgroundImage: styles.roleGradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-base md:text-lg lg:text-xl mb-12 max-w-3xl mx-auto leading-relaxed px-4 transition-colors duration-300 backdrop-blur-xl rounded-lg"
            style={{ color: styles.textSecondary }}
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
                backgroundColor: styles.buttonBg,
                color: styles.buttonText
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
                border: `2px solid ${styles.borderColor}`,
                color: styles.textColor,
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
            <motion.a
              href="/cv-oliver-nieto.pdf"
              download
              className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition-all duration-300"
              style={{
                backgroundColor: styles.buttonBg,
                color: styles.buttonText
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
            >
              {t('hero.downloadCv')}
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <SocialLinks theme={theme} textColor={styles.textColor} />
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
            style={{ color: styles.textColor }}
          />
        </motion.div>
      </motion.button>
    </section>
  );
}
