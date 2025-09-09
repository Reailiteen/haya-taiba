'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode, useEffect, useState } from 'react';

interface SectionProps {
  id: string;
  title?: string;
  content?: string;
  children?: ReactNode;
  className?: string;
  backgroundColor?: string;
  titleColor?: string;
}

const Section = ({ 
  id, 
  title, 
  content, 
  children, 
  className = '', 
  backgroundColor = 'bg-white',
  titleColor = 'text-gray-800'
}: SectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  useEffect(() => {
    const handleAnimationTrigger = (event: CustomEvent) => {
      if (event.detail.sectionId === id) {
        setTriggerAnimation(true);
        // Reset after animation completes
        setTimeout(() => setTriggerAnimation(false), 1000);
      }
    };

    window.addEventListener('triggerSectionAnimation', handleAnimationTrigger as EventListener);
    return () => window.removeEventListener('triggerSectionAnimation', handleAnimationTrigger as EventListener);
  }, [id]);

  const shouldAnimate = isInView || triggerAnimation;

  return (
    <section 
      id={id} 
      className={`py-12 sm:py-16 md:py-20 min-h-[90vh] flex items-center ${backgroundColor} ${className}`}
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {title && (
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 ${titleColor}`}
            >
              {title}
            </motion.h2>
          )}
          
          {content && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-8 md:mb-12"
            >
              {content}
            </motion.p>
          )}
          
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Section;

