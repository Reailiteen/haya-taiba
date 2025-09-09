"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";

const offers = [
  {
    id: "library",
    title: "مكتبة المركز",
    subtitle: "استكشف آخر إصدارات المركز من الكتب والأبحاث المرتبطة بالركائز الخمس للحياة الطيبة، لتطوير ذاتك وتحقيق التوازن الشامل.",
    description: "مجموعة شاملة من الكتب والأبحاث العلمية التي تغطي جميع جوانب الحياة الطيبة والتوازن الشامل",
    features: ["أحدث الأبحاث العلمية", "كتب متنوعة في الركائز الخمس", "اقتراح مواضيع جديدة", "محتوى تفاعلي"],
    links: ["استكشف الأبحاث", "استكشف الكتب", "اقترح مواضيع تهمك"],
    color: "#0B4FD6", // Blue for intellectual pillar
    thumb: "/assets/images/intellectual_pillar_man.png",
  },
  {
    id: "workshops",
    title: "الورش التدريبية",
    subtitle: "نأهل ونطور الأفراد والكوادر المؤسسية لترسيخ مبادئ الحياة الطيبة عبر برامج تدريبية عملية وورش متخصصة.",
    description: "برامج تدريبية متخصصة وورش عمل عملية مصممة لتطوير المهارات وترسيخ مبادئ الحياة الطيبة",
    features: ["ورش تدريبية متخصصة", "دورات تطويرية", "تدريب مؤسسي", "شهادات معتمدة"],
    links: ["ورشنا ودوراتنا", "التسجيل في الورش والدورات", "الجهات التي تعاملت معنا"],
    color: "#4C1886", // Purple for social pillar
    thumb: "/assets/images/social_pillar_man.png",
  },
  {
    id: "consultation",
    title: "قسم الاستشارات",
    subtitle: "اصنع قراراتك بثقة من خلال استشاراتنا التي تساعدك على توسيع دائرة التفكير وبناء رؤية أعمق لتحقيق تأثير أكبر.",
    description: "خدمات استشارية متخصصة تساعد في اتخاذ القرارات الصائبة وبناء رؤية شاملة للحياة الطيبة",
    features: ["استشارات فردية", "استشارات مؤسسية", "توسيع دائرة التفكير", "بناء رؤية استراتيجية"],
    links: ["احجز استشارة", "آثار الاستشارات ومخرجاتها", "الجهات التي تعاملت معنا"],
    color: "#059669", // Green for spiritual pillar
    thumb: "/assets/images/spiritual_pillar_man.png",
  },
  {
    id: "events",
    title: "الفعاليات",
    subtitle: "ننظم وننسق معارض ومؤتمرات محلية وإقليمية وعالمية لنشر مفهوم الحياة الطيبة وتعزيز قيمها في المجتمع.",
    description: "فعاليات متنوعة تشمل معارض ومؤتمرات محلية وإقليمية وعالمية لنشر ثقافة الحياة الطيبة",
    features: ["مؤتمرات دولية", "معارض محلية", "فعاليات تعليمية", "مشاركات مجتمعية"],
    links: ["التسجيل في الفعاليات", "الفعاليات والمشاركات"],
    color: "#DC2626", // Red for physical pillar
    thumb: "/assets/images/physical_pillar_man.png",
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
            <h3 className="text-4xl font-bold text-right text-blue-700">ماذا نقدم</h3>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 items-start justify-center">
            {offers.map((o, idx) => (
              <motion.div
                key={o.id}
                layoutId={`card-${o.id}`}
                initial={{ opacity: 0, y: 30, scale: 1 }}
                animate={inView ? { 
                  opacity: 1, 
                  y: 0,
                  scale: 1
                } : { opacity: 0, y: 30, scale: 1 }}
                transition={{ delay: 0.15 * idx, duration: 0.7 }}
                className="relative w-full cursor-pointer"
                onClick={() => setExpandedCard(o.id)}
                whileHover={{ 
                  scale: 1.1, 
                  transition: { duration: 0.1, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                style={{
                  transition: "transform 0.1s ease-in-out"
                }}
              >
                {/* Dark shadow behind for 3D effect */}
                <div
                  className="absolute"
                  style={{
                    top: "2px", // closer
                    left: "8px", // shorter shadow
                    zIndex: 1,
                    filter: "blur(2px)" // sharper shadow
                  }}
                >
                  <div
                    style={{
                      width: "300px",
                      height: "260px",
                      backgroundColor: (() => {
                        // Create very dark version of each card's color
                        switch(o.id) {
                          case "library": return "rgba(5, 25, 87, 0.15)"; // Very dark blue
                          case "workshops": return "rgba(25, 8, 44, 0.15)"; // Very dark purple
                          case "consultation": return "rgba(2, 48, 33, 0.15)"; // Very dark green
                          case "events": return "rgba(71, 10, 10, 0.15)"; // Very dark red
                          default: return "rgba(0, 0, 0, 0.15)";
                        }
                      })(),
                      transform: "skew(-20deg)",
                      borderRadius: "8px"
                    }}
                  />
                </div>

                {/* Main parallelogram card */}
                <div className="relative" style={{ zIndex: 2 }}>
                  <div
                    className="relative overflow-hidden shadow-2xl"
                    style={{
                      width: "300px",
                      height: "260px",
                      border: `2px solid ${o.color}60`,
                      transform: "skew(-20deg)",
                      borderRadius: "8px",
                      background: `linear-gradient(135deg, ${o.color}E6 0%, ${o.color}F2 100%)` // higher opacity
                    }}
                  >
                    {/* Thumbnail as translucent background */}
                    <div
                      className="absolute inset-0 w-300px h-full"
                      style={{
                        backgroundImage: `url(${o.thumb})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        opacity: 0.7,
                        transform: "skew(20deg)" // Counter-transform to keep image straight
                      }}
                    />
                    
                    {/* Color overlay for better text readability */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${o.color}F2 0%, ${o.color}CC 50%, ${o.color}F2 100%)`, // higher opacity
                        transform: "skew(20deg)", // Counter-transform to keep overlay straight

                        opacity: 0.5,
                      }}
                    />
                    
                    <div
                      className="p-6 h-full flex flex-col justify-between text-white relative text-center"
                      style={{
                        zIndex: 3,
                        transform: "skew(20deg)" // Counter-transform to keep text straight
                      }}
                    >
                      {/* Top section with title and subtitle */}
                      <div className="text-center">
                        <h4 className="text-lg lg:text-xl font-bold mb-2">{o.title}</h4>
                        <p className="text-xs lg:text-sm text-white/90 leading-relaxed mb-3">{o.subtitle}</p>
                      </div>

                      {/* Bottom section with button */}
                      <div className="flex-1 flex flex-col justify-center space-y-2">
                        <button
                          className="text-xs lg:text-sm font-semibold text-white/95 bg-white/20 backdrop-blur-sm py-2 px-4 rounded-md hover:bg-white/30 transition-colors duration-200 border border-white/20"
                        >
                          استكشف الخدمة
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expanded Card Modal */}
      <AnimatePresence mode="wait">
        {expandedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.3,
              ease: "easeInOut"
            }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setExpandedCard(null)}
          >
            <motion.div
              layoutId={`card-${expandedCard}`}
              className="relative w-full max-w-5xl h-[85vh]"
              onClick={(e) => e.stopPropagation()}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
                mass: 0.6,
                restDelta: 0.01
              }}
              exit={{
                scale: 0.8,
                opacity: 0.8,
                transition: {
                  type: "spring",
                  damping: 25,
                  stiffness: 200,
                  mass: 0.8
                }
              }}
            >
              <motion.div 
                className="relative rounded-2xl overflow-hidden shadow-2xl h-full"
                style={{
                  background: offers.find(o => o.id === expandedCard)?.color,
                }}
                layout
                transition={{
                  type: "spring",
                  damping: 30,
                  stiffness: 300
                }}
                exit={{
                  borderRadius: "8px",
                  scale: 0.9,
                  transition: {
                    type: "spring",
                    damping: 25,
                    stiffness: 200,
                    duration: 0.4
                  }
                }}
              >
                {/* Background image overlay */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${offers.find(o => o.id === expandedCard)?.thumb})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.5,
                  }}
                  layout
                  exit={{
                    opacity: 0.1,
                    transition: { duration: 0.3 }
                  }}
                />
                
                {/* Color overlay */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${offers.find(o => o.id === expandedCard)?.color}F2 0%, ${offers.find(o => o.id === expandedCard)?.color}CC 50%, ${offers.find(o => o.id === expandedCard)?.color}F2 100%)`,
                    opacity: 0.5,
                  }}
                  layout
                  exit={{
                    opacity: 0.5,
                    transition: { duration: 0.3 }
                  }}
                />

                {/* Content */}
                <motion.div 
                  className="relative z-10 h-full flex flex-col p-6 text-white"
                  layout
                  exit={{
                    opacity: 0,
                    y: 20,
                    transition: { 
                      duration: 0.2,
                      ease: "easeIn"
                    }
                  }}
                >
                  {/* Header */}
                  <motion.div 
                    className="flex justify-between items-start mb-6"
                    layout
                  >
                    <motion.div layout>
                      <motion.h3 
                        className="text-3xl lg:text-4xl font-bold mb-2"
                        layout
                      >
                        {offers.find(o => o.id === expandedCard)?.title}
                      </motion.h3>
                      <motion.p 
                        className="text-lg lg:text-xl text-white/90"
                        layout
                      >
                        {offers.find(o => o.id === expandedCard)?.subtitle}
                      </motion.p>
                    </motion.div>
                    
                    <motion.button
                      className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setExpandedCard(null)}
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </motion.div>
                  
                  {/* Description */}
                  <motion.p 
                    className="text-base lg:text-lg text-white/80 mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {offers.find(o => o.id === expandedCard)?.description}
                  </motion.p>
                  
                  {/* Features Grid */}
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                      <h5 className="text-xl font-bold mb-4 text-white">الخدمات المتاحة</h5>
                      <ul className="space-y-2">
                        {offers.find(o => o.id === expandedCard)?.links?.map((link, index) => (
                          <motion.li 
                            key={index} 
                            className="flex items-center text-white/90 text-sm"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.05 }}
                          >
                            <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                            {link}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                      <h5 className="text-xl font-bold mb-4 text-white">المميزات</h5>
                      <ul className="space-y-2">
                        {offers.find(o => o.id === expandedCard)?.features.map((feature, index) => (
                          <motion.li 
                            key={index} 
                            className="flex items-center text-white/90 text-sm"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.05 }}
                          >
                            <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                  
                  {/* Call to Action */}
                  <motion.div 
                    className="text-center space-y-4 mt-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-white/80 leading-relaxed text-base max-w-2xl mx-auto">
                      انضم إلينا في رحلة نحو تحقيق التوازن الشامل والحياة الطيبة من خلال خدماتنا المتنوعة المصممة خصيصاً لتلبية احتياجاتك وتطوير إمكانياتك.
                    </p>
                    <motion.button 
                      className="bg-white text-black px-8 py-3 rounded-xl font-semibold text-lg hover:bg-white/90 transition-colors duration-200 shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ابدأ رحلتك نحو الحياة الطيبة
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
