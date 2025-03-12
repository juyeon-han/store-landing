import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './PlaceIntroSkeleton.module.scss';

interface PlaceIntroSkeletonHandle extends HTMLDivElement {}
interface PlaceIntroSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const PlaceIntroSkeleton = forwardRef<
  PlaceIntroSkeletonHandle,
  PlaceIntroSkeletonProps
>((props, ref) => {
  const cx = classNames.bind(styles);
  const { ...otherProps } = props;
  return (
    <div ref={ref} {...otherProps} className={cx('wrapper')}>
      <div className={cx('ledger_img')} />
      <div className={cx('ledger_info')}>
        <div className={cx('name')} />
        <div className={cx('info')} />
        <div className={cx('info')} />
        <div className={cx('info')} />
        <div className={cx('button')} />
      </div>
    </div>
  );
});

export default PlaceIntroSkeleton;
