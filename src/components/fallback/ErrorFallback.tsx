import classNames from 'classnames/bind';
import Icon from '@/styles/icons/icons';
import styles from './ErrorFallback.module.scss';

const ErrorFallback = ({
  error,
  resetErrorBoundary,
  style,
}: {
  error: Error;
  resetErrorBoundary: () => void;
  marginTop?: number;
  style?: React.CSSProperties;
}) => {
  const cx = classNames.bind(styles);

  return (
    <div role="alert" className={cx('wrapper')} style={style}>
      <p className={cx('title')}>ERROR!</p>
      <pre className={cx('text')}>{error.message}</pre>
      <button className={cx('resetButton')} onClick={resetErrorBoundary}>
        다시 시도
        <Icon name="Refresh" color="white" size="sm" />
      </button>
    </div>
  );
};

export default ErrorFallback;
