import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import Accordion from '@/components/accordion/Accordion';
import ScrollTab, { TabsType } from '@/components/tab/scroll-tab/ScrollTab';
import { useTabController } from '@/components/tab/tabController';
import PageTitle from '@/components/title/PageTitle';
import { NOTICE_DATA, QUESTION_DATA } from '@/constants/faq';
import { useIntersectionObserver } from '@/hooks/useInteractionObserver';
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
        <Accordion
          key="accordion"
          data={activeTabId === '1' ? QUESTION_DATA : NOTICE_DATA}
        />
      </div>
      {/* {activeTabId === '1' && <Accordion data={QUESTION_DATA} />}
           {activeTabId === '2' && <Accordion data={NOTICE_DATA} />} */}
    </section>
  );
};

export default QnaPage;
