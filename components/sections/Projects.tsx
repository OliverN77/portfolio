'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Code2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo, useMemo, useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';

// Lazy load componentes 3D
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

// Hook para detectar dispositivos móviles (evita hidratación)
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return mounted ? isMobile : false;
}

// Componente 3D optimizado con memoización
const AnimatedSphere = memo(({ theme, isMobile }: { theme: string; isMobile: boolean }) => {
  // Colores memoizados
  const colors = useMemo(() => ({
    primary: theme === 'dark' ? '#7C3AED' : '#9333EA',
    secondary: theme === 'dark' ? '#EC4899' : '#F472B6',
    accent: theme === 'dark' ? '#00D9FF' : '#22D3EE'
  }), [theme]);

  // Configuración adaptativa según dispositivo
  const config = useMemo(() => ({
    // Reducir segmentos en móviles: 64 vs 100
    segments: isMobile ? 32 : 64,
    // Menos estrellas en móviles
    starsCount: isMobile ? (theme === 'dark' ? 1200 : 800) : (theme === 'dark' ? 2500 : 1800),
    // Animaciones más lentas en móviles
    distortSpeed: isMobile ? 1 : 2,
    // Menos esferas en móviles
    showAllSpheres: !isMobile
  }), [isMobile, theme]);

  return (
    <>
      {/* Estrellas de fondo adaptativas */}
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
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, config.segments, config.segments]} scale={2}>
          <MeshDistortMaterial
            color={colors.primary}
            attach="material"
            distort={0.5}
            speed={config.distortSpeed}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
        
        {/* Esferas adicionales - solo en desktop/tablet */}
        {config.showAllSpheres && (
          <>
            <Sphere args={[0.8, config.segments, config.segments]} scale={2} position={[1.5, 0, 0]}>
              <MeshDistortMaterial
                color={colors.secondary}
                attach="material"
                distort={0.4}
                speed={1.5}
                roughness={0.2}
                metalness={0.8}
              />
            </Sphere>
            <Sphere args={[0.6, config.segments, config.segments]} scale={2} position={[-1.2, 0.5, 0.5]}>
              <MeshDistortMaterial
                color={colors.accent}
                attach="material"
                distort={0.6}
                speed={1.8}
                roughness={0.2}
                metalness={0.8}
              />
            </Sphere>
          </>
        )}
      </Float>
    </>
  );
});

AnimatedSphere.displayName = 'AnimatedSphere';

export default function Projects() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  // Memoizar projects para evitar recreación
  const projects = useMemo(() => [
    {
      title: t('projects.items.perfume.title'),
      description: t('projects.items.perfume.description'),
      image: '/store.png',
      tags: ['HTML', 'CSS', 'JS', 'MySQL', 'Python'],
      github: 'https://github.com/OliverN77/store',
      demo: 'https://store--olivernie2626.replit.app',
      color: theme === 'dark' ? '#7C3AED' : '#9333EA'
    },
    {
      title: t('projects.items.thinkel.title'),
      description: t('projects.items.thinkel.description'),
      image: '/thinkel.png',
      tags: ['React', 'Node.js', 'MongoDB'],
      github: 'https://github.com/OliverN77/thinkel',
      demo: 'https://thinkelpage-3y4d-ayvy.vercel.app/',
      color: theme === 'dark' ? '#EC4899' : '#F472B6'
    },
    {
      title: t('projects.items.motos.title'),
      description: t('projects.items.motos.description'),
      image: '/motos.png',
      tags: ['Python', 'HTML', 'CSS'],
      github: 'https://github.com/OliverN77/Motos',
      demo: 'https://following-diandra-olivern77-d65584c0.koyeb.app/',
      color: theme === 'dark' ? '#00D9FF' : '#22D3EE'
    },
    {
      title: t('projects.items.weather.title'),
      description: t('projects.items.weather.description'),
      image: '/weather.png',
      tags: ['HTML', 'WeatherAPI', 'CSS', 'JS'],
      github: 'https://github.com/OliverN77/wheater-app',
      demo: 'https://olivern77.github.io/wheater-app/',
      color: '#F59E0B'
    },
    {
      title: t('projects.items.store.title'),
      description: t('projects.items.store.description'),
      image: '/store-management.png',
      tags: ['React Native', 'Node.js', 'SQL Server Management Studio'],
      github: 'https://github.com/OliverN77/store-management',
      demo: 'https://store-management-rg.netlify.app/',
      color: '#10B981'
    },
    {
      title: t('projects.items.calculator.title'),
      description: t('projects.items.calculator.description'),
      image: '/calculadora.png',
      tags: ['React', 'Framer Motion', 'CSS'],
      github: 'https://github.com/OliverN77/calculadora-nota',
      demo: 'https://calculadora-nota-alpha.vercel.app/',
      color: '#EF4444'
    },
  ], [t, theme]);

  // Colores dinámicos memoizados
  const styles = useMemo(() => ({
    bgGradient: theme === 'dark'
      ? 'linear-gradient(to bottom, rgba(31, 41, 55, 0.85) 0%, rgba(17, 24, 39, 0.9) 50%, rgba(88, 28, 135, 0.85) 100%)'
      : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85) 0%, rgba(249, 250, 251, 0.9) 50%, rgba(243, 232, 255, 0.85) 100%)',
    textPrimary: theme === 'dark' ? '#ffffff' : '#111827',
    textSecondary: theme === 'dark' ? '#d1d5db' : '#4b5563',
    textTertiary: theme === 'dark' ? '#9ca3af' : '#6b7280',
    cardBg: theme === 'dark' ? 'rgba(31, 41, 55, 0.5)' : 'rgba(255, 255, 255, 0.9)',
    cardBorder: theme === 'dark' ? 'rgba(75, 85, 99, 0.5)' : 'rgba(229, 231, 235, 1)',
    tagBg: theme === 'dark' ? 'rgba(55, 65, 81, 0.5)' : 'rgba(243, 244, 246, 1)',
    tagText: theme === 'dark' ? '#d1d5db' : '#374151',
    tagBorder: theme === 'dark' ? 'rgba(75, 85, 99, 1)' : 'rgba(209, 213, 219, 1)',
    titleGradient: theme === 'dark'
      ? 'linear-gradient(135deg, #00D9FF 0%, #7C3AED 30%, #EC4899 60%, #F59E0B 100%)'
      : 'linear-gradient(135deg, #06B6D4 0%, #9333EA 30%, #F472B6 60%, #F59E0B 100%)',
    underlineGradient: theme === 'dark'
      ? 'linear-gradient(90deg, #00D9FF 0%, #7C3AED 50%, #EC4899 100%)'
      : 'linear-gradient(90deg, #06B6D4 0%, #9333EA 50%, #F472B6 100%)',
    viewMoreGradient: theme === 'dark'
      ? 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)'
      : 'linear-gradient(135deg, #9333EA 0%, #F472B6 100%)'
  }), [theme]);

  return (
    <section 
      id="projects" 
      className="py-20 px-4 relative overflow-hidden transition-all duration-500"
      style={{ background: styles.bgGradient }}
    >
      {/* 3D Background optimizado */}
      {typeof window !== 'undefined' && (
        <div className={`absolute inset-0 transition-opacity duration-500 ${theme === 'dark' ? 'opacity-50' : 'opacity-30'}`}>
          <Canvas 
            camera={{ position: [0, 0, 5], fov: 75 }}
            dpr={isMobile ? [1, 1.5] : [1, 2]}
            performance={{ min: 0.5 }}
            gl={{
              antialias: !isMobile,
              powerPreference: isMobile ? 'low-power' : 'high-performance'
            }}
          >
            <ambientLight intensity={theme === 'dark' ? 1 : 1.5} />
            <directionalLight position={[10, 10, 5]} intensity={theme === 'dark' ? 2 : 2.5} />
            {/* PointLights solo en desktop */}
            {!isMobile && (
              <>
                <pointLight position={[-10, -10, -5]} intensity={1.2} color={theme === 'dark' ? '#7C3AED' : '#9333EA'} />
                <pointLight position={[10, 10, 5]} intensity={1} color={theme === 'dark' ? '#EC4899' : '#F472B6'} />
              </>
            )}
            <AnimatedSphere theme={theme} isMobile={isMobile} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>
      )}

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
            className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent"
            style={{ 
              backgroundImage: styles.titleGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {t('projects.title')}
          </h2>
          <motion.div 
            className="w-32 h-1.5 mx-auto rounded-full relative overflow-hidden"
            style={{ 
              background: styles.underlineGradient
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
          <motion.p 
            className="mt-6 text-lg max-w-2xl mx-auto transition-colors duration-300"
            style={{ color: styles.textSecondary }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {t('projects.subtitle')}
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div 
                className="h-full rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm transition-all duration-300"
                style={{
                  backgroundColor: styles.cardBg,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: styles.cardBorder
                }}
              >
                {/* Project Image */}
                <motion.div 
                  className="relative h-48 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                </motion.div>

                {/* Project Info */}
                <div className="p-6 space-y-4">
                  <h3 
                    className="text-2xl font-bold transition-colors duration-300"
                    style={{ color: styles.textPrimary }}
                  >
                    {project.title}
                  </h3>
                  
                  <p 
                    className="text-sm leading-relaxed transition-colors duration-300"
                    style={{ color: styles.textTertiary }}
                  >
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tagIndex}
                        className="px-3 py-1 text-xs font-medium rounded-full transition-colors duration-300"
                        style={{
                          backgroundColor: styles.tagBg,
                          color: styles.tagText,
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          borderColor: styles.tagBorder
                        }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-white transition-all duration-300 shadow-md"
                      style={{ 
                        background: `linear-gradient(135deg, ${project.color} 0%, ${project.color}dd 100%)`
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t('projects.viewDemo')}
                    </motion.a>
                    
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-md"
                      style={{
                        backgroundColor: styles.cardBg,
                        color: styles.textPrimary,
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        borderColor: project.color
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: theme === 'dark' ? 'rgba(55, 65, 81, 0.8)' : 'rgba(243, 244, 246, 1)',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-4 h-4" />
                      {t('projects.viewCode')}
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/OliverN77"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 shadow-lg"
            style={{ 
              background: styles.viewMoreGradient
            }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: theme === 'dark' 
                ? '0 20px 40px rgba(124, 58, 237, 0.4)' 
                : '0 20px 40px rgba(147, 51, 234, 0.4)' 
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Code2 className="w-5 h-5" />
            {t('projects.viewMore')}
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}