import { ApiResponse, PageStatusType } from '@/api/types/baseType';

//ServiceCategory
export interface ServiceCategoryReq {
  pageNum: string;
}

export interface serviceCategoryType {
  serviceCategoryCode: string;
  serviceCategoryName: string;
  serviceCount?: string;
}

export interface ServiceCategoryRes {
  serviceCategory: serviceCategoryType[];
}

export type ServiceCategoryResDto = ApiResponse<ServiceCategoryRes>;

//Service
export interface ServiceReq {
  pageNum: string;
  serviceCategoryCode: string;
}

interface ServiceContentType {
  serviceContentPrior: string;
  serviceContentImage: string;
  serviceContentTitle: string;
  serviceContentContent: string;
  serviceContentStatus: PageStatusType;
}

export interface ServiceType {
  serviceCode: string;
  serviceName: string;
  serviceTime: string;
  serviceContent: ServiceContentType[];
}

export interface ServiceRes {
  service: ServiceType[];
}

export type ServiceResDto = ApiResponse<ServiceRes>;

// ServiceList
export interface ServiceListReq {
  pageNum: string;
}

export interface ServiceListType {
  serviceCategory: serviceCategoryType;
  service: ServiceType[];
}

export interface ServiceListRes {
  serviceList: ServiceListType[];
}

export type ServiceListResDto = ApiResponse<ServiceListRes>;

// ServiceSub
export interface ServiceSubReq {
  pageNum: string;
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
