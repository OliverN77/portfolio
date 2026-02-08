'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ArrowUp, Twitter, Instagram } from 'lucide-react';
import { useMemo, useCallback } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  // Memoizar función scrollToTop
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Memoizar socialLinks para evitar recreación
  const socialLinks = useMemo(() => [
    { icon: <Github className="w-5 h-5" />, href: 'https://github.com/OliverN77', label: 'GitHub' },
    { icon: <Linkedin className="w-5 h-5" />, href: 'https://www.linkedin.com/in/oliver-nieto-b33127383/', label: 'LinkedIn' },
    { icon: <Twitter className="w-5 h-5" />, href: 'https://x.com/OliverN30678667', label: 'Twitter' },
    { icon: <Instagram className="w-5 h-5" />, href: 'https://www.instagram.com/oli.n__/', label: 'Instagram' },
    { icon: <Mail className="w-5 h-5" />, href: 'mailto:olivernie2626@gmail.com', label: 'Email' },
  ], []);

  // Memoizar quickLinks para evitar recreación
  const quickLinks = useMemo(() => [
    { name: t('nav.home'), href: '#hero' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.contact'), href: '#contact' },
  ], [t]);

  // Colores dinámicos memoizados
  const styles = useMemo(() => ({
    bgFooter: theme === 'dark' ? '#000000' : '#ffffff',
    textFooter: theme === 'dark' ? '#ffffff' : '#1f2937',
    textSecondary: theme === 'dark' ? '#9ca3af' : '#6b7280',
    cardBg: theme === 'dark' ? '#374151' : '#f3e8ff',
    cardText: theme === 'dark' ? '#d1d5db' : '#581c87',
    dividerColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
    linkHoverColor: theme === 'dark' ? '#a78bfa' : '#7c3aed',
    mailIconColor: theme === 'dark' ? '#a78bfa' : '#7c3aed',
    titleGradient: theme === 'dark'
      ? 'linear-gradient(135deg, #7C3AED 0%, #EC4899 50%, #00D9FF 100%)'
      : 'linear-gradient(135deg, #9333EA 0%, #F472B6 50%, #22D3EE 100%)',
    buttonGradient: theme === 'dark'
      ? 'linear-gradient(to right, #9333ea, #ec4899)'
      : 'linear-gradient(to right, #a855f7, #f472b6)',
    dividerGradient: (color: string) => `linear-gradient(to right, transparent, ${color}, transparent)`,
    wavePath1Fill: theme === 'dark' ? '#1f2937' : '#ddd6fe',
    wavePath2Fill: theme === 'dark' ? '#374151' : '#fbcfe8',
    wavePath3Fill: theme === 'dark' ? '#4b5563' : '#cffafe',
    orb1Bg: theme === 'dark' ? 'rgba(124, 58, 237, 0.1)' : 'rgba(196, 181, 253, 0.3)',
    orb2Bg: theme === 'dark' ? 'rgba(236, 72, 153, 0.1)' : 'rgba(251, 207, 232, 0.3)',
    orb3Bg: theme === 'dark' ? 'rgba(0, 217, 255, 0.1)' : 'rgba(207, 250, 254, 0.3)',
    orbMixBlend: theme === 'dark' ? 'lighten' : 'multiply',
    orbOpacity: theme === 'dark' ? 0.3 : 0.7
  }), [theme]);

  return (
    <footer 
      className="relative overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: styles.bgFooter,
        color: styles.textFooter
      }}
    >
      {/* Decorative top wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg 
          className="relative block w-full h-12" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <motion.path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25" 
            className="transition-colors duration-300"
            fill={styles.wavePath1Fill}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity=".5" 
            className="transition-colors duration-300"
            fill={styles.wavePath2Fill}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.2, ease: "easeInOut" }}
          />
          <motion.path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            className="transition-colors duration-300"
            fill={styles.wavePath3Fill}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.4, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div className="relative pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-2"
            >
              <h3 
                className="text-3xl font-bold mb-4 bg-clip-text text-transparent"
                style={{
                  backgroundImage: styles.titleGradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {t('footer.name')}
              </h3>
              <p 
                className="mb-6 leading-relaxed max-w-md transition-colors duration-300"
                style={{ color: styles.textSecondary }}
              >
                {t('footer.description')}
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full hover:shadow-lg transition-all duration-300"
                    style={{
                      backgroundColor: styles.cardBg,
                      color: styles.cardText
                    }}
                    aria-label={social.label}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 
                className="text-lg font-semibold mb-4 transition-colors duration-300"
                style={{ color: styles.textFooter }}
              >
                {t('footer.quickLinks')}
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <a
                      href={link.href}
                      className="hover:translate-x-1 transition-all duration-300 inline-block"
                      style={{ 
                        color: styles.textSecondary,
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = styles.linkHoverColor}
                      onMouseLeave={(e) => e.currentTarget.style.color = styles.textSecondary}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 
                className="text-lg font-semibold mb-4 transition-colors duration-300"
                style={{ color: styles.textFooter }}
              >
                {t('contact.title')}
              </h4>
              <ul 
                className="space-y-3 transition-colors duration-300"
                style={{ color: styles.textSecondary }}
              >
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" style={{ color: styles.mailIconColor }} />
                  <a 
                    href="mailto:olivernie2626@gmail.com" 
                    className="transition-colors"
                    onMouseEnter={(e) => e.currentTarget.style.color = styles.linkHoverColor}
                    onMouseLeave={(e) => e.currentTarget.style.color = styles.textSecondary}
                  >
                    olivernie2626@gmail.com
                  </a>
                </li>
                <li className="text-sm leading-relaxed">
                  Medellín, Colombia
                </li>
                <li className="text-sm">
                  {t('footer.availability')}
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full h-px mb-8 transition-colors duration-300"
            style={{
              background: styles.dividerGradient(styles.dividerColor)
            }}
          />

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-sm flex items-center gap-2 transition-colors duration-300"
              style={{ color: styles.textSecondary }}
            >
              {t('footer.copyright').replace('{year}', new Date().getFullYear().toString())}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              </motion.span>
              {t('footer.and')}
            </motion.p>

            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              className="px-6 py-2 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 cursor-pointer"
              style={{
                background: styles.buttonGradient
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('footer.backToTop')}
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Decorative gradient orbs */}
      <div 
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full filter blur-3xl animate-blob transition-all duration-300"
        style={{
          backgroundColor: styles.orb1Bg,
          mixBlendMode: styles.orbMixBlend as any,
          opacity: styles.orbOpacity
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-64 h-64 rounded-full filter blur-3xl animate-blob animation-delay-2000 transition-all duration-300"
        style={{
          backgroundColor: styles.orb2Bg,
          mixBlendMode: styles.orbMixBlend as any,
          opacity: styles.orbOpacity
        }}
      />
      <div 
        className="absolute bottom-20 left-1/2 w-64 h-64 rounded-full filter blur-3xl animate-blob animation-delay-4000 transition-all duration-300"
        style={{
          backgroundColor: styles.orb3Bg,
          mixBlendMode: styles.orbMixBlend as any,
          opacity: styles.orbOpacity
        }}
      />
    </footer>
  );
}