import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './FooterSkeleton.module.scss';

interface FooterSkeletonHandle extends HTMLDivElement {}
interface FooterSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

const FooterSkeleton = forwardRef<FooterSkeletonHandle, FooterSkeletonProps>(
  (props, ref) => {
    const cx = classNames.bind(styles);
    const { ...otherProps } = props;
    return (
      <div ref={ref} {...otherProps} className={cx('wrapper')}>
        <div className={cx('footer_top')} />
        <div className={cx('footer_body')} />
        <div className={cx('footer_bottom')} />
      </div>
    );
  }
);

export default FooterSkeleton;
