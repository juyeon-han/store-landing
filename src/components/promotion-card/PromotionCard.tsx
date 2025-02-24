import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import LazyImage from '@/components/image/LazyImage';
import styles from './PromotionCard.module.scss';

interface PromotionCardHandle extends HTMLDivElement {}
export interface PromotionType {
  tag: string;
  condition: string;
  product: string;
  imgUrl: string;
  num: number;
  event_date?: string;
}

interface PromotionCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    PromotionType {}

const PromotionCard = forwardRef<PromotionCardHandle, PromotionCardProps>(
  (props, ref) => {
    const cx = classNames.bind(styles);
    const {
      tag,
      condition,
      product,
      imgUrl,
      num,
      event_date,
      className,
      ...otherProps
    } = props;

    return (
      <div
        className={cx(
          'wrapper',
          {
            wrapper_with_date: event_date !== undefined,
          },
          className
        )}
        ref={ref}
        {...otherProps}
      >
        <div className={cx('sticker')}>
          <div className={cx('sticker_inner')}>Benefit {num}</div>
        </div>
        <div className={cx('content')}>
          {event_date && (
            <div className={cx('event_date')}>이벤트 기간 {event_date}</div>
          )}
          <p aria-label="promotion-condition" className={cx('condition')}>
            {condition}
          </p>
          <p aria-label="promotion-condition" className={cx('product')}>
            <span className={cx('stress')}>
              [<span>{product}</span>]
            </span>{' '}
            증정
          </p>
          <LazyImage src={imgUrl} alt="promotion" className={cx('image')} />
        </div>
        <div className={cx('back_circle')}></div>
      </div>
    );
  }
);

export default PromotionCard;
