import { useEffect, useMemo, useRef } from 'react';
import classNames from 'classnames/bind';
import { useGetPageDetail } from '@/api/service/page';
import StoreCard from '@/components/card/store-card/StoreCard';
import EmblaCarousel from '@/components/carousel/Carousel';
import ErrorFallback from '@/components/fallback/ErrorFallback';
import LazyImage from '@/components/image/LazyImage';
import PlaceImageSkeleton from '@/components/skeleton/place-image/PlaceImageSkeleton';
import PlaceIntroSkeleton from '@/components/skeleton/place-intro/PlaceIntroSkeleton';
import StoreCardSkeleton from '@/components/skeleton/store-card/StoreCardSkeleton';
import PageTitle from '@/components/title/PageTitle';
import { RESPONSE_CODE } from '@/constants/responseCode';
import { useIntersectionObserver } from '@/hooks/useInteractionObserver';
import { usePageParams } from '@/hooks/usePageParams';
import Icon from '@/styles/icons/icons';
import { replaceBackSlash } from '@/utils/string';
import styles from './index.module.scss';

const PlacePage = () => {
  const cx = classNames.bind(styles);

  const placeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const { setElements, isVisible } = useIntersectionObserver();
  const { pageParams } = usePageParams();

  const { data, isSuccess, isPending, isError, error, refetch } =
    useGetPageDetail({
      pageNum: pageParams.pageNum,
      options: {
        throwOnError: false,
      },
    });

  const placeData = useMemo(
    () =>
      data?.resultCode === RESPONSE_CODE.SUCCESS ? data.body?.page : undefined,
    [data]
  );

  useEffect(() => {
    if (placeData && isSuccess) {
      setElements(placeRefs.current);
    }
  }, [placeData, isSuccess]);

  return (
    <section className={cx('container')} id="intro" data-page="intro">
      <div className={cx('background')} />
      <div className={cx('container_inner')}>
        <PageTitle
          category="Location & Director"
          title={placeData?.pageBranchName ?? '약손명가'}
          style={{ marginBottom: 0 }}
          isStore
        />
        {isError && (
          <ErrorFallback
            error={error}
            resetErrorBoundary={refetch}
            style={{ marginTop: 60 }}
          />
        )}
        {!isError && (
          <>
            <div className={cx('address')}>
              <Icon name="Location" color="brown700" size="sm" />
              <p>{placeData?.pageBranchAddr ?? ''}</p>
            </div>
            <div className={cx('store_card')}>
              {isPending ? (
                <StoreCardSkeleton />
              ) : (
                placeData && (
                  <StoreCard
                    data={{
                      customers: Number(placeData.totalCustomerCount),
                      sessions: Number(placeData.totalCareCount),
                      year: placeData.pageOwnerYearsOfExperience,
                    }}
                    ref={(el) => (placeRefs.current[0] = el)}
                    className={`reveal ${isVisible[0] ? 'visible' : ''}`}
                  />
                )
              )}
            </div>
            <p className={cx('store_intro')}>
              <span className={cx('point')}>전문성</span>과{' '}
              <span className={cx('point')}>정성</span>이 깃든 공간, <br />
              {placeData ? placeData.pageBranchName : '약손명가 지점'}을
              소개합니다.
            </p>
            {isPending ? (
              <PlaceImageSkeleton />
            ) : (
              placeData && (
                <div
                  ref={(el) => (placeRefs.current[1] = el)}
                  className={cx(
                    `reveal ${isVisible[1] ? 'visible' : ''}`,
                    'carousel_wrapper'
                  )}
                >
                  {
                    <EmblaCarousel
                      slides={placeData.pageImage.map((item, idx) => ({
                        url: item.pageImageUrl,
                        alt: `지점 이미지-${idx}`,
                      }))}
                    />
                  }
                </div>
              )
            )}
            {isPending ? (
              <PlaceIntroSkeleton />
            ) : (
              placeData && (
                <div
                  className={cx(
                    'ledger_wrapper',
                    `reveal ${isVisible[2] ? 'visible' : ''}`
                  )}
                  ref={(el) => (placeRefs.current[2] = el)}
                >
                  <LazyImage
                    src={replaceBackSlash(placeData.pageOwnerProfileUrl)}
                    alt="원장님 이미지"
                    className={cx('ledger_img')}
                  />
                  <div className={cx('ledger_info')}>
                    <p className={cx('name')}>{placeData.pageOwnerName} 원장</p>
                    <p className={cx('intro')}>{placeData.pageIntro}</p>
                    <div className={cx('info_wrapper')}>
                      <Icon name="Clock" color="brown700" size="xs" />
                      <p>{placeData.pageBranchOperationHours}</p>
                    </div>
                    <div className={cx('info_wrapper')}>
                      <Icon name="Phone" color="brown700" size="xs" />
                      <p>{placeData.pageBranchTel}</p>
                    </div>
                    <button className={cx('button')}>
                      채팅 상담하기
                      <Icon name="ArrowRight" color="white" size="sm" />
                    </button>
                  </div>
                </div>
              )
            )}
          </>
        )}
        <div className={cx('element')}></div>
      </div>
    </section>
  );
};

export default PlacePage;
