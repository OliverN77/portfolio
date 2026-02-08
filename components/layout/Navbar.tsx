'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
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

    // Memoizar navLinks para evitar recreación
    const navLinks = useMemo(() => [
        { name: t('nav.home'), href: '#hero' },
        { name: t('nav.about'), href: '#about' },
        { name: t('nav.skills'), href: '#skills' },
        { name: t('nav.projects'), href: '#projects' },
        { name: t('nav.contact'), href: '#contact' },
    ], [t]);

    // Memoizar languages array
    const languages = useMemo(() => [
        { name: 'Español', flag: '🇪🇸', code: 'es' as Language },
        { name: 'English (US)', flag: '🇺🇸', code: 'en' as Language },
        { name: 'Deutsch', flag: '🇩🇪', code: 'de' as Language },
        { name: 'Italiano', flag: '🇮🇹', code: 'it' as Language },
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
    }, [navLinks]);

    // Memoizar scrollToSection con useCallback
    const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setActiveSection(href);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    }, []);

    // Memoizar handleLanguageSelect con useCallback
    const handleLanguageSelect = useCallback((langCode: Language) => {
        setLanguage(langCode);
        setIsLanguageOpen(false);
    }, [setLanguage]);

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
                backgroundColor: styles.bgColor,
            } : {}}
        >
            <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <motion.span
                        className="self-center text-xl font-semibold whitespace-nowrap transition-colors duration-300"
                        style={{
                            color: scrolled ? styles.textColor : 'white'
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
                                backgroundColor: styles.buttonBg,
                                color: styles.textColor,
                                borderColor: styles.borderColor
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
                                        backgroundColor: styles.dropdownBg,
                                        borderColor: styles.borderColor
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
                            backgroundColor: styles.buttonBg,
                            color: styles.textColor
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
                            backgroundColor: styles.bgColor,
                            borderColor: styles.borderColor
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
