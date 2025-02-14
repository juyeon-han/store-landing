import Accordion from '@/components/accordion/Accordion';
import PageTitle from '@/components/title/PageTitle';
import styles from './index.module.scss';

const FaqPage = () => {
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
  return (
    <div data-page="qna" className={styles.container}>
      <PageTitle category="FAQ" title="프로그램 문의사항" />
      <Accordion data={data} />
    </div>
  );
};

export default FaqPage;
