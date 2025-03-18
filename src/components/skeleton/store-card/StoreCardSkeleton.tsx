import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './StoreCardSkeleton.module.scss';

interface StoreCardSkeletonHandle extends HTMLDivElement {}
interface StoreCardSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

const StoreCardSkeleton = forwardRef<
  StoreCardSkeletonHandle,
  StoreCardSkeletonProps
>((props, ref) => {
  const cx = classNames.bind(styles);
  const { ...otherProps } = props;
  return <div ref={ref} {...otherProps} className={cx('wrapper')} />;
});

export default StoreCardSkeleton;
