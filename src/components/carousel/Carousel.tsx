import React, { useCallback, useEffect, useState } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import CarouselThumb from '@/components/carousel/Thumb';

type PropType = {
  slides: { url: string; alt: string }[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(
    {
      loop: true,
      ...options,
    },
    [Autoplay({ delay: 3000 })]
  );
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on('select', onSelect).on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  useEffect(() => {
    if (!emblaMainApi) return;

    const viewport = emblaMainApi?.rootNode();
    if (!viewport) return;

    const handleMouseEnter = () => {
      emblaMainApi.plugins()?.autoplay?.stop();
    };

    const handleMouseLeave = () => {
      emblaMainApi.plugins()?.autoplay?.play();
    };

    viewport.addEventListener('mouseenter', handleMouseEnter);
    viewport.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      viewport.removeEventListener('mouseenter', handleMouseEnter);
      viewport.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [emblaMainApi]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaMainRef}>
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
      </div>
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
    </div>
  );
};

export default EmblaCarousel;
