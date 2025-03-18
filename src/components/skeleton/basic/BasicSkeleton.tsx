import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './BasicSkeleton.module.scss';

interface BasicSkeletonHandle extends HTMLDivElement {}
interface BasicSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

const BasicSkeleton = forwardRef<BasicSkeletonHandle, BasicSkeletonProps>(
  (props, ref) => {
    const cx = classNames.bind(styles);
    const { ...otherProps } = props;
    return <div ref={ref} {...otherProps} className={cx('wrapper')}></div>;
  }
);

export default BasicSkeleton;
