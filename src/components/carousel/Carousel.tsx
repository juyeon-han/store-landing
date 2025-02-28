import React, { useCallback, useEffect, useState } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import DotButton from '@/components/carousel/DotButton';
import CarouselThumb from '@/components/carousel/Thumb';
import { useAutoPlayObserver } from '@/hooks/useAutoPlayObserver';
import useBreakpoint from '@/hooks/useBreakPoint';
import Icon from '@/styles/icons/icons';

type PropType = {
  slides: { url: string; alt: string }[];
  options?: EmblaOptionsType;
  isControl?: boolean;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, isControl = true } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const breakpoint = useBreakpoint();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      ...options,
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaApi || !emblaThumbsApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi, emblaThumbsApi]
  );

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    emblaThumbsApi?.scrollTo(index);
  }, [emblaApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect).on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  useAutoPlayObserver({ emblaApi });

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((el, idx) => (
            <div className="embla__slide" key={idx}>
              <div
                className="embla__slide__img"
                style={{ backgroundImage: `url(${el.url})` }}
              ></div>
            </div>
          ))}
        </div>
        {isControl && (
          <div className="embla_arrow_wrapper">
            <button className="embla_arrow" onClick={onPrevButtonClick}>
              <Icon name="ArrowLeft" />
            </button>
            <button className="embla_arrow" onClick={onNextButtonClick}>
              <Icon name="ArrowRight" />
            </button>
          </div>
        )}
      </div>
      {breakpoint === 'mobile' ? (
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton key={index} isSelected={index === selectedIndex} />
          ))}
        </div>
      ) : (
        <div className="embla-thumbs">
          <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
            <div className="embla-thumbs__container">
              {slides.map((el, idx) => (
                <CarouselThumb
                  key={idx}
                  onClick={() => onThumbClick(idx)}
                  selected={idx === selectedIndex}
                  src={el.url}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmblaCarousel;
