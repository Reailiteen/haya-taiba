'use client';

import { useState, useEffect } from 'react';

interface ScreenSize {
  width: number;
  height: number;
  lessThan: (breakpoint: string) => boolean;
  greaterThan: (breakpoint: string) => boolean;
}

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const lessThan = (breakpoint: string): boolean => {
    const bp = breakpoints[breakpoint as keyof typeof breakpoints];
    return bp ? screenSize.width < bp : false;
  };

  const greaterThan = (breakpoint: string): boolean => {
    const bp = breakpoints[breakpoint as keyof typeof breakpoints];
    return bp ? screenSize.width > bp : false;
  };

  return {
    ...screenSize,
    lessThan,
    greaterThan,
  };
};

export default useScreenSize;
