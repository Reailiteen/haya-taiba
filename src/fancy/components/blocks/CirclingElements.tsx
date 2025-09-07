'use client';

import React, { useEffect, useRef } from 'react';
import { motion, Easing, useMotionValue, useTransform, animate } from 'framer-motion';

interface CirclingElementsProps {
  children: React.ReactNode[];
  radius: number;
  duration: number;
  easing?: Easing | Easing[];
  pauseOnHover?: boolean;
}

const CirclingElements: React.FC<CirclingElementsProps> = ({
  children,
  radius,
  duration,
  easing = 'linear',
  pauseOnHover = false,
}) => {
  // Small helper component so we can use hooks per item
  const RotatingItem: React.FC<{ index: number; total: number; children: React.ReactNode }> = ({ index, total, children }) => {
    const itemsCount = total || 1;
    const angle = (index * 360) / itemsCount;

    // Use refs to persist motion values across re-renders
    const rotRef = useRef(useMotionValue(angle));
    const counterRef = useRef(useTransform(rotRef.current, (v) => -v));
    const animationRef = useRef<any>(null);

    useEffect(() => {
      // Stop any existing animation
      if (animationRef.current) {
        animationRef.current.stop();
      }

      // Start new animation
      animationRef.current = animate(rotRef.current, angle + 360, {
        duration,
        ease: easing as any,
        repeat: Infinity,
        repeatType: 'loop',
      });

      return () => {
        if (animationRef.current) {
          animationRef.current.stop();
        }
      };
    }, [duration, easing, angle]);

    return (
      <motion.div
        className="absolute"
        style={{
          left: '50%',
          top: '50%',
          translateX: '-50%',
          translateY: '-50%',
          rotate: rotRef.current
        }}
      >
        <div style={{ transform: `translate(${radius}px, 0px)` }}>
          <motion.div style={{ rotate: counterRef.current }}>
            {(children as unknown) as React.ReactNode}
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative">
      {React.Children.map(children, (child, index) => (
        <RotatingItem key={index} index={index} total={React.Children.count(children)}>
          {child}
        </RotatingItem>
      ))}
    </div>
  );
};

export default CirclingElements;
