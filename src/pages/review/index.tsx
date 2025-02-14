import classNames from 'classnames/bind';
import ReviewCard from '@/components/card/ReviewCard';
import PageTitle from '@/components/title/PageTitle';
import styles from './index.module.scss';

const ReviewPage = () => {
  const data = [
    {
      imgUrl:
        'https://images.unsplash.com/photo-1738584672973-f33b662c05d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8',
      alt: 'test',
      category: 'category',
      text: '맞춤관리 1회 받고 전후비교까지! 약손명가 청담골드스타점 솔직 후기',
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1738584672973-f33b662c05d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8',
      alt: 'test',
      category: 'category',
      text: '약손명가 솔직후기 ✨\n동탄웨딩관리로 힐링 제대로\n즐기기',
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1738584672973-f33b662c05d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8',
      alt: 'test',
      category: 'category',
      text: '맞춤관리 1회 받고 전후비교까지! 약손명가 청담골드스타점 솔직 후기',
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1738584672973-f33b662c05d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8',
      alt: 'test',
      category: 'category',
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
    <div data-page="review" className={cx('wrapper')}>
      <PageTitle category="Review" title="리뷰로 증명된 가치" />
      <div className={cx('card_container')}>
        <ReviewCard data={data} />
      </div>
    </div>
  );
};

export default ReviewPage;
