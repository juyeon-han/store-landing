import { forwardRef, useState } from 'react';
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

  const [imgIdx, setImgIdx] = useState<number>(0);
  const showImg = imgArr[imgIdx];

  const handleImgIdx = (dir: 'left' | 'right') => {
    if (dir === 'right') {
      setImgIdx((prev) => (prev + 1) % imgArr.length);
    } else {
      setImgIdx((prev) => (prev - 1 + imgArr.length) % imgArr.length);
    }
  };

  const handleSubImg = (idx: number) => {
    setImgIdx(idx);
  };

  const thumbImgNum = imgArr.length < subImgNum ? imgArr.length : subImgNum;

  return (
    <div
      className={styles.container}
      style={{ width }}
      {...otherProps}
      ref={ref}
    >
      <div className={cx('mainImgWrapper')}>
        <button className={cx('dir_btn')} onClick={() => handleImgIdx('left')}>
          <Icon name="ArrowLeft" />
        </button>
        <img
          src={showImg.url}
          alt={showImg.alt}
          className={cx('mainImg')}
        ></img>
        <button className={cx('dir_btn')} onClick={() => handleImgIdx('right')}>
          <Icon name="ArrowRight" />
        </button>
      </div>
      <div className={cx('subImgWrapper')}>
        {Array.from({
          length: thumbImgNum,
        }).map((_, index) => {
          const srcIdx = (imgIdx + index) % imgArr.length;

          return (
            <img
              src={imgArr[srcIdx].url}
              key={index}
              className={cx('subImg', srcIdx === imgIdx && 'selected')}
              onClick={() => handleSubImg(srcIdx)}
            ></img>
          );
        })}
      </div>
    </div>
  );
});

export default Carousel;
