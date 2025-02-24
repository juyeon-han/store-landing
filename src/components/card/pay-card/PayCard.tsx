import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import { formatMinutesToHours, formatNumberWithCommas } from '@/utils/number';
import styles from './PayCard.module.scss';

export interface PayCardType {
  type_num: number;
  origin_price: number;
  discount_per: number;
  discount_price: number;
  duration: number;
}
interface PayCardHandle extends HTMLDivElement {}
interface PayCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: PayCardType;
  type?: 'column' | 'grid';
}

const PayCard = forwardRef<PayCardHandle, PayCardProps>((props, ref) => {
  const cx = classNames.bind(styles);
  const { data, type = 'column', className, ...otherProps } = props;

  return (
    <div
      ref={ref}
      {...otherProps}
      className={cx('container', className, { grid: type === 'grid' })}
    >
      <div className={cx('tag')}>{data.type_num}회 관리</div>
      <div className={cx('wrapper')}>
        <div className={cx('info_wrapper')}>
          <p>
            <span>1회 관리</span>{' '}
            {data.type_num === 1 ? (
              '정가'
            ) : (
              <span className={cx('discount_rate')}>
                {`${data.discount_per}% 할인`}
              </span>
            )}
          </p>
          <p>{formatMinutesToHours(data.duration)} 관리</p>
        </div>
        <div className={cx('price_wrapper')}>
          <p className={cx('origin_price')}>
            ₩{formatNumberWithCommas(data.origin_price)}
          </p>
          <p className={cx('sale_price')}>
            ₩{formatNumberWithCommas(data.discount_price)}
          </p>
        </div>
      </div>
    </div>
  );
});

export default PayCard;
