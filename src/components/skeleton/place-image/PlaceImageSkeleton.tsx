import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './PlaceImageSkeleton.module.scss';

interface PlaceImageSkeletonHandle extends HTMLDivElement {}
interface PlaceImageSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const PlaceImageSkeleton = forwardRef<
  PlaceImageSkeletonHandle,
  PlaceImageSkeletonProps
>((props, ref) => {
  const cx = classNames.bind(styles);
  const { ...otherProps } = props;
  return <div ref={ref} {...otherProps} className={cx('wrapper')} />;
});

export default PlaceImageSkeleton;
