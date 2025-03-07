import { forwardRef, useImperativeHandle } from 'react';
import { a, config, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import classNames from 'classnames/bind';
import Icon from '@/styles/icons/icons';
import styles from './BottomSheet.module.scss';

export interface BottomSheetHandle {
  open: () => void;
  close: () => void;
}
interface BottomSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  buttonText?: string;
  height?: number;
  selectedServiceId?: string;
  children: React.ReactNode;
  handleSheetButton?: () => void;
}

const BottomSheet = forwardRef<BottomSheetHandle, BottomSheetProps>(
  (props, ref) => {
    const cx = classNames.bind(styles);

    const {
      title,
      buttonText = '적용하기',
      children,
      selectedServiceId: sheetSelectedId,
      handleSheetButton,
      ...otherProps
    } = props;

    const height = props.height ?? 500;
    const [{ y }, api] = useSpring(() => ({ y: height }));

    useImperativeHandle(ref, () => ({
      open: () => handleOpen({ canceled: false }),
      close: () => handleClose(),
    }));

    const handleOpen = ({ canceled }: { canceled: boolean }) => {
      api.start({
        y: 0,
        immediate: false,
        config: canceled ? config.wobbly : config.stiff,
      });
      document.body.style.overflowY = 'hidden';
    };

    const handleClose = (velocity = 0) => {
      api.start({
        y: height,
        immediate: false,
        config: { ...config.stiff, velocity },
      });
      document.body.style.overflowY = 'auto';
    };

    const handleBind = useDrag(
      ({
        last,
        velocity: [, vy],
        direction: [, dy],
        offset: [, oy],
        cancel,
        canceled,
        target,
      }) => {
        const bodyElement = (target as HTMLElement).closest(`.${styles.body}`);

        if (bodyElement) {
          const isAtTop = bodyElement.scrollTop === 0;
          const isAtBottom =
            bodyElement.scrollHeight - bodyElement.scrollTop ===
            bodyElement.clientHeight;

          // 스크롤이 끝에 도달하지 않았으면 드래그 무시
          if (!isAtTop && !isAtBottom) {
            return;
          }
          // 위로 스크롤 중이고 바닥에 닿지 않았으면 드래그 무시
          if (dy < 0 && !isAtBottom) {
            return;
          }
          // 아래로 스크롤 중이고 top에 닿지 않았으면 드래그 무시
          if (dy > 0 && !isAtTop) {
            return;
          }
        }

        if (oy < -70) cancel();

        if (last) {
          if (oy > height * 0.5 || (vy > 0.5 && dy > 0)) {
            handleClose(vy);
          } else {
            handleOpen({ canceled });
          }
        } else {
          api.start({ y: oy, immediate: true });
        }
      },
      {
        from: () => [0, y.get()],
        filterTaps: true,
        bounds: { top: 0 },
        rubberband: true,
      }
    );

    const display = y.to((py) => (py < height ? 'flex' : 'none'));

    return (
      <>
        <a.div
          className={cx('overlay')}
          style={{ display }}
          onClick={() => handleClose()}
        ></a.div>
        <div {...otherProps}>
          <a.div
            className={cx('sheet')}
            {...handleBind()}
            style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
          >
            <div className={cx('wrapper')}>
              <div className={cx('header')}>
                <p className={cx('title')}>{title}</p>
                <button
                  className={cx('icon_wrapper')}
                  onClick={() => handleClose()}
                >
                  <Icon name="Close" size="sm" className={cx('icon')} />
                </button>
              </div>
              <div id="bottomSheetBody" className={cx('body')}>
                {children}
              </div>
              <div className={cx('footer')}>
                <button className={cx('button')} onClick={handleSheetButton}>
                  {buttonText}
                </button>
              </div>
            </div>
          </a.div>
        </div>
      </>
    );
  }
);

export default BottomSheet;
