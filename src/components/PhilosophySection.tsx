"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";

export default function PhilosophySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="philosophy" ref={ref} className="py-20 min-h-[90vh] bg-blue-800 text-white relative overflow-hidden flex items-center">
      {/* Graph bars stroke on top left */}
      <div className="absolute top-0 left-0 z-20">
        <Image
          src="/graph-hrs-strok-white-300x83.png"
          alt="Graph Bars"
          width={300}
          height={120}
          className="opacity-90"
        />
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
            className="flex flex-col sm:flex-row gap-4 items-end justify-start"
          >
            {/* Primary button - Yellow */}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#fbbf24" }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-4 px-8 rounded-md text-lg transition-all duration-300 shadow-lg hover:shadow-xl order-2 sm:order-1"
              style={{ fontFamily: "FF Shamel" }}
            >
              المزيد عن مسك
            </motion.button>

            {/* Secondary button - Outline */}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white font-semibold py-4 px-8 rounded-md text-lg transition-all duration-300 hover:bg-white/10 backdrop-blur-sm order-1 sm:order-2"
              style={{ fontFamily: "FF Shamel" }}
            >
              انضم لشركائنا
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
