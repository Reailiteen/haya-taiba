
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  pages: string[];
  description: string;
  category: string;
}

interface BookModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookModal({ book, isOpen, onClose }: BookModalProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isBookOpen, setIsBookOpen] = useState(false);

  if (!book) return null;

  const handleOpenBook = () => {
    setIsBookOpen(true);
    setCurrentPage(0);
  };

  const handleCloseBook = () => {
    setIsBookOpen(false);
    setTimeout(() => {
      onClose();
    }, 800); // Increased timeout to allow for closing animation
  };

  const nextPage = () => {
    if (currentPage < book.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 direction-rtl"
          onClick={handleCloseBook}
        >
          <motion.div
            initial={{ scale: 0.3, y: 200, rotateY: 0 }}
            animate={{ scale: 1, y: 0, rotateY: 0 }}
            exit={{ scale: 0.3, y: 200, rotateY: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              duration: 0.6
            }}
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            {!isBookOpen ? (
              // Closed Book View
              <motion.div
                className="relative cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={handleOpenBook}
              >
                {/* Book Cover - Large */}
                <motion.div
                  className="w-80 h-96 rounded-lg overflow-hidden shadow-2xl relative border border-amber-900/50"
                  layoutId={`book-${book.id}`}
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Book Spine */}
                  <div className="absolute left-0 top-0 w-6 h-full bg-gradient-to-b from-amber-900 to-amber-800 border-r border-amber-700"></div>

                  {/* Book Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 text-right">
                    <h2 className="text-white text-2xl font-bold mb-2">{book.title}</h2>
                    <p className="text-white/90 text-lg mb-2">{book.author}</p>
                    <p className="text-white/70 text-sm mb-3">{book.category}</p>
                    <p className="text-white/80 text-sm leading-relaxed">{book.description}</p>
                  </div>

                  {/* Click to Open Indicator */}
                  <motion.div
                    className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-white text-sm font-medium">انقر للفتح</span>
                  </motion.div>
                </motion.div>

                {/* Book Pages Effect */}
                <div className="absolute right-0 top-2 w-80 h-96 bg-white rounded-r-lg shadow-xl -z-10 transform translate-x-2"></div>
                <div className="absolute right-0 top-4 w-80 h-96 bg-gray-50 rounded-r-lg shadow-lg -z-20 transform translate-x-4"></div>
              </motion.div>
            ) : (
              // Open Book View
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative bg-white rounded-lg shadow-2xl overflow-hidden mx-auto"
                style={{ width: '800px', height: '600px' }}
              >
                {/* Close Button */}
                <button
                  onClick={handleCloseBook}
                  className="absolute top-4 right-4 z-10 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 transition-colors"
                >
                  <X size={20} />
                </button>

                {/* Book Header */}
                <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 border-b text-right">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">{book.title}</h2>
                  <p className="text-gray-600">بقلم: {book.author}</p>
                </div>

                {/* Book Pages */}
                <div className="flex h-full">
                  {/* Left Page */}
                  <div className="flex-1 p-8 bg-gradient-to-br from-white to-gray-50">
                    <div className="h-full flex flex-col">
                      <div className="text-sm text-gray-500 mb-4 text-right">صفحة {currentPage + 1}</div>
                      <div className="flex-1 overflow-y-auto book-content">
                        <motion.p
                          key={currentPage}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-gray-800 leading-relaxed text-lg text-right"
                        >
                          {book.pages[currentPage]}
                        </motion.p>
                      </div>
                    </div>
                  </div>

                  {/* Book Spine */}
                  <div className="w-4 bg-gradient-to-b from-amber-200 to-amber-400 shadow-inner"></div>

                  {/* Right Page */}
                  <div className="flex-1 p-8 bg-gradient-to-bl from-white to-gray-50">
                    <div className="h-full flex flex-col">
                      <div className="text-sm text-gray-500 mb-4 text-right">
                        {currentPage < book.pages.length - 1 ? `صفحة ${currentPage + 2}` : ''}
                      </div>
                      <div className="flex-1 overflow-y-auto book-content">
                        {currentPage < book.pages.length - 1 && (
                          <motion.p
                            key={currentPage + 1}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="text-gray-800 leading-relaxed text-lg text-right"
                          >
                            {book.pages[currentPage + 1]}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={16} />
                    السابق
                  </button>

                  <span className="text-gray-600 text-sm">
                    {Math.floor(currentPage / 2) + 1} / {Math.ceil(book.pages.length / 2)}
                  </span>

                  <button
                    onClick={nextPage}
                    disabled={currentPage >= book.pages.length - 1}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    التالي
                    <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


