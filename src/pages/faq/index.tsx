import classNames from 'classnames/bind';
import Accordion from '@/components/accordion/Accordion';
import BasisTab from '@/components/tab/basic-tab/BasisTab';
import PageTitle from '@/components/title/PageTitle';
import { FAQ_DATA } from '@/constants/faq';
import styles from './index.module.scss';

const tabs = [
  { id: '1', name: '문의사항' },
  { id: '2', name: '유의사항' },
];

const FaqPage = () => {
  const cx = classNames.bind(styles);
  return (
    <section id="qna" data-page="qna" className={cx('container')}>
      <PageTitle category="Q&A" title="약손명가에 대해 궁금한 점 있으신가요?" />
      <BasisTab tabs={tabs} selectedId="1" className={cx('basis_tab')} />
      <Accordion data={FAQ_DATA} />
    </section>
  );
};

export default FaqPage;
