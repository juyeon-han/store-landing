import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { Property } from 'csstype';
import styles from './LazyImage.module.scss';

interface LazyImageType extends React.ImgHTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  width?: Property.Width;
  height?: Property.Height;
}

const LazyImage = (props: LazyImageType) => {
  const cx = classNames.bind(styles);
  const {
    src,
    alt,
    width = '400px',
    height = '400px',
    style,
    className,
    ...otherProps
  } = props;
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
    <div ref={imgRef} style={{ minHeight: '300px' }}>
      {isVisible ? (
        <div
          aria-label={alt}
          style={{
            ...style,
            backgroundImage: `url(${src})`,
            width,
            height,
          }}
          className={cx('lazy_img', className)}
          {...otherProps}
        ></div>
      ) : (
        <div style={{ width, height }} className={cx('skeleton')}></div>
      )}
    </div>
  );
};

export default LazyImage;
