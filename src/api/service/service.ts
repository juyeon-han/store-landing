import { QueryObserverOptions, useQuery } from '@tanstack/react-query';
import { endpoints, instance, request } from '@/api/endpoint';
import {
  ServiceCategoryReq,
  ServiceCategoryResDto,
  ServiceReq,
  ServiceResDto,
  ServiceSubReq,
  ServiceSubResDto,
} from '@/api/types/serviceType';

// ServiceCategory
export const getServiceCategory = async ({
  brandCode,
  branchCode,
}: ServiceCategoryReq): Promise<ServiceCategoryResDto> => {
  request();
  //   await new Promise((resolve) => setTimeout(resolve, 10000));
  return instance
    .get(
      endpoints.serviceCategory
        .replace('{brandCode}', String(brandCode))
        .replace('{branchCode}', String(branchCode))
    )
    .then((res) => res.data);
};

export const useGetServiceCategory = ({
  brandCode,
  branchCode,
  options,
}: ServiceCategoryReq & {
  options?: Partial<QueryObserverOptions<ServiceCategoryResDto, Error>>;
}) => {
  return useQuery({
    queryKey: [endpoints.serviceCategory, brandCode, branchCode],
    queryFn: () => getServiceCategory({ brandCode, branchCode }),
    ...options,
  });
};

// Service
export const getService = async ({
  brandCode,
  branchCode,
  serviceCategoryCode,
}: ServiceReq): Promise<ServiceResDto> => {
  request();

  return instance
    .get(
      endpoints.service
        .replace('{brandCode}', String(brandCode))
        .replace('{branchCode}', String(branchCode))
        .replace('{serviceCategoryCode}', String(serviceCategoryCode))
    )
    .then((res) => res.data);
};

export const useGetService = ({
  brandCode,
  branchCode,
  serviceCategoryCode,
  options,
}: ServiceReq & {
  options?: Partial<QueryObserverOptions<ServiceResDto, Error>>;
}) => {
  return useQuery({
    queryKey: [endpoints.service, brandCode, branchCode, serviceCategoryCode],
    queryFn: () => getService({ brandCode, branchCode, serviceCategoryCode }),
    ...options,
  });
};

// ServiceSub
export const getServiceSub = async ({
  brandCode,
  branchCode,
  serviceCategoryCode,
  serviceCode,
}: ServiceSubReq): Promise<ServiceSubResDto> => {
  request();
  return instance
    .get(
      endpoints.serviceSub
        .replace('{brandCode}', String(brandCode))
        .replace('{branchCode}', String(branchCode))
        .replace('{serviceCategoryCode}', String(serviceCategoryCode))
        .replace('{serviceCode}', String(serviceCode))
    )
    .then((res) => res.data);
};

export const useGetServiceSub = ({
  brandCode,
  branchCode,
  serviceCategoryCode,
  serviceCode,
  options,
}: ServiceSubReq & {
  options?: Partial<QueryObserverOptions<ServiceSubResDto, Error>>;
}) => {
  return useQuery({
    queryKey: [
      endpoints.serviceSub,
      brandCode,
      branchCode,
      serviceCategoryCode,
      serviceCode,
    ],
    queryFn: () =>
      getServiceSub({
        brandCode,
        branchCode,
        serviceCategoryCode,
        serviceCode,
      }),
    ...options,
  });
};
