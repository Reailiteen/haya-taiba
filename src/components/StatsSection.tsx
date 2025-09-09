'use client';

import React from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Image from 'next/image';

// Misk statistics data based on the website
const miskStats = [
  {
    id: 'beneficiaries',
    value: 250,
    suffix: 'آلاف',
    prefix: '+',
    label: 'مستفيد من مسارات وجهات المنظومة',
    icon: '/assets/icons/beneficiaries.svg',
  },
  {
    id: 'workshops',
    value: 75,
    suffix: '',
    prefix: '',
    label: 'ورشة عمل مقدمة من مسارات وجهات المنظومة',
    icon: '/assets/icons/workshop.svg',
  },
  {
    id: 'graduates',
    value: 5000,
    suffix: '',
    prefix: '',
    label: 'قائد متخرج من برامج المنظومة',
    icon: '/assets/icons/graduate.svg',
  },
  {
    id: 'programs',
    value: 15,
    suffix: '',
    prefix: '',
    label: 'برنامج مقدم من مسارات وجهات المنظومة',
    icon: '/assets/icons/program.svg',
  },
  {
    id: 'hours',
    value: 50000,
    suffix: 'مليون',
    prefix: '+',
    label: 'ساعة تدريبية مقدمة من برامج وفعاليات المنظومة',
    icon: '/assets/icons/hours.svg',
  },
  {
    id: 'registered',
    value: 10000,
    suffix: 'ألف',
    prefix: '+',
    label: 'مسجل في فعاليات ومحافل المنظومة',
    icon: '/assets/icons/registered.svg',
  },
  {
    id: 'startups',
    value: 50,
    suffix: '',
    prefix: '+',
    label: 'شركة ناشئة مدعومة من برامج المنظومة',
    icon: '/assets/icons/startup.svg',
  },
  {
    id: 'speakers',
    value: 200,
    suffix: '',
    prefix: '',
    label: 'متحدث في فعاليات ومحافل المنظومة',
    icon: '/assets/icons/speaker.svg',
  },
  {
    id: 'artists',
    value: 25,
    suffix: '',
    prefix: '',
    label: 'فنان دُعم من معهد مسك للفنون',
    icon: '/assets/icons/artist.svg',
  },
  {
    id: 'international',
    value: 30,
    suffix: '',
    prefix: '',
    label: 'مشاركات في محافل دولية',
    icon: '/assets/icons/international.svg',
  },
  {
    id: 'visitors',
    value: 15000,
    suffix: 'ألف',
    prefix: '+',
    label: 'زائر لفعاليات ومحافل المنظومة',
    icon: '/assets/icons/visitor.svg',
  },
  {
    id: 'certificates',
    value: 8000,
    suffix: 'ألف',
    prefix: '+',
    label: 'شهادة تدريبية مقدمة من برامج وفعاليات المنظومة',
    icon: '/assets/icons/certificate.svg',
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
      // Small delay to ensure smooth animation
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
    <div className="flex items-baseline justify-center gap-1">
      {prefix && <span className="text-xl font-bold text-white">{prefix}</span>}
      <motion.span
        ref={ref}
        className="text-3xl font-bold text-white sm:text-4xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        0
      </motion.span>
      {suffix && <span className="text-base font-medium text-white text-opacity-80">{suffix}</span>}
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
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="statistics"
      ref={ref}
      dir="rtl"
      className="bg-white py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Title Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 bg-gradient-to-r from-[#f8fafc] to-[#e2e8f0] py-8 px-6 rounded-3xl shadow-lg"
        >
          <h2 className="text-4xl font-bold text-[#1e293b] mb-4">
            أبرز أرقام مسك
          </h2>
          <p className="text-xl text-[#64748b] font-medium">
            في عام 2024
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="bg-green-500 rounded-3xl p-8 shadow-xl">
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
          >
            {miskStats.map((stat, index) => (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center p-4 bg-white bg-opacity-10 rounded-2xl shadow-lg hover:shadow-xl hover:bg-opacity-20 transition-all duration-300 min-h-[200px]"
              >
                {/* Icon */}
                <div className="w-20 h-20 mb-6 flex items-center justify-center">
                  <div className="w-full h-full bg-white bg-opacity-20 rounded-full flex items-center justify-center shadow-lg">
                    <Image
                      src={stat.icon}
                      alt={stat.label}
                      width={48}
                      height={48}
                      className="w-12 h-12 object-contain opacity-90"
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
                <p className="mt-2 text-center text-xs font-medium text-white leading-tight px-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Annual Report Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1e293b] text-white font-semibold rounded-lg hover:bg-[#334155] transition-colors duration-300"
          >
            <span>عرض التقرير السنوي 2024</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
