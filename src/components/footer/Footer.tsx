import { forwardRef } from 'react';
import styles from './Footer.module.scss';

interface FooterHandle extends HTMLDivElement {}
interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const Footer = forwardRef<FooterHandle, FooterProps>((props, ref) => {
  return (
    <footer className={styles.container} {...props} ref={ref}>
      <img
        className={styles.logo}
        src="/src/assets/images/yakson_logo.png"
        alt="logo"
      ></img>
      <div className={styles.wrapper}>
        <div className={styles.footer_top}>
          <div>
            <span className={styles.title}>상담전화</span>
            <span className={styles.text}>
              1566-8500 (평일 오전 9시 ~ 오후 8시, 토/공휴일 오전 9시 ~ 오후
              4시)
            </span>
          </div>
          <div className={styles.link}>
            <a>스타고객</a>
            <a>이벤트</a>
            <a>고객의 소리</a>
            <a>고객님의 아이디어</a>
          </div>
        </div>
        <hr />
        <div className={styles.footer_info}>
          <div>
            <span className={styles.title}>대표</span>
            <span className={styles.text}>이병철</span>
            <span className={styles.title}>개인정보관리 책임자</span>
            <span className={styles.text}>김현숙</span>
            <span className={styles.title}>본사</span>
            <span className={styles.text}>
              서울특별시 강남구 영동대로142길 29 약손명가 빌딩 2층
            </span>
          </div>
          <div>
            <span className={styles.title}>사업자등록번호</span>
            <span className={styles.text}>211-88-34433</span>
            <span className={styles.title}>Tel</span>
            <span className={styles.text}>02-546-1600</span>
            <span className={styles.title}>Fax</span>
            <span className={styles.text}>02-6052-1608</span>
          </div>
          <div>
            <span className={styles.text}>개인정보취급방침</span>
          </div>
        </div>
        <div className={styles.footer_bottom}>
          <span className={styles.copyright}>
            COPYRIGHT 2021. YAKSON ALL RIGHT RESERVED
          </span>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
