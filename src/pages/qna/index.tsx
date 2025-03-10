import { useEffect, useMemo, useRef } from 'react';
import classNames from 'classnames/bind';
import { useGetPageFaq } from '@/api/service/page';
import Accordion from '@/components/accordion/Accordion';
import ScrollTab, { TabsType } from '@/components/tab/scroll-tab/ScrollTab';
import { useTabController } from '@/components/tab/tabController';
import PageTitle from '@/components/title/PageTitle';
import { PAGE_FAQ_TYPE } from '@/constants/page';
import { RESPONSE_CODE } from '@/constants/responseCode';
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

  const { data, isSuccess } = useGetPageFaq({
    pageNum: pageParams.pageNum,
  });

  const faqData = useMemo(
    () =>
      data?.resultCode === RESPONSE_CODE.SUCCESS
        ? {
            question:
              data.body?.pageFaq.filter(
                (item) => item.pageFaqType === PAGE_FAQ_TYPE.QUESTION
              ) ?? [],
            notice:
              data.body?.pageFaq.filter(
                (item) => item.pageFaqType === PAGE_FAQ_TYPE.NOTICE
              ) ?? [],
          }
        : undefined,
    [data]
  );

  useEffect(() => {
    if (faqData && isSuccess) {
      setElements(qnaRefs.current);
    }
  }, [faqData, isSuccess]);

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
        {faqData && (
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
        )}
      </div>
      {/* {activeTabId === '1' && <Accordion data={QUESTION_DATA} />}
        {activeTabId === '2' && <Accordion data={NOTICE_DATA} />} */}
    </section>
  );
};

export default QnaPage;
