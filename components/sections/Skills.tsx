'use client';

import { motion } from 'framer-motion';
import { Code, Database, Palette, Globe, Server, Smartphone } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Box, MeshDistortMaterial, Stars } from '@react-three/drei';
import { Suspense } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

// Componente 3D para Skills - Cubos flotantes
function AnimatedCubes() {
  const { theme } = useTheme();

  // Colores según el tema
  const colors = theme === 'dark' 
    ? ['#00D9FF', '#7C3AED', '#EC4899', '#F59E0B']
    : ['#06B6D4', '#9333EA', '#F472B6', '#F59E0B'];

  return (
    <>
      {/* Estrellas de fondo adaptativas */}
      <Stars 
        radius={100} 
        depth={50} 
        count={theme === 'dark' ? 3000 : 2000} 
        factor={4} 
        saturation={theme === 'dark' ? 0 : 0.4} 
        fade 
        speed={1} 
      />

      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
        <Box args={[1, 1, 1]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color={colors[0]}
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.1}
            metalness={0.8}
          />
        </Box>
      </Float>

      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.2}>
        <Box args={[0.8, 0.8, 0.8]} position={[2, 1, -1]} rotation={[0.5, 0.5, 0]}>
          <MeshDistortMaterial
            color={colors[1]}
            attach="material"
            distort={0.3}
            speed={1.5}
            roughness={0.1}
            metalness={0.8}
          />
        </Box>
      </Float>

      <Float speed={1.8} rotationIntensity={0.7} floatIntensity={1.3}>
        <Box args={[0.6, 0.6, 0.6]} position={[-2, -0.5, 0]} rotation={[0.3, 0.8, 0.2]}>
          <MeshDistortMaterial
            color={colors[2]}
            attach="material"
            distort={0.5}
            speed={1.8}
            roughness={0.1}
            metalness={0.8}
          />
        </Box>
      </Float>

      <Float speed={2.2} rotationIntensity={0.9} floatIntensity={1.6}>
        <Box args={[0.5, 0.5, 0.5]} position={[1, -1.5, 1]} rotation={[0.8, 0.3, 0.5]}>
          <MeshDistortMaterial
            color={colors[3]}
            attach="material"
            distort={0.6}
            speed={2.2}
            roughness={0.1}
            metalness={0.8}
          />
        </Box>
      </Float>
    </>
  );
}

export default function Skills() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const skillCategories = [
    {
      category: 'Frontend',
      icon: <Code className="w-6 h-6" />,
      skills: [
        { name: 'React / Next.js', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'Tailwind CSS', level: 95 },
        { name: 'HTML & CSS', level: 95 },
      ],
    },
    {
      category: 'Backend',
      icon: <Server className="w-6 h-6" />,
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'PHP', level: 80 },
        { name: 'Python', level: 75 },
        { name: 'API REST', level: 90 },
      ],
    },
    {
      category: 'Database',
      icon: <Database className="w-6 h-6" />,
      skills: [
        { name: 'MongoDB', level: 85 },
        { name: 'PostgreSQL', level: 80 },
        { name: 'SSMS', level: 75 },
        { name: 'MySQL', level: 80 },
      ],
    },
    {
      category: 'DevOps',
      icon: <Globe className="w-6 h-6" />,
      skills: [
        { name: 'Git & GitHub', level: 90 },
        { name: 'Docker', level: 75 },
        { name: 'AWS', level: 70 },
        { name: 'CI/CD', level: 75 },
      ],
    },
  ];

  // Colores dinámicos según el tema
  const bgGradient = theme === 'dark'
    ? 'linear-gradient(to bottom, rgba(17, 24, 39, 0.85) 0%, rgba(31, 41, 55, 0.8) 100%)'
    : 'linear-gradient(to bottom, rgba(249, 250, 251, 0.85) 0%, rgba(255, 255, 255, 0.8) 100%)';

  const textPrimary = theme === 'dark' ? '#ffffff' : '#111827';
  const textSecondary = theme === 'dark' ? '#d1d5db' : '#4b5563';
  const cardBg = theme === 'dark' ? 'rgba(31, 41, 55, 0.5)' : 'rgba(255, 255, 255, 1)';
  const cardBorder = theme === 'dark' ? 'rgba(75, 85, 99, 0.5)' : 'rgba(229, 231, 235, 1)';
  const iconBg = theme === 'dark' ? '#7c3aed' : '#9333ea';
  const progressBg = theme === 'dark' ? '#374151' : '#e5e7eb';
  const ctaBg = theme === 'dark' ? '#7c3aed' : '#9333ea';
  const badgeBg = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)';

  return (
    <section 
      id="skills" 
      className="py-20 px-4 relative overflow-hidden transition-all duration-500"
      style={{ background: bgGradient }}
    >
      {/* Three.js 3D Background - Cubos flotantes */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${theme === 'dark' ? 'opacity-40' : 'opacity-30'}`}>
        <Canvas camera={{ position: [0, 0, 7], fov: 75 }}>
          <ambientLight intensity={theme === 'dark' ? 1 : 1.5} />
          <directionalLight position={[10, 10, 5]} intensity={theme === 'dark' ? 2 : 2.5} />
          <pointLight position={[-10, -10, -5]} intensity={1.2} color={theme === 'dark' ? '#7C3AED' : '#9333EA'} />
          <pointLight position={[10, -10, 5]} intensity={1} color={theme === 'dark' ? '#EC4899' : '#F472B6'} />
          <Suspense fallback={null}>
            <AnimatedCubes />
          </Suspense>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate 
            autoRotateSpeed={0.4}
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
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent"
            style={{ 
              backgroundImage: theme === 'dark'
                ? 'linear-gradient(135deg, #00D9FF 0%, #7C3AED 30%, #EC4899 60%, #F59E0B 100%)'
                : 'linear-gradient(135deg, #06B6D4 0%, #9333EA 30%, #F472B6 60%, #F59E0B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {t('skills.title')}
          </motion.h2>
          
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
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)'
              }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatDelay: 1,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          
          <motion.p 
            className="mt-6 text-lg max-w-2xl mx-auto font-medium transition-colors duration-300"
            style={{ color: textSecondary }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {t('skills.subtitle')}
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                duration: 0.5, 
                delay: categoryIndex * 0.1,
                type: "spring",
                stiffness: 100
              }}
              className="p-6 rounded-2xl shadow-lg transition-all duration-300"
              style={{
                backgroundColor: cardBg,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: cardBorder
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
            >
              {/* Category Header */}
              <motion.div 
                className="flex items-center gap-3 mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div 
                  className="p-3 rounded-lg text-white transition-colors duration-300"
                  style={{ backgroundColor: iconBg }}
                >
                  {category.icon}
                </div>
                <h3 
                  className="text-2xl font-bold transition-colors duration-300"
                  style={{ color: textPrimary }}
                >
                  {category.category}
                </h3>
              </motion.div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span 
                        className="text-sm font-medium transition-colors duration-300"
                        style={{ color: textSecondary }}
                      >
                        {skill.name}
                      </span>
                      <motion.span 
                        className="text-sm font-semibold transition-colors duration-300"
                        style={{ color: iconBg }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                      >
                        {skill.level}%
                      </motion.span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div 
                      className="w-full h-2 rounded-full overflow-hidden transition-colors duration-300"
                      style={{ backgroundColor: progressBg }}
                    >
                      <motion.div
                        className="h-full rounded-full relative"
                        style={{
                          background: theme === 'dark'
                            ? 'linear-gradient(90deg, #7C3AED 0%, #00D9FF 100%)'
                            : 'linear-gradient(90deg, #9333EA 0%, #06B6D4 100%)'
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 1, 
                          delay: categoryIndex * 0.1 + skillIndex * 0.1,
                          ease: "easeOut"
                        }}
                      >
                        {/* Shine effect */}
                        <motion.div
                          className="absolute inset-0"
                          style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)'
                          }}
                          initial={{ x: '-100%' }}
                          whileInView={{ x: '100%' }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 1.5, 
                            delay: categoryIndex * 0.1 + skillIndex * 0.1 + 0.5,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center p-8 rounded-2xl shadow-lg transition-colors duration-300"
          style={{ backgroundColor: ctaBg }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {t('skills.learning.title')}
          </h3>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            {t('skills.learning.description')}
          </p>
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {['GraphQL', 'Three.js', 'WebGL', 'AI/ML', 'Blockchain'].map((tech, index) => (
              <motion.span
                key={tech}
                className="px-4 py-2 backdrop-blur-sm rounded-full text-white text-sm font-medium transition-colors duration-300"
                style={{ backgroundColor: badgeBg }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.1, 
                  backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.5)'
                }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
