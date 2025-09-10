"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";

const newsData = [
  {
    id: 1,
    title: "سعادة الشيخة الدكتورة حصة بنت حمد بن خليفة آل ثاني تدشن حاضنة المبادرات القيمية",
    subtitle: "لتعزيز البناء المجتمعي ودعم الأفراد والمؤسسات في ابتكار مشاريع تعزز القيم",
    description: "أطلقت سعادة الشيخة الدكتورة حصة بنت حمد بن خليفة آل ثاني، رئيس مجلس أمناء مؤسسة الحياة الطيبة، حاضنة المبادرات القيمية بهدف دعم الأفراد والمؤسسات في ابتكار مشاريع ومبادرات تعزز القيم الروحية والفكرية والاجتماعية. تأتي المبادرة كخطوة استراتيجية لبناء إنسان متكامل ومجتمع متوازن، من خلال توفير التدريب والتوجيه والموارد اللازمة، مع التركيز على الشباب، التعليم، البحث العلمي، وغرس الأخلاق الحميدة كركائز للتنمية المستدامة والازدهار المجتمعي.",
    date: "15 نوفمبر 2024",
    category: "مبادرات",
    image: "/assets/images/ribon.jpeg",
    featured: true
  },
  {
    id: 2,
    title: "الحياة الطيبة تفتتح مركزها البحثي الجديد",
    subtitle: "لدراسات التوازن الإنساني تحت إشراف سعادة الشيخة الدكتورة حصة",
    description: "في خطوة رائدة نحو تعزيز البحث العلمي، افتتحت مؤسسة الحياة الطيبة مركزها البحثي المتخصص في دراسات التوازن الإنساني، تحت إشراف مباشر من سعادة الشيخة الدكتورة حصة بنت حمد بن خليفة آل ثاني. يهدف المركز إلى إجراء أبحاث معمقة حول الأبعاد الروحية والفكرية والعاطفية والجسدية والاجتماعية للحياة، وتقديم حلول عملية وتوصيات مبنية على أسس علمية لدعم الأفراد والمؤسسات في تحقيق حياة متكاملة ومستقرة.",
    date: "28 أكتوبر 2024",
    category: "بحث علمي",
    image: "/assets/images/Education City Mosque.webp",
    featured: false
  },
  {
    id: 3,
    title: "شراكة استراتيجية مع وزارة التربية والتعليم",
    subtitle: "لدمج القيم الإنسانية في المناهج الدراسية وتنشئة جيل واعٍ ومسؤول",
    description: "أبرمت مؤسسة الحياة الطيبة، بقيادة سعادة الشيخة الدكتورة حصة بنت حمد بن خليفة آل ثاني، اتفاقية شراكة استراتيجية مع وزارة التربية والتعليم لدمج مفاهيم الحياة الطيبة والقيم الإنسانية الأصيلة في المناهج الدراسية. تهدف هذه الشراكة إلى تنشئة جيل واعٍ ومسؤول، قادر على مواجهة تحديات العصر بقيم راسخة وأخلاق حميدة، مما يسهم في بناء مستقبل أفضل للمجتمع.",
    date: "12 سبتمبر 2024",
    category: "شراكات",
    image: "/assets/images/شراكة المؤسسة مع وزارة التعليم (2).png",
    featured: false
  },
  {
    id: 4,
    title: "مؤتمر الحياة الطيبة: رؤى مستقبلية",
    subtitle: "يستقطب نخبة من المفكرين والخبراء من مختلف أنحاء العالم",
    description: "تستعد مؤسسة الحياة الطيبة لعقد مؤتمرها السنوي 'الحياة الطيبة: رؤى مستقبلية'، والذي سيجمع نخبة من المفكرين والخبراء من مختلف أنحاء العالم لمناقشة سبل تحقيق التوازن والازدهار في حياة الأفراد والمجتمعات. سيتناول المؤتمر، الذي يقام تحت رعاية سعادة الشيخة الدكتورة حصة بنت حمد بن خليفة آل ثاني، محاور رئيسية تتعلق بالصحة النفسية، التنمية المستدامة، والمسؤولية المجتمعية، مقدماً رؤى مبتكرة وتوصيات عملية.",
    date: "05 أغسطس 2024",
    category: "فعاليات",
    image: "/assets/images/Photo - QNCC Theatre with dramatic lights.avif",
    featured: false
  },
  {
    id: 5,
    title: "مؤسسة الحياة الطيبة تطلق منصة رقمية",
    subtitle: "لتقديم الاستشارات الأسرية والتربوية وبناء بيئة صحية للأسر",
    description: "في إطار سعيها لتقديم الدعم الشامل للمجتمع، أطلقت مؤسسة الحياة الطيبة، بتوجيهات من سعادة الشيخة الدكتورة حصة بنت حمد بن خليفة آل ثاني، منصة رقمية متكاملة لتقديم الاستشارات الأسرية والتربوية. توفر المنصة وصولاً سهلاً للخبراء والمتخصصين في مجالات التوجيه الأسري، التربية الإيجابية، وتنمية المهارات، بهدف مساعدة الأسر على بناء بيئة صحية ومستقرة لأبنائهم، وتعزيز التواصل الفعال بين أفرادها.",
    date: "22 يوليو 2024",
    category: "خدمات رقمية",
    image: "/assets/images/شراكة المؤسسة مع وزارة التعليم (1).jpg",
    featured: false
  }
];

export default function NewsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    setIsAutoScrolling(false); // Pause auto-scroll on user interaction
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % newsData.length);
    setIsAutoScrolling(false); // Pause auto-scroll on user interaction
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + newsData.length) % newsData.length);
    setIsAutoScrolling(false); // Pause auto-scroll on user interaction
  };

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoScrolling && inView) {
      autoScrollRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % newsData.length);
      },4500); // Change slide every 5 seconds
    } else {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isAutoScrolling, inView]);

  // Resume auto-scroll after user interaction
  useEffect(() => {
    if (!isAutoScrolling) {
      const resumeTimer = setTimeout(() => {
        setIsAutoScrolling(true);
      }, 2000); // Resume auto-scroll after 2 seconds of inactivity

      return () => clearTimeout(resumeTimer);
    }
  }, [isAutoScrolling]);

  // Pause auto-scroll on hover
  const handleMouseEnter = () => {
    setIsAutoScrolling(false);
  };

  const handleMouseLeave = () => {
    setIsAutoScrolling(true);
  };

  return (
    <section
      id="news"
      ref={ref}
      className="min-h-[90vh] flex items-center py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-white to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-5xl lg:text-6xl font-light text-center mb-4 text-teal-600 leading-tight">
            ألاحدث في المركز الإعلامي
          </h2>
          <button className="border border-teal-600 text-teal-600 px-6 py-2 rounded-md hover:bg-teal-600 hover:text-white transition-colors duration-300">
            اكتشف المزيد
          </button>
        </motion.div>

        {/* CSS Coverflow Container */}
        <div className="relative h-[900px] overflow-hidden">
          <div className="coverflow-container flex items-center justify-center h-full relative">
            <style jsx>{`
              .coverflow-container {
                perspective: 1200px;
                perspective-origin: center center;
              }
              
              .coverflow-item {
                position: absolute;
                width: 500px;
                height: 600px;
                transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
                cursor: pointer;
                transform-style: preserve-3d;
              }
              
              .coverflow-item.active {
                transform: translateX(0) translateZ(0) rotateY(0deg) scale(1);
                z-index: 30;
                opacity: 1;
              }
              
              .coverflow-item.prev-2 {
                transform: translateX(-600px) translateZ(-400px) rotateY(45deg) scale(0.6);
                z-index: 10;
                opacity: 0.4;
              }
              
              .coverflow-item.prev-1 {
                transform: translateX(-300px) translateZ(-200px) rotateY(35deg) scale(0.75);
                z-index: 20;
                opacity: 0.7;
              }
              
              .coverflow-item.next-1 {
                transform: translateX(300px) translateZ(-200px) rotateY(-35deg) scale(0.75);
                z-index: 20;
                opacity: 0.7;
              }
              
              .coverflow-item.next-2 {
                transform: translateX(600px) translateZ(-400px) rotateY(-45deg) scale(0.6);
                z-index: 10;
                opacity: 0.4;
              }
              
              .coverflow-item.hidden {
                transform: translateX(800px) translateZ(-600px) rotateY(-60deg) scale(0.4);
                z-index: 0;
                opacity: 0;
              }
              
              .coverflow-card {
                width: 100%;
                height: 100%;
                background: white;
                border-radius: 24px;
                overflow: hidden;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25), 0 10px 20px rgba(0, 0, 0, 0.1);
                transition: box-shadow 0.3s ease;
              }
              
              .coverflow-item.active .coverflow-card {
                box-shadow: 0 35px 80px rgba(0, 0, 0, 0.3), 0 15px 30px rgba(0, 0, 0, 0.15);
              }
            `}</style>

            {newsData.map((news, index) => {
              const diff = index - activeIndex;
              let positionClass = '';
              
              if (diff === 0) positionClass = 'active';
              else if (diff === -2) positionClass = 'prev-2';
              else if (diff === -1) positionClass = 'prev-1';
              else if (diff === 1) positionClass = 'next-1';
              else if (diff === 2) positionClass = 'next-2';
              else if (diff < -2) positionClass = index < activeIndex ? 'hidden' : 'next-2';
              else if (diff > 2) positionClass = index > activeIndex ? 'hidden' : 'prev-2';
              else positionClass = 'hidden';

              // Handle wrap around
              if (activeIndex === 0 && index === newsData.length - 1) positionClass = 'prev-1';
              if (activeIndex === 0 && index === newsData.length - 2) positionClass = 'prev-2';
              if (activeIndex === newsData.length - 1 && index === 0) positionClass = 'next-1';
              if (activeIndex === newsData.length - 1 && index === 1) positionClass = 'next-2';
              if (activeIndex === 1 && index === newsData.length - 1) positionClass = 'prev-2';
              if (activeIndex === newsData.length - 2 && index === 0) positionClass = 'next-2';

              const isActive = index === activeIndex;

              return (
                <div
                  key={news.id}
                  className={`coverflow-item ${positionClass}`}
                  onClick={() => handleCardClick(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleCardClick(index);
                    }
                  }}
                >
                  <div className="coverflow-card">
                    {/* Background Image */}
                    <div className="relative w-full h-3/5">
                      <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        className="object-cover"
                        priority={index <= 2}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="bg-teal-500/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-white">
                          {news.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-8 h-2/5 flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-bold mb-3 text-gray-800 leading-tight line-clamp-2">
                          {news.title}
                        </h3>
                        <p className="text-lg text-gray-600 mb-4 leading-relaxed line-clamp-2">
                          {news.subtitle}
                        </p>
                        
                        {/* Description - Only show on active card */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="text-sm text-gray-500 mb-4 leading-relaxed line-clamp-3"
                            >
                              {news.description}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Bottom section */}
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400 font-medium">{news.date}</span>
                        {isActive && (
                          <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-teal-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
                          >
                            اقرأ المزيد
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-teal-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-teal-600 hover:scale-105 transition-all duration-300 z-50"
            aria-label="Previous news"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12l7.5-7.5M3 12h18"/>
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-teal-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-teal-600 hover:scale-105 transition-all duration-300 z-50"
            aria-label="Next news"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12l-7.5 7.5M21 12H3"/>
            </svg>
          </button>
        </div>


      </div>
    </section>
  );
}
