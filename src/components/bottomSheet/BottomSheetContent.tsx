import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import { ServiceListType } from '@/api/types/serviceType';
import styles from './BottomSheetContent.module.scss';

interface BottomSheetContentHandle extends HTMLDivElement {}
interface BottomSheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  data: ServiceListType[];
  sheetSelectedId: string;
  handleSheetItem: (serviceId: string) => void;
}

const BottomSheetContent = forwardRef<
  BottomSheetContentHandle,
  BottomSheetContentProps
>((props, ref) => {
  const cx = classNames.bind(styles);
  const { data, sheetSelectedId, handleSheetItem, className, ...otherProps } =
    props;

  return (
    <div
      ref={ref}
      className={cx('bottom_sheet_body', className)}
      {...otherProps}
    >
      <div className={cx('bottom_sheet_body')}>
        {data.map((item) => (
          <div
            key={item.serviceCategory.serviceCategoryCode}
            className={cx('body_content')}
          >
            <p>{item.serviceCategory.serviceCategoryName}</p>
            <div className={cx('tag_wrapper')}>
              {item.service?.map((service) => (
                <button
                  key={service.serviceCode}
                  className={cx('tag', {
                    selected: sheetSelectedId === service.serviceCode,
                  })}
                  onClick={() => handleSheetItem(service.serviceCode)}
                >
                  {service.serviceName}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default BottomSheetContent;
