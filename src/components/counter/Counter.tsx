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
  const { from = 1, to, duration = 2000, ...otherProps } = props;

  const [count, setCount] = useState(from);
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
            const currentNumber = Math.floor(from + (to - from) * progress);

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
