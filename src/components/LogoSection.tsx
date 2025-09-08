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

          {/* Logo / Portrait with semi-circle background */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative w-64 sm:w-80 md:w-96">
              {/* Semicircle: create a full circle and hide the top half so only the bottom semicircle shows */}
              <div className="overflow-hidden h-32 sm:h-40 md:h-48">
                <div
                  className="absolute left-1/2 -translate-x-1/2 -bottom-32 sm:-bottom-40 md:-bottom-48 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #FF6B35 0%, #FFD23F 35%, #4ECDC4 65%, #45B7D1 90%)'
                  }}
                />
              </div>

              {/* Portrait placed on top of the semicircle */}
              <div className="relative flex justify-center">
                <div className="relative z-20 -mt-20 sm:-mt-24 md:-mt-28">
                  {/*
                    NOTE: replace '/assets/portrait.png' with the path of the image you provide.
                    Falls back to the existing logo file if you prefer: swap the src accordingly.
                  */}
                  <Image
                    src="/assets/portrait.png"
                    alt="صورة"
                    width={220}
                    height={220}
                    className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 object-cover rounded-full shadow-2xl shadow-black/20"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LogoSection;

