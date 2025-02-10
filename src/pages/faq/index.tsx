import PageTitle from '@/components/title/PageTitle';
import styles from './index.module.scss';

const FaqPage = () => {
  return (
    <div
      data-page="qna"
      className={styles.container}
      style={{ height: '200vh', background: 'green' }}
    >
      <PageTitle category="FAQ" title="프로그램 문의사항" />
    </div>
  );
};

export default FaqPage;
