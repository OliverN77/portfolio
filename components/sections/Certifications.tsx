'use client';

import { useEffect, useMemo, useRef, memo } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ExternalLink, Award } from 'lucide-react';
import { animate, stagger } from 'animejs';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/useIsMobile';

const Canvas = dynamic(() => import('@react-three/fiber').then((m) => m.Canvas), { ssr: false });
const OrbitControls = dynamic(() => import('@react-three/drei').then((m) => m.OrbitControls), { ssr: false });
const Stars = dynamic(() => import('@react-three/drei').then((m) => m.Stars), { ssr: false });
const Float = dynamic(() => import('@react-three/drei').then((m) => m.Float), { ssr: false });
const Icosahedron = dynamic(() => import('@react-three/drei').then((m) => m.Icosahedron), { ssr: false });
const MeshDistortMaterial = dynamic(() => import('@react-three/drei').then((m) => m.MeshDistortMaterial), { ssr: false });

const CertScene = memo(({ theme, isMobile }: { theme: string; isMobile: boolean }) => {
  const colors = useMemo(
    () => ({
      primary: theme === 'dark' ? '#F59E0B' : '#D97706',
      secondary: theme === 'dark' ? '#10B981' : '#059669',
      accent: theme === 'dark' ? '#3B82F6' : '#2563EB'
    }),
    [theme]
  );

  return (
    <>
      <Stars
        radius={100}
        depth={50}
        count={isMobile ? 1000 : 2000}
        factor={4}
        saturation={0.2}
        fade
        speed={0.8}
      />
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1}>
        <Icosahedron args={[1.2, 1]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color={colors.primary}
            distort={0.3}
            speed={1.5}
            roughness={0.1}
            metalness={0.9}
          />
        </Icosahedron>
      </Float>
      {!isMobile && (
        <>
          <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
            <Icosahedron args={[0.7, 0]} position={[3, 1, -1]}>
              <MeshDistortMaterial
                color={colors.secondary}
                distort={0.4}
                speed={2}
                roughness={0.1}
                metalness={0.9}
              />
            </Icosahedron>
          </Float>
          <Float speed={1.8} rotationIntensity={0.7} floatIntensity={0.9}>
            <Icosahedron args={[0.5, 0]} position={[-3, -0.5, 0]}>
              <MeshDistortMaterial
                color={colors.accent}
                distort={0.5}
                speed={1.8}
                roughness={0.1}
                metalness={0.9}
              />
            </Icosahedron>
          </Float>
        </>
      )}
    </>
  );
});

CertScene.displayName = 'CertScene';

const CERTIFICATIONS = [
  {
    id: 1,
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    date: '2025',
    credential: 'https://www.freecodecamp.org/certification/oliver-nieto/responsive-web-design',
    skills: ['HTML', 'CSS', 'Accesibilidad'],
    color: '#0A0A23',
    emoji: '🎯'
  },
  {
    id: 2,
    title: 'Introduccion a Python',
    issuer: 'Sololearn',
    date: '2026',
    credential: 'https://www.sololearn.com/certificates/CC-ZCY1HZUZ',
    skills: ['Python', 'Programacion', 'Algoritmos'],
    color: '#E34F26',
    emoji: '📄'
  }
];

export default function Certifications() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    animate(cards, {
      opacity: [0, 1],
      translateY: [60, 0],
      scale: [0.85, 1],
      delay: stagger(120, { start: 300 }),
      duration: 700,
      easing: 'easeOutElastic(1, 0.8)'
    });
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;
    animate(titleRef.current, {
      opacity: [0, 1],
      translateX: [-40, 0],
      duration: 800,
      easing: 'easeOutQuart'
    });
  }, []);

  const handleCardHover = (el: HTMLDivElement, enter: boolean) => {
    animate(el, {
      scale: enter ? 1.04 : 1,
      translateY: enter ? -8 : 0,
      boxShadow: enter
        ? ['0 4px 6px rgba(0,0,0,0.1)', '0 20px 40px rgba(0,0,0,0.25)']
        : ['0 20px 40px rgba(0,0,0,0.25)', '0 4px 6px rgba(0,0,0,0.1)'],
      duration: 300,
      easing: 'easeOutQuad'
    });
  };

  const styles = useMemo(
    () => ({
      bgGradient:
        theme === 'dark'
          ? 'linear-gradient(to bottom, rgba(17,24,39,0.9) 0%, rgba(31,41,55,0.85) 50%, rgba(88,28,135,0.8) 100%)'
          : 'linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(254,252,232,0.85) 50%, rgba(243,232,255,0.8) 100%)',
      textPrimary: theme === 'dark' ? '#ffffff' : '#111827',
      textSecondary: theme === 'dark' ? '#d1d5db' : '#4b5563',
      textTertiary: theme === 'dark' ? '#9ca3af' : '#6b7280',
      cardBg: theme === 'dark' ? 'rgba(31,41,55,0.6)' : 'rgba(255,255,255,0.95)',
      cardBorder: theme === 'dark' ? 'rgba(75,85,99,0.5)' : 'rgba(229,231,235,1)',
      tagBg: theme === 'dark' ? 'rgba(55,65,81,0.5)' : 'rgba(243,244,246,1)',
      tagText: theme === 'dark' ? '#d1d5db' : '#374151',
      titleGradient:
        theme === 'dark'
          ? 'linear-gradient(135deg, #F59E0B 0%, #EF4444 40%, #8B5CF6 100%)'
          : 'linear-gradient(135deg, #D97706 0%, #DC2626 40%, #7C3AED 100%)',
      underlineGradient:
        theme === 'dark'
          ? 'linear-gradient(90deg, #F59E0B 0%, #EF4444 50%, #8B5CF6 100%)'
          : 'linear-gradient(90deg, #D97706 0%, #DC2626 50%, #7C3AED 100%)'
    }),
    [theme]
  );

  return (
    <section
      id="certifications"
      className="py-20 px-4 relative overflow-hidden transition-all duration-500"
      style={{ background: styles.bgGradient }}
    >
      {typeof window !== 'undefined' && (
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${theme === 'dark' ? 'opacity-40' : 'opacity-25'}`}
        >
          <Canvas
            camera={{ position: [0, 0, 7], fov: 75 }}
            dpr={isMobile ? [1, 1.5] : [1, 2]}
            performance={{ min: 0.5 }}
            gl={{ antialias: !isMobile, powerPreference: isMobile ? 'low-power' : 'high-performance' }}
          >
            <ambientLight intensity={theme === 'dark' ? 0.8 : 1.2} />
            <directionalLight position={[10, 10, 5]} intensity={theme === 'dark' ? 1.5 : 2} />
            {!isMobile && (
              <>
                <pointLight position={[-8, -8, -4]} intensity={1} color="#F59E0B" />
                <pointLight position={[8, 8, 4]} intensity={1} color="#8B5CF6" />
              </>
            )}
            <CertScene theme={theme} isMobile={isMobile} />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
          </Canvas>
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent"
            style={{
              backgroundImage: styles.titleGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              opacity: 0
            }}
          >
            {t('certifications.title')}
          </h2>
          <motion.div
            className="w-32 h-1.5 mx-auto rounded-full relative overflow-hidden"
            style={{ background: styles.underlineGradient }}
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
          <p className="mt-6 text-lg max-w-2xl mx-auto" style={{ color: styles.textSecondary }}>
            {t('certifications.subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, index) => (
            <div
              key={cert.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              onMouseEnter={(e) => handleCardHover(e.currentTarget as HTMLDivElement, true)}
              onMouseLeave={(e) => handleCardHover(e.currentTarget as HTMLDivElement, false)}
              className="rounded-2xl overflow-hidden shadow-lg backdrop-blur-sm cursor-pointer transition-colors duration-300"
              style={{
                opacity: 0,
                backgroundColor: styles.cardBg,
                border: `1px solid ${styles.cardBorder}`
              }}
            >
              <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${cert.color}, ${cert.color}88)` }} />

              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-4xl">{cert.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg leading-tight" style={{ color: styles.textPrimary }}>
                      {cert.title}
                    </h3>
                    <p className="text-sm font-medium mt-0.5" style={{ color: cert.color }}>
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2" style={{ color: styles.textTertiary }}>
                  <Award className="w-4 h-4" />
                  <span className="text-sm">{cert.date}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-xs font-medium rounded-full"
                      style={{
                        backgroundColor: styles.tagBg,
                        color: styles.tagText,
                        border: `1px solid ${cert.color}44`
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <a
                  href={cert.credential}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold mt-2 transition-opacity hover:opacity-80"
                  style={{ color: cert.color }}
                >
                  <ExternalLink className="w-4 h-4" />
                  {t('certifications.verify')}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
