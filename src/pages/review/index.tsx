import { useEffect, useMemo, useRef } from 'react';
import classNames from 'classnames/bind';
import { useGetPageReview } from '@/api/service/page';
import ReviewCard from '@/components/card/review-card/ReviewCard';
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

  const { data, isSuccess } = useGetPageReview({
    pageNum: pageParams.pageNum,
  });

  const reviewData = useMemo(
    () =>
      data?.resultCode === RESPONSE_CODE.SUCCESS
        ? data.body?.pageReview
        : undefined,
    [data]
  );

  const tempUrl =
    'https://images.unsplash.com/photo-1738584672973-f33b662c05d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8';

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
      {reviewData && (
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
              imgUrl: tempUrl ?? item.pageReviewImage[0].pageReviewImageUrl,
            }))}
          />
        </div>
      )}
    </section>
  );
};

export default ReviewPage;
