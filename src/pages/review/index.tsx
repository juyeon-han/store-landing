import { useEffect, useMemo, useRef } from 'react';
import classNames from 'classnames/bind';
import { useGetPageReview } from '@/api/service/page';
import ReviewCard from '@/components/card/review-card/ReviewCard';
import ErrorFallback from '@/components/fallback/ErrorFallback';
import ReviewCardSkeleton from '@/components/skeleton/review-card/ReviewCardSkeleton';
import PageTitle from '@/components/title/PageTitle';
import { RESPONSE_CODE } from '@/constants/responseCode';
import { useIntersectionObserver } from '@/hooks/useInteractionObserver';
import { usePageParams } from '@/hooks/usePageParams';
import styles from './index.module.scss';

const ReviewPage = () => {
  const cx = classNames.bind(styles);
  const reviewRef = useRef<Array<HTMLDivElement | null>>([]);
  const { setElements, isVisible } = useIntersectionObserver();
  const { pageParams } = usePageParams();

  const { data, isSuccess, isPending, isError, error, refetch } =
    useGetPageReview({
      pageNum: pageParams.pageNum,
      options: {
        throwOnError: false,
      },
    });

  const reviewData = useMemo(
    () =>
      data?.resultCode === RESPONSE_CODE.SUCCESS
        ? data.body?.pageReview
        : undefined,
    [data]
  );

  useEffect(() => {
    if (reviewData && isSuccess) {
      setElements(reviewRef.current);
    }
  }, [reviewData, isSuccess]);

  return (
    <section className={cx('wrapper')} id="review" data-page="review">
      <PageTitle
        category="Real Review"
        title="눈으로 확인하는 Before & After"
      />
      {isError && <ErrorFallback error={error} resetErrorBoundary={refetch} />}
      {!isError && isPending ? (
        <div className={cx('skeleton_wrapper')}>
          {Array.from({ length: 3 }).map((_, index) => (
            <ReviewCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        reviewData && (
          <div
            className={cx(
              'card_container',
              `reveal ${isVisible[0] ? 'visible' : ''}`
            )}
            ref={(el) => (reviewRef.current[0] = el)}
          >
            <ReviewCard
              data={reviewData.map((item) => ({
                category: item.pageReviewCategory,
                text: item.pageReviewContent,
                alt: `${item.pageReviewCategory}의 이미지`,
                imgUrl: item.pageReviewImage[0].pageReviewImageUrl,
              }))}
            />
          </div>
        )
      )}
    </section>
  );
};

export default ReviewPage;
