import classNames from 'classnames/bind';
import ScrollTab, { TabsType } from '@/components/tab/scroll-tab/ScrollTab';
import PageTitle from '@/components/title/PageTitle';
import styles from './index.module.scss';

const tabs: TabsType[] = [
  {
    id: '1',
    name: '작은 얼굴 관리',
  },
  {
    id: '2',
    name: '작은 얼굴 관리 + 작은 모공 관리',
  },
  {
    id: '3',
    name: '작은 얼굴 관리 X 필킨',
  },
  {
    id: '4',
    name: '윤곽 조각 얼굴 관리',
  },
  {
    id: '5',
    name: '윤곽 조각 얼굴 관리+ 작은 모공 관리',
  },
  {
    id: '6',
    name: '얼굴 근육 관리',
  },
  {
    id: '7',
    name: '얼굴 근육 관리 + 작은 모공 관리',
  },
  {
    id: '8',
    name: '얼굴 근육 관리 + 작은 모공 관리 + 필킨',
  },
  {
    id: '9',
    name: '얼굴 근육 관리 + 미백',
  },
];

const CarePage = () => {
  const cx = classNames.bind(styles);
  return (
    <section id="care" data-page="care" className={cx('container')}>
      <PageTitle category="Care" title="약손명가의 특별한 관리법" />
      <div className={cx('tab_container')}>
        <ScrollTab tabs={tabs} selectedId="2" />
      </div>
    </section>
  );
};

export default CarePage;
