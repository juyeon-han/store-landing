import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { useGetPagePromotion } from '@/api/service/page';
import AsyncContent from '@/components/asyncContent/AsyncContent';
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
      <AsyncContent
        isError={isError}
        isPending={isPending}
        ErrorComponent={
          <ErrorFallback error={error} resetErrorBoundary={refetch} />
        }
        PendingComponent={
          <>
            {Array.from({ length: 2 }).map((_, index) => (
              <PromotionCardSkeleton key={index} />
            ))}
          </>
        }
      >
        {promotionData ? (
          <div className={cx('promotion_card')}>
            {promotionData.map((item, index) => (
              <PromotionCard
                ref={(el) => (promotionRefs.current[index] = el)}
                className={`reveal ${isVisible[index] ? 'visible' : ''}`}
                key={index}
                condition={item.pagePromotionTitle}
                product={item.pagePromotionSubtitle}
                imgUrl={item.pagePromotionImage[0].pagePromotionImageUrl}
                num={Number(item.pagePromotionIdx)}
                event_date={formatDateRange(
                  item.pagePromotionStime,
                  item.pagePromotionEtime
                )}
              />
            ))}
          </div>
        ) : (
          <></>
        )}
      </AsyncContent>
    </section>
  );
};

export default PromotionPage;
