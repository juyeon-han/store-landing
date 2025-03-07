import { forwardRef, useEffect } from 'react';
import { useQueries } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { endpoints } from '@/api/endpoint';
import { getService } from '@/api/service/service';
import styles from './BottomSheetContent.module.scss';

interface BottomSheetContentHandle extends HTMLDivElement {}
interface BottomSheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  brandCode: string;
  branchCode: string;
  serviceCategories: {
    id: string;
    name: string;
  }[];
  sheetSelectedId: string;
  handleSheetItem: ({
    serviceCategoryId,
    serviceId,
  }: {
    serviceCategoryId: string;
    serviceId: string;
  }) => void;
}

const BottomSheetContent = forwardRef<
  BottomSheetContentHandle,
  BottomSheetContentProps
>((props, ref) => {
  const cx = classNames.bind(styles);
  const {
    brandCode,
    branchCode,
    serviceCategories,
    sheetSelectedId,
    handleSheetItem,
    className,
    ...otherProps
  } = props;

  const data = useQueries({
    queries: serviceCategories.map((serviceCategory) => ({
      queryKey: [endpoints.service, brandCode, branchCode, serviceCategory],
      queryFn: () =>
        getService({
          brandCode,
          branchCode: Number(branchCode),
          serviceCategoryCode: serviceCategory.id,
        }),
    })),
    combine: (results) => {
      // 모든 쿼리가 성공적으로 완료되었는지 확인
      const isAllSuccess = results.every((result) => result.isSuccess);

      if (isAllSuccess) {
        return (
          serviceCategories.map((serviceCategory, index) => {
            const service = results[index].data?.body?.service;
            return {
              serviceCategoryId: serviceCategory.id,
              serviceCategoryName: serviceCategory.name,
              service: service?.map((service) => ({
                serviceId: service.serviceCode,
                serviceName: service.serviceName,
              })),
            };
          }) ?? []
        );
      }
      return [];
    },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div
      ref={ref}
      className={cx('bottom_sheet_body', className)}
      {...otherProps}
    >
      <div className={cx('bottom_sheet_body')}>
        {data.map((item) => (
          <div key={item.serviceCategoryId} className={cx('body_content')}>
            <p>{item.serviceCategoryName}</p>
            <div className={cx('tag_wrapper')}>
              {item.service?.map((service) => (
                <button
                  key={service.serviceId}
                  className={cx('tag', {
                    selected: sheetSelectedId === service.serviceId,
                  })}
                  onClick={() =>
                    handleSheetItem({
                      serviceCategoryId: item.serviceCategoryId,
                      serviceId: service.serviceId,
                    })
                  }
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
