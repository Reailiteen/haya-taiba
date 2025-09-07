'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CircularNavigationProps {
  totalSlides: number;
  currentSlide: number;
  onSlideChange: (index: number) => void;
  autoPlayProgress: number;
}

const CircularNavigation = ({ 
  totalSlides, 
  currentSlide, 
  onSlideChange, 
  autoPlayProgress 
}: CircularNavigationProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getCircleColor = (index: number) => {
    const colors = [
      'from-purple-500 to-purple-600',
      'from-orange-500 to-orange-600', 
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-yellow-500 to-yellow-600'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="flex items-center justify-center space-x-4 space-x-reverse py-8">
      {Array.from({ length: totalSlides }).map((_, index) => {
        const isActive = index === currentSlide;
        const isPassed = index < currentSlide;
        const isHovered = hoveredIndex === index;

        return (
          <div key={index} className="relative flex items-center">
            {/* Circle */}
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSlideChange(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative w-4 h-4 md:w-5 md:h-5 rounded-full focus:outline-none group"
            >
              {/* Background Circle */}
              <div className="absolute inset-0 rounded-full bg-gray-300 transition-all duration-300" />
              
              {/* Progress Circle (Active) */}
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 rounded-full overflow-hidden"
                >
                  {/* Background */}
                  <div className="absolute inset-0 bg-gray-200 rounded-full" />
                  
                  {/* Progress Fill */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${getCircleColor(index)} rounded-full`}
                    style={{
                      clipPath: `polygon(50% 50%, 50% 0%, ${
                        50 + 50 * Math.cos((autoPlayProgress * 2 * Math.PI) - Math.PI/2)
                      }% ${
                        50 + 50 * Math.sin((autoPlayProgress * 2 * Math.PI) - Math.PI/2)
                      }%, 50% 50%)`
                    }}
                  />
                  
                  {/* Anticlockwise Progress Animation */}
                  <svg 
                    className="absolute inset-0 w-full h-full transform -rotate-90"
                    viewBox="0 0 20 20"
                  >
                    <circle
                      cx="10"
                      cy="10"
                      r="8"
                      fill="none"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="1"
                    />
                    <motion.circle
                      cx="10"
                      cy="10"
                      r="8"
                      fill="none"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 8}`}
                      strokeDashoffset={`${2 * Math.PI * 8 * (1 - autoPlayProgress)}`}
                      className="transition-all duration-100"
                    />
                  </svg>
                </motion.div>
              )}
              
              {/* Filled Circle (Passed) */}
              {isPassed && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${getCircleColor(index)}`}
                />
              )}
              
              {/* Hover Effect */}
              {isHovered && !isActive && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.5 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${getCircleColor(index)}`}
                />
              )}

              {/* Ripple Effect on Click */}
              <motion.div
                initial={{ scale: 0, opacity: 0.5 }}
                animate={isActive ? { 
                  scale: [1, 2, 0], 
                  opacity: [0.5, 0.2, 0] 
                } : { scale: 0, opacity: 0 }}
                transition={{ 
                  duration: 1, 
                  repeat: isActive ? Infinity : 0,
                  ease: "easeOut"
                }}
                className={`absolute inset-0 rounded-full bg-gradient-to-r ${getCircleColor(index)}`}
              />
            </motion.button>

            {/* Connection Line */}
            {index < totalSlides - 1 && (
              <div className="relative w-8 md:w-12 h-0.5 mx-2">
                {/* Background Line */}
                <div className="absolute inset-0 bg-gray-300 rounded-full" />
                
                {/* Progress Line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ 
                    scaleX: isPassed ? 1 : (isActive ? autoPlayProgress : 0)
                  }}
                  transition={{ duration: 0.3 }}
                  className={`absolute inset-0 bg-gradient-to-r ${getCircleColor(index)} 
                    rounded-full origin-right`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CircularNavigation;

