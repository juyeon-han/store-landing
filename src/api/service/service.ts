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
  pageNum = '1',
}: ServiceCategoryReq): Promise<ServiceCategoryResDto> => {
  request();
  return instance
    .get(endpoints.serviceCategory.replace('{pageNum}', pageNum))
    .then((res) => res.data);
};

export const useGetServiceCategory = ({
  pageNum = '1',
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
  pageNum = '1',
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
  pageNum = '1',
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
  pageNum = '1',
}: ServiceListReq): Promise<ServiceListResDto> => {
  request();
  return instance
    .get(endpoints.serviceList.replace('{pageNum}', pageNum))
    .then((res) => res.data);
};

export const useGetServiceList = ({
  pageNum = '1',
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
  pageNum = '1',
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
  pageNum = '1',
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
