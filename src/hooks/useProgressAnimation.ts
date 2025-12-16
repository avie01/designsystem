import { useState, useEffect, useRef } from 'react';

export function useProgressAnimation(
  targetValue: number,
  duration: number = 1000,
  isVisible: boolean = true
) {
  const [currentValue, setCurrentValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    if (!isVisible || currentValue === targetValue) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const newValue = Math.round(easedProgress * targetValue);

      setCurrentValue(newValue);
      setIsAnimating(true);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        startTimeRef.current = undefined;
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetValue, duration, isVisible]);

  return {
    currentValue,
    isAnimating,
    reset: () => {
      setCurrentValue(0);
      startTimeRef.current = undefined;
    }
  };
}