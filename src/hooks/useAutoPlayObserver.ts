import { useEffect } from 'react';
import { EmblaCarouselType } from 'embla-carousel';

interface AutoPlayObserverProps {
  emblaApi: EmblaCarouselType | undefined;
  type?: 'autoplay' | 'autoScroll';
}

export const useAutoPlayObserver = ({
  emblaApi,
  type = 'autoplay',
}: AutoPlayObserverProps) => {
  useEffect(() => {
    if (!emblaApi) return;

    const viewport = emblaApi.rootNode();
    if (!viewport) return;

    // IntersectionObserver 콜백 함수
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          emblaApi.plugins()?.[type]?.play();
        } else {
          emblaApi.plugins()?.[type]?.stop();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    });

    // 이벤트 리스너 및 observer 등록
    observer.observe(viewport);

    // 클린업
    return () => {
      observer.unobserve(viewport);
    };
  }, [emblaApi]);
};
