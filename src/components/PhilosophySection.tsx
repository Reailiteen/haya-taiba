"use client";

import { motion } from "framer-motion";
import { useRef, useMemo } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";

export default function PhilosophySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Memoize animation variants to prevent recreation on every render
  const fadeInUp = useMemo(() => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  }), []);

  const staggeredAnimations = useMemo(() => [
    { ...fadeInUp, transition: { duration: 0.8, delay: 0.2 } },
    { ...fadeInUp, transition: { duration: 0.8, delay: 0.4 } },
    { ...fadeInUp, transition: { duration: 0.8, delay: 0.6 } },
    { ...fadeInUp, transition: { duration: 0.8, delay: 0.8 } }
  ], [fadeInUp]);

  return (
    <section id="philosophy" ref={ref} className="py-20 min-h-[60vh] bg-purple-800 text-white relative overflow-hidden flex items-center">
      {/* Graph bars stroke on top left - Using CSS background instead of Image for better performance */}
      <div 
        className="absolute top-0 left-0 z-20 w-[230px] h-[120px] opacity-90"
        style={{
          backgroundImage: "url('/graph-hrs-strok-white-300x83.png')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top left'
        }}
      />

      {/* Simplified background with CSS gradient only */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-700/20 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl ml-auto text-right">
          {/* Main title */}
          <motion.h2
            initial={staggeredAnimations[0].initial}
            animate={inView ? staggeredAnimations[0].animate : staggeredAnimations[0].initial}
            transition={staggeredAnimations[0].transition}
            className="text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-light text-right mb-8 text-yellow-400 leading-tight"
            style={{ fontFamily: "FF Shamel" }}
          >
            مؤسسة الحياة الطيبة

          </motion.h2>

          {/* Subtitle */}
          <motion.h3
            initial={staggeredAnimations[1].initial}
            animate={inView ? staggeredAnimations[1].animate : staggeredAnimations[1].initial}
            transition={staggeredAnimations[1].transition}
            className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-light text-right mb-10 leading-relaxed"
            style={{ fontFamily: "FF Shamel" }}
          >
            إعداد جيل متكامل يوازن بين قيم الحياة الطيبة
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={staggeredAnimations[2].initial}
            animate={inView ? staggeredAnimations[2].animate : staggeredAnimations[2].initial}
            transition={staggeredAnimations[2].transition}
            className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-right mb-12 leading-relaxed max-w-5xl ml-auto text-white/90"
            style={{ fontFamily: "FF Shamel" }}
          >
          من خلال تنمية المهارات وتعزيز قيم الحياة الطيبة لدى الأفراد، وذلك عبر التدريب، الاستشارات، والبحوث، وإطلاق البرامج والشراكات المميزة لبناء مجتمع متوازن 


          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={staggeredAnimations[3].initial}
            animate={inView ? staggeredAnimations[3].animate : staggeredAnimations[3].initial}
            transition={staggeredAnimations[3].transition}
            className="flex flex-col sm:flex-row gap-4 items-end justify-start"
          >
            {/* Primary button - Yellow */}
            <button
              className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-5 px-10 rounded-md text-xl lg:text-2xl transition-colors duration-200 shadow-lg hover:shadow-xl order-2 sm:order-1"
              style={{ fontFamily: "FF Shamel" }}
            >
              المزيد عن الحياة الطيبة
            </button>

            {/* Secondary button - Outline */}
            <button
              className="border-2 border-white text-white font-semibold py-5 px-10 rounded-md text-xl lg:text-2xl transition-colors duration-200 hover:bg-white/10 backdrop-blur-sm order-1 sm:order-2"
              style={{ fontFamily: "FF Shamel" }}
            >
              انضم لشركائنا
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
