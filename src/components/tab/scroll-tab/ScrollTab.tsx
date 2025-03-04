import { forwardRef, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import useEmblaCarousel from 'embla-carousel-react';
import { useGlobalContext } from '@/context/GlobalContext';
import useBreakpoint from '@/hooks/useBreakPoint';
import Icon from '@/styles/icons/icons';
import styles from './ScrollTab.module.scss';

export interface TabsType {
  id: string;
  name: string;
}

interface ScrollTabHandle extends HTMLDivElement {}
interface ScrollTabProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: TabsType[];
  activeTabId: TabsType['id'];
  handleActiveTab: (id: string) => void;
  mode?: 'button' | 'line';
}

const ScrollTab = forwardRef<ScrollTabHandle, ScrollTabProps>((props, ref) => {
  const cx = classNames.bind(styles);
  const {
    tabs,
    activeTabId,
    mode = 'button',
    handleActiveTab,
    className,
    ...otherProps
  } = props;
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'keepSnaps',
    active: canScrollNext,
  });

  const { setBottomSheetOpen } = useGlobalContext();

  const handleBottomSheetOpen = () => {
    setBottomSheetOpen(true);
  };

  const breakPoint = useBreakpoint();

  // const onPrevButtonClick = useCallback(() => {
  //   if (!emblaApi) return;
  //   emblaApi.scrollPrev();
  // }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const updateScrollState = () => {
      const canScrollNext = emblaApi.canScrollNext();
      setCanScrollNext(canScrollNext);
    };

    updateScrollState();
  }, [emblaApi]);

  return (
    <section
      className={cx('tab_container', className)}
      {...otherProps}
      ref={ref}
    >
      <section className="embla_tab">
        {/* <button className="embla__tab_button" onClick={onPrevButtonClick}>
        <Icon name="ArrowLeft" size={{ mobile: 'sm', tablet: 'sm', desktop: 'md' }} />
      </button> */}
        <div
          className={cx('embla__tab_viewport', { has_next: canScrollNext })}
          ref={emblaRef}
        >
          <div className="embla__tab_container">
            {tabs?.map((tab, index) => (
              <div className="embla__tab_slide" key={index}>
                <button
                  className={cx(mode === 'line' ? 'line_tab' : 'button_tab', {
                    active_tab: tab.id === activeTabId,
                  })}
                  onClick={() => handleActiveTab(tab.id)}
                >
                  {tab.name}
                </button>
              </div>
            ))}
          </div>
        </div>
        {canScrollNext && (
          <button
            className={cx('arrow_button', mode === 'line' ? 'line' : 'button')}
            onClick={
              breakPoint === 'mobile' && mode === 'button'
                ? handleBottomSheetOpen
                : onNextButtonClick
            }
          >
            <Icon
              name="ArrowRight"
              size={{ mobile: 'sm', tablet: 'sm', desktop: 'md' }}
              className={cx({
                arrowDown: breakPoint === 'mobile',
              })}
            />
          </button>
        )}
      </section>
    </section>
  );
});

export default ScrollTab;
