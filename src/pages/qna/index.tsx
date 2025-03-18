import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { useGetPageFaq } from '@/api/service/page';
import Accordion from '@/components/accordion/Accordion';
import AsyncContent from '@/components/asyncContent/AsyncContent';
import ErrorFallback from '@/components/fallback/ErrorFallback';
import BasicSkeleton from '@/components/skeleton/basic/BasicSkeleton';
import ScrollTab, { TabsType } from '@/components/tab/scroll-tab/ScrollTab';
import { useTabController } from '@/components/tab/tabController';
import PageTitle from '@/components/title/PageTitle';
import { useIntersectionObserver } from '@/hooks/useInteractionObserver';
import { usePageParams } from '@/hooks/usePageParams';
import styles from './index.module.scss';

const tabs: TabsType[] = [
  { id: '1', name: '문의사항' },
  { id: '2', name: '유의사항' },
];

const QnaPage = () => {
  const cx = classNames.bind(styles);
  const { activeTabId, handleActiveTab } = useTabController({
    initTabId: tabs[0].id,
  });

  const qnaRefs = useRef<Array<HTMLDivElement | null>>([]);
  const { setElements, isVisible } = useIntersectionObserver();

  const { pageParams } = usePageParams();

  const {
    data: faqData,
    isPending,
    isError,
    error,
    refetch,
  } = useGetPageFaq({
    pageNum: pageParams.pageNum,
    options: {
      throwOnError: false,
    },
  });

  useEffect(() => {
    setElements(qnaRefs.current);
  }, []);

  return (
    <section id="qna" data-page="qna" className={cx('container')}>
      <PageTitle category="Q&A" title="약손명가에 대해 궁금한 점 있으신가요?" />
      <div
        ref={(el) => (qnaRefs.current[0] = el)}
        className={`reveal ${isVisible[0] ? 'visible' : ''}`}
      >
        <ScrollTab
          className={cx('basis_tab')}
          tabs={tabs}
          activeTabId={activeTabId}
          handleActiveTab={handleActiveTab}
          mode="line"
        />
        <AsyncContent
          isError={isError}
          isPending={isPending}
          ErrorComponent={
            <ErrorFallback error={error} resetErrorBoundary={refetch} />
          }
          PendingComponent={
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <BasicSkeleton key={index} />
              ))}
            </>
          }
        >
          {faqData ? (
            <Accordion
              key="accordion"
              data={
                activeTabId === '1'
                  ? faqData.question?.map((item) => ({
                      id: item.pageFaqIdx,
                      question: item.pageFaqQuestion,
                      answer: item.pageFaqAnswer,
                    }))
                  : faqData.notice?.map((item) => ({
                      id: item.pageFaqIdx,
                      question: item.pageFaqQuestion,
                      answer: item.pageFaqAnswer,
                    }))
              }
            />
          ) : (
            <></>
          )}
        </AsyncContent>
      </div>
      {/* {activeTabId === '1' && <Accordion data={QUESTION_DATA} />}
        {activeTabId === '2' && <Accordion data={NOTICE_DATA} />} */}
    </section>
  );
};

export default QnaPage;
