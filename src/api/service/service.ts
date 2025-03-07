import { QueryObserverOptions, useQuery } from '@tanstack/react-query';
import { endpoints, instance, request } from '@/api/endpoint';
import {
  ServiceCategoryReq,
  ServiceCategoryResDto,
  ServiceListReq,
  ServiceListResDto,
  ServiceReq,
  ServiceResDto,
  ServiceSubReq,
  ServiceSubResDto,
} from '@/api/types/serviceType';

// ServiceCategory
export const getServiceCategory = async ({
  pageNum,
}: ServiceCategoryReq): Promise<ServiceCategoryResDto> => {
  request();
  //   await new Promise((resolve) => setTimeout(resolve, 10000));
  return instance
    .get(endpoints.serviceCategory.replace('{pageNum}', pageNum))
    .then((res) => res.data);
};

export const useGetServiceCategory = ({
  pageNum,
  options,
}: ServiceCategoryReq & {
  options?: Partial<QueryObserverOptions<ServiceCategoryResDto, Error>>;
}) => {
  return useQuery({
    queryKey: [endpoints.serviceCategory, pageNum],
    queryFn: () => getServiceCategory({ pageNum }),
    ...options,
  });
};

// Service
export const getService = async ({
  pageNum,
  serviceCategoryCode,
}: ServiceReq): Promise<ServiceResDto> => {
  request();

  return instance
    .get(
      endpoints.service
        .replace('{pageNum}', pageNum)
        .replace('{serviceCategoryCode}', String(serviceCategoryCode))
    )
    .then((res) => res.data);
};

export const useGetService = ({
  pageNum,
  serviceCategoryCode,
  options,
}: ServiceReq & {
  options?: Partial<QueryObserverOptions<ServiceResDto, Error>>;
}) => {
  return useQuery({
    queryKey: [endpoints.service, pageNum, serviceCategoryCode],
    queryFn: () => getService({ pageNum, serviceCategoryCode }),
    ...options,
  });
};

// ServiceList = serviceCategory + service
export const getServiceList = async ({
  pageNum,
}: ServiceListReq): Promise<ServiceListResDto> => {
  request();

  return instance
    .get(endpoints.serviceList.replace('{pageNum}', pageNum))
    .then((res) => res.data);
};

export const useGetServiceList = ({
  pageNum,
  options,
}: ServiceListReq & {
  options?: Partial<QueryObserverOptions<ServiceListResDto, Error>>;
}) => {
  return useQuery({
    queryKey: [endpoints.serviceList, pageNum],
    queryFn: () => getServiceList({ pageNum }),
    ...options,
  });
};

// ServiceSub
export const getServiceSub = async ({
  pageNum,
  serviceCategoryCode,
  serviceCode,
}: ServiceSubReq): Promise<ServiceSubResDto> => {
  request();
  return instance
    .get(
      endpoints.serviceSub
        .replace('{pageNum}', pageNum)
        .replace('{serviceCategoryCode}', String(serviceCategoryCode))
        .replace('{serviceCode}', String(serviceCode))
    )
    .then((res) => res.data);
};

export const useGetServiceSub = ({
  pageNum,
  serviceCategoryCode,
  serviceCode,
  options,
}: ServiceSubReq & {
  options?: Partial<QueryObserverOptions<ServiceSubResDto, Error>>;
}) => {
  return useQuery({
    queryKey: [endpoints.serviceSub, pageNum, serviceCategoryCode, serviceCode],
    queryFn: () =>
      getServiceSub({
        pageNum,
        serviceCategoryCode,
        serviceCode,
      }),
    ...options,
  });
};
