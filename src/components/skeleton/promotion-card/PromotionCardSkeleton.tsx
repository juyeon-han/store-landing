import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './PromotionCardSkeleton.module.scss';

interface PromotionCardSkeletonHandle extends HTMLDivElement {}
interface PromotionCardSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const PromotionCardSkeleton = forwardRef<
  PromotionCardSkeletonHandle,
  PromotionCardSkeletonProps
>((props, ref) => {
  const cx = classNames.bind(styles);
  const { ...otherProps } = props;
  return <div ref={ref} {...otherProps} className={cx('wrapper')}></div>;
});

export default PromotionCardSkeleton;
