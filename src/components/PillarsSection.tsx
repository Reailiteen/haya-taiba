'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
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

interface PillarCardProps {
  pillar: Pillar;
  index: number;
  isActive: boolean;
  onClick: (pillar: Pillar) => void;
}

const PillarCard = ({ pillar, index, isActive, onClick }: PillarCardProps) => {
  const colorClasses = {
    purple: 'pillar-purple',
    orange: 'pillar-orange',
    blue: 'pillar-blue',
    green: 'pillar-green',
    yellow: 'pillar-yellow'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 ${
        isActive ? 'ring-4 ring-blue-500' : ''
      }`}
      onClick={() => onClick(pillar)}
    >
      <div className={`${colorClasses[pillar.color as keyof typeof colorClasses]} p-4 sm:p-6 md:p-8 text-white min-h-[250px] sm:min-h-[300px] flex flex-col justify-between`}>
        {/* Icon */}
        <div className="flex justify-center mb-4 md:mb-6">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Image 
              src={`/assets/${pillar.icon}`} 
              alt={pillar.title}
              width={32}
              height={32}
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 filter brightness-0 invert"
            />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-3 md:mb-4">
          {pillar.title}
        </h3>

        {/* Description */}
        <p className="text-white/90 text-center leading-relaxed text-sm sm:text-base">
          {pillar.description}
        </p>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300"></div>
      </div>
    </motion.div>
  );
};

const PillarsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedPillar, setSelectedPillar] = useState<Pillar | null>(null);

  const handlePillarClick = (pillar: Pillar) => {
    setSelectedPillar(selectedPillar?.id === pillar.id ? null : pillar);
  };

  return (
    <section id="pillars" className="min-h-[90vh] flex items-center py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6">
            {content.pillars.title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {content.pillars.subtitle}
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 mb-8 md:mb-12">
          {content.pillars.items.map((pillar: Pillar, index: number) => (
            <PillarCard
              key={pillar.id}
              pillar={pillar}
              index={index}
              isActive={selectedPillar?.id === pillar.id}
              onClick={handlePillarClick}
            />
          ))}
        </div>

        {/* Selected Pillar Details */}
        {selectedPillar && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="relative bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
              {/* Content */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  {selectedPillar.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                  {selectedPillar.description}
                </p>
              </div>

              {/* Image */}
              <div className="flex justify-center">
                <Image 
                  src={`/assets/${selectedPillar.image}`}
                  alt={selectedPillar.title}
                  width={300}
                  height={300}
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedPillar(null)}
              className="absolute top-4 left-4 w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors duration-200"
              aria-label="إغلاق"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PillarsSection;

