import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { useGetPagePromotion } from '@/api/service/page';
import ErrorFallback from '@/components/fallback/ErrorFallback';
import PromotionCard from '@/components/promotion-card/PromotionCard';
import PromotionCardSkeleton from '@/components/skeleton/promotion-card/PromotionCardSkeleton';
import PageTitle from '@/components/title/PageTitle';
import { useIntersectionObserver } from '@/hooks/useInteractionObserver';
import { usePageParams } from '@/hooks/usePageParams';
import { formatDateRange } from '@/utils/date';
import styles from './index.module.scss';

const PromotionPage = () => {
  const cx = classNames.bind(styles);

  const promotionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { setElements, isVisible } = useIntersectionObserver();
  const { pageParams } = usePageParams();
  const tempUrl =
    'https://images.unsplash.com/photo-1737914111975-b4d513d783e0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D';

  const {
    data: promotionData,
    isSuccess,
    isPending,
    isError,
    error,
    refetch,
  } = useGetPagePromotion({
    pageNum: pageParams.pageNum,
    options: {
      throwOnError: false,
    },
  });

  useEffect(() => {
    if (promotionData && isSuccess) {
      setElements(promotionRefs.current);
    }
  }, [promotionData, isSuccess]);

  return (
    <section className={cx('container')} id="promotion" data-page="promotion">
      <PageTitle
        category="Present"
        title="아름다움을 위한 약손명가의 특별한 선물"
      />
      {isError && <ErrorFallback error={error} resetErrorBoundary={refetch} />}
      {!isError &&
        (isPending
          ? Array.from({ length: 2 }).map((_, index) => (
              <PromotionCardSkeleton key={index} />
            ))
          : promotionData && (
              <div className={cx('promotion_card')}>
                {promotionData.map((item, index) => (
                  <PromotionCard
                    ref={(el) => (promotionRefs.current[index] = el)}
                    className={`reveal ${isVisible[index] ? 'visible' : ''}`}
                    key={index}
                    condition={item.pagePromotionTitle}
                    product={item.pagePromotionSubtitle}
                    imgUrl={
                      tempUrl ??
                      item.pagePromotionImage[0].pagePromotionImageUrl
                    }
                    num={Number(item.pagePromotionIdx)}
                    event_date={formatDateRange(
                      item.pagePromotionStime,
                      item.pagePromotionEtime
                    )}
                  />
                ))}
              </div>
            ))}
    </section>
  );
};

export default PromotionPage;
