import { useEffect, useState } from 'react';

export const useIntersectionObserver = (options = {}) => {
  const [elements, setElements] = useState<(HTMLElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState<boolean[]>([]);

  useEffect(() => {
    const observers = elements.map((element, index) => {
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
            observer.disconnect();
          }
        },
        { threshold: 0.2, ...options }
      );

      observer.observe(element);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, [elements, options]);

  return { setElements, isVisible };
};
