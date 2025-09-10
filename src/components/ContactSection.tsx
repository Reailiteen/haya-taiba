'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    gender: '',
    messageType: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <section id="contact" ref={ref} className="py-8 bg-white min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-4 max-w-7xl h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-5xl lg:text-6xl font-bold text-teal-600 mb-4">
            تواصل معنا
          </h2>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-50 rounded-3xl p-8 lg:p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Row - Name, Email, Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-right text-gray-700 font-medium text-base">
                  الاسم كاملاً <span className="text-black text-3xl font-bold">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 text-right text-base"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-right text-gray-700 font-medium text-base">
                  البريد الإلكتروني <span className="text-black text-3xl font-bold">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 text-right text-base"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-right text-gray-700 font-medium text-base">
                  الجوال <span className="text-black text-3xl font-bold">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 text-right text-base"
                  required
                />
              </div>
            </div>

            {/* Second Row - Gender, Message Type, Subject */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-right text-gray-700 font-medium text-base">
                  النوع <span className="text-black text-3xl font-bold">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 text-right text-base appearance-none"
                  required
                >
                  <option value="" className="text-gray-400">اختر...</option>
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-right text-gray-700 font-medium text-base">
                  نوع الرسالة <span className="text-black text-3xl font-bold">*</span>
                </label>
                <select
                  name="messageType"
                  value={formData.messageType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 text-right text-base appearance-none"
                  required
                >
                  <option value="" className="text-gray-400">اختر...</option>
                  <option value="inquiry">استفسار</option>
                  <option value="complaint">شكوى</option>
                  <option value="suggestion">اقتراح</option>
                  <option value="partnership">شراكة</option>
                  <option value="other">أخرى</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-right text-gray-700 font-medium text-base">
                  عنوان الرسالة <span className="text-black text-3xl font-bold">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 text-right text-base"
                  required
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label className="block text-right text-gray-700 font-medium text-base">
                نص الرسالة (اختياري)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 text-right text-base resize-none"
                placeholder="اكتب رسالتك هنا..."
              />
            </div>
  

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center pt-8"
            >
              <motion.button
                type="submit"
                className="bg-teal-600 text-white px-16 py-4 rounded-xl font-medium text-xl hover:bg-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                إرسال
              </motion.button>
            </motion.div>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 text-xl mb-6 leading-relaxed max-w-4xl mx-auto">
            مؤسسة الحياة الطيبة، نؤمن بأهمية التواصل الفعال، ونتطلع إلى مشاركتكم وتفاعلكم معنا لبناء مستقبل أفضل.
          </p>
          <div className="space-y-3 text-gray-600 text-lg">
            <p className="font-medium">مؤسسة الحياة الطيبة للتدريب والتطوير المهني</p>
            <p>ص. ب. 12345 الدوحة، دولة قطر</p>
            <p className="text-teal-600 font-medium">info@wellbeing-initiative.qa</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
