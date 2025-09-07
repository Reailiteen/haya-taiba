'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import content from '../../public/content.json';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('introduction');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = content.navigation.items;
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Scroll the target into the middle of the viewport for better focus
      element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      setIsMobileMenuOpen(false);
    }
  };

  const goToHero = () => {
    // Scroll the beginning/top of the hero into view and account for fixed navbar height
    const heroEl = document.getElementById('hero') || document.getElementById('introduction');
    if (heroEl) {
      const nav = document.querySelector('nav');
      const navHeight = nav ? (nav as HTMLElement).offsetHeight : 0;
      const top = heroEl.getBoundingClientRect().top + window.scrollY - navHeight - 8; // small gap
      window.scrollTo({ top, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-100/80 shadow-md backdrop-blur-md border-b border-gray-200'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-6">
  <div className="flex items-center justify-between h-16 lg:h-24">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 cursor-pointer"
            onClick={goToHero}
            role="button"
            aria-label="Go to hero"
          >
            {!logoError ? (
              <Image
                src="/assets/wellbeing-logo-refined.png"
                alt="مبادرة الحياة الطيبة"
                width={140}
                height={48}
                className="h-10 lg:h-12 w-auto"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-100/60 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600">
                  <path d="M2 12a2 2 0 012-2h3.2l.8-3.2A2 2 0 0110 5h.2a4 4 0 013.9 3.2l.6 3.2H20a2 2 0 012 2v1a2 2 0 01-2 2h-6.2l-1 3.2a2 2 0 01-1.9 1.4H9a2 2 0 01-2-2v-8H4a2 2 0 01-2-2z" />
                </svg>
              </div>
            )}
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 space-x-reverse">
            {content.navigation.items.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`text-base lg:text-lg xl:text-xl font-semibold transition-colors duration-200 hover:text-blue-600 ${
                  activeSection === item.id
                    ? 'text-blue-600'
                    : isScrolled
                    ? 'text-gray-700'
                    : 'text-white'
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Utility Links */}
          <div className="hidden lg:flex items-center space-x-6 space-x-reverse">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`text-base font-semibold transition-colors duration-200 hover:text-blue-600 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              EN
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-lg transition-colors duration-200 hover:bg-blue-50 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0, 
            height: isMobileMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden bg-white shadow-lg rounded-lg mt-2"
        >
          <div className="py-4 space-y-2">
            {content.navigation.items.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isMobileMenuOpen ? 1 : 0, 
                  x: isMobileMenuOpen ? 0 : -20 
                }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`block w-full text-right px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 ${
                  activeSection === item.id ? 'bg-blue-50 text-blue-600' : ''
                }`}
              >
                {item.label}
              </motion.button>
            ))}
            
            <div className="border-t border-gray-200 pt-2 mt-2">
              <button className="block w-full text-right px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                EN
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navigation;

