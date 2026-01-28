'use client';

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

  return (
    <>
      {/* Estrellas de fondo adaptativas */}
      <Stars 
        radius={100} 
        depth={50} 
        count={theme === 'dark' ? 3500 : 2000} 
        factor={4} 
        saturation={theme === 'dark' ? 0 : 0.3} 
        fade 
        speed={1} 
      />

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Cone args={[0.8, 2, 32]} position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <MeshDistortMaterial
            color={colors[0]}
            attach="material"
            distort={0.4}
            speed={1.5}
            roughness={0.1}
            metalness={0.9}
          />
        </Cone>
      </Float>

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

export default function Contact() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
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

  return (
    <section 
      id="contact" 
      className="py-20 px-4 relative overflow-hidden transition-all duration-500"
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
              backgroundImage: theme === 'dark'
                ? 'linear-gradient(135deg, #00D9FF 0%, #7C3AED 30%, #EC4899 60%, #F59E0B 100%)'
                : 'linear-gradient(135deg, #06B6D4 0%, #9333EA 30%, #F472B6 60%, #F59E0B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {t('contact.title')}
          </h2>
          <motion.div 
            className="w-32 h-1.5 mx-auto rounded-full relative overflow-hidden"
            style={{ 
              background: theme === 'dark'
                ? 'linear-gradient(90deg, #00D9FF 0%, #7C3AED 50%, #EC4899 100%)'
                : 'linear-gradient(90deg, #06B6D4 0%, #9333EA 50%, #F472B6 100%)'
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
            style={{ color: textSecondary }}
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
              style={{ color: textPrimary }}
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
                    backgroundColor: cardBg,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: cardBorder
                  }}
                >
                  <div 
                    className="p-3 rounded-lg text-white transition-colors duration-300"
                    style={{ backgroundColor: iconBg }}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <p 
                      className="text-sm font-medium transition-colors duration-300"
                      style={{ color: iconBg }}
                    >
                      {info.title}
                    </p>
                    <p 
                      className="text-lg font-semibold transition-colors duration-300"
                      style={{ color: textPrimary }}
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
                background: theme === 'dark'
                  ? 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)'
                  : 'linear-gradient(135deg, #9333ea 0%, #f472b6 100%)'
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
                  style={{ color: labelColor }}
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
                    backgroundColor: inputBg,
                    color: textPrimary,
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: inputBorder
                  }}
                  onFocus={(e) => e.target.style.borderColor = inputFocusBorder}
                  onBlur={(e) => e.target.style.borderColor = inputBorder}
                  placeholder={t('contact.form.namePlaceholder')}
                />
              </div>

              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium mb-2 transition-colors duration-300"
                  style={{ color: labelColor }}
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
                    backgroundColor: inputBg,
                    color: textPrimary,
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: inputBorder
                  }}
                  onFocus={(e) => e.target.style.borderColor = inputFocusBorder}
                  onBlur={(e) => e.target.style.borderColor = inputBorder}
                  placeholder={t('contact.form.emailPlaceholder')}
                />
              </div>

              <div>
                <label 
                  htmlFor="message" 
                  className="block text-sm font-medium mb-2 transition-colors duration-300"
                  style={{ color: labelColor }}
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
                    backgroundColor: inputBg,
                    color: textPrimary,
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: inputBorder
                  }}
                  onFocus={(e) => e.target.style.borderColor = inputFocusBorder}
                  onBlur={(e) => e.target.style.borderColor = inputBorder}
                  placeholder={t('contact.form.messagePlaceholder')}
                />
              </div>

              <motion.button
                type="submit"
                className="w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 shadow-lg"
                style={{ 
                  background: theme === 'dark'
                    ? 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)'
                    : 'linear-gradient(135deg, #9333EA 0%, #F472B6 100%)'
                }}
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: theme === 'dark'
                    ? '0 20px 40px rgba(124, 58, 237, 0.4)'
                    : '0 20px 40px rgba(147, 51, 234, 0.4)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-5 h-5" />
                {t('contact.form.submit')}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}