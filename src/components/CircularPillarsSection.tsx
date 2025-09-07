'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import content from '../../public/content.json';

interface Pillar {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  image: string;
  card: string;
}

const CircularPillarsSection = () => {
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const pillars: Pillar[] = content.pillars.items;

  const getColorClasses = (color: string) => {
    const colorMap = {
      purple: 'bg-purple-500 hover:bg-purple-600 border-purple-300',
      orange: 'bg-orange-500 hover:bg-orange-600 border-orange-300',
      blue: 'bg-blue-500 hover:bg-blue-600 border-blue-300',
      green: 'bg-green-500 hover:bg-green-600 border-green-300',
      yellow: 'bg-yellow-500 hover:bg-yellow-600 border-yellow-300'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-500 hover:bg-gray-600 border-gray-300';
  };

  const getCircularPosition = (index: number, total: number) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2; // Start from top
    const radius = 120; // Radius of the circle
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  const handlePillarClick = (pillarId: string) => {
    setSelectedPillar(selectedPillar === pillarId ? null : pillarId);
  };

  return (
    <section ref={ref} className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50" id="pillars">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            {content.pillars.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {content.pillars.subtitle}
          </p>
        </motion.div>

        {/* Circular Layout Container */}
        <div className="relative flex justify-center items-center min-h-[600px] md:min-h-[700px]">
          {/* Center Circle */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute z-10 w-24 h-24 md:w-32 md:h-32 wellbeing-gradient rounded-full flex items-center justify-center shadow-lg"
          >
            <span className="text-white text-lg md:text-xl font-bold">الأركان</span>
          </motion.div>

          {/* Pillar Circles */}
          {pillars.map((pillar, index) => {
            const position = getCircularPosition(index, pillars.length);
            const isSelected = selectedPillar === pillar.id;
            
            return (
              <motion.div
                key={pillar.id}
                initial={{ 
                  scale: 0, 
                  opacity: 0,
                  x: 0,
                  y: 0
                }}
                animate={isInView ? {
                  scale: 1,
                  opacity: 1,
                  x: position.x,
                  y: position.y
                } : {
                  scale: 0,
                  opacity: 0,
                  x: 0,
                  y: 0
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.5 + index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="absolute cursor-pointer group"
                onClick={() => handlePillarClick(pillar.id)}
              >
                {/* Pillar Circle */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={isSelected ? { scale: 1.2 } : { scale: 1 }}
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${getColorClasses(pillar.color)} 
                    flex items-center justify-center shadow-lg border-4 border-white
                    transition-all duration-300 relative overflow-hidden`}
                >
                  {/* Ripple Effect */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={isSelected ? { 
                      scale: [0, 1.5, 0], 
                      opacity: [0.5, 0.2, 0] 
                    } : { scale: 0, opacity: 0 }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: isSelected ? Infinity : 0,
                      ease: "easeOut"
                    }}
                    className={`absolute inset-0 rounded-full ${getColorClasses(pillar.color).split(' ')[0]}`}
                  />
                  
                  {/* Icon/Text */}
                  <span className="text-white text-xs md:text-sm font-bold z-10 text-center px-1">
                    {pillar.title.split(' ')[1]}
                  </span>
                </motion.div>

                {/* Pillar Label */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-center"
                >
                  <p className="text-xs md:text-sm font-semibold text-gray-700 whitespace-nowrap">
                    {pillar.title}
                  </p>
                </motion.div>

                {/* Connection Line to Center */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
                  className="absolute top-1/2 left-1/2 h-0.5 bg-gray-300 origin-center"
                  style={{
                    width: `${Math.sqrt(position.x * position.x + position.y * position.y)}px`,
                    transform: `translate(-50%, -50%) rotate(${Math.atan2(position.y, position.x)}rad)`
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Expanded Content */}
        <AnimatePresence mode="wait">
          {selectedPillar && (
            <motion.div
              key={selectedPillar}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="mt-16 bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {(() => {
                const pillar = pillars.find(p => p.id === selectedPillar);
                if (!pillar) return null;

                return (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                    {/* Content Side */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className={`w-12 h-12 rounded-full ${getColorClasses(pillar.color)} 
                          flex items-center justify-center`}>
                          <span className="text-white font-bold">
                            {pillar.title.split(' ')[1]}
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                          {pillar.title}
                        </h3>
                      </div>
                      
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {pillar.description}
                      </p>

                      {/* Close Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedPillar(null)}
                        className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 
                          text-gray-700 rounded-lg transition-colors duration-200"
                      >
                        إغلاق
                      </motion.button>
                    </motion.div>

                    {/* Image Side */}
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="relative h-64 lg:h-full min-h-[300px] rounded-xl overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 
                        flex items-center justify-center">
                        <div className={`w-24 h-24 rounded-full ${getColorClasses(pillar.color)} 
                          flex items-center justify-center shadow-lg`}>
                          <span className="text-white text-2xl font-bold">
                            {pillar.title.split(' ')[1]}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CircularPillarsSection;

