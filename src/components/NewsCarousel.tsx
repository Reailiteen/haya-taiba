"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";

const newsData = [
  {
    id: 1,
    title: "شراكة استراتيجية مع مؤسسة عالمية",
    subtitle: "توقيع اتفاقية تعاون لتطوير برامج التدريب المهني",
    description: "تم توقيع شراكة مهمة مع إحدى المؤسسات العالمية الرائدة لتطوير برامج تدريبية متخصصة في مجال التنمية الشخصية والمهنية، بهدف تعزيز قدرات الشباب وإعدادهم لسوق العمل المستقبلي.",
    date: "15 أغسطس 2024",
    category: "شراكات",
    image: "/assets/images/father_children_2.png",
    featured: true
  },
  {
    id: 2,
    title: "إطلاق برنامج القادة الشباب",
    subtitle: "موؤسسة جديدة لتأهيل الجيل القادم من القيادات",
    description: "أطلقت مؤسسة الحياة الطيبة برنامجاً متخصصاً لتأهيل القادة الشباب، يهدف إلى تنمية المهارات القيادية والفكرية لدى الشباب من خلال ورش تدريبية متنوعة ومشاريع عملية.",
    date: "02 سبتمبر 2024",
    category: "برامج",
    image: "/assets/images/father_children_4.png",
    featured: false
  },
  {
    id: 3,
    title: "مؤتمر الحياة الطيبة السنوي",
    subtitle: "جمع خبراء ومختصين من حول العالم",
    description: "استضافت المؤسسة مؤتمرها السنوي الأول بحضور أكثر من 500 مشارك وخبير دولي، حيث تم مناقشة أحدث الاتجاهات في مجال التنمية الشخصية والمجتمعية.",
    date: "20 يوليو 2024",
    category: "فعاليات",
    image: "/assets/images/social_pillar_man.png",
    featured: false
  },
  {
    id: 4,
    title: "جائزة التميز في التدريب",
    subtitle: "تكريم المؤسسة لجهودها المتميزة",
    description: "حصلت مؤسسة الحياة الطيبة على جائزة التميز في مجال التدريب والتطوير من قبل اتحاد المؤسسات العربية، تقديراً لجهودها الرائدة في تطوير البرامج التدريبية المبتكرة.",
    date: "10 يونيو 2024",
    category: "إنجازات",
    image: "/assets/images/intellectual_pillar_man.png",
    featured: false
  },
  {
    id: 5,
    title: "افتتاح مركز التدريب الثالث",
    subtitle: "توسع جغرافي لخدمة المزيد من المستفيدين",
    description: "افتتحت المؤسسة مركزها التدريبي الثالث في منطقة جديدة، مما يتيح الوصول إلى عدد أكبر من المستفيدين وتقديم خدمات تدريبية متطورة في بيئة عصرية ومجهزة بأحدث التقنيات.",
    date: "28 مايو 2024",
    category: "توسع",
    image: "/assets/images/physical_pillar_man.png",
    featured: false
  }
];

export default function NewsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % newsData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + newsData.length) % newsData.length);
  };

  return (
    <section
      id="news"
      ref={ref}
      className="min-h-[90vh] flex items-center py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100/20 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-6xl font-light text-center mb-4 text-teal-600 leading-tight">
            أحدث الأخبار
          </h2>
          <button className="border border-teal-600 text-teal-600 px-6 py-2 rounded-md hover:bg-teal-600 hover:text-white transition-colors duration-300">
            اكتشف المزيد
          </button>
        </motion.div>

        {/* CSS Coverflow Container */}
        <div className="relative h-[700px] overflow-hidden">
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
            className="absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center text-teal-600 hover:bg-white hover:scale-110 transition-all duration-300 z-50"
            aria-label="Previous news"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center text-teal-600 hover:bg-white hover:scale-110 transition-all duration-300 z-50"
            aria-label="Next news"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-12 space-x-3 space-x-reverse">
          {newsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-teal-600 scale-125 shadow-lg"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to news ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
