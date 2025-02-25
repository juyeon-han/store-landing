import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import Counter from '@/components/counter/Counter';
import useBreakpoint from '@/hooks/useBreakPoint';
import Icon from '@/styles/icons/icons';
import styles from './StoreCard.module.scss';

export interface StoreCardType {
  customers: number;
  sessions: number;
  year: number;
}
interface StoreCardHandle extends HTMLDivElement {}
interface StoreCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: StoreCardType;
}

const StoreCard = forwardRef<StoreCardHandle, StoreCardProps>((props, ref) => {
  const cx = classNames.bind(styles);
  const { data, className, ...otherProps } = props;
  const breakpoint = useBreakpoint();
  return (
    <div ref={ref} {...otherProps} className={cx('container', className)}>
      <div className={cx('wrapper')}>
        <Icon name="Customers" size={breakpoint === 'desktop' ? 'xl' : 'lg'} />
        <p>누적 고객 수</p>
        <p className={cx('data_text')}>
          + <Counter to={data.customers} /> 명
        </p>
      </div>
      <hr className={cx('divider')} />
      <div className={cx('wrapper')}>
        <Icon name="Sessions" size={breakpoint === 'desktop' ? 'xl' : 'lg'} />
        <p>누적 관리 수</p>
        <p className={cx('data_text')}>
          + <Counter to={data.sessions} /> 회
        </p>
      </div>
      <hr className={cx('divider')} />
      <div className={cx('wrapper')}>
        <Icon name="Year" size={breakpoint === 'desktop' ? 'xl' : 'lg'} />
        <p>경력</p>
        <p className={cx('data_text')}>
          <Counter from={1} to={data.year} /> 년
        </p>
      </div>
    </div>
  );
});

export default StoreCard;
