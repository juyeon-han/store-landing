import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './ReviewCardSkeleton.module.scss';

interface ReviewCardSkeletonHandle extends HTMLDivElement {}
interface ReviewCardSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ReviewCardSkeleton = forwardRef<
  ReviewCardSkeletonHandle,
  ReviewCardSkeletonProps
>((props, ref) => {
  const cx = classNames.bind(styles);
  const { ...otherProps } = props;
  return <div ref={ref} {...otherProps} className={cx('wrapper')}></div>;
});

export default ReviewCardSkeleton;
