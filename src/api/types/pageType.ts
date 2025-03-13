import { ApiResponse } from '@/api/types/baseType';
import { FaqType, ModeType, PageStatusType } from '@/constants/page';

// Page
export interface PageReq {
  pageNum?: string;
  mode?: ModeType;
}

interface PageImageType {
  pageImageIdx: string;
  pageImagePrior: string;
  pageImageUrl: string;
  pageImageStatus: PageStatusType;
}

export interface PageType {
  pageIdx: string;
  pageBrandCode: string;
  pageBranchIdx: string;
  pageBranchName: string;
  pageBranchAddr: string;
  pageBranchTel: string;
  pageBranchOperationHours: string;
  pageOwnerName: string;
  pageOwnerProfileUrl: string;
  pageIntro: string;
  pageStatus: PageStatusType;
  totalCustomerCount: string;
  totalCareCount: string;
  pageOwnerYearsOfExperience: number;
  pageImage: PageImageType[];
}

export interface PageRes {
  page: PageType[];
}

export type PageResDto = ApiResponse<PageRes>;

//PageDetail
export interface PageDetailRes {
  page: PageType;
}

export type PageDetailResDto = ApiResponse<PageDetailRes>;

// PagePromotion
export interface pagePromotionImageType {
  pagePromotionImageIdx: string;
  pagePromotionImagePrior: string;
  pagePromotionImageUrl: string;
}

export interface PagePromotionType {
  pagePromotionIdx: string;
  pagePromotionPrior: string;
  pagePromotionTitle: string;
  pagePromotionSubtitle: string;
  pagePromotionStime: string;
  pagePromotionEtime: string;
  pagePromotionStatus: PageStatusType;
  pagePromotionImage: pagePromotionImageType[];
}

export interface PagePromotionRes {
  pagePromotion: PagePromotionType[];
}

export type PagePromotionResDto = ApiResponse<PagePromotionRes>;

// PageReview
export interface PageReviewImageType {
  pageReviewImageIdx: string;
  pageReviewImagePrior: string;
  pageReviewImageUrl: string;
  pageReviewImageStatus: PageStatusType;
}

export interface PageReviewType {
  pageReviewIdx: string;
  pageReviewPrior: string;
  pageReviewCategory: string;
  pageReviewContent: string;
  pageReviewStatus: PageStatusType;
  pageReviewImage: PageReviewImageType[];
}

export interface PageReviewRes {
  pageReview: PageReviewType[];
}

export type PageReviewResDto = ApiResponse<PageReviewRes>;

// PageFaq
export interface PageFaqType {
  pageFaqIdx: string;
  pageFaqType: FaqType; // 문의사항 : P, 유의사항 : I
  pageFaqPrior: string;
  pageFaqQuestion: string;
  pageFaqAnswer: string;
  pageFaqStatus: string;
}

export interface PageFaqRes {
  pageFaq: PageFaqType[];
}

export type PageFaqResDto = ApiResponse<PageFaqRes>;
