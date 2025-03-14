import { QueryObserverOptions, useQuery } from '@tanstack/react-query';
import { endpoints, instance, request } from '@/api/endpoint';
import {
  ServiceCategoryReq,
  ServiceCategoryResDto,
  serviceCategoryType,
  ServiceListReq,
  ServiceListResDto,
  ServiceListType,
  ServiceReq,
  ServiceResDto,
  ServiceSubReq,
  ServiceSubResDto,
  ServiceSubType,
  ServiceType,
} from '@/api/types/serviceType';
import { RESPONSE_CODE } from '@/constants/responseCode';

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
  options?: Partial<
    QueryObserverOptions<ServiceCategoryResDto, Error, serviceCategoryType[]>
  >;
}) => {
  return useQuery({
    queryKey: [endpoints.serviceCategory, pageNum],
    queryFn: () => getServiceCategory({ pageNum }),
    select: (data) => {
      if (data.resultCode === RESPONSE_CODE.SUCCESS) {
        return data.body?.serviceCategory;
      }
      return undefined;
    },
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
  options?: Partial<QueryObserverOptions<ServiceResDto, Error, ServiceType[]>>;
}) => {
  return useQuery({
    queryKey: [endpoints.service, pageNum, serviceCategoryCode],
    queryFn: () => getService({ pageNum, serviceCategoryCode }),
    select: (data) => {
      if (data.resultCode === RESPONSE_CODE.SUCCESS) {
        return data.body?.service;
      }
      return undefined;
    },
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
  options?: Partial<
    QueryObserverOptions<ServiceListResDto, Error, ServiceListType[]>
  >;
}) => {
  return useQuery({
    queryKey: [endpoints.serviceList, pageNum],
    queryFn: () => getServiceList({ pageNum }),
    select: (data) => {
      if (data.resultCode === RESPONSE_CODE.SUCCESS) {
        return data.body?.serviceList;
      }
      return undefined;
    },
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
  options?: Partial<
    QueryObserverOptions<ServiceSubResDto, Error, ServiceSubType[]>
  >;
}) => {
  return useQuery({
    queryKey: [endpoints.serviceSub, pageNum, serviceCategoryCode, serviceCode],
    queryFn: () => getServiceSub({ pageNum, serviceCategoryCode, serviceCode }),
    select: (data) => {
      if (data.resultCode === RESPONSE_CODE.SUCCESS) {
        return data.body?.serviceSub;
      }
      return undefined;
    },
    ...options,
  });
};
