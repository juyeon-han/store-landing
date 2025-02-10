import PageTitle from '@/components/title/PageTitle';
import styles from './index.module.scss';

const PlacePage = () => {
  return (
    <div
      data-page="intro"
      className={styles.container}
      style={{ height: '200vh', background: 'orange' }}
    >
      <PageTitle category="Place" title="약손명가 건대점" />
    </div>
  );
};

export default PlacePage;
