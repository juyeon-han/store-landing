import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import ErrorImage from '@/assets/images/error_image.png';
import styles from './LazyImage.module.scss';

interface LazyImageType extends React.HTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const LazyImage = (props: LazyImageType) => {
  const cx = classNames.bind(styles);
  const { src, alt, style, className, children, ...otherProps } = props;
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(entry.isIntersecting);
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
      {
        isVisible && (
          <img
            src={imgSrc}
            alt={alt}
            className={cx('lazy_img', className)}
            onError={() => setImgSrc(ErrorImage)}
            {...otherProps}
          />
        )
        // : (
        //   <div className={cx('skeleton', className)}></div>
        // )
      }
    </div>
  );
};

export default LazyImage;
