import classNames from 'classnames/bind';
import ReviewCard from '@/components/card/review-card/ReviewCard';
import PageTitle from '@/components/title/PageTitle';
import styles from './index.module.scss';

const ReviewPage = () => {
  const data = [
    {
      imgUrl:
        'https://images.unsplash.com/photo-1738584672973-f33b662c05d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8',
      alt: 'test',
      category: '스페셜 웨딩 관리',
      text: '이*정님 Before & after',
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1738584672973-f33b662c05d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8',
      alt: 'test',
      category: 'K-BEAUTY 연예인 관리 A',
      text: '김*헌님 Before & after',
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1738584672973-f33b662c05d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8',
      alt: 'test',
      category: '작은 얼굴 관리',
      text: '박*언님 Before & after',
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1738584672973-f33b662c05d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8',
      alt: 'test',
      category: '맞춤 관리 A',
      text: '약손명가 솔직후기 ✨\n동탄웨딩관리로 힐링 제대로\n즐기기',
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1738584672973-f33b662c05d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8',
      alt: 'test',
      category: 'category',
      text: '약손명가 청담점에서 연예인관리 받아본 후기 + 전후비교',
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1738584672973-f33b662c05d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8',
      alt: 'test',
      category: 'category',
      text: '대구에스테틱 약손명가 작은\n얼굴관리 솔직후기',
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1738584672973-f33b662c05d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8',
      alt: 'test',
      category: 'category',
      text: '약손명가 청담점에서 연예인관리 받아본 후기 + 전후비교',
    },
  ];

  const cx = classNames.bind(styles);

  return (
    <section className={cx('wrapper')} id="review" data-page="review">
      <PageTitle
        category="Real Review"
        title="눈으로 확인하는 Before & After"
      />
      <div className={cx('card_container')}>
        <ReviewCard data={data} />
      </div>
    </section>
  );
};

export default ReviewPage;
