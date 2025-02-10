import { forwardRef } from 'react';
import styles from './Gnb.module.scss';

interface GnbHandle extends HTMLDivElement {}
interface GnbProps extends React.HTMLAttributes<HTMLDivElement> {}

const Gnb = forwardRef<GnbHandle, GnbProps>((props, ref) => {
  return (
    <div className={styles.wrapper} {...props} ref={ref}>
      <img
        className={styles.logo}
        src="/src/assets/images/yakson_logo.png"
        alt="logo"
      />
      <div className={styles.menus}>
        <a>약손명가 관리</a>
        <a>프로모션</a>
        <a>리뷰</a>
        <a>지점 & 원장님 소개</a>
        <a>Q&A</a>
      </div>
      <button className={styles.button}>예약하기</button>
    </div>
  );
});

export default Gnb;
