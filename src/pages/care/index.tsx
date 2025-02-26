import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import PayCard from '@/components/card/pay-card/PayCard';
import RecommendCard from '@/components/card/recommend-card/RecommendCard';
import ScrollTab, { TabsType } from '@/components/tab/scroll-tab/ScrollTab';
import { useTabController } from '@/components/tab/tabController';
import PageTitle from '@/components/title/PageTitle';
import { useIntersectionObserver } from '@/hooks/useInteractionObserver';
import Icon from '@/styles/icons/icons';
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

const steps = [
  {
    id: '01',
    step: '등 크림 or 가슴 복부 관리',
  },
  {
    id: '02',
    step: '팔 관리',
  },
  {
    id: '03',
    step: '데콜테',
  },
  {
    id: '04',
    step: '두피 관리',
  },
  {
    id: '05',
    step: '피부 관리',
  },
  {
    id: '06',
    step: '작은 얼굴 테라피',
  },
  {
    id: '07',
    step: '팩',
  },
  {
    id: '08',
    step: '마무리',
  },
];

const pay_data = [
  {
    type_num: 1,
    origin_price: 130000,
    discount_per: 0,
    discount_price: 130000,
    duration: 60,
  },
  {
    type_num: 10,
    origin_price: 1300000,
    discount_per: 15,
    discount_price: 1100000,
    duration: 80,
  },
  {
    type_num: 20,
    origin_price: 2600000,
    discount_per: 23,
    discount_price: 2000000,
    duration: 80,
  },
  {
    type_num: 30,
    origin_price: 3900000,
    discount_per: 30,
    discount_price: 2730000,
    duration: 80,
  },
  {
    type_num: 40,
    origin_price: 2600000,
    discount_per: 23,
    discount_price: 2000000,
    duration: 80,
  },
  // {
  //   type_num: 50,
  //   origin_price: 3900000,
  //   discount_per: 30,
  //   discount_price: 2730000,
  //   duration: 80,
  // },
];

const CarePage = () => {
  const cx = classNames.bind(styles);
  const {
    activeTabId: activeBasisTabId,
    handleActiveTab: handleActiveBasisTab,
  } = useTabController({
    initTabId: basis_tabs[0].id,
  });

  const {
    activeTabId: activeScrollTabId,
    handleActiveTab: handleActiveScrollTab,
  } = useTabController({
    initTabId: basis_tabs[0].id,
  });

  const careRef = useRef<Array<HTMLDivElement | null>>([]);
  const { setElements, isVisible } = useIntersectionObserver();

  useEffect(() => {
    setElements(careRef.current);
  }, []);

  return (
    <section id="care" data-page="care" className={cx('container')}>
      <PageTitle category="Care" title="약손명가의 특별한 관리법" />
      <div
        className={cx('outer', `reveal ${isVisible[0] ? 'visible' : ''}`)}
        ref={(el) => (careRef.current[0] = el)}
      >
        <div className={cx('border')}>
          <div className={cx('inner')}>
            <ScrollTab
              className={cx('basis_tab')}
              tabs={basis_tabs}
              activeTabId={activeBasisTabId}
              handleActiveTab={handleActiveBasisTab}
              mode="line"
            />
            <ScrollTab
              className={cx('scroll_tab')}
              tabs={scroll_tabs}
              activeTabId={activeScrollTabId}
              handleActiveTab={handleActiveScrollTab}
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
                  작은 얼굴과 V라인이 미인의 첫째 조건으로 여겨지는 시대입니다.
                  얼굴이 작으면 전체적인 몸의 비율 좋아져 키가 작아도 8등신으로
                  보일 수 있습니다. 또한 V라인의 계란형 얼굴은 어떤
                  헤어스타일과도 잘 어울리는 이상적인 얼굴형이라 할 수 있습니다.
                </p>
              </div>
              <div
                className={cx('pay_card_wrapper', {
                  pay_card_grid_wrapper: pay_data.length > 3,
                })}
              >
                {pay_data.map((pay) => (
                  <PayCard
                    key={pay.type_num}
                    data={{ ...pay }}
                    type={pay_data.length > 3 ? 'grid' : 'column'}
                  />
                ))}
              </div>
            </div>
            <div className={cx('recommend_wrapper')}>
              <div className={cx('recommend_text')}>
                <Icon name="Line" size="xxl" />
                <Icon name="Dots" size="sm" />
                <p>이런 분들에게 추천드립니다</p>
              </div>
              <div className={cx('needs_wrapper')}>
                <RecommendCard text="작은 얼굴을 원하시는 분">
                  <Icon
                    name="CareSmallFace"
                    size={{ mobile: 100, tablet: 140, desktop: 140 }}
                  />
                </RecommendCard>
                <RecommendCard text="계란형 얼굴을 가지고 싶은 분">
                  <Icon
                    name="CareEggFace"
                    size={{ mobile: 100, tablet: 140, desktop: 140 }}
                  />
                </RecommendCard>
                <RecommendCard text="예쁜 두상을 가지고 싶은 분">
                  <Icon
                    name="CareHead"
                    size={{ mobile: 100, tablet: 140, desktop: 140 }}
                  />
                </RecommendCard>
              </div>
            </div>
            <div className={cx('step_wrapper')}>
              <p className={cx('info_text')}>
                약손명가는 효과적인 케어를 위해 단계별로 진행합니다
              </p>
              <div className={cx('block')}>Total 8 Step</div>
              <div className={cx('step_container')}>
                {steps.map((step) => (
                  <div className={cx('step')} key={step.id}>
                    <p className={cx('stress')}>Step {step.id}</p>
                    <hr className={cx('divider')} />
                    <p>{step.step}</p>
                  </div>
                ))}
              </div>
              <ul className={cx('care_info_text')}>
                <li>
                  관리 방법은 당일 고객님의 얼굴, 몸, 건강상태에 따라 관리순서가
                  다를 수 있습니다.
                </li>
                <li>
                  영양(보습,리프팅)과 테라피 관리 시, 고객님의 피부와 비대칭에
                  따라 맞춤식 관리를 하고 있습니다.
                </li>
                <li>위 계약은 각 매장과 체결합니다.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarePage;
