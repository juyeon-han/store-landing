import PageTitle from '@/components/title/PageTitle';
import styles from './index.module.scss';

const PresentPage = () => {
  return (
    <div
      data-page="promotion"
      className={styles.container}
      style={{ height: '200vh', background: 'pink' }}
    >
      <PageTitle
        category="Present"
        title="아름다움을 위한 약손명가의 특별한 선물"
      />
    </div>
  );
};

export default PresentPage;
