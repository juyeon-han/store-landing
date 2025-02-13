import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './LazyImage.module.scss';

interface LazyImageType extends React.ImgHTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
}

const LazyImage = (props: LazyImageType) => {
  const cx = classNames.bind(styles);
  const { src, alt, style, className, children, ...otherProps } = props;
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <div ref={imgRef}>
      {isVisible ? (
        <div
          aria-label={alt}
          style={{
            ...style,
            backgroundImage: `url(${src})`,
          }}
          className={cx('lazy_img', className)}
          {...otherProps}
        >
          {children}
        </div>
      ) : (
        <div className={cx('skeleton', className)}></div>
      )}
    </div>
  );
};

export default LazyImage;
