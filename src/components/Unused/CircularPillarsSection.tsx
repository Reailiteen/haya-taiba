'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import content from '../../../public/content.json';
import CirclingElements from '../../fancy/components/blocks/CirclingElements';
import useScreenSize from '../../hooks/use-screen-size';

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
  const [pillarPosition, setPillarPosition] = useState<{ x: number; y: number } | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const screenSize = useScreenSize();

  // Responsive orbital radius: compact on small screens, larger spread on desktop
  const radius = screenSize.lessThan('md') ? 80 : screenSize.lessThan('lg') ? 140 : 220;

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

  const handlePillarClick = (pillarId: string, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    setPillarPosition({ x: centerX, y: centerY });
    setSelectedPillar(selectedPillar === pillarId ? null : pillarId);
  };

  // Avoid SSR/CSR hydration mismatch: only render the animated circling elements after mount
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section ref={ref} className="min-h-[90vh] flex items-center py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden" id="pillars">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/assets/images/father_children_1920_1.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
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
                      <Image
                src="logo_no_bg.png"
                alt="شعار الأركان"
                width={120}
                height={120}
                className="w-35 h-auto object-contain"
                priority
              />

          {/* Circling Pillar Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {isMounted ? (
              <CirclingElements
                radius={radius}
                duration={20}
                easing="linear"
                paused={!!selectedPillar}
              >
                {pillars.map((pillar, index) => (
                  <motion.div
                    key={pillar.id}
                    className="cursor-pointer group"
                    onClick={(event) => handlePillarClick(pillar.id, event)}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.7 + index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                  >
                    {/* Pillar Circle */}
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      animate={selectedPillar === pillar.id ? { scale: 1.25 } : { scale: 1 }}
                      className={`w-12 h-12 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full ${getColorClasses(pillar.color)}
                        flex items-center justify-center shadow-lg border-4 border-white
                        transition-all duration-300 relative overflow-hidden`}
                    >
                      {/* Ripple Effect */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={selectedPillar === pillar.id ? {
                          scale: [0, 1.5, 0],
                          opacity: [0.5, 0.2, 0]
                        } : { scale: 0, opacity: 0 }}
                        transition={{
                          duration: 1.5,
                          repeat: selectedPillar === pillar.id ? Infinity : 0,
                          ease: "easeOut"
                        }}
                        className={`absolute inset-0 rounded-full ${getColorClasses(pillar.color).split(' ')[0]}`}
                      />

                      {/* Icon/Text */}
                      <span className="text-white text-xs md:text-lg lg:text-xl font-bold z-10 text-center px-2">
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
                      <p className="text-xs md:text-base lg:text-lg font-semibold text-gray-700 whitespace-nowrap">
                        {pillar.title}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </CirclingElements>
            ) : (
              // Render a stable placeholder on server / before mount to avoid hydration mismatch
              <div className="relative w-full h-[600px] md:h-[700px]"></div>
            )}
          </motion.div>
        </div>
        {/* iOS App Store Style Modal */}
        <AnimatePresence>
          {selectedPillar && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={() => setSelectedPillar(null)}
              />

              {/* Modal Content */}
              <motion.div
                initial={{
                  scale: 0,
                  x: (pillarPosition?.x || window.innerWidth / 2) - window.innerWidth / 2,
                  y: (pillarPosition?.y || window.innerHeight / 2) - window.innerHeight / 2,
                  borderRadius: '50%',
                }}
                animate={{
                  scale: 1,
                  x: 0,
                  y: 0,
                  borderRadius: '24px',
                }}
                exit={{
                  scale: 0,
                  x: (pillarPosition?.x || window.innerWidth / 2) - window.innerWidth / 2,
                  y: (pillarPosition?.y || window.innerHeight / 2) - window.innerHeight / 2,
                  borderRadius: '50%',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                }}
                className="fixed left-6 right-6 top-24 bottom-8 md:left-8 md:right-8 md:top-28 md:bottom-12 lg:left-16 lg:right-16 lg:top-32 lg:bottom-16 mx-auto bg-white rounded-2xl shadow-2xl z-50 overflow-hidden max-h-[72vh]"
              >
                {(() => {
                  const pillar = pillars.find(p => p.id === selectedPillar);
                  if (!pillar) return null;

                  return (
                    <div className="h-full flex flex-col">
                      {/* Header */}
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="flex items-center justify-between p-6 border-b border-gray-100"
                      >
                        <div className="flex items-center space-x-4 space-x-reverse">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                            className={`w-16 h-16 rounded-full ${getColorClasses(pillar.color)}
                              flex items-center justify-center shadow-lg`}
                          >
                            <span className="text-white text-xl font-bold">
                              {pillar.title.split(' ')[1]}
                            </span>
                          </motion.div>
                          <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                              {pillar.title}
                            </h2>
                            <p className="text-gray-600">ركن من أركان الحياة الطيبة</p>
                          </div>
                        </div>

                        <motion.button
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedPillar(null)}
                          className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200
                            flex items-center justify-center transition-colors duration-200"
                        >
                          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </motion.button>
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1 overflow-y-auto p-6">
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.5 }}
                          className="max-w-4xl mx-auto"
                        >
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Description */}
                            <motion.div
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5, duration: 0.6 }}
                              className="space-y-6"
                            >
                              <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">الوصف</h3>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                  {pillar.description}
                                </p>
                              </div>

                              {/* Additional Info */}
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.4 }}
                                className="bg-gray-50 rounded-xl p-6"
                              >
                                <h4 className="text-lg font-semibold text-gray-800 mb-3">الفوائد</h4>
                                <ul className="space-y-2 text-gray-600">
                                  <li className="flex items-center space-x-2 space-x-reverse">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    <span>تعزيز التوازن النفسي والجسدي</span>
                                  </li>
                                  <li className="flex items-center space-x-2 space-x-reverse">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    <span>تطوير المهارات الشخصية</span>
                                  </li>
                                  <li className="flex items-center space-x-2 space-x-reverse">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                    <span>تحقيق السعادة والرضا</span>
                                  </li>
                                </ul>
                              </motion.div>
                            </motion.div>

                            {/* Visual */}
                            <motion.div
                              initial={{ opacity: 0, x: 30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5, duration: 0.6 }}
                              className="space-y-6"
                            >
                              <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden shadow-lg">
                                <motion.div
                                  initial={{ scale: 1.1 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 0.7, duration: 0.5 }}
                                  className={`absolute inset-0 ${getColorClasses(pillar.color)}
                                    flex items-center justify-center`}
                                >
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                                    className="text-center"
                                  >
                                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full
                                      flex items-center justify-center mb-4 mx-auto">
                                      <span className="text-white text-3xl font-bold">
                                        {pillar.title.split(' ')[1]}
                                      </span>
                                    </div>
                                    <h3 className="text-white text-xl font-bold">
                                      {pillar.title}
                                    </h3>
                                  </motion.div>
                                </motion.div>
                              </div>

                              {/* Action Button */}
                              <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9, duration: 0.4 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full py-4 px-6 ${getColorClasses(pillar.color)}
                                  text-white font-semibold rounded-xl shadow-lg
                                  hover:shadow-xl transition-all duration-200`}
                              >
                                استكشف المزيد
                              </motion.button>
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CircularPillarsSection;

