'use client';

import React, { useEffect, useRef } from 'react';
import { motion, Easing, useMotionValue, useTransform } from 'framer-motion';

// Module-level shared state so the rotation survives component unmounts/remounts
let sharedGlobalRot = 0;
let sharedGlobalMotion: ReturnType<typeof useMotionValue> | null = null;
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
    sharedGlobalMotion!.set(sharedGlobalRot);
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
  pauseOnHover?: boolean;
  paused?: boolean;
}

const CirclingElements: React.FC<CirclingElementsProps> = ({
  children,
  radius,
  duration,
  easing = 'linear',
  pauseOnHover = false,
  paused = false,
}) => {
  // Small helper component so we can use hooks per item
  // ensure shared motion exists
  if (!sharedGlobalMotion) {
    // create a motion value via a temporary hook call — this is safe because module-level
    // initialization runs during first render and hooks must be called inside components, so
    // we instead create it lazily on mount below.
  }

  const instanceMotion = useRef<typeof sharedGlobalMotion | null>(null);

  // create a local motion value hook so we can initialize the shared motion on first render
  const localMotion = useMotionValue(sharedGlobalRot);
  if (!sharedGlobalMotion) {
    sharedGlobalMotion = localMotion as any;
  }

  useEffect(() => {
    // create shared motion value on first instance
    if (!sharedGlobalMotion) {
      sharedGlobalMotion = useMotionValue(sharedGlobalRot) as any;
    }

    instanceMotion.current = sharedGlobalMotion as any;
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
    // pause/resume control per-instance: when paused is true we don't stop the shared RAF,
    // we only stop updating the visual by not hiding the motion value. To keep it simple,
    // if paused -> stop shared RAF; if resumed and there are instances, restart it.
    if (paused) {
      stopSharedRAF();
    } else {
      if (sharedInstances > 0) startSharedRAF(duration);
    }
  }, [paused, duration]);

  const RotatingItem: React.FC<{ index: number; total: number; children: React.ReactNode }> = ({ index, total, children }) => {
    const itemsCount = total || 1;
    const angle = (index * 360) / itemsCount;
    const source = instanceMotion.current ?? sharedGlobalMotion!;
    const rotDerived = useTransform(source as any, (v: number) => v + angle);
    const counter = useTransform(rotDerived, (v: number) => -v);

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
            {(children as unknown) as React.ReactNode}
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
