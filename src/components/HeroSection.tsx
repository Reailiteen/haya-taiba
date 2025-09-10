"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Data Model
type HeroSlide = { 
  id: number; 
  image: string; 
  title: string; 
  subtitle?: string; 
};

const heroSlides: HeroSlide[] = [
  { 
    id: 1, 
    image: "/assets/images/father_children_1920_1.png", 
    title: "الحياة الطيبة", 
    subtitle: "رحلة نحو التوازن والسعادة" 
  },
  { 
    id: 2, 
    image: "/assets/images/father_children_2.png", 
    title: "العائلة المتناغمة", 
    subtitle: "أساس الحياة الطيبة" 
  },
  { 
    id: 3, 
    image: "/assets/images/father_children_4.png", 
    title: "التفاهم والمحبة", 
    subtitle: "طريق السعادة الحقيقية" 
  },
  { 
    id: 4, 
    image: "/assets/images/spiritual_pillar_man.png", 
    title: "الركن الروحي", 
    subtitle: "عمق الحياة الطيبة" 
  },
  { 
    id: 5, 
    image: "/assets/images/emotional_pillar_man.png", 
    title: "الركن العاطفي", 
    subtitle: "قوة المشاعر الإيجابية" 
  },
  { 
    id: 6, 
    image: "/assets/images/intellectual_pillar_man.png", 
    title: "الركن الفكري", 
    subtitle: "نور العقل والحكمة" 
  },
];

// Framer Motion variants
const imageVariants = {
  enter: (dir: 1 | -1) => ({ 
    opacity: 0, 
    scale: 1.02,
    x: dir > 0 ? -100 : 100 
  }),
  center: { 
    opacity: 1, 
    scale: 1,
    x: 0 
  },
  exit: (dir: 1 | -1) => ({ 
    opacity: 0, 
    scale: 0.98,
    x: dir > 0 ? 100 : -100 
  }),
};

const reducedVariants = { 
  enter: { opacity: 1 }, 
  center: { opacity: 1 }, 
  exit: { opacity: 1 } 
};

const textVariants = {
  enter: { opacity: 0, y: 50 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

const lineVariants = {
  enter: { opacity: 0, y: 30, scale: 0.95 },
  center: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -30, scale: 0.95 },
};

export default function HeroSection() {
  const slides = useMemo(() => heroSlides, []);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setPaused] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReducedMotion();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const [announcement, setAnnouncement] = useState("");

  const next = useCallback(() => {
    setDirection(1);
    setProgress(0);
    setIndex((i) => {
      const newIndex = (i + 1) % slides.length;
      setAnnouncement(`الشريحة ${newIndex + 1} من ${slides.length}: ${slides[newIndex].title}`);
      return newIndex;
    });
  }, [slides]);

  const prev = useCallback(() => {
    setDirection(-1);
    setProgress(0);
    setIndex((i) => {
      const newIndex = (i - 1 + slides.length) % slides.length;
      setAnnouncement(`الشريحة ${newIndex + 1} من ${slides.length}: ${slides[newIndex].title}`);
      return newIndex;
    });
  }, [slides]);

  const goTo = useCallback((i: number) => {
    if (i === index) return;
    setDirection(i > index ? 1 : -1);
    setProgress(0);
    setIndex(i);
    setAnnouncement(`الشريحة ${i + 1} من ${slides.length}: ${slides[i].title}`);
    setIsUserInteracting(true);
    setTimeout(() => setIsUserInteracting(false), 3000);
  }, [index, slides]);

  // Auto-play logic with progress tracking
  useEffect(() => {
    if (reduceMotion || isPaused || isUserInteracting || slides.length < 2) {
      if (progressRef.current) clearInterval(progressRef.current);
      return;
    }
    
    // Reset progress and start fresh
    setProgress(0);
    
    // Progress updater (updates every 50ms for smooth animation)
    progressRef.current = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (50 / 5000) * 100; // 50ms out of 5000ms total
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 50);
    
    // Main slide changer
    intervalRef.current = setInterval(next, 5000);
    
    return () => { 
      if (intervalRef.current) clearInterval(intervalRef.current); 
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [reduceMotion, isPaused, isUserInteracting, slides.length, next, index]);

  // Pause on page visibility change
  useEffect(() => {
    const handleVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      setIsUserInteracting(true);
      setTimeout(() => setIsUserInteracting(false), 3000);
      
      if (e.key === "ArrowLeft") {
        prev();
      } else {
        next();
      }
    }
  };

  // Scroll to next section
  const scrollToNext = () => {
    const nextSection = document.getElementById('introduction');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] w-full overflow-hidden bg-black"
      role="region"
      aria-roledescription="carousel"
      aria-label="معرض الصور الرئيسية"
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      {/* ARIA Live Region for announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      >
        {announcement}
      </div>

      {/* Background slides */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={slides[index].id}
            className="absolute inset-0"
            initial="enter"
            animate="center"
            exit="exit"
            variants={reduceMotion ? reducedVariants : imageVariants}
            custom={direction}
            transition={{ 
              duration: reduceMotion ? 0 : 0.8, 
              ease: 'easeInOut' 
            }}
          >
            <Image
              src={slides[index].image}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex items-center"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full"></div>
            </div>
          </div>
        </motion.div>

        {/* Play/Pause Button */}
        <button
          onClick={() => setPaused(!isPaused)}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          aria-label={isPaused ? "تشغيل العرض التلقائي" : "إيقاف العرض التلقائي"}
          type="button"
        >
          {isPaused ? (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
            </svg>
          )}
        </button>
      </div>
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100svh] text-center text-white px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={slides[index].id}
              initial="enter"
              animate="center"
              exit="exit"
              variants={reduceMotion ? reducedVariants : textVariants}
              transition={{ 
                duration: reduceMotion ? 0 : 0.6, 
                ease: 'easeOut',
                delay: 0.2 
              }}
              className="space-y-6"
            >
              {/* Title with staggered animation */}
              <motion.h1 
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight"
                initial="enter"
                animate="center"
                exit="exit"
                variants={reduceMotion ? reducedVariants : lineVariants}
                transition={{ 
                  duration: reduceMotion ? 0 : 0.8, 
                  ease: 'easeOut',
                  delay: 0.3 
                }}
              >
                {slides[index].title}
              </motion.h1>

              {/* Subtitle with delayed entrance */}
              {slides[index].subtitle && (
                <motion.h2 
                  className="text-xl sm:text-2xl md:text-3xl font-light text-gray-200 max-w-3xl mx-auto"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={reduceMotion ? reducedVariants : lineVariants}
                  transition={{ 
                    duration: reduceMotion ? 0 : 0.8, 
                    ease: 'easeOut',
                    delay: 0.6 
                  }}
                >
                  {slides[index].subtitle}
                </motion.h2>
              )}

              {/* Description for main slide with further delay */}
              {index === 0 && (
                <motion.p 
                  className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={reduceMotion ? reducedVariants : lineVariants}
                  transition={{ 
                    duration: reduceMotion ? 0 : 0.8, 
                    ease: 'easeOut',
                    delay: 0.9 
                  }}
                >
                  اكتشف أركان الحياة الطيبة الخمسة من خلال رحلة نحو التوازن والسعادة
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div 
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20"
        role="tablist"
        aria-label="اختيار الشريحة"
      >
        <div className="relative flex space-x-6 space-x-reverse items-center">
          {/* Connecting Line - Straight line with no gaps */}
          <svg 
            className="absolute top-1/2 -translate-y-1/2 z-0"
            style={{ 
              left: '20px', 
              right: '20px',
              width: 'calc(100% - 40px)' 
            }}
            viewBox="0 0 100 4"
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="2"
              x2="100"
              y2="2"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
            />
          </svg>

          {slides.map((slide, i) => {
            const isActive = i === index;
            const colors = [
              { start: '#8B5CF6', end: '#7C3AED' }, // purple
              { start: '#F97316', end: '#EA580C' }, // orange
              { start: '#3B82F6', end: '#2563EB' }, // blue
              { start: '#10B981', end: '#059669' }, // green
              { start: '#EAB308', end: '#CA8A04' }, // yellow
              { start: '#EC4899', end: '#DB2777' }, // pink
            ];
            const color = colors[i % colors.length];
            
            return (
              <motion.button
                key={slide.id}
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={isActive}
                aria-controls={`slide-${slide.id}`}
                aria-label={`${slide.title} - الشريحة ${i + 1}`}
                className={`
                  relative rounded-full overflow-hidden transition-all duration-300 z-10
                  focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
                  flex items-center justify-center
                  ${isActive ? 'ring-2 ring-white ring-opacity-70' : 'hover:scale-105'}
                `}
                style={{
                  width: isActive ? '70px' : '24px',
                  height: isActive ? '70px' : '24px',
                  minWidth: isActive ? '70px' : '24px',
                  minHeight: isActive ? '70px' : '24px',
                }}
                whileHover={{ scale: isActive ? 1.05 : 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1
                }}
                transition={{ duration: 0.3 }}
                type="button"
              >
                {/* Thumbnail Image */}
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  className="object-cover rounded-full"
                  sizes="64px"
                />
                
                {/* Overlay */}
                <div 
                  className={`
                    absolute inset-0 rounded-full transition-opacity duration-300
                    ${isActive ? 'bg-black/20' : 'bg-black/60 hover:bg-black/40'}
                  `}
                />

                {/* Clockwise Progress Fill for Active Slide */}
                {isActive && (
                  <div className="absolute -inset-1">
                    <svg 
                      className="w-full h-full -rotate-90" 
                      viewBox="0 0 70 70"
                    >
                      {/* Background Circle */}
                      <circle
                        cx="35"
                        cy="35"
                        r="32"
                        fill="none"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="2"
                      />
                      {/* Progress circle synced with actual progress */}
                      <circle
                        cx="35"
                        cy="35"
                        r="32"
                        fill="none"
                        stroke={color.start}
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray="201.06"
                        strokeDashoffset={201.06 - (progress / 100) * 201.06}
                        style={{ 
                          transition: isPaused || isUserInteracting ? 'none' : 'stroke-dashoffset 0.05s linear'
                        }}
                      />
                    </svg>
                  </div>
                )}

                {/* Static border for inactive dots */}
                {!isActive && (
                  <div className="absolute -inset-1">
                    <svg 
                      className="w-full h-full" 
                      viewBox="0 0 70 70"
                    >
                      <circle
                        cx="35"
                        cy="35"
                        r="32"
                        fill="none"
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
