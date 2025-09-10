'use client';

import React from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Image from 'next/image';

// Updated statistics data to match Misk exactly
const miskStats = [
  {
    id: 'beneficiaries',
    value: 453,
    suffix: 'ألف',
    prefix: '+',
    label: 'مسجل في فعاليات ومحافل المنظومة',
    icon: '/assets/icons/beneficiaries.svg',
  },
  {
    id: 'hours',
    value: 1,
    suffix: 'مليون',
    prefix: '+',
    label: 'ساعة تدريبية مقدمة من برامج وفعاليات المنظومة',
    icon: '/assets/icons/hours.svg',
  },
  {
    id: 'programs',
    value: 370,
    suffix: '',
    prefix: '',
    label: 'برنامج مقدم من مسارات وجهات المنظومة',
    icon: '/assets/icons/program.svg',
  },
  {
    id: 'graduates',
    value: 786,
    suffix: '',
    prefix: '',
    label: 'قائد متخرج من برامج المنظومة',
    icon: '/assets/icons/graduate.svg',
  },
  {
    id: 'workshops',
    value: 1786,
    suffix: '',
    prefix: '',
    label: 'ورشة عمل مقدمة من مسارات وجهات المنظومة',
    icon: '/assets/icons/workshop.svg',
  },
  {
    id: 'registered',
    value: 506,
    suffix: 'ألف',
    prefix: '+',
    label: 'مستفيد من مسارات وجهات المنظومة',
    icon: '/assets/icons/registered.svg',
  },
];

const AnimatedNumber = ({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) => {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { 
    duration: 2500, 
    stiffness: 100, 
    damping: 30,
    mass: 1 
  });
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && value > 0) {
      setTimeout(() => {
        motionValue.set(value);
      }, 200);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString('ar-EG');
      }
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <div className="flex items-baseline justify-center gap-1 mb-4">
      {prefix && <span className="text-2xl font-bold text-white">{prefix}</span>}
      <motion.span
        ref={ref}
        className="text-4xl lg:text-5xl font-bold text-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        0
      </motion.span>
      {suffix && <span className="text-xl font-medium text-white">{suffix}</span>}
    </div>
  );
};

export default function MiskStatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
  };

  return (
    <section
      id="statistics"
      ref={ref}
      dir="rtl"
      className="relative overflow-hidden"
    >
      {/* Background Image Section with Title */}
      <div className="relative h-[200px] lg:h-[205px] overflow-hidden">
          <Image
            src="assets/cover-a-24-2-scaled.jpeg"
            alt="Misk Event Background"
            fill
            className="object-cover object-center"
            priority
          />
        
        {/* Title positioned on the right */}
        <div className="absolute inset-0 flex items-center justify-start">
          <div className="text-left pr-8 lg:pr-16 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl lg:text-6xl font-light text-white mb-4 leading-tight">
                أبرز أرقام الحياة الطيبة
              </h2>
              <p className="text-xl lg:text-2xl text-white/90 font-light">
                في عام 2025
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div 
        className="py-20 relative"
        style={{
          background: 'linear-gradient(135deg, #00372a 0%, #00372f 100%)'
        }}
      >
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          {/* Stats Grid */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12 max-w-7xl mx-auto"
        >
          {miskStats.map((stat, index) => (
            <motion.div
              key={stat.id}
              // variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              {/* Icon */}
              <div className="w-20 h-20 lg:w-24 lg:h-24 mb-6 flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src={stat.icon}
                    alt={stat.label}
                    width={64}
                    height={64}
                    className="w-16 h-16 lg:w-20 lg:h-20 object-contain filter brightness-0 invert"
                  />
                </div>
              </div>

              {/* Number */}
              <AnimatedNumber
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />

              {/* Label */}
              <p className="text-center text-sm lg:text-base font-medium text-white/90 leading-relaxed px-2 max-w-[200px]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Annual Report Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <a
            href="#"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-teal-800 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <span>عرض التقرير السنوي 2024</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
