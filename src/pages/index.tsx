import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import Footer from '@/components/footer/Footer';
import Gnb, { GnbMenusType } from '@/components/nav/gnb/Gnb';
import { useIntersectionObserver } from '@/hooks/useInteractionObserver';
import CarePage from '@/pages/care';
import PlacePage from '@/pages/place';
import PromotionPage from '@/pages/promotion';
import QnaPage from '@/pages/qna';
import ReviewPage from '@/pages/review';
import Icon from '@/styles/icons/icons';
import styles from './index.module.scss';
function Home() {
  const cx = classNames.bind(styles);
  const menus: GnbMenusType[] = [
    { id: 'intro', name: '지점 & 원장님 소개' },
    { id: 'review', name: '리뷰' },
    { id: 'promotion', name: '프로모션' },
    { id: 'care', name: '약손명가 관리' },
    { id: 'qna', name: '문의사항' },
  ];

  const pageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const { setElements, isVisible } = useIntersectionObserver({
    threshold: 0,
    rootMargin: '100px',
  });

  const pageList = [
    {
      id: 'place',
      component: <PlacePage />,
    },
    {
      id: 'review',
      component: <ReviewPage />,
    },
    {
      id: 'promotion',
      component: <PromotionPage />,
    },
    {
      id: 'care',
      component: <CarePage />,
    },
    {
      id: 'qna',
      component: <QnaPage />,
    },
  ];

  useEffect(() => {
    setElements(pageRefs.current);
  }, []);

  return (
    <div>
      <Gnb menus={menus} />
      {pageList.map((page, index) => (
        <div ref={(el) => (pageRefs.current[index] = el)} key={page.id}>
          {isVisible[index] ? (
            page.component
          ) : (
            <div className={cx('page')}>
              <Icon
                name="Refresh"
                size={40}
                color="brand300"
                className={cx('icon')}
              />
            </div>
          )}
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default Home;
