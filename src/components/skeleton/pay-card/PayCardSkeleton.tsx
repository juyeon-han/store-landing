import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './PayCardSkeleton.module.scss';

interface PayCardSkeletonHandle extends HTMLDivElement {}
interface PayCardSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

const PayCardSkeleton = forwardRef<PayCardSkeletonHandle, PayCardSkeletonProps>(
  (props, ref) => {
    const cx = classNames.bind(styles);
    const { ...otherProps } = props;
    return (
      <div ref={ref} {...otherProps} className={cx('wrapper')}>
        <div className={cx('tag')} />
      </div>
    );
  }
);

export default PayCardSkeleton;
