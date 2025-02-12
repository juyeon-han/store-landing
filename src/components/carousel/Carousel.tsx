import { forwardRef, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
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

  const thumbImgLength = imgArr.length < subImgNum ? imgArr.length : subImgNum;

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
        <div
          aria-label={`main-image-${showImg.alt}`}
          className={cx('main_img')}
          style={{ backgroundImage: `url(${showImg.url})` }}
        ></div>
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
            <div
              key={index}
              className={cx('sub_image', { selected: srcIdx === showImgIdx })}
              onClick={() => handleSubImg(srcIdx)}
              style={{ backgroundImage: `url(${imgArr[srcIdx].url})` }}
            ></div>
          );
        })}
      </div>
    </div>
  );
});

export default Carousel;
