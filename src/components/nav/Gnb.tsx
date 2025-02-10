import { forwardRef, useEffect, useState } from 'react';
import styles from './Gnb.module.scss';

interface GnbHandle extends HTMLDivElement {}
interface GnbProps extends React.HTMLAttributes<HTMLDivElement> {}

const Gnb = forwardRef<GnbHandle, GnbProps>((props, ref) => {
  const [isFirstPage, setIsFirstPage] = useState<boolean>(false);

  const menuData = [
    { id: 'care', name: '약손명가 관리' },
    { id: 'promotion', name: '프로모션' },
    { id: 'review', name: '리뷰' },
    { id: 'intro', name: '지점 & 원장님 소개' },
    { id: 'qna', name: 'Q&A' },
  ];

  const onClickMenu = (e: React.SyntheticEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const targetElement = e.target as HTMLAnchorElement;
    const menuHash = targetElement.hash;

    const matchedPage = document.querySelector(
      `[data-page="${menuHash.replace('#', '')}"]`
    );

    if (matchedPage) {
      const targetPosition =
        matchedPage.getBoundingClientRect().top + window.scrollY;
      const navHeight = 84;

      window.scrollTo({
        top: targetPosition - navHeight,
        behavior: 'smooth',
      });
    } else {
      console.warn(`No element found for data-page: ${menuHash}`);
    }
  };

  useEffect(() => {
    const careSection = document.getElementById('care');
    if (!careSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFirstPage(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(careSection);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={styles.wrapper}
      style={{ background: isFirstPage ? 'none' : 'white' }}
      {...props}
      ref={ref}
    >
      <img
        className={styles.logo}
        src="/src/assets/images/yakson_logo.png"
        alt="logo"
      />
      <div className={styles.menus}>
        {menuData.map((menu) => (
          <a key={menu.id} href={`#${menu.id}`} onClick={onClickMenu}>
            {menu.name}
          </a>
        ))}
      </div>
      <button className={styles.button}>예약하기</button>
    </div>
  );
});

export default Gnb;
