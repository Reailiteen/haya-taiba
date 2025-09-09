"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";

const offers = [
  {
    id: "retail",
    title: "متاجر التجزئة",
    subtitle: "اكتشف مساحات البيع بالتجزئة حيث يلقي الطموح بالفرصة",
    color: "#0B4FD6",
    thumb: "/assets/images/father_children_2.png",
  },
  {
    id: "offices",
    title: "المكاتب",
    subtitle: "المنصة المثالية للانطلاق نحو النجاح",
    color: "#4C1886",
    thumb: "/assets/images/father_children_4.png",
  },
];

export default function OfferSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  return (
    <>
      <section id="offers" ref={ref} className="min-h-[90vh] flex items-center py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-start justify-between">
            <h3 className="text-4xl font-bold text-right text-blue-700">تأجير</h3>
          </div>

          <div className="mt-12 flex flex-col lg:flex-row gap-8 lg:gap-16 items-start justify-center">
            {offers.map((o, idx) => (
              <motion.div
                key={o.id}
                layoutId={`card-${o.id}`}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { 
                  opacity: 1, 
                  y: 0
                } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.15 * idx, duration: 0.7 }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                className="relative w-full lg:w-5/12 cursor-pointer"
                onClick={() => setExpandedCard(o.id)}
              >
                {/* Static wrapper - removed floating animation */}
                <div
                  className="drop-shadow-2xl"
                  style={{
                    filter: `drop-shadow(0 25px 50px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 40px ${offers[idx]?.color || '#0B4FD6'}60)`
                  }}
                >
                  {/* Upside-down triangle card */}
                  <motion.div
                    layoutId={`card-container-${o.id}`}
                    className="relative overflow-hidden shadow-2xl"
                    style={{ 
                      clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
                      width: "300px",
                      height: "260px",
                      filter: `drop-shadow(0 25px 50px rgba(0, 0, 0, 0.25)) drop-shadow(0 0 30px ${o.color}40)`,
                      border: `2px solid ${o.color}60`,
                    }}
                  >
                    <motion.div
                      layoutId={`card-content-${o.id}`}
                      className="p-8 h-full flex flex-col justify-center items-center text-white relative text-center"
                      style={{
                        background: o.color,
                      }}
                    >
                      <div className="text-center">
                        <motion.h4 layoutId={`title-${o.id}`} className="text-xl lg:text-2xl font-bold mb-3">{o.title}</motion.h4>
                        <motion.p layoutId={`subtitle-${o.id}`} className="text-xs lg:text-sm text-white/90 max-w-xs leading-relaxed mb-4">{o.subtitle}</motion.p>
                      </div>

                      <div className="flex flex-col items-center gap-3">
                        {/* thumbnail */}
                        <div className="w-16 h-10 md:w-20 md:h-12 overflow-hidden rounded-lg shadow-lg">
                          <motion.div layoutId={`thumb-${o.id}`}>
                            <Image src={o.thumb} alt="thumb" width={160} height={100} className="object-cover w-full h-full" />
                          </motion.div>
                        </div>
                        
                        <button
                          className="text-xs lg:text-sm font-semibold text-white/95 bg-white/10 backdrop-blur-sm py-1.5 px-3 rounded-md hover:bg-white/20 transition"
                        >
                          اكتشف المزيد
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expanded Card Modal */}
      <AnimatePresence>
        {expandedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setExpandedCard(null)}
          >
            <motion.div
              layoutId={`card-${expandedCard}`}
              className="relative max-w-2xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                layoutId={`card-container-${expandedCard}`}
                className="relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <motion.div
                  layoutId={`card-content-${expandedCard}`}
                  className="p-12 text-white relative"
                  style={{
                    background: offers.find(o => o.id === expandedCard)?.color,
                  }}
                >
                  {/* Close button */}
                  <button
                    onClick={() => setExpandedCard(null)}
                    className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="text-right">
                    <motion.h4 layoutId={`title-${expandedCard}`} className="text-4xl lg:text-5xl font-bold mb-6">
                      {offers.find(o => o.id === expandedCard)?.title}
                    </motion.h4>
                    <motion.p layoutId={`subtitle-${expandedCard}`} className="text-lg lg:text-xl text-white/90 mb-8">
                      {offers.find(o => o.id === expandedCard)?.subtitle}
                    </motion.p>
                  </div>

                  {/* Expanded content */}
                  <div className="space-y-6">
                    <div className="flex justify-center">
                      <motion.div layoutId={`thumb-${expandedCard}`} className="w-48 h-32 overflow-hidden rounded-lg shadow-lg">
                        <Image 
                          src={offers.find(o => o.id === expandedCard)?.thumb || ""} 
                          alt="expanded thumb" 
                          width={320} 
                          height={200} 
                          className="object-cover w-full h-full" 
                        />
                      </motion.div>
                    </div>
                    
                    <div className="text-center space-y-4">
                      <p className="text-white/80 leading-relaxed">
                        اكتشف مساحات استثنائية مصممة خصيصاً لتلبية احتياجاتك التجارية. نوفر حلولاً متكاملة تجمع بين التصميم العصري والوظائف العملية.
                      </p>
                      <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition">
                        احجز موعد لمعاينة المساحة
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
