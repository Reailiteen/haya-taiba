'use client';

import React from 'react';

const JourneyTitle: React.FC<{ subtitle?: string }> = ({ subtitle }) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">رحلة الحياة الطيبة</h2>
      {subtitle ? (
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
      ) : (
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">اكتشف أركان الحياة الطيبة الخمسة وكيف تتكامل لتحقيق التوازن والازدهار</p>
      )}
    </div>
  );
};

export default JourneyTitle;
