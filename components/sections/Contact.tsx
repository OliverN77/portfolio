'use client';

<<<<<<< HEAD
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle, XCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, isEmailJSConfigured } from '@/lib/emailConfig';
import dynamic from 'next/dynamic';
import { memo, useMemo, useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

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

const Cone = dynamic(
  () => import('@react-three/drei').then((mod) => mod.Cone),
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
const AnimatedCones = memo(({ theme, isMobile }: { theme: string; isMobile: boolean }) => {
  // Colores memoizados
  const colors = useMemo(() => 
    theme === 'dark'
      ? ['#10B981', '#3B82F6', '#8B5CF6']
      : ['#22C55E', '#60A5FA', '#A78BFA'],
    [theme]
  );

  // Configuración adaptativa según dispositivo
  const config = useMemo(() => ({
    // Reducir segmentos en móviles: 32 -> 16
    segments: isMobile ? 16 : 32,
    // Menos estrellas en móviles
    starsCount: isMobile ? (theme === 'dark' ? 1000 : 700) : (theme === 'dark' ? 2200 : 1500),
    // Animaciones más lentas en móviles
    distortSpeed: isMobile ? 1 : 1.5,
    // Menos conos en móviles
    showAllCones: !isMobile
  }), [isMobile, theme]);
=======
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Cone, MeshDistortMaterial, Stars } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

// Componente 3D para Contact - Conos flotantes
function AnimatedCones() {
  const { theme } = useTheme();

  // Colores según el tema
  const colors = theme === 'dark'
    ? ['#10B981', '#3B82F6', '#8B5CF6']
    : ['#22C55E', '#60A5FA', '#A78BFA'];
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
        count={theme === 'dark' ? 3500 : 2000} 
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
        factor={4} 
        saturation={theme === 'dark' ? 0 : 0.3} 
        fade 
        speed={1} 
      />

<<<<<<< HEAD
      {/* Cono principal - siempre visible */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Cone args={[0.8, 2, config.segments]} position={[0, 0, 0]} rotation={[0, 0, 0]}>
=======
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Cone args={[0.8, 2, 32]} position={[0, 0, 0]} rotation={[0, 0, 0]}>
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
          <MeshDistortMaterial
            color={colors[0]}
            attach="material"
            distort={0.4}
<<<<<<< HEAD
            speed={config.distortSpeed}
=======
            speed={1.5}
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
            roughness={0.1}
            metalness={0.9}
          />
        </Cone>
      </Float>

<<<<<<< HEAD
      {/* Conos adicionales - solo en desktop/tablet */}
      {config.showAllCones && (
        <>
          <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
            <Cone args={[0.6, 1.5, config.segments]} position={[2.5, 1, -1]} rotation={[0.5, 0.8, 0.2]}>
              <MeshDistortMaterial
                color={colors[1]}
                attach="material"
                distort={0.3}
                speed={1.8}
                roughness={0.1}
                metalness={0.9}
              />
            </Cone>
          </Float>

          <Float speed={2} rotationIntensity={0.7} floatIntensity={1.4}>
            <Cone args={[0.5, 1.2, config.segments]} position={[-2, -1, 0.5]} rotation={[0.3, 1.2, 0.5]}>
              <MeshDistortMaterial
                color={colors[2]}
                attach="material"
                distort={0.5}
                speed={2}
                roughness={0.1}
                metalness={0.9}
              />
            </Cone>
          </Float>
        </>
      )}
    </>
  );
});

AnimatedCones.displayName = 'AnimatedCones';
=======
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
        <Cone args={[0.6, 1.5, 32]} position={[2.5, 1, -1]} rotation={[0.5, 0.8, 0.2]}>
          <MeshDistortMaterial
            color={colors[1]}
            attach="material"
            distort={0.3}
            speed={1.8}
            roughness={0.1}
            metalness={0.9}
          />
        </Cone>
      </Float>

      <Float speed={2} rotationIntensity={0.7} floatIntensity={1.4}>
        <Cone args={[0.5, 1.2, 32]} position={[-2, -1, 0.5]} rotation={[0.3, 1.2, 0.5]}>
          <MeshDistortMaterial
            color={colors[2]}
            attach="material"
            distort={0.5}
            speed={2}
            roughness={0.1}
            metalness={0.9}
          />
        </Cone>
      </Float>
    </>
  );
}
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453

export default function Contact() {
  const { theme } = useTheme();
  const { t } = useLanguage();
<<<<<<< HEAD
  const isMobile = useIsMobile();
  
=======
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

<<<<<<< HEAD
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar si EmailJS está configurado
    if (!isEmailJSConfigured()) {
      setSubmitStatus({
        type: 'error',
        message: t('contact.form.notConfigured')
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Enviar email usando EmailJS
      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Oliver Nieto', // Tu nombre
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      if (result.status === 200) {
        setSubmitStatus({
          type: 'success',
          message: t('contact.form.success')
        });
        // Limpiar formulario
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Error enviando email:', error);
      setSubmitStatus({
        type: 'error',
        message: t('contact.form.error')
      });
    } finally {
      setIsSubmitting(false);
      // Limpiar mensaje después de 5 segundos
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);
    }
=======
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log('Form submitted:', formData);
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

<<<<<<< HEAD
  // Memoizar contactInfo para evitar recreación
  const contactInfo = useMemo(() => [
=======
  const contactInfo = [
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
    {
      icon: <Mail className="w-6 h-6" />,
      title: t('contact.form.email'),
      value: 'olivernie2626@gmail.com',
      link: 'mailto:olivernie2626@gmail.com'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: t('contact.phone'),
      value: '+57 301 192 1747',
      link: 'tel:+573011921747'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t('contact.location'),
      value: 'Medellín, Colombia',
      link: '#'
    },
<<<<<<< HEAD
  ], [t]);

  // Colores dinámicos memoizados
  const styles = useMemo(() => ({
    bgGradient: theme === 'dark'
      ? 'linear-gradient(to bottom, rgba(88, 28, 135, 0.92) 0%, rgba(76, 29, 149, 0.9) 50%, rgba(17, 24, 39, 0.8) 100%)'
      : 'linear-gradient(to bottom, rgba(243, 232, 255, 0.92) 0%, rgba(233, 213, 255, 0.9) 50%, rgba(255, 255, 255, 0.8) 100%)',
    textPrimary: theme === 'dark' ? '#ffffff' : '#111827',
    textSecondary: theme === 'dark' ? '#d1d5db' : '#4b5563',
    cardBg: theme === 'dark' ? 'rgba(31, 41, 55, 0.5)' : 'rgba(255, 255, 255, 1)',
    cardBorder: theme === 'dark' ? 'rgba(75, 85, 99, 1)' : 'rgba(229, 231, 235, 1)',
    iconBg: theme === 'dark' ? '#7c3aed' : '#9333ea',
    inputBg: theme === 'dark' ? 'rgba(31, 41, 55, 1)' : 'rgba(255, 255, 255, 1)',
    inputBorder: theme === 'dark' ? 'rgba(75, 85, 99, 1)' : 'rgba(229, 231, 235, 1)',
    inputFocusBorder: theme === 'dark' ? '#a78bfa' : '#9333ea',
    labelColor: theme === 'dark' ? '#f3f4f6' : '#1f2937',
    titleGradient: theme === 'dark'
      ? 'linear-gradient(135deg, #00D9FF 0%, #7C3AED 30%, #EC4899 60%, #F59E0B 100%)'
      : 'linear-gradient(135deg, #06B6D4 0%, #9333EA 30%, #F472B6 60%, #F59E0B 100%)',
    underlineGradient: theme === 'dark'
      ? 'linear-gradient(90deg, #00D9FF 0%, #7C3AED 50%, #EC4899 100%)'
      : 'linear-gradient(90deg, #06B6D4 0%, #9333EA 50%, #F472B6 100%)',
    ctaGradient: theme === 'dark'
      ? 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)'
      : 'linear-gradient(135deg, #9333ea 0%, #f472b6 100%)',
    submitGradient: theme === 'dark'
      ? 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)'
      : 'linear-gradient(135deg, #9333EA 0%, #F472B6 100%)'
  }), [theme]);
=======
  ];

  // Colores dinámicos según el tema
  const bgGradient = theme === 'dark'
    ? 'linear-gradient(to bottom, rgba(88, 28, 135, 0.92) 0%, rgba(76, 29, 149, 0.9) 50%, rgba(17, 24, 39, 0.8) 100%)'
    : 'linear-gradient(to bottom, rgba(243, 232, 255, 0.92) 0%, rgba(233, 213, 255, 0.9) 50%, rgba(255, 255, 255, 0.8) 100%)';

  const textPrimary = theme === 'dark' ? '#ffffff' : '#111827';
  const textSecondary = theme === 'dark' ? '#d1d5db' : '#4b5563';
  const cardBg = theme === 'dark' ? 'rgba(31, 41, 55, 0.5)' : 'rgba(255, 255, 255, 1)';
  const cardBorder = theme === 'dark' ? 'rgba(75, 85, 99, 1)' : 'rgba(229, 231, 235, 1)';
  const iconBg = theme === 'dark' ? '#7c3aed' : '#9333ea';
  const inputBg = theme === 'dark' ? 'rgba(31, 41, 55, 1)' : 'rgba(255, 255, 255, 1)';
  const inputBorder = theme === 'dark' ? 'rgba(75, 85, 99, 1)' : 'rgba(229, 231, 235, 1)';
  const inputFocusBorder = theme === 'dark' ? '#a78bfa' : '#9333ea';
  const labelColor = theme === 'dark' ? '#f3f4f6' : '#1f2937';
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453

  return (
    <section 
      id="contact" 
      className="py-20 px-4 relative overflow-hidden transition-all duration-500"
<<<<<<< HEAD
      style={{ background: styles.bgGradient }}
    >
      {/* Three.js 3D Background optimizado */}
      {typeof window !== 'undefined' && (
        <div className={`absolute inset-0 transition-opacity duration-500 ${theme === 'dark' ? 'opacity-30' : 'opacity-20'}`}>
          <Canvas 
            camera={{ position: [0, 0, 6], fov: 75 }}
            dpr={isMobile ? [1, 1.5] : [1, 2]}
            performance={{ min: 0.5 }}
            gl={{
              antialias: !isMobile,
              powerPreference: isMobile ? 'low-power' : 'high-performance'
            }}
          >
            <ambientLight intensity={theme === 'dark' ? 1 : 1.5} />
            <directionalLight position={[5, 5, 5]} intensity={theme === 'dark' ? 2 : 2.5} />
            {/* PointLights solo en desktop */}
            {!isMobile && (
              <>
                <pointLight position={[-5, -5, -5]} intensity={1.2} color={theme === 'dark' ? '#10B981' : '#22C55E'} />
                <pointLight position={[5, 5, 5]} intensity={1} color={theme === 'dark' ? '#3B82F6' : '#60A5FA'} />
              </>
            )}
            <AnimatedCones theme={theme} isMobile={isMobile} />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              autoRotate 
              autoRotateSpeed={0.3}
            />
          </Canvas>
        </div>
      )}
=======
      style={{ background: bgGradient }}
    >
      {/* Three.js 3D Background - Conos flotantes */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${theme === 'dark' ? 'opacity-30' : 'opacity-20'}`}>
        <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
          <ambientLight intensity={theme === 'dark' ? 1 : 1.5} />
          <directionalLight position={[5, 5, 5]} intensity={theme === 'dark' ? 2 : 2.5} />
          <pointLight position={[-5, -5, -5]} intensity={1.2} color={theme === 'dark' ? '#10B981' : '#22C55E'} />
          <pointLight position={[5, 5, 5]} intensity={1} color={theme === 'dark' ? '#3B82F6' : '#60A5FA'} />
          <Suspense fallback={null}>
            <AnimatedCones />
          </Suspense>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate 
            autoRotateSpeed={0.3}
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
            className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent"
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
            {t('contact.title')}
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
          <motion.p 
            className="mt-6 text-lg max-w-2xl mx-auto transition-colors duration-300"
<<<<<<< HEAD
            style={{ color: styles.textSecondary }}
=======
            style={{ color: textSecondary }}
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {t('contact.subtitle')}
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h3 
              className="text-3xl font-bold transition-colors duration-300"
<<<<<<< HEAD
              style={{ color: styles.textPrimary }}
=======
              style={{ color: textPrimary }}
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
            >
              {t('contact.info')}
            </h3>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.link}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center gap-4 p-4 rounded-xl shadow-lg transition-all duration-300"
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
                  <div 
                    className="p-3 rounded-lg text-white transition-colors duration-300"
<<<<<<< HEAD
                    style={{ backgroundColor: styles.iconBg }}
=======
                    style={{ backgroundColor: iconBg }}
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
                  >
                    {info.icon}
                  </div>
                  <div>
                    <p 
                      className="text-sm font-medium transition-colors duration-300"
<<<<<<< HEAD
                      style={{ color: styles.iconBg }}
=======
                      style={{ color: iconBg }}
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
                    >
                      {info.title}
                    </p>
                    <p 
                      className="text-lg font-semibold transition-colors duration-300"
<<<<<<< HEAD
                      style={{ color: styles.textPrimary }}
=======
                      style={{ color: textPrimary }}
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
                    >
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-2xl text-white shadow-xl transition-colors duration-300"
              style={{
<<<<<<< HEAD
                background: styles.ctaGradient
=======
                background: theme === 'dark'
                  ? 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)'
                  : 'linear-gradient(135deg, #9333ea 0%, #f472b6 100%)'
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
              }}
            >
              <h4 className="text-xl font-bold mb-2">{t('contact.cta.title')}</h4>
              <p className="text-sm opacity-90">
                {t('contact.cta.description')}
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm font-medium mb-2 transition-colors duration-300"
<<<<<<< HEAD
                  style={{ color: styles.labelColor }}
=======
                  style={{ color: labelColor }}
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
                >
                  {t('contact.form.name')}
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300"
                  style={{
<<<<<<< HEAD
                    backgroundColor: styles.inputBg,
                    color: styles.textPrimary,
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: styles.inputBorder
                  }}
                  onFocus={(e) => e.target.style.borderColor = styles.inputFocusBorder}
                  onBlur={(e) => e.target.style.borderColor = styles.inputBorder}
=======
                    backgroundColor: inputBg,
                    color: textPrimary,
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: inputBorder
                  }}
                  onFocus={(e) => e.target.style.borderColor = inputFocusBorder}
                  onBlur={(e) => e.target.style.borderColor = inputBorder}
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
                  placeholder={t('contact.form.namePlaceholder')}
                />
              </div>

              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium mb-2 transition-colors duration-300"
<<<<<<< HEAD
                  style={{ color: styles.labelColor }}
=======
                  style={{ color: labelColor }}
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
                >
                  {t('contact.form.email')}
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300"
                  style={{
<<<<<<< HEAD
                    backgroundColor: styles.inputBg,
                    color: styles.textPrimary,
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: styles.inputBorder
                  }}
                  onFocus={(e) => e.target.style.borderColor = styles.inputFocusBorder}
                  onBlur={(e) => e.target.style.borderColor = styles.inputBorder}
=======
                    backgroundColor: inputBg,
                    color: textPrimary,
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: inputBorder
                  }}
                  onFocus={(e) => e.target.style.borderColor = inputFocusBorder}
                  onBlur={(e) => e.target.style.borderColor = inputBorder}
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
                  placeholder={t('contact.form.emailPlaceholder')}
                />
              </div>

              <div>
                <label 
                  htmlFor="message" 
                  className="block text-sm font-medium mb-2 transition-colors duration-300"
<<<<<<< HEAD
                  style={{ color: styles.labelColor }}
=======
                  style={{ color: labelColor }}
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
                >
                  {t('contact.form.message')}
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300 resize-none"
                  style={{
<<<<<<< HEAD
                    backgroundColor: styles.inputBg,
                    color: styles.textPrimary,
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: styles.inputBorder
                  }}
                  onFocus={(e) => e.target.style.borderColor = styles.inputFocusBorder}
                  onBlur={(e) => e.target.style.borderColor = styles.inputBorder}
=======
                    backgroundColor: inputBg,
                    color: textPrimary,
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: inputBorder
                  }}
                  onFocus={(e) => e.target.style.borderColor = inputFocusBorder}
                  onBlur={(e) => e.target.style.borderColor = inputBorder}
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
                  placeholder={t('contact.form.messagePlaceholder')}
                />
              </div>

              <motion.button
                type="submit"
<<<<<<< HEAD
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 shadow-lg transition-opacity"
                style={{ 
                  background: styles.submitGradient,
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
                whileHover={!isSubmitting ? { 
=======
                className="w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 shadow-lg"
                style={{ 
                  background: theme === 'dark'
                    ? 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)'
                    : 'linear-gradient(135deg, #9333EA 0%, #F472B6 100%)'
                }}
                whileHover={{ 
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
                  scale: 1.02, 
                  boxShadow: theme === 'dark'
                    ? '0 20px 40px rgba(124, 58, 237, 0.4)'
                    : '0 20px 40px rgba(147, 51, 234, 0.4)'
<<<<<<< HEAD
                } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    {t('contact.form.sending')}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t('contact.form.submit')}
                  </>
                )}
              </motion.button>

              {/* Mensaje de estado */}
              <AnimatePresence>
                {submitStatus.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-4 rounded-xl flex items-center gap-3 ${
                      submitStatus.type === 'success'
                        ? 'bg-green-500/20 border-2 border-green-500'
                        : 'bg-red-500/20 border-2 border-red-500'
                    }`}
                  >
                    {submitStatus.type === 'success' ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500" />
                    )}
                    <p
                      className="font-medium"
                      style={{
                        color: submitStatus.type === 'success'
                          ? '#22c55e'
                          : '#ef4444'
                      }}
                    >
                      {submitStatus.message}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
=======
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-5 h-5" />
                {t('contact.form.submit')}
              </motion.button>
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}