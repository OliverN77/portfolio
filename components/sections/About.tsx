'use client';

import { motion } from 'framer-motion';
import { Code2, Palette, Zap, Heart } from 'lucide-react';
<<<<<<< HEAD
import dynamic from 'next/dynamic';
import { memo, useMemo, useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

// Lazy load componentes 3D para mejor rendimiento
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

const Torus = dynamic(
  () => import('@react-three/drei').then((mod) => mod.Torus),
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

// Hook para detectar dispositivos móviles
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

// Componente 3D optimizado con memoización
const AnimatedRings = memo(({ theme, isMobile }: { theme: string; isMobile: boolean }) => {
  // Colores memoizados
  const colors = useMemo(() => ({
    primary: theme === 'dark' ? '#7C3AED' : '#9333EA',
    secondary: theme === 'dark' ? '#EC4899' : '#F472B6',
    accent: theme === 'dark' ? '#00D9FF' : '#22D3EE'
  }), [theme]);

  // Configuración adaptativa según dispositivo
  const config = useMemo(() => ({
    // Reducir segmentos en móviles: 16 radial, 100/50 tubular
    radialSegments: isMobile ? 12 : 16,
    tubularSegments: isMobile ? 40 : 80,
    // Menos estrellas en móviles
    starsCount: isMobile ? (theme === 'dark' ? 1500 : 1000) : (theme === 'dark' ? 3000 : 2000),
    // Simplificar animación en móviles
    distortSpeed: isMobile ? 1 : 1.5,
    // Renderizar menos torus en móviles
    showAllTorus: !isMobile
  }), [isMobile, theme]);
=======
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Torus, MeshDistortMaterial, Stars } from '@react-three/drei';
import { Suspense } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

// Componente 3D para About - Anillos entrelazados
function AnimatedRings() {
  const { theme } = useTheme();

  // Colores según el tema
  const primaryColor = theme === 'dark' ? '#7C3AED' : '#9333EA';
  const secondaryColor = theme === 'dark' ? '#EC4899' : '#F472B6';
  const accentColor = theme === 'dark' ? '#00D9FF' : '#22D3EE';
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453

  return (
    <>
      {/* Estrellas de fondo adaptativas */}
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
      {/* Torus principal - siempre visible */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Torus args={[1.5, 0.3, config.radialSegments, config.tubularSegments]} rotation={[Math.PI / 4, 0, 0]}>
          <MeshDistortMaterial
            color={colors.primary}
            attach="material"
            distort={0.3}
            speed={config.distortSpeed}
=======
      {/* Torus principal */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Torus args={[1.5, 0.3, 16, 100]} rotation={[Math.PI / 4, 0, 0]}>
          <MeshDistortMaterial
            color={primaryColor}
            attach="material"
            distort={0.3}
            speed={1.5}
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
            roughness={0.1}
            metalness={0.9}
          />
        </Torus>
      </Float>

<<<<<<< HEAD
      {/* Torus adicionales - solo en desktop/tablet */}
      {config.showAllTorus && (
        <>
          <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1}>
            <Torus args={[1, 0.25, config.radialSegments, config.tubularSegments]} rotation={[Math.PI / 2, Math.PI / 4, 0]} position={[0.5, 0, 0]}>
              <MeshDistortMaterial
                color={colors.secondary}
                attach="material"
                distort={0.4}
                speed={1.8}
                roughness={0.1}
                metalness={0.9}
              />
            </Torus>
          </Float>

          <Float speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
            <Torus args={[0.8, 0.2, config.radialSegments, config.tubularSegments]} rotation={[0, Math.PI / 3, Math.PI / 4]} position={[-0.3, 0.2, 0]}>
              <MeshDistortMaterial
                color={colors.accent}
                attach="material"
                distort={0.5}
                speed={2}
                roughness={0.1}
                metalness={0.9}
              />
            </Torus>
          </Float>
        </>
      )}
    </>
  );
});

AnimatedRings.displayName = 'AnimatedRings';
=======
      {/* Torus secundario */}
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1}>
        <Torus args={[1, 0.25, 16, 100]} rotation={[Math.PI / 2, Math.PI / 4, 0]} position={[0.5, 0, 0]}>
          <MeshDistortMaterial
            color={secondaryColor}
            attach="material"
            distort={0.4}
            speed={1.8}
            roughness={0.1}
            metalness={0.9}
          />
        </Torus>
      </Float>

      {/* Torus terciario */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
        <Torus args={[0.8, 0.2, 16, 100]} rotation={[0, Math.PI / 3, Math.PI / 4]} position={[-0.3, 0.2, 0]}>
          <MeshDistortMaterial
            color={accentColor}
            attach="material"
            distort={0.5}
            speed={2}
            roughness={0.1}
            metalness={0.9}
          />
        </Torus>
      </Float>
    </>
  );
}
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453

export default function About() {
  const { theme } = useTheme();
  const { t } = useLanguage();
<<<<<<< HEAD
  const isMobile = useIsMobile();

  // Memoizar highlights para evitar recreación
  const highlights = useMemo(() => [
=======

  const highlights = [
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
    {
      icon: <Code2 className="w-8 h-8" />,
      title: t('about.highlights.webDev'),
      description: 'Creando aplicaciones web modernas con las últimas tecnologías',
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: t('about.highlights.uiux'),
      description: 'Diseños limpios y funcionales centrados en la experiencia del usuario',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('about.highlights.performance'),
      description: 'Optimización y rendimiento en cada proyecto',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: t('about.highlights.passion'),
      description: 'Apasionado por crear soluciones innovadoras',
    },
<<<<<<< HEAD
  ], [t]);

  // Stats memoizados
  const stats = useMemo(() => [
    { value: '2', label: t('about.stats.experience') },
    { value: '10+', label: t('about.stats.projects') },
    { value: '100%', label: t('about.stats.dedication') }
  ], [t]);

  // Colores dinámicos memoizados
  const styles = useMemo(() => ({
    bgGradient: theme === 'dark'
      ? 'linear-gradient(to bottom, rgba(88, 28, 135, 0.95) 0%, rgba(76, 29, 149, 0.9) 50%, rgba(17, 24, 39, 0.85) 100%)'
      : 'linear-gradient(to bottom, rgba(233, 213, 255, 0.95) 0%, rgba(221, 214, 254, 0.9) 50%, rgba(243, 244, 246, 0.85) 100%)',
    textPrimary: theme === 'dark' ? '#ffffff' : '#1f2937',
    textSecondary: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : '#4b5563',
    textTertiary: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#6b7280',
    cardBg: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.6)',
    cardBorder: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(124, 58, 237, 0.2)',
    statBg: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.7)',
    titleGradient: theme === 'dark'
      ? 'linear-gradient(135deg, #00D9FF 0%, #7C3AED 30%, #EC4899 60%, #F59E0B 100%)'
      : 'linear-gradient(135deg, #06B6D4 0%, #9333EA 30%, #F472B6 60%, #F59E0B 100%)',
    underlineGradient: theme === 'dark'
      ? 'linear-gradient(90deg, #00D9FF 0%, #7C3AED 50%, #EC4899 100%)'
      : 'linear-gradient(90deg, #06B6D4 0%, #9333EA 50%, #F472B6 100%)'
  }), [theme]);
=======
  ];

  // Colores dinámicos según el tema
  const bgGradient = theme === 'dark'
    ? 'linear-gradient(to bottom, rgba(88, 28, 135, 0.95) 0%, rgba(76, 29, 149, 0.9) 50%, rgba(17, 24, 39, 0.85) 100%)'
    : 'linear-gradient(to bottom, rgba(233, 213, 255, 0.95) 0%, rgba(221, 214, 254, 0.9) 50%, rgba(243, 244, 246, 0.85) 100%)';

  const textPrimary = theme === 'dark' ? '#ffffff' : '#1f2937';
  const textSecondary = theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : '#4b5563';
  const textTertiary = theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#6b7280';
  const cardBg = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.6)';
  const cardBorder = theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(124, 58, 237, 0.2)';
  const statBg = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.7)';
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453

  return (
    <section
      id="about"
      className="py-20 px-4 relative overflow-hidden transition-all duration-500"
<<<<<<< HEAD
      style={{ background: styles.bgGradient }}
    >
      {/* Three.js 3D Background optimizado */}
      {typeof window !== 'undefined' && (
        <div className={`absolute inset-0 transition-opacity duration-500 ${theme === 'dark' ? 'opacity-80' : 'opacity-60'}`}>
          <Canvas 
            camera={{ position: [0, 0, 8], fov: 75 }}
            gl={{ 
              alpha: true, 
              antialias: !isMobile, // Desactivar antialiasing en móviles
              powerPreference: isMobile ? 'low-power' : 'high-performance'
            }}
            dpr={isMobile ? [1, 1.5] : [1, 2]} // Menor pixel ratio en móviles
            performance={{ min: 0.5 }} // Degradación automática si baja FPS
          >
            <ambientLight intensity={theme === 'dark' ? 0.8 : 1.2} />
            <directionalLight position={[10, 10, 5]} intensity={theme === 'dark' ? 1.5 : 2} />
            {/* PointLights solo en desktop para mejor rendimiento */}
            {!isMobile && (
              <>
                <pointLight position={[-10, -10, -5]} intensity={1} color={theme === 'dark' ? '#7C3AED' : '#9333EA'} />
                <pointLight position={[10, 10, 5]} intensity={1} color={theme === 'dark' ? '#EC4899' : '#F472B6'} />
              </>
            )}
            <AnimatedRings theme={theme} isMobile={isMobile} />
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
      style={{ background: bgGradient }}
    >
      {/* Three.js 3D Background */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${theme === 'dark' ? 'opacity-80' : 'opacity-60'}`}>
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 75 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={theme === 'dark' ? 0.8 : 1.2} />
          <directionalLight position={[10, 10, 5]} intensity={theme === 'dark' ? 1.5 : 2} />
          <pointLight position={[-10, -10, -5]} intensity={1} color={theme === 'dark' ? '#7C3AED' : '#9333EA'} />
          <pointLight position={[10, 10, 5]} intensity={1} color={theme === 'dark' ? '#EC4899' : '#F472B6'} />
          <Suspense fallback={null}>
            <AnimatedRings />
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent"
            style={{
<<<<<<< HEAD
              backgroundImage: styles.titleGradient,
=======
              backgroundImage: theme === 'dark'
                ? 'linear-gradient(135deg, #00D9FF 0%, #7C3AED 30%, #EC4899 60%, #F59E0B 100%)'
                : 'linear-gradient(135deg, #06B6D4 0%, #9333EA 30%, #F472B6 60%, #F59E0B 100%)',
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {t('about.title')}
          </h2>
          <motion.div
            className="w-32 h-1.5 mx-auto rounded-full relative overflow-hidden"
            style={{
<<<<<<< HEAD
              background: styles.underlineGradient
=======
              background: theme === 'dark'
                ? 'linear-gradient(90deg, #00D9FF 0%, #7C3AED 50%, #EC4899 100%)'
                : 'linear-gradient(90deg, #06B6D4 0%, #9333EA 50%, #F472B6 100%)'
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
            }}
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
              }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Image or Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="relative"
          >
            <motion.div
              className="w-full h-96 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden backdrop-blur-sm transition-all duration-300"
              style={{
<<<<<<< HEAD
                backgroundColor: styles.cardBg,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: styles.cardBorder
=======
                backgroundColor: cardBg,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: cardBorder
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
              }}
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center p-8">
                <div 
                  className="w-48 h-48 mx-auto rounded-full flex items-center justify-center mb-4"
                  style={{
                    borderWidth: '8px',
                    borderStyle: 'solid',
<<<<<<< HEAD
                    borderColor: styles.cardBorder
=======
                    borderColor: cardBorder
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
                  }}
                >
                  <span className="text-8xl">👨‍💻</span>
                </div>
<<<<<<< HEAD
=======
                <p className="text-sm" style={{ color: textSecondary }}>
                  Agrega tu foto aquí
                </p>
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
              </div>
            </motion.div>

            {/* Elementos decorativos */}
            <div 
              className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-3xl"
              style={{ 
                backgroundColor: theme === 'dark' ? 'rgba(124, 58, 237, 0.1)' : 'rgba(147, 51, 234, 0.2)',
                opacity: 0.5 
              }}
            />
            <div 
              className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full blur-3xl"
              style={{ 
                backgroundColor: theme === 'dark' ? 'rgba(236, 72, 153, 0.1)' : 'rgba(244, 114, 182, 0.2)',
                opacity: 0.5 
              }}
            />
          </motion.div>

          {/* Right: Description */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Contenedor con sombra para el contenido */}
            <div 
              className="p-8 rounded-2xl backdrop-blur-sm shadow-xl transition-all duration-300"
              style={{
<<<<<<< HEAD
                backgroundColor: styles.cardBg,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: styles.cardBorder
=======
                backgroundColor: cardBg,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: cardBorder
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
              }}
            >
              <h3
                className="text-3xl font-bold mb-6 bg-clip-text text-transparent"
                style={{
<<<<<<< HEAD
                  backgroundImage: styles.titleGradient,
=======
                  backgroundImage: theme === 'dark'
                    ? 'linear-gradient(135deg, #00D9FF 0%, #7C3AED 50%, #EC4899 100%)'
                    : 'linear-gradient(135deg, #06B6D4 0%, #9333EA 50%, #F472B6 100%)',
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {t('about.greeting')}
              </h3>

              <div className="space-y-4">
                {t('about.description').split('\n\n').map((paragraph, index) => (
                  <p 
                    key={index}
                    className="text-lg leading-relaxed transition-colors duration-300"
<<<<<<< HEAD
                    style={{ color: index === 0 ? styles.textSecondary : styles.textTertiary }}
=======
                    style={{ color: index === 0 ? textSecondary : textTertiary }}
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
<<<<<<< HEAD
              {stats.map((stat, index) => (
=======
              {[
                { value: '2', label: t('about.stats.experience') },
                { value: '10+', label: t('about.stats.projects') },
                { value: '100%', label: t('about.stats.dedication') }
              ].map((stat, index) => (
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
                <motion.div
                  key={stat.label}
                  className="text-center p-4 rounded-xl backdrop-blur-sm shadow-lg transition-all duration-300"
                  style={{
<<<<<<< HEAD
                    backgroundColor: styles.statBg,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: styles.cardBorder
=======
                    backgroundColor: statBg,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(124, 58, 237, 0.3)'
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="text-3xl font-bold"
<<<<<<< HEAD
                    style={{ color: styles.textPrimary }}
=======
                    style={{ color: textPrimary }}
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    {stat.value}
                  </motion.div>
<<<<<<< HEAD
                  <div className="text-sm" style={{ color: styles.textTertiary }}>
=======
                  <div className="text-sm" style={{ color: textTertiary }}>
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{
                y: -10,
                scale: 1.05,
                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.8)',
                boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
                transition: { duration: 0.2 }
              }}
              className="p-6 rounded-xl shadow-lg cursor-pointer backdrop-blur-sm transition-all duration-300"
              style={{
<<<<<<< HEAD
                backgroundColor: styles.cardBg,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: styles.cardBorder
              }}
            >
              <div className="mb-4" style={{ color: styles.textPrimary }}>
                {item.icon}
              </div>
              <h4 className="text-xl font-semibold mb-2" style={{ color: styles.textPrimary }}>
                {item.title}
              </h4>
              <p className="text-sm" style={{ color: styles.textTertiary }}>
=======
                backgroundColor: cardBg,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: cardBorder
              }}
            >
              <div className="mb-4" style={{ color: textPrimary }}>
                {item.icon}
              </div>
              <h4 className="text-xl font-semibold mb-2" style={{ color: textPrimary }}>
                {item.title}
              </h4>
              <p className="text-sm" style={{ color: textTertiary }}>
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
