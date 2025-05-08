import { forwardRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import logo from '@/assets/images/yakson_logo.png';
import Slider from '@/components/nav/slider/Slider';
import Icon from '@/styles/icons/icons';
import styles from './Gnb.module.scss';

export interface GnbMenusType {
  id: string;
  name: string;
}
interface GnbHandle extends HTMLUListElement {}
interface GnbProps extends React.HTMLAttributes<HTMLUListElement> {
  menus: GnbMenusType[];
}

const Gnb = forwardRef<GnbHandle, GnbProps>((props, ref) => {
  const cx = classNames.bind(styles);
  const navigate = useNavigate();

  const { menus, ...otherProps } = props;
  const [activeMenu, setActiveMenu] = useState<string>('');
  const [isTopPage, setIsTopPage] = useState<boolean>(false);
  const [isSliderOpen, setIsSliderOpen] = useState<boolean>(false);

  const handleLogo = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMenu = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveMenu(id);
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const handleSideMenuBtn = () => {
    setIsSliderOpen(true);
  };

  const handleReserve = () => {
    if (window.karrotPixel && window.karrotPixel.track) {
      window.karrotPixel.track('SubmitApplication');
    }

    // navigate('/reservation');
  };

  const handleReserveSlider = () => {
    navigate('/reservation');
  };

  useEffect(() => {
    const sections = document.querySelectorAll('[data-page]');
    let ticking = false; // requestAnimationFrame 중복 실행 방지
    let debounceTimeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          let maxVisibleHeight = 0;
          let mostVisibleSection = '';

          setIsTopPage(window.scrollY === 0);

          sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const visibleHeight =
              Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

            if (visibleHeight > maxVisibleHeight) {
              maxVisibleHeight = visibleHeight;
              mostVisibleSection = section.id;
            }
          });

          if (debounceTimeout) {
            clearTimeout(debounceTimeout);
          }

          debounceTimeout = setTimeout(() => {
            if (mostVisibleSection) {
              setActiveMenu(mostVisibleSection);
            }
          }, 100);

          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <ul
        className={cx('wrapper', { top_page: isTopPage })}
        {...otherProps}
        ref={ref}
      >
        <button
          className={cx('logo_btn')}
          onClick={handleLogo}
          type="button"
          aria-label="홈으로 이동"
        >
          <img src={logo} alt="로고" aria-hidden="true" />
        </button>

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
        <div className={cx('btn_wrapper')}>
          <button className={cx('reserve_btn')} onClick={handleReserve}>
            <Icon name="Calendar" size={20} className={cx('reserve_icon')} />
            예약하기
          </button>

          <button className={cx('menu_btn')} onClick={handleSideMenuBtn}>
            <Icon name="Menu" size="md" />
          </button>
        </div>
      </ul>
      {isSliderOpen && (
        <Slider
          isSliderOpen={isSliderOpen}
          setIsSliderOpen={setIsSliderOpen}
          menus={menus}
          activeMenu={activeMenu}
          handleMenu={handleMenu}
          handleButton={handleReserveSlider}
        />
      )}
    </>
  );
});

export default Gnb;
