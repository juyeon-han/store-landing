import Footer from '@/components/footer/Footer';
import Gnb, { GnbMenusType } from '@/components/nav/gnb/Gnb';
import CarePage from '@/pages/care';
import PlacePage from '@/pages/place';
import PromotionPage from '@/pages/promotion';
import QnaPage from '@/pages/qna';
import ReviewPage from '@/pages/review';

function Home() {
  const menus: GnbMenusType[] = [
    { id: 'intro', name: '지점 & 원장님 소개' },
    { id: 'review', name: '리뷰' },
    { id: 'promotion', name: '프로모션' },
    { id: 'care', name: '약손명가 관리' },
    { id: 'qna', name: '문의사항' },
  ];

  return (
    <div>
      <Gnb menus={menus} />
      <PlacePage />
      <ReviewPage />
      <PromotionPage />
      <CarePage />
      <QnaPage />
      <Footer />
    </div>
  );
}

export default Home;
