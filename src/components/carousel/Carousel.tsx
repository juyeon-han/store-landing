import { forwardRef, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import LazyImage from '@/components/image/LazyImage';
import Icon from '@/styles/icons/icons';
import styles from './Carousel.module.scss';

interface CarouselHandle extends HTMLDivElement {}

interface ImgType {
  url: string;
  alt: string;
}

export interface CarouselType {
  imgArr: ImgType[];
  width?: number;
  subImgNum?: number;
}

interface CarouselProps
  extends React.HTMLAttributes<HTMLDivElement>,
    CarouselType {}

const Carousel = forwardRef<CarouselHandle, CarouselProps>((props, ref) => {
  const cx = classNames.bind(styles);
  const { width = '100%', imgArr, subImgNum = 5, ...otherProps } = props;

  const [showImgIdx, setShowImgIdx] = useState<number>(0);
  const [thumbStartIdx, setThumbStartIdx] = useState<number>(0);

  const showImg = imgArr[showImgIdx];

  const handleImgIdx = (dir: 'left' | 'right') => {
    if (dir === 'right') {
      setShowImgIdx((prev) => (prev + 1) % imgArr.length);
    } else {
      setShowImgIdx((prev) => (prev - 1 + imgArr.length) % imgArr.length);
    }
  };

  const handleSubImg = (idx: number) => {
    setShowImgIdx(idx);
  };

  const thumbImgLength = Math.min(imgArr.length, subImgNum);

  useEffect(() => {
    const thumbIdxArr = Array.from(
      { length: thumbImgLength },
      (_, i) => (thumbStartIdx + i) % imgArr.length
    );
    const thumbEndIdx = thumbIdxArr[thumbIdxArr.length - 1];
    if (!thumbIdxArr.includes(showImgIdx)) {
      // right
      if (showImgIdx === (thumbEndIdx + 1) % imgArr.length) {
        setThumbStartIdx((prev) => (prev + 1) % imgArr.length);
      }
      //left
      if (showImgIdx === (thumbStartIdx - 1 + imgArr.length) % imgArr.length) {
        setThumbStartIdx((prev) => (prev - 1 + imgArr.length) % imgArr.length);
      }
    }
  }, [showImgIdx, thumbStartIdx]);

  return (
    <div
      className={cx('container')}
      style={{ width }}
      {...otherProps}
      ref={ref}
    >
      <div className={cx('main_img_wrapper')}>
        <button className={cx('dir_btn')} onClick={() => handleImgIdx('left')}>
          <Icon name="ArrowLeft" />
        </button>
        <LazyImage
          src={showImg.url}
          alt={`main-image-${showImg.alt}`}
          width={'100%'}
          height={'400px'}
          className={cx('main_img')}
        />
        <button className={cx('dir_btn')} onClick={() => handleImgIdx('right')}>
          <Icon name="ArrowRight" />
        </button>
      </div>
      <div className={cx('sub_img_wrapper')}>
        {Array.from({
          length: thumbImgLength,
        }).map((_, index) => {
          const srcIdx = (thumbStartIdx + index) % imgArr.length;
          return (
            <LazyImage
              src={imgArr[srcIdx].url}
              alt={imgArr[srcIdx].alt}
              width={'100px'}
              height={'100px'}
              key={index}
              onClick={() => handleSubImg(srcIdx)}
              className={cx('sub_image', { selected: srcIdx === showImgIdx })}
            />
          );
        })}
      </div>
    </div>
  );
});

export default Carousel;
