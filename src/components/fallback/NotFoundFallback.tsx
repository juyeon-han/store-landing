import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './NotFoundFallback.module.scss';

const NotFoundFallback = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/');
  };
  const cx = classNames.bind(styles);

  return (
    <div className={cx('wrapper')}>
      <p className={cx('error')}>404</p>
      <h1 className={cx('title')}>원하시는 페이지를 찾을 수 없습니다.</h1>
      <div className={cx('text')}>
        <p>
          찾으시는 페이지의 주소가 잘못 입력되었거나, 주소가 변경 또는 삭제되어
          찾을 수 없습니다. 원하시는 페이지를 찾으시려면 주소를 다시
          확인해주세요.
        </p>
      </div>
      <button className={cx('homeButton')} onClick={handleHomeClick}>
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default NotFoundFallback;
