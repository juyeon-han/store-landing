import { useQuery } from '@tanstack/react-query';
import { endpoints, instance, request } from '@/api/endpoint';
import {
  ServiceCategoryReq,
  ServiceCategoryResDto,
  ServiceReq,
  ServiceResDto,
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
}: ServiceCategoryReq) => {
  return useQuery({
    queryKey: [endpoints.serviceCategory, brandCode, branchCode],
    queryFn: () => getServiceCategory({ brandCode, branchCode }),
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
}: ServiceReq) => {
  return useQuery({
    queryKey: [endpoints.service, brandCode, branchCode, serviceCategoryCode],
    queryFn: () => getService({ brandCode, branchCode, serviceCategoryCode }),
    enabled: serviceCategoryCode !== '000' && serviceCategoryCode !== undefined,
  });
};
