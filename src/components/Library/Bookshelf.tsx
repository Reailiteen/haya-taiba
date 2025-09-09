
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  pages: string[];
  description: string;
  category: string;
}

const allBooks: Book[] = [
  {
    id: 1,
    title: "الخيميائي",
    author: "باولو كويلو",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&q=80",
    category: "أدب عالمي",
    description: "قصة راعي أندلسي شاب يدعى سانتياغو، يرحل في مغامرة لتحقيق حلمه المدفون بالعثور على كنز بجوار الأهرامات المصرية.",
    pages: [
      "كانت الشمس قد بدأت بالغروب، عندما وصل الراعي الشاب إلى كنيسة مهجورة، كانت شجرة جميز ضخمة تنمو في وسطها.",
      "قرر أن يقضي الليل هناك، وأن ينام تحت الشجرة، فقد كان متعباً من السفر.",
      "وضع أغنامه في الكنيسة، وفتح كتاباً كان يحمله، لكنه سرعان ما غلبه النعاس."
    ]
  },
  {
    id: 2,
    title: "قواعد العشق الأربعون",
    author: "إليف شافاق",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&q=80",
    category: "روايات صوفية",
    description: "رواية تتناول قصة حب بين جلال الدين الرومي وشمس التبريزي، وتستكشف أربعين قاعدة للعشق الإلهي.",
    pages: [
      "في كل مرة كنت أظن أنني وصلت إلى القاع، كان هناك قاع آخر ينتظرني.",
      "لكنني تعلمت أن القاع هو أيضاً بداية جديدة، نقطة انطلاق نحو الأعلى.",
      "فقط عندما تفقد كل شيء، تصبح حراً في فعل أي شيء."
    ]
  },
  {
    id: 3,
    title: "فن اللامبالاة",
    author: "مارك مانسون",
    cover: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&h=400&fit=crop&q=80",
    category: "تطوير الذات",
    description: "كتاب يقدم مقاربة غير تقليدية للسعادة، من خلال التركيز على ما يهم حقاً في الحياة وتجاهل الباقي.",
    pages: [
      "هذا الكتاب ليس عن كيفية تحقيق السعادة، بل عن كيفية التعامل مع المعاناة.",
      "فالحياة مليئة بالمشاكل، والهدف ليس التخلص منها، بل إيجاد المشاكل التي تستحق أن تحلها.",
      "اللامبالاة ليست عدم الاهتمام، بل الاهتمام بما هو مهم حقاً."
    ]
  },
  {
    id: 4,
    title: "عزازيل",
    author: "يوسف زيدان",
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&q=80",
    category: "روايات تاريخية",
    description: "رواية تاريخية تدور أحداثها في القرن الخامس الميلادي، وتتبع رحلة الراهب هيبا من مصر إلى سوريا.",
    pages: [
      "في ذلك الزمان، كانت الصحراء تمتد بلا نهاية، وكانت النجوم أقرب إلى الأرض.",
      "كنت أبحث عن الحقيقة، عن معنى الوجود، عن الله.",
      "لكنني وجدت فقط الشك، والضياع، وعزازيل."
    ]
  },
  {
    id: 5,
    title: "ألف شمس مشرقة",
    author: "خالد حسيني",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop&q=80",
    category: "أدب عالمي",
    description: "قصة مؤثرة عن الصداقة والمحبة والتضحية في أفغانستان التي مزقتها الحرب.",
    pages: [
      "مثل ألف شمس مشرقة، كانت حياتنا مليئة بالضوء والظلام.",
      "لكن حتى في أحلك الأوقات، كان هناك دائماً بصيص أمل.",
      "فالحب أقوى من الحرب، والصداقة تدوم إلى الأبد."
    ]
  },
  {
    id: 6,
    title: "الأسود يليق بك",
    author: "أحلام مستغانمي",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&q=80",
    category: "روايات عربية",
    description: "رواية رومانسية تدور أحداثها بين سيدة جزائرية ورجل أعمال لبناني، وتستكشف الحب والفن والسياسة.",
    pages: [
      "الأسود يليق بك، يا سيدة الأناقة والغموض.",
      "فالأسود ليس مجرد لون، بل هو حالة، شعور، أسلوب حياة.",
      "هو لون الليل، لون الحبر، لون الأسرار."
    ]
  },
  {
    id: 7,
    title: "الرجال من المريخ والنساء من الزهرة",
    author: "جون غراي",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&q=80",
    category: "تطوير الذات",
    description: "كتاب يقدم رؤى حول الاختلافات بين الرجال والنساء وكيفية تحسين العلاقات.",
    pages: [
      "الرجال من المريخ والنساء من الزهرة، هذا هو السبب في أننا لا نفهم بعضنا البعض.",
      "لكن عندما نفهم اختلافاتنا، يمكننا أن نبني جسوراً من التفاهم والحب.",
      "فالاختلافات ليست عائقاً، بل هي فرصة للنمو."
    ]
  },
  {
    id: 8,
    title: "ساق البامبو",
    author: "سعود السنعوسي",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&q=80",
    category: "روايات عربية",
    description: "رواية تتناول قضية الهوية والبحث عن الذات من خلال قصة شاب كويتي من أم فلبينية.",
    pages: [
      "مثل ساق البامبو، كنت أنمو في أرض غريبة، أحاول أن أجد جذوري.",
      "لكنني تعلمت أن الهوية ليست مجرد مكان، بل هي شعور بالانتماء.",
      "فالوطن ليس حيث تولد، بل حيث تجد نفسك."
    ]
  },
  {
    id: 9,
    title: "فن الحرب",
    author: "سون تزو",
    cover: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&h=400&fit=crop&q=80",
    category: "فلسفة",
    description: "نص عسكري صيني قديم مؤثر، يقدم استراتيجيات وتكتيكات للحرب.",
    pages: [
      "فن الحرب هو فن الخداع.",
      "عندما تكون قوياً، تظاهر بالضعف؛ عندما تكون قريباً، تظاهر بالبعد.",
      "الهدف الأسمى هو كسر مقاومة العدو دون قتال."
    ]
  },
  {
    id: 10,
    title: "نظرية الفستق",
    author: "فهد الأحمدي",
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&q=80",
    category: "تطوير الذات",
    description: "كتاب يقدم مجموعة من المقالات التي تتناول تطوير الذات والتفكير الإيجابي.",
    pages: [
      "نظرية الفستق تقول إن الحياة بسيطة، لكننا نجعلها معقدة.",
      "فقط ركز على ما يهم، وتجاهل الباقي.",
      "فالسعادة ليست في الكمال، بل في القبول."
    ]
  }
];

interface BookshelfProps {
  onBookClick?: (book: Book) => void;
}

export default function Bookshelf({ onBookClick }: BookshelfProps) {
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('الكل');
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const animationRef = useRef<number | null>(null);

  const categories = ['الكل', ...new Set(allBooks.map(book => book.category))];

  const filteredBooks = filter === 'الكل' ? allBooks : allBooks.filter(book => book.category === filter);
  
  // Create duplicated books for infinite scroll
  const infiniteBooks = [...filteredBooks, ...filteredBooks, ...filteredBooks];

  // Auto-scroll functionality
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let isRunning = true;

    const autoScroll = () => {
      if (!isRunning || isDragging.current) {
        if (isRunning) {
          animationRef.current = requestAnimationFrame(autoScroll);
        }
        return;
      }

      if (scrollContainer) {
        scrollContainer.scrollLeft += 2; // Increased speed for visibility
        
        // Reset scroll position for infinite effect
        const bookWidth = 160; // Approximate width of book + gap
        const totalBooks = filteredBooks.length;
        const sectionWidth = bookWidth * totalBooks;
        
        if (scrollContainer.scrollLeft >= sectionWidth * 2) {
          scrollContainer.scrollLeft = sectionWidth;
        }
      }
      
      if (isRunning) {
        animationRef.current = requestAnimationFrame(autoScroll);
      }
    };

    // Start the animation
    animationRef.current = requestAnimationFrame(autoScroll);

    return () => {
      isRunning = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [filteredBooks]);

  // Pause auto-scroll on hover
  const handleMouseEnter = () => {
    isDragging.current = true; // Use dragging flag to pause
  };

  const handleMouseLeave = () => {
    isDragging.current = false; // Resume by clearing the flag
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollRef.current?.scrollLeft || 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 1.5; // Adjust scroll speed
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  const handleMouseUp = () => {
    setTimeout(() => {
      isDragging.current = false; // Small delay before resuming auto-scroll
    }, 100);
  };

  const handleBookClick = (book: Book) => {
    if (onBookClick) {
      onBookClick(book);
    }
  };

  return (
    <div id="library" className="w-full bg-gradient-to-b from-amber-50 to-amber-100 py-16 direction-rtl">
      <div className="max-w-7xl mx-auto px-4">
        {/* Bookshelf Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">مكتبة الكتب التفاعلية</h1>
          <p className="text-lg text-gray-600">استكشف مجموعتنا المتنوعة من الكتب. مرر الفأرة لترى الكتب تنبض بالحياة، وانقر لتقرأ.</p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300 
                ${filter === cat 
                  ? 'bg-amber-700 text-white shadow-md' 
                  : 'bg-amber-200 text-amber-800 hover:bg-amber-300'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Wooden Shelf */}
        <div className="relative">
          {/* Shelf Background */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-amber-800 to-amber-900 rounded-lg shadow-lg"></div>
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-amber-900 rounded-lg"></div>
          
          {/* Books Container with Horizontal Scroll and Drag */}
          <motion.div
            ref={scrollRef}
            className="flex items-end gap-8 pb-8 px-4 overflow-x-scroll scrollbar-hide cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => {
              handleMouseUp();
              handleMouseLeave();
            }}
            onMouseEnter={handleMouseEnter}
            whileTap={{ cursor: 'grabbing' }}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {infiniteBooks.map((book, index) => (
              <motion.div
                key={`${book.id}-${index}`} // Unique key for duplicated books
                className="relative flex-shrink-0"
                initial={{ y: 0, scale: 1, rotateY: 0, rotateX: 0, rotateZ: 0 }}
                whileHover={{
                  y: -20,
                  scale: 1.15,
                  rotateY: 5,
                  rotateX: 2,
                  rotateZ: -2,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut"
                  }
                }}
                onHoverStart={() => setHoveredBook(book.id)}
                onHoverEnd={() => setHoveredBook(null)}
                onClick={() => handleBookClick(book)}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                {/* Book Shadow */}
                <motion.div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black/30 rounded-full blur-md"
                  animate={{
                    scale: hoveredBook === book.id ? 1.3 : 1,
                    opacity: hoveredBook === book.id ? 0.6 : 0.3
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Book Cover */}
                <motion.div
                  className="relative w-32 h-48 rounded-lg overflow-hidden shadow-xl border border-amber-900/50"
                  animate={{
                    boxShadow: hoveredBook === book.id 
                      ? "0 25px 50px rgba(0,0,0,0.4), 0 15px 30px rgba(0,0,0,0.3)"
                      : "0 8px 16px rgba(0,0,0,0.2)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Book Cover Image */}
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Book Spine */}
                  <div className="absolute left-0 top-0 w-4 h-full bg-gradient-to-b from-amber-900 to-amber-800 border-r border-amber-700"></div>
                  
                  {/* Book Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <h3 className="text-white text-sm font-bold leading-tight line-clamp-2 text-right">
                      {book.title}
                    </h3>
                    <p className="text-white/80 text-xs mt-1 text-right">
                      {book.author}
                    </p>
                  </div>

                  {/* Hover Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-yellow-400/30 to-amber-500/30 opacity-0"
                    animate={{
                      opacity: hoveredBook === book.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Book Pages Effect */}
                <div className="absolute right-0 top-2 w-32 h-48 bg-white rounded-r-lg shadow-md -z-10 transform translate-x-2"></div>
                <div className="absolute right-0 top-4 w-32 h-48 bg-gray-50 rounded-r-lg shadow-sm -z-20 transform translate-x-4"></div>
              </motion.div>
            ))}
          </motion.div>

          {/* Shelf Support */}
          <div className="absolute bottom-0 left-8 w-6 h-16 bg-gradient-to-r from-amber-700 to-amber-800 rounded-b-lg shadow-inner"></div>
          <div className="absolute bottom-0 right-8 w-6 h-16 bg-gradient-to-r from-amber-700 to-amber-800 rounded-b-lg shadow-inner"></div>
        </div>

        {/* Instructions */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            {hoveredBook ? `مرر الفأرة فوق: ${allBooks.find(b => b.id === hoveredBook)?.title}` : "الكتب تتحرك تلقائياً • مرر الفأرة فوق الكتب لإيقاف الحركة"}
          </p>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}


