import PageTitle from '@/components/title/PageTitle';
import styles from './index.module.scss';

const ReviewPage = () => {
  return (
    <div
      data-page="review"
      className={styles.container}
      style={{ height: '200vh', background: 'blue' }}
    >
      <PageTitle category="Review" title="리뷰로 증명된 가치" />
    </div>
  );
};

export default ReviewPage;
