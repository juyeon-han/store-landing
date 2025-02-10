import PageTitle from '@/components/title/PageTitle';
import styles from './index.module.scss';

const CarePage = () => {
  return (
    <div
      data-page="care"
      className={styles.container}
      style={{ height: '200vh', background: 'red' }}
    >
      <PageTitle category="Care" title="약손명가의 특별한 관리법" />
    </div>
  );
};

export default CarePage;
