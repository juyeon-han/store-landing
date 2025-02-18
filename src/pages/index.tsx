import Footer from '@/components/footer/Footer';
import Gnb, { GnbMenusType } from '@/components/nav/Gnb';
import CarePage from '@/pages/care';
import FaqPage from '@/pages/faq';
import PlacePage from '@/pages/place';
import PresentPage from '@/pages/present';
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
      <PresentPage />
      <CarePage />
      <FaqPage />
      <Footer />
    </div>
  );
}

export default Home;
