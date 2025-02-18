import classNames from 'classnames/bind';
import PayCard from '@/components/card/pay-card/PayCard';
import BasisTab from '@/components/tab/basic-tab/BasisTab';
import ScrollTab, { TabsType } from '@/components/tab/scroll-tab/ScrollTab';
import PageTitle from '@/components/title/PageTitle';
import styles from './index.module.scss';

const basis_tabs: TabsType[] = [
  { id: '1', name: '얼굴 관리' },
  { id: '2', name: '바디 관리' },
  { id: '3', name: '맞춤 케어' },
  { id: '4', name: '집중 관리' },
  { id: '5', name: '맞춤 관리' },
];
const scroll_tabs: TabsType[] = [
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
      <BasisTab className={cx('basis_tab')} tabs={basis_tabs} selectedId="1" />
      <ScrollTab
        className={cx('scroll_tab')}
        tabs={scroll_tabs}
        selectedId="2"
      />
      <div className={cx('program_wrapper')}>
        <div
          className={cx('program_card')}
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1739179418323-2d9517032c6f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8)`,
          }}
        >
          <p className={cx('title')}>
            작고 갸름한 얼굴형으로 관리해주는 작은 얼굴형 관리
          </p>
          <p className={cx('text')}>
            작은 얼굴과 V라인이 미인의 첫째 조건으로 여겨지는 시대입니다. 얼굴이
            작으면 전체적인 몸의 비율 좋아져 키가 작아도 8등신으로 보일 수
            있습니다. 또한 V라인의 계란형 얼굴은 어떤 헤어스타일과도 잘 어울리는
            이상적인 얼굴형이라 할 수 있습니다.
          </p>
        </div>
        <div className={cx('pay_card_wrapper')}>
          <PayCard
            data={{
              type_num: 1,
              origin_price: 130000,
              discount_per: 0,
              discount_price: 130000,
              duration: 60,
            }}
          />
          <PayCard
            data={{
              type_num: 10,
              origin_price: 1300000,
              discount_per: 15,
              discount_price: 1100000,
              duration: 80,
            }}
          />
          <PayCard
            data={{
              type_num: 20,
              origin_price: 2600000,
              discount_per: 23,
              discount_price: 2000000,
              duration: 80,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default CarePage;
