import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import {
  useGetService,
  useGetServiceCategory,
  useGetServiceSub,
} from '@/api/service/service';
import BottomSheet, {
  BottomSheetHandle,
} from '@/components/bottomSheet/BottomSheet';
import BottomSheetContent from '@/components/bottomSheet/BottomSheetContent';
import PayCard from '@/components/card/pay-card/PayCard';
import RecommendCard from '@/components/card/recommend-card/RecommendCard';
import ScrollTab from '@/components/tab/scroll-tab/ScrollTab';
import { useTabController } from '@/components/tab/tabController';
import PageTitle from '@/components/title/PageTitle';
import { BRAND_CODE } from '@/constants/service';
import useBreakpoint from '@/hooks/useBreakPoint';
import { useIntersectionObserver } from '@/hooks/useInteractionObserver';
import Icon from '@/styles/icons/icons';
import styles from './index.module.scss';

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

const CarePage = () => {
  const cx = classNames.bind(styles);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const branchCode = params.get('branchCode') ?? '123';

  const { data: serviceCategoryData } = useGetServiceCategory({
    brandCode: BRAND_CODE.YAKSON,
    branchCode: Number(branchCode),
  });

  const lineTabsData =
    serviceCategoryData?.body?.serviceCategory.map((item) => ({
      id: item.serviceCategoryCode,
      name: item.serviceCategoryName,
    })) ?? [];

  const {
    activeTabId: serviceCategoryId,
    handleActiveTab: handleActiveLineTab,
  } = useTabController({
    initTabId: lineTabsData[0]?.id,
  });

  const { data: serviceData } = useGetService({
    brandCode: BRAND_CODE.YAKSON,
    branchCode: Number(branchCode),
    serviceCategoryCode: serviceCategoryId,
    options: {
      enabled: serviceCategoryId !== '000' && serviceCategoryId !== undefined,
    },
  });

  const buttonTabsData =
    serviceData?.body?.service.map((item) => ({
      id: item.serviceCode,
      name: item.serviceName,
    })) ?? [];

  const { activeTabId: serviceId, handleActiveTab: handleActiveButtonTab } =
    useTabController({
      initTabId: buttonTabsData[0]?.id,
    });

  const serviceCategoryIdRef = useRef<string>(serviceCategoryId);
  const serviceIdRef = useRef<string>(serviceId);

  const { data: serviceSubData } = useGetServiceSub({
    brandCode: BRAND_CODE.YAKSON,
    branchCode: Number(branchCode),
    serviceCategoryCode: serviceCategoryId,
    serviceCode: serviceId,
    options: {
      enabled:
        serviceId !== '000' &&
        serviceId !== undefined &&
        serviceCategoryId !== undefined &&
        serviceIdRef.current !== serviceId,
    },
  });

  useEffect(() => {
    serviceCategoryIdRef.current = serviceCategoryId;
    serviceIdRef.current = serviceId;
  }, [serviceCategoryId, serviceId]);

  const careRef = useRef<Array<HTMLDivElement | null>>([]);
  const { setElements, isVisible } = useIntersectionObserver({
    threshold: 0.05,
  });

  const breakPoint = useBreakpoint();

  const [sheetSelectedServiceId, setSheetSelectedServiceId] =
    useState<string>(serviceId);
  const [sheetSelectedServiceCategoryId, setSheetSelectedServiceCategoryId] =
    useState<string>(serviceCategoryId);

  const handleSheetItem = ({
    serviceCategoryId,
    serviceId,
  }: {
    serviceCategoryId: string;
    serviceId: string;
  }) => {
    setSheetSelectedServiceId(serviceId);
    setSheetSelectedServiceCategoryId(serviceCategoryId);
  };

  const handleBottomSheetButton = () => {
    handleActiveLineTab(sheetSelectedServiceCategoryId);
    handleActiveButtonTab(sheetSelectedServiceId);
    bottomSheetRef.current?.close();
  };

  useEffect(() => {
    setElements(careRef.current);
  }, []);

  const bottomSheetRef = useRef<BottomSheetHandle>(null);
  return (
    <>
      <section id="care" data-page="care" className={cx('container')}>
        <PageTitle category="Care" title="약손명가의 특별한 관리법" />
        <div
          className={cx('outer', `reveal ${isVisible[0] ? 'visible' : ''}`)}
          ref={(el) => (careRef.current[0] = el)}
        >
          <div className={cx('border')}>
            <div className={cx('inner')}>
              {lineTabsData.length > 0 && (
                <ScrollTab
                  className={cx('line_tab')}
                  tabs={lineTabsData}
                  activeTabId={serviceCategoryId}
                  handleActiveTab={handleActiveLineTab}
                  mode="line"
                />
              )}
              <ScrollTab
                className={cx('button_tab')}
                tabs={buttonTabsData}
                activeTabId={serviceId}
                handleActiveTab={handleActiveButtonTab}
                handleNextButton={() => bottomSheetRef.current?.open()}
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
                    작은 얼굴과 V라인이 미인의 첫째 조건으로 여겨지는
                    시대입니다. 얼굴이 작으면 전체적인 몸의 비율 좋아져 키가
                    작아도 8등신으로 보일 수 있습니다. 또한 V라인의 계란형
                    얼굴은 어떤 헤어스타일과도 잘 어울리는 이상적인 얼굴형이라
                    할 수 있습니다.
                  </p>
                </div>
                <div
                  className={cx('pay_card_wrapper', {
                    pay_card_grid_wrapper:
                      serviceSubData?.body?.serviceSub &&
                      serviceSubData?.body?.serviceSub.length > 3,
                  })}
                >
                  {serviceSubData?.body?.serviceSub.map((pay) => (
                    <PayCard
                      key={pay.serviceSubCode}
                      data={{
                        type_num: Number(pay.serviceSubCount),
                        discount_per: Number(pay.serviceSubDiscountPercent),
                        discount_price: Number(pay.serviceSubPrice),
                        origin_price: Number(pay.serviceSubOriginalPrice),
                        duration: Number(
                          serviceData?.body?.service[0].serviceTime
                        ),
                      }}
                      type={
                        serviceSubData?.body?.serviceSub &&
                        serviceSubData?.body?.serviceSub.length > 3
                          ? 'grid'
                          : 'column'
                      }
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
                    관리 방법은 당일 고객님의 얼굴, 몸, 건강상태에 따라
                    관리순서가 다를 수 있습니다.
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
      {breakPoint === 'mobile' && (
        <BottomSheet
          ref={bottomSheetRef}
          title="관리 선택"
          selectedServiceId={sheetSelectedServiceId}
          handleSheetButton={handleBottomSheetButton}
        >
          <BottomSheetContent
            brandCode={BRAND_CODE.YAKSON}
            branchCode={branchCode}
            serviceCategories={
              serviceCategoryData?.body?.serviceCategory.map((item) => ({
                id: item.serviceCategoryCode,
                name: item.serviceCategoryName,
              })) ?? []
            }
            sheetSelectedId={sheetSelectedServiceId}
            handleSheetItem={handleSheetItem}
          />
        </BottomSheet>
      )}
    </>
  );
};

export default CarePage;
