import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import LazyImage from '@/components/image/LazyImage';
import styles from './ReviewCard.module.scss';

export interface ReviewCardType {
  imgUrl: string;
  alt: string;
  category: string;
  text: string;
}
interface ReviewCardHandle extends HTMLDivElement {}
interface ReviewCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: ReviewCardType[];
  options?: EmblaOptionsType;
}

const ReviewCard = forwardRef<ReviewCardHandle, ReviewCardProps>(
  (props, ref) => {
    const cx = classNames.bind(styles);
    const { data, className, options, ...otherProps } = props;
    const [emblaRef] = useEmblaCarousel({
      loop: true,
      dragFree: true,
      ...options,
    });

    return (
      <div className="embla_review" ref={ref}>
        <div className="embla__review_viewport" ref={emblaRef}>
          <div className="embla__review_container">
            {data.map((item, index) => (
              <div className="embla__review_slide" key={index}>
                <LazyImage
                  src={item.imgUrl}
                  alt={item.alt}
                  className={cx('review_card', className)}
                  {...otherProps}
                >
                  <div className={cx('category')}>{item.category}</div>
                  <div className={cx('text')}>{item.text}</div>{' '}
                </LazyImage>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default ReviewCard;
