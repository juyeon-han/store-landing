import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import Icon from '@/styles/icons/icons';
import styles from './RecommendCard.module.scss';

interface RecommendCardHandle extends HTMLDivElement {}
interface RecommendCardProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
}

const RecommendCard = forwardRef<RecommendCardHandle, RecommendCardProps>(
  (props, ref) => {
    const cx = classNames.bind(styles);
    const { text, className, children, ...otherProps } = props;
    return (
      <div ref={ref} {...otherProps} className={cx('container', className)}>
        <div className={cx('background')}>
          <div className={cx('circle')}>{children}</div>
        </div>
        <div className={cx('footer')}>
          <Icon name="Check" />
          {text}
        </div>
      </div>
    );
  }
);

export default RecommendCard;
