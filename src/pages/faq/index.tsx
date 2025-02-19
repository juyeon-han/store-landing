import classNames from 'classnames/bind';
import Accordion from '@/components/accordion/Accordion';
import BasisTab from '@/components/tab/basic-tab/BasisTab';
import PageTitle from '@/components/title/PageTitle';
import styles from './index.module.scss';

const data = [
  {
    question:
      '궁금한게 있어서요.궁금한게 있어서요.궁금한게 있어서요.궁금한게 있어서요.궁금한게 있어서요.궁금한게 .궁금한게 있어서요.궁금한게 있어서요.궁금한게 있어서요.궁금한게 있어서요.궁금한게 있어서요.궁금한게 있어서요.궁금한게 있어서요.궁금한게 있어서요.궁금한게 있어서요.궁금한게 있어서요.',
    answer:
      '답변은 아래와 같습니다.답변은 아래와 같습니다.답변은 아래와 같습니다.답변은 아래와 같습니다.답변은 아래와 같습니다.답변은 아래와 같습니다.답변은 아래와 같습니다.답변은 아래와 같습니다.답변은 아래와 같습니다.답변은 아래와 같습니다.답변은 아래와 같습니다.답변은 아래와 같습니다.답변은 아래와 같습니다.답변은 아래와 같습니다.답변은 아래와 같습니다.답변은 아래와 같습니다.답변은 아래와 같습니다.답변은 아래와 같습니다.답변은 아래와 같습니다.',
  },
  {
    question: '필러시술후에도 받을수 있나요?',
    answer: '답변2',
  },
  {
    question: '작은 얼굴 관리',
    answer: '답변3',
  },
  {
    question: '조각얼굴관리 문의드려요',
    answer: '답변4',
  },
  {
    question: '산후 스페셜케어 스페셜 웨딩케어 차이',
    answer: '답변5',
  },
];

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
      <Accordion data={data} />
    </section>
  );
};

export default FaqPage;
