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
    <section id="contact" ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            تواصل معنا
          </h2>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 lg:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* First Row - Name, Email, Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-right text-gray-700 font-medium">
                  الاسم كاملاً <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-right text-gray-700 font-medium">
                  البريد الإلكتروني <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-right text-gray-700 font-medium">
                  الجوال <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                  required
                />
              </div>
            </div>

            {/* Second Row - Gender, Message Type, Subject */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-right text-gray-700 font-medium">
                  النوع <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                  required
                >
                  <option value="" className="text-gray-400">اختر...</option>
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-right text-gray-700 font-medium">
                  نوع الرسالة <span className="text-red-500">*</span>
                </label>
                <select
                  name="messageType"
                  value={formData.messageType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
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
                <label className="block text-right text-gray-700 font-medium">
                  عنوان الرسالة <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                  required
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label className="block text-right text-gray-700 font-medium">
                نص الرسالة (اختياري)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right resize-none"
                placeholder="اكتب رسالتك هنا..."
              />
            </div>

            {/* Info Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-green-50 border border-green-200 rounded-lg p-6"
            >
              <p className="text-gray-700 text-right leading-relaxed">
                <span className="font-semibold">خدمات المركز:</span> مكتبة المركز، الورش التدريبية، قسم الاستشارات، الفعاليات والمؤتمرات.
              </p>
              <p className="text-gray-700 text-right leading-relaxed mt-2">
                <span className="font-semibold">أركان الحياة الطيبة:</span> الركن الروحي، العاطفي، الفكري، الجسدي، والاجتماعي لتحقيق التوازن الشامل.
              </p>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center"
            >
              <motion.button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-12 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
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
          <p className="text-gray-600 text-lg mb-2">
            مؤسسة الحياة الطيبة، نؤمن بأهمية التواصل الفعال، ونتطلع إلى مشاركتكم وتفاعلكم.
          </p>
          <div className="space-y-2 text-gray-600">
            <p>ص. ب. 12345 الدوحة، قطر</p>
            <p>دولة قطر</p>
            <p>البريد الإلكتروني: info@wellbeing-initiative.qa</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
