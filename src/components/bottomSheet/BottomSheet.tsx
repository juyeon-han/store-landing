import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import { useGlobalContext } from '@/context/GlobalContext';
import useBottomSheet from '@/hooks/useBottomSheet';
import Icon from '@/styles/icons/icons';
import styles from './BottomSheet.module.scss';

interface BottomSheetHandle extends HTMLDivElement {}
interface BottomSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children: React.ReactNode;
  buttonText?: string;
  handleButton?: () => void;
}

const BottomSheet = forwardRef<BottomSheetHandle, BottomSheetProps>(
  (props, ref) => {
    const cx = classNames.bind(styles);
    const {
      children,
      title,
      buttonText = '적용하기',
      handleButton = () => {},
      ...otherProps
    } = props;

    const { sheet, content } = useBottomSheet();
    const { bottomSheetOpen, setBottomSheetOpen } = useGlobalContext();

    const handleClose = () => {
      setBottomSheetOpen(false);
    };

    return (
      <div
        ref={ref}
        {...otherProps}
        className={cx('container', { open: bottomSheetOpen })}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleClose();
        }}
      >
        <div
          className={cx('wrapper', { open: bottomSheetOpen })}
          ref={sheet}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <div className={cx('content')} ref={content}>
            <div className={cx('header')}>
              <p>{title}</p>
              <button className={cx('icon_wrapper')} onClick={handleClose}>
                <Icon name="Close" size="sm" className={cx('icon')} />
              </button>
            </div>
            {children}
          </div>
        </div>
        <div className={cx('footer')}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleButton();
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    );
  }
);

export default BottomSheet;
