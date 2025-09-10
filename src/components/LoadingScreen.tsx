'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500); // Wait for exit animation
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-gradient-to-r from-green-400 to-blue-400 animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 animate-pulse delay-500"></div>
          </div>

          <div className="relative flex flex-col items-center">
            {/* Logo Container */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 1.2, 
                ease: "easeOut",
                type: "spring",
                stiffness: 100
              }}
              className="relative mb-8"
            >
              {/* Animated Rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="absolute inset-0 w-32 h-32 rounded-full border-2 border-transparent border-t-blue-500 border-r-purple-500"
              />
              
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="absolute inset-2 w-28 h-28 rounded-full border-2 border-transparent border-b-green-500 border-l-orange-500"
              />

              {/* Logo */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="w-20 h-20 flex items-center justify-center"
                >
                  <Image
                    src="/logo_slogan_no_bg_corrected.png"
                    alt="مؤسسة الحياة الطيبة"
                    width={120}
                    height={120}
                    className="w-28 h-28 object-contain"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-center mb-8"
            >
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                مؤسسة الحياة الطيبة
              </h1>
              <p className="text-gray-600 text-lg">
                بناء الأفراد وتحقيق الازدهار
              </p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "200px" }}
              transition={{ delay: 1, duration: 0.5 }}
              className="relative h-1 bg-gray-200 rounded-full overflow-hidden"
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full"
              />
            </motion.div>

            {/* Progress Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="mt-4 text-sm text-gray-500"
            >
              {progress}%
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ 
                y: [-10, 10, -10],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full"
            />
            
            <motion.div
              animate={{ 
                y: [10, -10, 10],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute bottom-1/4 right-1/2 transform translate-x-1/2 w-3 h-3 bg-purple-400 rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;

