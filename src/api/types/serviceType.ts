import { ApiResponse } from '@/api/types/baseType';

//ServiceCategory
export interface ServiceCategoryReq {
  pageNum: number;
}

export interface serviceCategoryType {
  serviceCategoryCode: string;
  serviceCategoryName: string;
  serviceCount: string;
}

export interface ServiceCategoryRes {
  serviceCategory: serviceCategoryType[];
}

export type ServiceCategoryResDto = ApiResponse<ServiceCategoryRes>;

//Service
export interface ServiceReq {
  pageNum: number;
  serviceCategoryCode: string;
}

export interface ServiceType {
  serviceCode: string;
  serviceName: string;
  serviceTime: string;
  serviceImage?: string;
  serviceContentTitle?: string;
  serviceContentDesc?: string;
}

export interface ServiceRes {
  service: ServiceType[];
}

export type ServiceResDto = ApiResponse<ServiceRes>;

// ServiceSub
export interface ServiceSubReq {
  pageNum: number;
  serviceCategoryCode: string;
  serviceCode: string;
}

export interface ServiceSubType {
  serviceSubCode: string;
  serviceSubCount: string;
  serviceSubPrice: string;
  serviceSubOriginalPrice: string;
  serviceSubDiscountPercent: string;
}

export interface ServiceSubRes {
  serviceSub: ServiceSubType[];
}

export type ServiceSubResDto = ApiResponse<ServiceSubRes>;
