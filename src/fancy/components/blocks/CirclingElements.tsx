'use client';

import React, { useEffect, useRef } from 'react';
import { motion, Easing, useMotionValue, useTransform, MotionValue } from 'framer-motion';

// Module-level shared state so the rotation survives component unmounts/remounts
let sharedGlobalRot = 0;
let sharedGlobalMotion: MotionValue<number> | null = null;
let sharedRaf: number | null = null;
let sharedLastTime: number | null = null;
let sharedInstances = 0;

function startSharedRAF(duration: number) {
  if (!sharedGlobalMotion) return;
  if (sharedRaf != null) return;
  sharedLastTime = performance.now();
  const step = (t: number) => {
    const last = sharedLastTime || t;
    const dt = t - last;
    sharedLastTime = t;
    const degPerMs = 360 / (duration * 1000);
    sharedGlobalRot = (sharedGlobalRot + degPerMs * dt) % 360;
    if (sharedGlobalMotion) sharedGlobalMotion.set(sharedGlobalRot);
    sharedRaf = requestAnimationFrame(step);
  };
  sharedRaf = requestAnimationFrame(step);
}

function stopSharedRAF() {
  if (sharedRaf != null) {
    cancelAnimationFrame(sharedRaf);
    sharedRaf = null;
    sharedLastTime = null;
  }
}

interface CirclingElementsProps {
  children: React.ReactNode[];
  radius: number;
  duration: number;
  easing?: Easing | Easing[];
  paused?: boolean;
}

const CirclingElements: React.FC<CirclingElementsProps> = ({
  children,
  radius,
  duration,
  easing = 'linear',
  paused = false,
}) => {
  // Create shared motion value at component level if not exists
  const localMotion = useMotionValue(sharedGlobalRot);
  if (!sharedGlobalMotion) {
    sharedGlobalMotion = localMotion;
  }

  const instanceMotion = useRef<MotionValue<number> | null>(null);

  useEffect(() => {
    instanceMotion.current = sharedGlobalMotion;
    sharedInstances += 1;
    // start RAF if this is the first instance
    if (sharedInstances === 1 && !paused) startSharedRAF(duration);

    return () => {
      sharedInstances = Math.max(0, sharedInstances - 1);
      if (sharedInstances === 0) stopSharedRAF();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (paused) {
      stopSharedRAF();
    } else {
      if (sharedInstances > 0) startSharedRAF(duration);
    }
  }, [paused, duration]);

  const RotatingItem: React.FC<{ index: number; total: number; children: React.ReactNode }> = ({ index, total, children }) => {
    const itemsCount = total || 1;
    const angle = (index * 360) / itemsCount;
    const source = instanceMotion.current ?? sharedGlobalMotion;
    const rotDerived = useTransform(source!, (v: number) => v + angle);
    const counter = useTransform(rotDerived, (v: number) => -v);

    if (!source) return null; // Safety check after hooks

    return (
      <motion.div
        className="absolute"
        style={{
          left: '50%',
          top: '50%',
          translateX: '-50%',
          translateY: '-50%',
          rotate: rotDerived
        }}
      >
        <div style={{ transform: `translate(${radius}px, 0px)` }}>
          <motion.div style={{ rotate: counter }}>
            {children}
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative">
      {React.Children.map(children, (child, index) => {
        // Prefer the child's own key if present so React preserves identity across re-renders
        const reactChild = child as React.ReactElement | null;
        const childKey = reactChild && reactChild.key != null ? String(reactChild.key) : String(index);
        return (
          <RotatingItem key={childKey} index={index} total={React.Children.count(children)}>
            {child}
          </RotatingItem>
        );
      })}
    </div>
  );
};

export default CirclingElements;
