'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle, XCircle, MessageCircle, Linkedin } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, isEmailJSConfigured } from '@/lib/emailConfig';
import dynamic from 'next/dynamic';
import { memo, useMemo, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/useIsMobile';
import { SiWhatsapp } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

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

      {/* Cono principal - siempre visible */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Cone args={[0.8, 2, config.segments]} position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <MeshDistortMaterial
            color={colors[0]}
            attach="material"
            distort={0.4}
            speed={config.distortSpeed}
            roughness={0.1}
            metalness={0.9}
          />
        </Cone>
      </Float>

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

export default function Contact() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidEmail(formData.email)) {
      setSubmitStatus({
        type: 'error',
        message: t('contact.form.invalidEmail')
      });
      return;
    }

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
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Memoizar contactInfo para evitar recreación
  const contactInfo = useMemo(() => [
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

  return (
    <section 
      id="contact" 
      className="py-20 px-4 relative overflow-hidden transition-all duration-500"
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
            {t('contact.title')}
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
              style={{ color: styles.textPrimary }}
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
                    backgroundColor: styles.cardBg,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: styles.cardBorder
                  }}
                >
                  <div 
                    className="p-3 rounded-lg text-white transition-colors duration-300"
                    style={{ backgroundColor: styles.iconBg }}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <p 
                      className="text-sm font-medium transition-colors duration-300"
                      style={{ color: styles.iconBg }}
                    >
                      {info.title}
                    </p>
                    <p 
                      className="text-lg font-semibold transition-colors duration-300"
                      style={{ color: styles.textPrimary }}
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
                background: styles.ctaGradient
              }}
            >
              <h4 className="text-xl font-bold mb-2">{t('contact.cta.title')}</h4>
              <p className="text-sm opacity-90">
                {t('contact.cta.description')}
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="https://wa.me/573011921747?text=Hola%20Oliver%2C%20vi%20tu%20portafolio..."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-white"
                style={{ backgroundColor: '#25D366' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                aria-label={t('contact.whatsapp')}
              >
                <SiWhatsapp className="w-5 h-5" />
                {t('contact.whatsapp')}
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/oliver-nieto-b33127383/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-white"
                style={{ backgroundColor: '#0A66C2' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                aria-label={t('contact.linkedin')}
              >
                <FaLinkedin className="w-5 h-5" />
                {t('contact.linkedin')}
              </motion.a>
            </div>
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
                  style={{ color: styles.labelColor }}
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
                    backgroundColor: styles.inputBg,
                    color: styles.textPrimary,
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: styles.inputBorder
                  }}
                  onFocus={(e) => e.target.style.borderColor = styles.inputFocusBorder}
                  onBlur={(e) => e.target.style.borderColor = styles.inputBorder}
                  placeholder={t('contact.form.namePlaceholder')}
                />
              </div>

              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium mb-2 transition-colors duration-300"
                  style={{ color: styles.labelColor }}
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
                    backgroundColor: styles.inputBg,
                    color: styles.textPrimary,
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: styles.inputBorder
                  }}
                  onFocus={(e) => e.target.style.borderColor = styles.inputFocusBorder}
                  onBlur={(e) => e.target.style.borderColor = styles.inputBorder}
                  placeholder={t('contact.form.emailPlaceholder')}
                />
              </div>

              <div>
                <label 
                  htmlFor="message" 
                  className="block text-sm font-medium mb-2 transition-colors duration-300"
                  style={{ color: styles.labelColor }}
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
                    backgroundColor: styles.inputBg,
                    color: styles.textPrimary,
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: styles.inputBorder
                  }}
                  onFocus={(e) => e.target.style.borderColor = styles.inputFocusBorder}
                  onBlur={(e) => e.target.style.borderColor = styles.inputBorder}
                  placeholder={t('contact.form.messagePlaceholder')}
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 shadow-lg transition-opacity"
                style={{ 
                  background: styles.submitGradient,
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
                whileHover={!isSubmitting ? { 
                  scale: 1.02, 
                  boxShadow: theme === 'dark'
                    ? '0 20px 40px rgba(124, 58, 237, 0.4)'
                    : '0 20px 40px rgba(147, 51, 234, 0.4)'
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
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}