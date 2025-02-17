import { forwardRef, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
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
  const { menus, ...otherProps } = props;
  const [activeMenu, setActiveMenu] = useState<string>('');
  const [isFirstPage, setIsFirstPage] = useState<boolean>(false);

  const handleLogo = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMenu = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth',
      });
    }
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
          let isFirstPage = false;

          sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const visibleHeight =
              Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

            if (visibleHeight > maxVisibleHeight) {
              maxVisibleHeight = visibleHeight;
              mostVisibleSection = section.id;

              if (index === 0) {
                isFirstPage = true;
              }
            }
          });

          if (isFirstPage) {
            setIsFirstPage(true);
          } else {
            setIsFirstPage(false);
          }

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
    <ul
      className={cx('wrapper', { first_page: isFirstPage })}
      {...otherProps}
      ref={ref}
    >
      <button
        className={cx('logo_btn')}
        onClick={handleLogo}
        type="button"
        aria-label="홈으로 이동"
      >
        <img
          src="/src/assets/images/yakson_logo.png"
          alt="로고"
          aria-hidden="true"
        />
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
      <button className={cx('button')}>예약하기</button>
    </ul>
  );
});

export default Gnb;
