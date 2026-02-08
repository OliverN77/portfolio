'use client';

<<<<<<< HEAD
import { useState, useEffect, useMemo, useCallback } from 'react';
=======
import { useState, useEffect } from 'react';
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/lib/translations';

export default function Navbar() {
    const { theme } = useTheme();
    const { language, setLanguage, t } = useLanguage();
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('#hero');
    const [scrolled, setScrolled] = useState(false);

<<<<<<< HEAD
    // Memoizar navLinks para evitar recreación
    const navLinks = useMemo(() => [
=======
    const navLinks = [
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
        { name: t('nav.home'), href: '#hero' },
        { name: t('nav.about'), href: '#about' },
        { name: t('nav.skills'), href: '#skills' },
        { name: t('nav.projects'), href: '#projects' },
        { name: t('nav.contact'), href: '#contact' },
<<<<<<< HEAD
    ], [t]);

    // Memoizar languages array
    const languages = useMemo(() => [
=======
    ];

    const languages = [
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
        { name: 'Español', flag: '🇪🇸', code: 'es' as Language },
        { name: 'English (US)', flag: '🇺🇸', code: 'en' as Language },
        { name: 'Deutsch', flag: '🇩🇪', code: 'de' as Language },
        { name: 'Italiano', flag: '🇮🇹', code: 'it' as Language },
<<<<<<< HEAD
    ], []);

    // Memoizar selectedLanguageName
    const selectedLanguageName = useMemo(() => 
        languages.find(l => l.code === language)?.name || 'Español',
        [languages, language]
    );

    // Memoizar estilos según el tema
    const styles = useMemo(() => ({
        bgColor: theme === 'dark' ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        textColor: theme === 'dark' ? '#ffffff' : '#111827',
        buttonBg: theme === 'dark' ? 'rgba(31, 41, 55, 0.5)' : 'rgba(255, 255, 255, 0.5)',
        borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
        dropdownBg: theme === 'dark' ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)'
    }), [theme]);
=======
    ];

    const selectedLanguageName = languages.find(l => l.code === language)?.name || 'Español';
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            const sections = navLinks.map(link => link.href.substring(1));
            const scrollPosition = window.scrollY + 100;

            for (const sectionId of sections) {
                const section = document.getElementById(sectionId);
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        setActiveSection(`#${sectionId}`);
                        break;
                    }
                }
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
<<<<<<< HEAD
    }, [navLinks]);

    // Memoizar scrollToSection con useCallback
    const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
=======
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
        e.preventDefault();
        setActiveSection(href);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
<<<<<<< HEAD
    }, []);

    // Memoizar handleLanguageSelect con useCallback
    const handleLanguageSelect = useCallback((langCode: Language) => {
        setLanguage(langCode);
        setIsLanguageOpen(false);
    }, [setLanguage]);
=======
    };

    const handleLanguageSelect = (langCode: Language) => {
        setLanguage(langCode);
        setIsLanguageOpen(false);
    };

    // Colores según el tema
    const bgColor = theme === 'dark' ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.9)';
    const textColor = theme === 'dark' ? '#ffffff' : '#111827';
    const buttonBg = theme === 'dark' ? 'rgba(31, 41, 55, 0.5)' : 'rgba(255, 255, 255, 0.5)';
    const borderColor = theme === 'dark' ? '#374151' : '#e5e7eb';
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            className={`fixed w-full z-50 top-0 start-0 transition-all duration-300 ${
                scrolled 
                    ? 'backdrop-blur-lg shadow-lg' 
                    : 'bg-transparent'
            }`}
            style={scrolled ? {
<<<<<<< HEAD
                backgroundColor: styles.bgColor,
=======
                backgroundColor: bgColor,
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
            } : {}}
        >
            <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <motion.span
                        className="self-center text-xl font-semibold whitespace-nowrap transition-colors duration-300"
                        style={{
<<<<<<< HEAD
                            color: scrolled ? styles.textColor : 'white'
=======
                            color: scrolled ? textColor : 'white'
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {t('nav.portfolio')}
                    </motion.span>
                </Link>

                {/* Theme Toggle, Language Selector & Mobile Menu Button */}
                <div className="flex items-center md:order-2 space-x-3 rtl:space-x-reverse">
                    {/* Theme Toggle */}
                    <ThemeToggle />

                    {/* Language Dropdown */}
                    <div className="relative">
                        <motion.button
                            type="button"
                            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                            className={`flex items-center border transition-all duration-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                                scrolled
                                    ? ''
                                    : 'bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm'
                            }`}
                            style={scrolled ? {
<<<<<<< HEAD
                                backgroundColor: styles.buttonBg,
                                color: styles.textColor,
                                borderColor: styles.borderColor
=======
                                backgroundColor: buttonBg,
                                color: textColor,
                                borderColor: borderColor
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
                            } : {}}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="mr-1.5">{languages.find(l => l.code === language)?.flag}</span>
                            {selectedLanguageName}
                        </motion.button>

                        {/* Dropdown Menu */}
                        <AnimatePresence>
                            {isLanguageOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-2 w-44 rounded-lg shadow-xl border backdrop-blur-lg z-50"
                                    style={{
<<<<<<< HEAD
                                        backgroundColor: styles.dropdownBg,
                                        borderColor: styles.borderColor
=======
                                        backgroundColor: theme === 'dark' ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                                        borderColor: borderColor
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
                                    }}
                                >
                                    <ul className="p-2 text-sm font-medium">
                                        {languages.map((lang) => (
                                            <li key={lang.code}>
                                                <motion.button
                                                    onClick={() => handleLanguageSelect(lang.code)}
                                                    className={`inline-flex items-center w-full p-2 rounded-md transition-colors ${
                                                        language === lang.code
                                                            ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-900 dark:text-purple-100'
                                                            : 'text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                    }`}
                                                    whileHover={{ scale: 1.02, x: 4 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <span className="mr-1.5">{lang.flag}</span>
                                                    {lang.name}
                                                </motion.button>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        type="button"
                        className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
                            scrolled
                                ? ''
                                : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm'
                        }`}
                        style={scrolled ? {
<<<<<<< HEAD
                            backgroundColor: styles.buttonBg,
                            color: styles.textColor
=======
                            backgroundColor: buttonBg,
                            color: textColor
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
                        } : {}}
                        aria-controls="navbar-language"
                        aria-expanded={isMobileMenuOpen}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <span className="sr-only">Open main menu</span>
                        <AnimatePresence mode="wait">
                            {isMobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X className="w-6 h-6" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu className="w-6 h-6" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>

                {/* Desktop Navigation */}
                <div
                    className={`items-center justify-between ${
                        isMobileMenuOpen ? 'block' : 'hidden'
                    } w-full md:flex md:w-auto md:order-1`}
                    id="navbar-language"
                >
                    <ul
                        className={`font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 transition-all duration-300 ${
                            isMobileMenuOpen
                                ? 'backdrop-blur-lg shadow-lg'
                                : 'bg-transparent border-transparent'
                        }`}
                        style={isMobileMenuOpen ? {
<<<<<<< HEAD
                            backgroundColor: styles.bgColor,
                            borderColor: styles.borderColor
=======
                            backgroundColor: bgColor,
                            borderColor: borderColor
>>>>>>> 5d42b2d674391f40d89be814cd669304af02e453
                        } : {}}
                    >
                        {navLinks.map((link, index) => (
                            <motion.li
                                key={link.href}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <motion.a
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    className={`relative block py-2 px-3 rounded-lg transition-all duration-300 group md:py-0 md:px-0 ${
                                        activeSection === link.href
                                            ? scrolled || isMobileMenuOpen
                                                ? 'text-purple-600 dark:text-purple-400 font-semibold'
                                                : 'text-white font-semibold'
                                            : scrolled || isMobileMenuOpen
                                            ? 'text-gray-800 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                                            : 'text-white/90 hover:text-white'
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                >
                                    {link.name}
                                    <motion.span
                                        className={`absolute -bottom-1 left-0 h-0.5 rounded-full ${
                                            scrolled || isMobileMenuOpen ? 'bg-purple-600 dark:bg-purple-400' : 'bg-white'
                                        }`}
                                        initial={{ width: 0 }}
                                        animate={{ width: activeSection === link.href ? '100%' : '0%' }}
                                        transition={{ duration: 0.3 }}
                                    ></motion.span>
                                </motion.a>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.nav>
    );
}
