import { useEffect, useState } from 'react';

interface IntersectionObserverProps extends IntersectionObserverInit {}

export const useIntersectionObserver = (
  props: IntersectionObserverProps = {}
) => {
  const { threshold = 0.2, ...options } = props;
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
        { threshold, ...options }
      );

      observer.observe(element);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, [elements]);

  return { setElements, isVisible };
};
