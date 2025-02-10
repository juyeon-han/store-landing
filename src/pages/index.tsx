import Footer from '@/components/footer/Footer';
import Gnb from '@/components/nav/Gnb';
import CarePage from '@/pages/care';
import FaqPage from '@/pages/faq';
import PlacePage from '@/pages/place';
import PresentPage from '@/pages/present';
import ReviewPage from '@/pages/review';

function Home() {
  return (
    <div>
      <Gnb />
      <CarePage />
      <PresentPage />
      <ReviewPage />
      <PlacePage />
      <FaqPage />
      <Footer />
    </div>
  );
}

export default Home;
