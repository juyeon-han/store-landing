import { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { useGetServiceList, useGetServiceSub } from '@/api/service/service';
import { serviceCategoryType, ServiceType } from '@/api/types/serviceType';
import BottomSheet, {
  BottomSheetHandle,
} from '@/components/bottomSheet/BottomSheet';
import BottomSheetContent from '@/components/bottomSheet/BottomSheetContent';
import PayCard from '@/components/card/pay-card/PayCard';
import ProgramCard from '@/components/card/program-card/ProgramCard';
import RecommendCard from '@/components/card/recommend-card/RecommendCard';
import ErrorFallback from '@/components/fallback/ErrorFallback';
import BasicSkeleton from '@/components/skeleton/basic/BasicSkeleton';
import PayCardSkeleton from '@/components/skeleton/pay-card/PayCardSkeleton';
import ProgramCardSkeleton from '@/components/skeleton/program-card/ProgramCardSkeleton';
import ScrollTab from '@/components/tab/scroll-tab/ScrollTab';
import PageTitle from '@/components/title/PageTitle';
import { RESPONSE_CODE } from '@/constants/responseCode';
import { CARE_STEPS, CARE_STEPS_NOTICE } from '@/constants/text';
import useBreakpoint from '@/hooks/useBreakPoint';
import { useIntersectionObserver } from '@/hooks/useInteractionObserver';
import { usePageParams } from '@/hooks/usePageParams';
import Icon from '@/styles/icons/icons';
import { padNumber } from '@/utils/number';
import styles from './index.module.scss';

// const steps = [
//   {
//     id: '01',
//     step: '상체 부분 관리',
//   },
//   {
//     id: '02',
//     step: '두피 관리',
//   },
//   {
//     id: '03',
//     step: '클렌징',
//   },
//   {
//     id: '04',
//     step: '피부 관리',
//   },
//   {
//     id: '05',
//     step: '약손테라피',
//   },
//   {
//     id: '06',
//     step: '팩',
//   },
//   {
//     id: '07',
//     step: '마무리',
//   },
// ];

const tempUrl =
  'https://images.unsplash.com/photo-1739179418323-2d9517032c6f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8';

const CarePage = () => {
  const cx = classNames.bind(styles);
  const { pageParams } = usePageParams();
  const { setElements, isVisible } = useIntersectionObserver({
    threshold: 0.05,
  });
  const breakPoint = useBreakpoint();
  const careRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    setElements(careRef.current);
  }, []);

  const {
    data: _serviceListData,
    isSuccess,
    isPending: isServiceListPending,
    isError: isServiceListError,
    error: serviceListError,
    refetch: serviceListRefetch,
  } = useGetServiceList({
    pageNum: pageParams.pageNum,
    options: {
      throwOnError: false,
    },
  });

  const [selectedServiceCategoryId, setSelectedServiceCategoryId] =
    useState<string>('000');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('00000');
  const [serviceCategoryList, setServiceCategoryList] = useState<
    serviceCategoryType[]
  >([]);
  const [serviceList, setServiceList] = useState<ServiceType[]>([]);

  const serviceListData = useMemo(
    () =>
      _serviceListData?.resultCode === RESPONSE_CODE.SUCCESS
        ? _serviceListData.body?.serviceList
        : undefined,
    [_serviceListData]
  );

  const serviceProgram = useMemo(() => {
    return serviceList.find((item) => item.serviceCode === selectedServiceId)
      ?.serviceContent[0];
  }, [serviceList, selectedServiceId]);

  const getMatchedService = (serviceCategoryId: string) => {
    return (
      serviceListData?.find(
        (item) => item.serviceCategory.serviceCategoryCode === serviceCategoryId
      )?.service ?? []
    );
  };

  const getMatchedServiceCategoryId = (serviceId: string) => {
    return (
      serviceListData?.find((item) =>
        item.service.find((item) => item.serviceCode === serviceId)
      )?.serviceCategory?.serviceCategoryCode ?? '000'
    );
  };

  const getMatchedServiceTime = (serviceId: string) => {
    return (
      serviceList.find((item) => item.serviceCode === serviceId)?.serviceTime ??
      '0'
    );
  };

  const handleServiceCategory = (serviceCategoryId: string) => {
    setSelectedServiceCategoryId(serviceCategoryId);
    const matchedService = getMatchedService(serviceCategoryId);
    setServiceList(matchedService);
    setSelectedServiceId(matchedService[0].serviceCode);
  };

  const handleService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
  };

  useEffect(() => {
    const serviceCategoryList =
      serviceListData?.map((item) => item.serviceCategory) ?? [];

    const initServiceCategory = serviceCategoryList?.[0];

    const serviceList = serviceListData?.[0].service ?? [];

    const initService = serviceList?.[0];

    if (serviceCategoryList !== undefined && isSuccess) {
      setServiceCategoryList(serviceCategoryList);
      setServiceList(serviceList);
      setSelectedServiceCategoryId(initServiceCategory?.serviceCategoryCode);
      setSelectedServiceId(initService?.serviceCode);
    }
  }, [serviceListData]);

  const {
    data,
    isPending: isServiceSubPending,
    isError: isServiceSubError,
    error: serviceSubError,
    refetch: serviceSubRefetch,
  } = useGetServiceSub({
    pageNum: pageParams.pageNum,
    serviceCategoryCode: selectedServiceCategoryId,
    serviceCode: selectedServiceId,
    options: {
      enabled:
        selectedServiceCategoryId !== '000' && selectedServiceId !== '00000',
      throwOnError: false,
    },
  });

  const [sheetSelectedServiceId, setSheetSelectedServiceId] =
    useState<string>('');

  const serviceSubData = useMemo(
    () =>
      data?.resultCode === RESPONSE_CODE.SUCCESS
        ? data.body?.serviceSub
        : undefined,
    [data]
  );

  const bottomSheetRef = useRef<BottomSheetHandle>(null);

  const handleSheetItem = (serviceId: string) => {
    setSheetSelectedServiceId(serviceId);
  };

  const handleSheetButton = () => {
    const matchedServiceCategoryId = getMatchedServiceCategoryId(
      sheetSelectedServiceId
    );
    handleServiceCategory(matchedServiceCategoryId);
    handleService(sheetSelectedServiceId);
    bottomSheetRef.current?.close();
  };

  useEffect(() => {
    setSheetSelectedServiceId(selectedServiceId);
  }, [selectedServiceId]);

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
              {isServiceListError && (
                <ErrorFallback
                  error={serviceListError}
                  resetErrorBoundary={serviceListRefetch}
                />
              )}
              {isServiceListPending ? (
                <>
                  <BasicSkeleton />
                  <BasicSkeleton />
                </>
              ) : (
                <>
                  {serviceCategoryList.length > 0 && (
                    <ScrollTab
                      className={cx('line_tab')}
                      tabs={serviceCategoryList.map((item) => ({
                        id: item.serviceCategoryCode,
                        name: item.serviceCategoryName,
                      }))}
                      activeTabId={selectedServiceCategoryId}
                      handleActiveTab={handleServiceCategory}
                      mode="line"
                    />
                  )}
                  {serviceList.length > 0 && (
                    <ScrollTab
                      className={cx('button_tab')}
                      tabs={serviceList.map((item) => ({
                        id: item.serviceCode,
                        name: item.serviceName,
                      }))}
                      activeTabId={selectedServiceId}
                      handleActiveTab={handleService}
                      handleNextButton={() => bottomSheetRef.current?.open()}
                    />
                  )}
                </>
              )}
              <div className={cx('program_wrapper')}>
                {isServiceSubError && (
                  <ErrorFallback
                    error={serviceSubError}
                    resetErrorBoundary={serviceSubRefetch}
                    style={{ marginTop: 24 }}
                  />
                )}
                {!isServiceSubError && !isServiceListError && (
                  <>
                    {isServiceListPending ? (
                      <ProgramCardSkeleton />
                    ) : (
                      <ProgramCard
                        imgUrl={tempUrl ?? serviceProgram?.serviceContentImage}
                        title={
                          serviceProgram?.serviceContentTitle ??
                          '약손명가의 특별한 관리법'
                        }
                        text={
                          serviceProgram?.serviceContentContent ??
                          '프리미엄 케어라인의 관리 프로그램입니다.'
                        }
                      />
                    )}
                    <div
                      className={cx('pay_card_wrapper', {
                        pay_card_grid_wrapper:
                          serviceSubData && serviceSubData.length > 3,
                      })}
                    >
                      {isServiceSubPending
                        ? Array.from({ length: 3 }).map((_, index) => (
                            <PayCardSkeleton key={index} />
                          ))
                        : serviceSubData &&
                          serviceSubData.map((pay) => (
                            <PayCard
                              key={pay.serviceSubCode}
                              data={{
                                type_num: Number(pay.serviceSubCount),
                                discount_per: Number(
                                  pay.serviceSubDiscountPercent
                                ),
                                discount_price: Number(pay.serviceSubPrice),
                                origin_price: Number(
                                  pay.serviceSubOriginalPrice
                                ),
                                duration: Number(
                                  getMatchedServiceTime(selectedServiceId)
                                ),
                              }}
                              type={
                                serviceSubData && serviceSubData.length > 3
                                  ? 'grid'
                                  : 'column'
                              }
                            />
                          ))}
                    </div>
                  </>
                )}
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
                  {CARE_STEPS.map((step, idx) => (
                    <div className={cx('step')} key={step.id}>
                      <p className={cx('stress')}>Step {padNumber(idx + 1)}</p>
                      <hr className={cx('divider')} />
                      <p>{step.step}</p>
                    </div>
                  ))}
                </div>
                <ul className={cx('care_info_text')}>
                  {CARE_STEPS_NOTICE.map((notice) => (
                    <li key={notice.id}>{notice.step}</li>
                  ))}
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
          handleSheetButton={handleSheetButton}
          onClose={() => {
            setSheetSelectedServiceId(selectedServiceId);
          }}
        >
          <BottomSheetContent
            data={serviceListData ?? []}
            sheetSelectedId={sheetSelectedServiceId}
            handleSheetItem={handleSheetItem}
          />
        </BottomSheet>
      )}
    </>
  );
};

export default CarePage;
