"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function PhilosophySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="philosophy" ref={ref} className="py-20 bg-blue-800 text-white relative overflow-hidden">
      {/* Graph bars stroke on top left */}
      <div className="absolute top-8 left-8 z-20">
        <svg width="120" height="80" viewBox="0 0 120 80" className="opacity-90">
          <rect x="0" y="20" width="8" height="60" fill="none" stroke="white" strokeWidth="2" />
          <rect x="15" y="15" width="8" height="65" fill="none" stroke="white" strokeWidth="2" />
          <rect x="30" y="10" width="8" height="70" fill="none" stroke="white" strokeWidth="2" />
          <rect x="45" y="5" width="8" height="75" fill="none" stroke="white" strokeWidth="2" />
          <rect x="60" y="0" width="8" height="80" fill="none" stroke="white" strokeWidth="2" />
        </svg>
      </div>

      {/* Background decorative elements - simplified */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-700/20 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl ml-auto text-right">
          {/* Main title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl lg:text-5xl xl:text-6xl font-light text-right mb-6 text-yellow-400 leading-tight"
            style={{ fontFamily: "FF Shamel" }}
          >
            مؤسسة مسك
          </motion.h2>

          {/* Subtitle */}
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl lg:text-3xl xl:text-4xl font-light text-right mb-8 leading-relaxed"
            style={{ fontFamily: "FF Shamel" }}
          >
            استحداث الفرص لتنمية المجتمع وإطلاق طاقات أفراده
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg lg:text-xl xl:text-2xl text-right mb-12 leading-relaxed max-w-5xl ml-auto text-white/90"
            style={{ fontFamily: "FF Shamel" }}
          >
            تمكين المجتمع من التعلم والتطور والتقدّم في مجالات الأعمال والمجالات الأدبية والثقافية والعلوم الاجتماعية
            والتكنولوجية، عبر إطلاق البرامج والمبادرات وعقد شراكات عالمية على أعلى المستويات.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 items-end justify-end"
          >
            {/* Primary button - Yellow */}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#fbbf24" }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl order-2 sm:order-1"
              style={{ fontFamily: "FF Shamel" }}
            >
              المزيد عن مسك
            </motion.button>

            {/* Secondary button - Outline */}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 hover:bg-white/10 backdrop-blur-sm order-1 sm:order-2"
              style={{ fontFamily: "FF Shamel" }}
            >
              انضم لشركائنا
            </motion.button>
          </motion.div>
        </div>

        {/* Decorative yellow accent box - bottom left */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="absolute bottom-16 left-8 w-32 h-16 bg-yellow-500 rounded-lg"
        >
          {/* Three horizontal lines inside the yellow box */}
          <div className="flex flex-col justify-center items-center h-full space-y-1.5">
            <div className="w-20 h-1 bg-blue-800 rounded"></div>
            <div className="w-20 h-1 bg-blue-800 rounded"></div>
            <div className="w-20 h-1 bg-blue-800 rounded"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
