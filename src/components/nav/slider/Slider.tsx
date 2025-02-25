import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Slider.module.scss';

interface SliderHandle extends HTMLDivElement {}
interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
}

const Slider = forwardRef<SliderHandle, SliderProps>((props, ref) => {
  const cx = classNames.bind(styles);
  const { isOpen, ...otherProps } = props;

  return (
    <>
      {isOpen && (
        <div ref={ref} {...otherProps} className={cx('container')}>
          컴포넌트 작성하기
        </div>
      )}
    </>
  );
});

export default Slider;
