import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './QnaSkeleton.module.scss';

interface QnaSkeletonHandle extends HTMLDivElement {}
interface QnaSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

const QnaSkeleton = forwardRef<QnaSkeletonHandle, QnaSkeletonProps>(
  (props, ref) => {
    const cx = classNames.bind(styles);
    const { ...otherProps } = props;
    return <div ref={ref} {...otherProps} className={cx('wrapper')}></div>;
  }
);

export default QnaSkeleton;
