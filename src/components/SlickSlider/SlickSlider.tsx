'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import SlideComponent from './SlideComponent';
import CircularNavigation from './CircularNavigation';
import JourneyTitle from '../JourneyTitle';

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  backgroundColor: string;
  textColor: string;
}

const SlickSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlayProgress, setAutoPlayProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const slides: Slide[] = [
    {
      id: '01',
      title: 'الركن الروحي',
      subtitle: 'الإيمان والعبادة والتزكية',
      description: 'يرتكز على الإيمان والعبادة والتزكية. أبرز التحديات ضعف الارتباط الروحي بسبب انشغالات العصر، بينما تكمن الفرص في التعليم والدعم الأسري والتقنيات الحديثة.',
      image: '/assets/spiritual_pillar_man.png',
      backgroundColor: 'bg-gradient-to-br from-purple-500 to-purple-700',
      textColor: 'text-white'
    },
    {
      id: '02',
      title: 'الركن العاطفي',
      subtitle: 'التوازن والمرونة والتحول الإيجابي',
      description: 'يتمثل في التوازن والمرونة والتحول الإيجابي. التحديات تشمل غياب الدعم النفسي في المدارس وتأثير وسائل التواصل الاجتماعي.',
      image: '/assets/emotional_pillar_man.png',
      backgroundColor: 'bg-gradient-to-br from-orange-500 to-orange-700',
      textColor: 'text-white'
    },
    {
      id: '03',
      title: 'الركن الفكري',
      subtitle: 'التفكير والتأمل والحكمة',
      description: 'يقوم على التفكير والتأمل والحكمة. التحديات تتعلق بالتعليم التقليدي والحفظ والتبعية للتكنولوجيا.',
      image: '/assets/intellectual_pillar_man.png',
      backgroundColor: 'bg-gradient-to-br from-blue-500 to-blue-700',
      textColor: 'text-white'
    },
    {
      id: '04',
      title: 'الركن الجسدي',
      subtitle: 'الصحة والقوة والوقاية',
      description: 'يتعلق بالعناية بالجسد من خلال الصحة والقوة والوقاية. التحديات تشمل قلة النشاط البدني، أنماط الحياة المريحة، وضعف الوعي الصحي.',
      image: '/assets/physical_pillar_man.png',
      backgroundColor: 'bg-gradient-to-br from-green-500 to-green-700',
      textColor: 'text-white'
    },
    {
      id: '05',
      title: 'الركن الاجتماعي',
      subtitle: 'الرعاية والتعاون والمسؤولية',
      description: 'يركز على الرعاية والتعاون والمسؤولية. التحديات تشمل ضعف التواصل المباشر، الفجوة بين الأجيال، وضغط العولمة.',
      image: '/assets/social_pillar_man.png',
      backgroundColor: 'bg-gradient-to-br from-yellow-500 to-yellow-700',
      textColor: 'text-white'
    }
  ];

  const SLIDE_DURATION = 5000; // 5 seconds
  const PROGRESS_INTERVAL = 50; // Update every 50ms

  useEffect(() => {
    if (!isPlaying || isPaused || !isInView) return;

    const progressIncrement = PROGRESS_INTERVAL / SLIDE_DURATION;
    
    intervalRef.current = setInterval(() => {
      setAutoPlayProgress(prev => {
        if (prev >= 1) {
          // Move to next slide
          setCurrentSlide(current => (current + 1) % slides.length);
          return 0;
        }
        return prev + progressIncrement;
      });
    }, PROGRESS_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isPaused, currentSlide, isInView, slides.length]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    setAutoPlayProgress(0);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setAutoPlayProgress(0);
    }
  };

  return (
    <section id="journey" ref={ref} className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <JourneyTitle />
        </motion.div>

        {/* Slider Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Slides */}
          <div className="relative h-96 md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <SlideComponent
                  {...slides[currentSlide]}
                  isActive={true}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Play/Pause Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlayPause}
            className="absolute top-4 left-4 w-12 h-12 bg-black/20 hover:bg-black/30 
              backdrop-blur-sm rounded-full flex items-center justify-center
              text-white transition-all duration-300"
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </motion.button>

          {/* Slide Counter */}
          <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm 
            rounded-lg px-3 py-1 text-white text-sm">
            {currentSlide + 1} / {slides.length}
          </div>
        </motion.div>

        {/* Circular Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8"
        >
          <CircularNavigation
            totalSlides={slides.length}
            currentSlide={currentSlide}
            onSlideChange={handleSlideChange}
            autoPlayProgress={autoPlayProgress}
          />
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-4 text-center text-sm text-gray-500"
        >
          {isPlaying ? (isPaused ? 'متوقف مؤقتاً' : 'تشغيل تلقائي') : 'متوقف'}
        </motion.div>
      </div>
    </section>
  );
};

export default SlickSlider;

