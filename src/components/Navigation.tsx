'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import content from '../../public/content.json';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('introduction');
  const [logoError, setLogoError] = useState(false);

  // Debug info
  console.log('Navigation render - logoError:', logoError);

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
      // Trigger animation reset by dispatching a custom event
      window.dispatchEvent(new CustomEvent('triggerSectionAnimation', { detail: { sectionId } }));
      
      // Small delay to ensure animation reset before scrolling
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      }, 50);
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
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ease-in-out ${
        isScrolled
          ? 'bg-white/75 shadow-lg backdrop-blur-md border-b border-gray-200'
          : 'bg-black/70 shadow-md backdrop-blur-sm'
      }`}
    >
      {/* Logo - moved to the right */}
          
      <div className="container mx-auto px-4 lg:px-6">
        
        <div className="flex items-center justify-between h-21 lg:h-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 cursor-pointer"
            onClick={goToHero}
            role="button"
            aria-label="Go to hero"
          >
            {!logoError ? (
              <Image
                src="/logo_slogan_no_bg_corrected.png"
                alt="مبادرة الحياة الطيبة"
                width={140}
                height={48}
                className="h-20 w-auto"
                priority
                onError={() => {
                  console.log('Logo failed to load, switching to fallback');
                  setLogoError(true);
                }}
                onLoad={() => console.log('Logo loaded successfully')}
              />
            ) : (
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                </svg>
              </div>
            )}
          </motion.div>
          {/* Navigation */}
          <div className="flex items-center space-x-8 space-x-reverse">
            {content.navigation.items.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`text-base lg:text-lg xl:text-xl font-semibold transition-all duration-1000 ease-in-out hover:scale-105 ${
                  activeSection === item.id
                    ? isScrolled 
                      ? 'text-blue-600 font-bold' 
                      : 'text-blue-400 font-bold'
                    : isScrolled
                    ? 'text-gray-800 hover:text-blue-600'
                    : 'text-white hover:text-blue-400'
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;

