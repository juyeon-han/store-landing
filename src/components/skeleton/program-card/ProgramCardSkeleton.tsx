import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './ProgramCardSkeleton.module.scss';

interface ProgramCardSkeletonHandle extends HTMLDivElement {}
interface ProgramCardSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ProgramCardSkeleton = forwardRef<
  ProgramCardSkeletonHandle,
  ProgramCardSkeletonProps
>((props, ref) => {
  const cx = classNames.bind(styles);
  const { ...otherProps } = props;
  return <div ref={ref} {...otherProps} className={cx('wrapper')} />;
});

export default ProgramCardSkeleton;
