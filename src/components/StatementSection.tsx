import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

function Statement() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  useEffect(() => {
    const handleAnimationTrigger = (event: CustomEvent) => {
      if (event.detail.sectionId === 'statement') {
        setTriggerAnimation(true);
        // Reset after animation completes
        setTimeout(() => setTriggerAnimation(false), 1000);
      }
    };

    window.addEventListener('triggerSectionAnimation', handleAnimationTrigger as EventListener);
    return () => window.removeEventListener('triggerSectionAnimation', handleAnimationTrigger as EventListener);
  }, []);

  const shouldAnimate = isInView || triggerAnimation;

  return (
    <section id="statement" className="min-h-[90vh] flex items-center py-12 sm:py-16 md:py-20 bg-gray-100" ref={ref}>
      <div className="container mx-auto px-2">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex items-center gap-16 w-full">

            {/* Text Section */}
            <motion.div 
              className="flex-1 pr-4"
              initial={{ opacity: 0, y: 30 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="flex items-baseline gap-5 mb-10">
                <span className="text-5xl font-bold text-purple-800 leading-tight">كلمة سعادتها</span>
              </div>

              <div className="relative mb-10">
                <div className="text-8xl text-magenta-400 font-bold leading-none absolute -top-5 -right-2">&ldquo;</div>
                <p className="text-xl text-gray-600 leading-relaxed px-4 py-5 font-normal text-justify tracking-tight" style={{ wordSpacing: '-0.1em' }}>
                  غايتنا أن ننتقل من الإنسان الاقتصادي إلى الإنسان الشمولي، الذي يُسهم بكل أبعاده الروحية والعاطفية والفكرية والجسدية والاجتماعية في بناء مجتمع متوازن ومستدام.
                </p>
                <div className="text-8xl text-magenta-400 font-bold leading-none absolute -bottom-10 left-5">&rdquo;</div>
              </div>

              <div className="mt-8">
                <p className="text-2xl text-magenta-400 font-semibold mb-2">تحقيقًا لرؤية</p>
                <p className="text-3xl text-purple-800 font-bold leading-tight">سعادة الشيخة الدكتورة/ حصة بنت حمد بن خليفة آل ثاني</p>
                <p className="text-3xl text-purple-800 font-bold leading-tight">المؤسسة، رئيسة مجلس الإدارة للمركز</p>
              </div>
            </motion.div>

            {/* Image Section - Moved to Left */}
            <motion.div 
              className="flex-shrink-0"
              initial={{ opacity: 0, y: 30 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <Image
                src="/صورة صاحبة السمو.png"
                alt="صورة الشخص"
                width={400}
                height={400}
                className="w-25 h-auto object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Statement