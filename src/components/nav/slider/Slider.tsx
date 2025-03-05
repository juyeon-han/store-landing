import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import logo from '@/assets/images/yakson_logo.png';
import { GnbMenusType } from '@/components/nav/gnb/Gnb';
import Icon from '@/styles/icons/icons';
import styles from './Slider.module.scss';

interface SliderHandle extends HTMLDivElement {}
interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  isSliderOpen: boolean;
  setIsSliderOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menus: GnbMenusType[];
  activeMenu: string;
  handleMenu: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}

const Slider = forwardRef<SliderHandle, SliderProps>((props, ref) => {
  const cx = classNames.bind(styles);
  const {
    isSliderOpen,
    setIsSliderOpen,
    menus,
    activeMenu,
    handleMenu,
    ...otherProps
  } = props;

  const handleLogo = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseSlider = () => {
    setIsSliderOpen(false);
  };

  return (
    <div style={{ display: isSliderOpen ? 'block' : 'none' }}>
      <div className={cx('overlay')} onClick={handleCloseSlider}></div>
      <div ref={ref} {...otherProps} className={cx('container')}>
        <div className={cx('header')}>
          <button className={cx('logo_btn')} onClick={handleLogo}>
            <img src={logo} alt="로고" aria-hidden="true" />
          </button>
          <button className={cx('close_btn')} onClick={handleCloseSlider}>
            <Icon name="Close" size="sm" />
          </button>
        </div>
        <div className={cx('body')}>
          <li className={cx('menus')}>
            {menus.map((menu) => (
              <a
                className={cx({ active_menu: activeMenu === menu.id })}
                key={menu.id}
                href={`#${menu.id}`}
                onClick={(e) => handleMenu(e, menu.id)}
                aria-current={activeMenu === menu.id ? 'page' : undefined}
              >
                {menu.name}
              </a>
            ))}
          </li>
        </div>
        <div className={cx('footer')}>
          <button className={cx('reserve_btn')}>예약하기</button>
        </div>
      </div>
    </div>
  );
});

export default Slider;
