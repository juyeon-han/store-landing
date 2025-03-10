import { useEffect, useMemo, useRef } from 'react';
import classNames from 'classnames/bind';
import { useGetPageDetail } from '@/api/service/page';
import StoreCard from '@/components/card/store-card/StoreCard';
import EmblaCarousel from '@/components/carousel/Carousel';
import LazyImage from '@/components/image/LazyImage';
import PageTitle from '@/components/title/PageTitle';
import { useIntersectionObserver } from '@/hooks/useInteractionObserver';
import { usePageParams } from '@/hooks/usePageParams';
import Icon from '@/styles/icons/icons';
import { replaceBackSlash } from '@/utils/string';
import styles from './index.module.scss';

const PlacePage = () => {
  const cx = classNames.bind(styles);
  const imgArr = [
    {
      url: 'https://images.unsplash.com/photo-1732565277341-ebb37d748a87?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDN8aVVJc25WdGpCMFl8fGVufDB8fHx8fA%3D%3D',
      alt: 'test',
    },
    {
      url: 'https://plus.unsplash.com/premium_photo-1673288195579-c1ebd71eedff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8aVVJc25WdGpCMFl8fGVufDB8fHx8fA%3D%3D',
      alt: 'test',
    },
    {
      url: 'https://images.unsplash.com/photo-1589739253612-886a3481d88b?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'test',
    },
    {
      url: 'https://images.unsplash.com/photo-1737822896964-30bcf56a2e94?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8TThqVmJMYlRSd3N8fGVufDB8fHx8fA%3D%3D',
      alt: 'test',
    },
    {
      url: 'https://images.unsplash.com/photo-1738168601630-1c1f3ef5a95a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI0fGlVSXNuVnRqQjBZfHxlbnwwfHx8fHw%3D',
      alt: 'test',
    },
    {
      url: 'https://images.unsplash.com/photo-1737972970322-cc2e255021bd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMwfGlVSXNuVnRqQjBZfHxlbnwwfHx8fHw%3D',
      alt: 'test',
    },
    {
      url: 'https://images.unsplash.com/photo-1738230077816-fbab6232c545?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE2fGlVSXNuVnRqQjBZfHxlbnwwfHx8fHw%3D',
      alt: 'test',
    },
    {
      url: 'https://plus.unsplash.com/premium_photo-1672362977605-466f3addce82?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfGlVSXNuVnRqQjBZfHxlbnwwfHx8fHw%3D',
      alt: 'test',
    },
    {
      url: 'https://images.unsplash.com/photo-1583418007992-a8e33a92e7ad?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fGlVSXNuVnRqQjBZfHxlbnwwfHx8fHw%3D',
      alt: 'test',
    },
  ];

  const storeData = {
    customers: 5000,
    sessions: 20000,
    year: 10,
  };

  const placeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const { setElements, isVisible } = useIntersectionObserver();
  const { pageParams } = usePageParams();

  const { data, isSuccess } = useGetPageDetail({
    pageNum: pageParams.pageNum,
  });

  const placeData = useMemo(
    () => (data?.resultMessage === 'SUCCESS' ? data.body?.page : undefined),
    [data]
  );

  useEffect(() => {
    if (placeData && isSuccess) {
      setElements(placeRefs.current);
    }
  }, [placeData, isSuccess]);

  return (
    <section className={cx('container')} id="intro" data-page="intro">
      <div className={cx('background')} />
      {placeData && (
        <div className={cx('container_inner')}>
          <PageTitle
            category="Location & Director"
            title={placeData?.pageBranchName ?? ''}
            style={{ marginBottom: 0 }}
            isStore
          />
          <div className={cx('address')}>
            <Icon name="Location" color="brown700" size="sm" />
            <p>{placeData?.pageBranchAddr}</p>
          </div>
          <div className={cx('store_card')}>
            <StoreCard
              data={storeData}
              ref={(el) => (placeRefs.current[0] = el)}
              className={`reveal ${isVisible[0] ? 'visible' : ''}`}
            />
          </div>
          <p className={cx('store_intro')}>
            <span className={cx('point')}>전문성</span>과{' '}
            <span className={cx('point')}>정성</span>이 깃든 공간, <br />
            {placeData?.pageBranchName}을 소개합니다.
          </p>
          <div
            ref={(el) => (placeRefs.current[1] = el)}
            className={cx(
              `reveal ${isVisible[1] ? 'visible' : ''}`,
              'carousel_wrapper'
            )}
          >
            <EmblaCarousel slides={imgArr} />
          </div>
          <div
            className={cx(
              'ledger_wrapper',
              `reveal ${isVisible[2] ? 'visible' : ''}`
            )}
            ref={(el) => (placeRefs.current[2] = el)}
          >
            <LazyImage
              src={replaceBackSlash(placeData?.pageOwnerProfileUrl)}
              alt="원장님 이미지"
              className={cx('ledger_img')}
            />
            <div className={cx('ledger_info')}>
              <p className={cx('name')}>{placeData?.pageOwnerName} 원장</p>
              <p className={cx('intro')}>{placeData?.pageIntro}</p>
              <div className={cx('info_wrapper')}>
                <Icon name="Clock" color="brown700" size="xs" />
                <p>{placeData?.pageBranchOperationHours}</p>
              </div>
              <div className={cx('info_wrapper')}>
                <Icon name="Phone" color="brown700" size="xs" />
                <p>{placeData?.pageBranchTel}</p>
              </div>
              <button className={cx('button')}>
                채팅 상담하기
                <Icon name="ArrowRight" color="white" size="sm" />
              </button>
            </div>
          </div>
          <div className={cx('element')}></div>
        </div>
      )}
    </section>
  );
};

export default PlacePage;
