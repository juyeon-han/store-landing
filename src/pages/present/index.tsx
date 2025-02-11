import PromotionCard, {
  PromotionType,
} from '@/components/promotion-card/PromotionCard';
import PageTitle from '@/components/title/PageTitle';
import styles from './index.module.scss';

const PresentPage = () => {
  const promotion: PromotionType[] = [
    {
      tag: '혜택 1',
      condition: '약손명가 작은 얼굴 관리 10회권 결제시',
      product: '리프팅 밴드 1개 증정!',
      imgUrl:
        'https://images.unsplash.com/photo-1737684462532-a51b88670a76?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      tag: '혜택 2',
      condition: '약손명가 동안얼굴관리 10회권 결제시',
      product: '골지 추가 관리 10회 증정',
      imgUrl:
        'https://images.unsplash.com/photo-1737918968887-e1a9654e4adf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D',
    },
    {
      tag: '혜택 3',
      condition: '지인 추천 시',
      product: '지인 1회 관리 무료 증정',
      imgUrl:
        'https://images.unsplash.com/photo-1737914111975-b4d513d783e0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D',
    },
  ];
  return (
    <div data-page="promotion" className={styles.container}>
      <PageTitle
        category="Present"
        title="아름다움을 위한 약손명가의 특별한 선물"
      />
      <div className={styles.promotion_card}>
        {promotion.map((item, index) => (
          <PromotionCard
            key={index}
            tag={item.tag}
            condition={item.condition}
            product={item.product}
            imgUrl={item.imgUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default PresentPage;
