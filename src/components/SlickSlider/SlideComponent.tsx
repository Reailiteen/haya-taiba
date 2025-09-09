'use client';

import { motion } from 'framer-motion';

interface SlideProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  backgroundColor: string;
  textColor: string;
  isActive: boolean;
}

const SlideComponent = ({ 
  id, 
  title, 
  subtitle, 
  description, 
  backgroundColor, 
  textColor, 
  isActive 
}: SlideProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: isActive ? 1 : 0.7, 
        scale: isActive ? 1 : 0.95 
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`relative w-full h-full ${backgroundColor} overflow-hidden rounded-2xl`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white/20"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-white/15"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-white/10"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-between p-8 lg:p-12">
        {/* Content Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.8, x: -20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 space-y-6 text-center lg:text-right lg:pr-8"
        >
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.7, y: 10 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`text-sm md:text-base ${textColor} opacity-80 font-medium`}
          >
            {subtitle}
          </motion.p>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.8, y: 15 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`text-2xl md:text-3xl lg:text-4xl font-bold ${textColor} leading-tight`}
          >
            {title}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.7, y: 10 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={`text-base md:text-lg ${textColor} opacity-90 leading-relaxed max-w-lg mx-auto lg:mx-0`}
          >
            {description}
          </motion.p>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 10 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button className={`px-6 py-3 bg-white/20 hover:bg-white/30 ${textColor} 
              rounded-lg font-medium transition-all duration-300 backdrop-blur-sm
              border border-white/30 hover:border-white/50`}>
              اكتشف المزيد
            </button>
          </motion.div>
        </motion.div>

        {/* Image Side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.8, x: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex-1 flex items-center justify-center mt-8 lg:mt-0"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            {/* Decorative Background */}
            <motion.div
              animate={isActive ? { 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.02, 1]
              } : {}}
              transition={{ 
                duration: 4, 
                repeat: isActive ? Infinity : 0,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-white/10 rounded-full"
            />
            
            {/* Image Container */}
            <div className="relative w-full h-full rounded-full overflow-hidden bg-white/20 backdrop-blur-sm
              flex items-center justify-center shadow-2xl">
              <motion.div
                animate={isActive ? { 
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0]
                } : {}}
                transition={{ 
                  duration: 3, 
                  repeat: isActive ? Infinity : 0,
                  ease: "easeInOut"
                }}
                className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-white/30 
                  flex items-center justify-center"
              >
                <span className={`text-4xl md:text-5xl lg:text-6xl ${textColor} font-bold`}>
                  {title.charAt(0)}
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Slide Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0.5 }}
        className="absolute bottom-4 left-4 text-xs text-white/60"
      >
        {id}
      </motion.div>
    </motion.div>
  );
};

export default SlideComponent;

