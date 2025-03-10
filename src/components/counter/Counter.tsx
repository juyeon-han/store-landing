import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { formatNumberWithCommas } from '@/utils/number';

interface CounterHandle extends HTMLSpanElement {}
interface CounterProps extends React.HTMLAttributes<HTMLSpanElement> {
  from?: number;
  to: number;
  duration?: number;
}

const Counter = forwardRef<CounterHandle, CounterProps>((props, ref) => {
  const { from, to, duration = 2000, ...otherProps } = props;

  const getStartPercentage = (value: number) => {
    if (value < 100) return 0.1; // 10% (10~99)
    if (value < 1000) return 0.9; // 90% (100~999)
    if (value < 10000) return 0.95; // 95% (1000~9999)
    return 0.98; // 98% (10000 이상)
  };

  const getEasingFunction = (value: number) => {
    if (value < 100) return (x: number) => 1 - (1 - x) * (1 - x); // easeOutQuad (부드러운 감속)
    if (value < 1000) return (x: number) => 1 - Math.pow(1 - x, 4); // easeOutQuart (강한 감속)
    return (x: number) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x)); // easeOutExpo (매우 강한 감속)
  };

  const startPercentage = getStartPercentage(to);
  const easingFn = getEasingFunction(to);

  const startValue = from ?? Math.floor(to * startPercentage);

  const [count, setCount] = useState(startValue);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useImperativeHandle(ref, () => counterRef.current as CounterHandle, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          let startTime: number | null = null;

          const updateCounter = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easedProgress = easingFn(progress);
            const currentNumber = Math.floor(
              startValue + (to - startValue) * easedProgress
            );

            setCount(currentNumber);

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              setHasAnimated(true);
            }
          };

          requestAnimationFrame(updateCounter);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) observer.observe(counterRef.current);

    return () => observer.disconnect();
  }, [from, to, duration, hasAnimated]);

  return (
    <span {...otherProps} ref={counterRef}>
      {formatNumberWithCommas(count)}
    </span>
  );
});

export default Counter;
