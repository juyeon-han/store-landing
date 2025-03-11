import { forwardRef, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { EmblaOptionsType } from 'embla-carousel';
import AutoScroll from 'embla-carousel-auto-scroll';
import useEmblaCarousel from 'embla-carousel-react';
import LazyImage from '@/components/image/LazyImage';
import { useAutoPlayObserver } from '@/hooks/useAutoPlayObserver';
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
    const [canScrollNext, setCanScrollNext] = useState(false);

    const [emblaRef, emblaApi] = useEmblaCarousel(
      {
        loop: true,
        dragFree: true,
        containScroll: 'trimSnaps',
        active: canScrollNext,
        align: 'start',
        ...options,
      },
      [
        AutoScroll({
          speed: 1,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
          active: canScrollNext,
        }),
      ]
    );

    useEffect(() => {
      if (!emblaApi) return;

      const updateScrollState = () => {
        const canScrollNext = emblaApi.canScrollNext();
        setCanScrollNext(canScrollNext);
      };

      updateScrollState();
    }, [emblaApi, data, canScrollNext]);

    useAutoPlayObserver({ emblaApi, type: 'autoScroll' });

    return (
      <div className="embla_review" ref={ref}>
        <div className="embla__review_viewport" ref={emblaRef}>
          <div className="embla__review_container">
            {data.map((item, index) => (
              <div className="embla__review_slide" key={index}>
                <div className={cx('review_card', className)}>
                  <LazyImage
                    src={item.imgUrl}
                    alt={item.alt}
                    className={cx('review_card_img')}
                    {...otherProps}
                  />
                  <div className={cx('category')}>{item.category}</div>
                  <div className={cx('text')}>{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default ReviewCard;
