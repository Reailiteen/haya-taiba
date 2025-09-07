'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import content from '../../public/content.json';

const LogoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="logo" className="py-12 sm:py-16 md:py-20 bg-blue-50" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 md:mb-8">
              {content.logoSection.title}
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-6 md:mb-8">
              {content.logoSection.content}
            </p>

            {/* Colors List */}
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                ألوان الشعار ومعانيها:
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-4 h-4 rounded-full pillar-orange"></div>
                  <span className="text-sm sm:text-base text-gray-700">الركن العاطفي</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-4 h-4 rounded-full pillar-yellow"></div>
                  <span className="text-sm sm:text-base text-gray-700">الركن الاجتماعي</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-4 h-4 rounded-full pillar-green"></div>
                  <span className="text-sm sm:text-base text-gray-700">الركن الجسدي</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-4 h-4 rounded-full pillar-blue"></div>
                  <span className="text-sm sm:text-base text-gray-700">الركن الفكري</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-4 h-4 rounded-full pillar-purple"></div>
                  <span className="text-sm sm:text-base text-gray-700">الركن الروحي</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Logo Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Animated Background Circle */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #FF6B35, #FFD23F, #4ECDC4, #45B7D1, #8E44AD, #FF6B35)'
                }}
              />
              
              {/* Logo Container */}
              <div className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-white rounded-full flex items-center justify-center shadow-2xl">
                <Image
                  src="/assets/logo.webp"
                  alt="شعار مبادرة الحياة الطيبة"
                  width={200}
                  height={200}
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LogoSection;

