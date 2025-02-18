import { forwardRef, useCallback } from 'react';
import classNames from 'classnames';
import classNameBind from 'classnames/bind';
import useEmblaCarousel from 'embla-carousel-react';
import Icon from '@/styles/icons/icons';
import styles from './ScrollTab.module.scss';

export interface TabsType {
  id: string;
  name: string;
}

interface ScrollTabHandle extends HTMLDivElement {}
interface ScrollTabProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: TabsType[];
  selectedId?: TabsType['id'];
}

const ScrollTab = forwardRef<ScrollTabHandle, ScrollTabProps>((props, ref) => {
  const cx = classNameBind.bind(styles);
  const { tabs, selectedId, className, ...otherProps } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'keepSnaps',
  });

  // const onPrevButtonClick = useCallback(() => {
  //   if (!emblaApi) return;
  //   emblaApi.scrollPrev();
  // }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section
      className={cx('tab_container', className)}
      {...otherProps}
      ref={ref}
    >
      <section className="embla_tab">
        {/* <button className="embla__tab_button" onClick={onPrevButtonClick}>
        <Icon name="ArrowLeft" size="sm" />
      </button> */}
        <div className="embla__tab_viewport" ref={emblaRef}>
          <div className="embla__tab_container">
            {tabs.map((tab) => (
              <div className="embla__tab_slide" key={tab.id}>
                <div
                  className={classNames('embla__tab_slide__content', {
                    active: tab.id === selectedId,
                  })}
                >
                  {tab.name}
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="embla__tab_button" onClick={onNextButtonClick}>
          <Icon name="ArrowRight" size="sm" />
        </button>
      </section>
    </section>
  );
});

export default ScrollTab;
