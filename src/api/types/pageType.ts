import { ApiResponse, PageStatusType } from '@/api/types/baseType';
import { ModeType } from '@/constants/page';

// Page
export interface PageReq {
  pageNum?: string;
  mode?: ModeType;
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
  pageFaqType: string;
  pageFaqPrior: string;
  pageFaqQuestion: string;
  pageFaqAnswer: string;
  pageFaqStatus: string;
}

export interface PageFaqRes {
  pageFaq: PageFaqType[];
}

export type PageFaqResDto = ApiResponse<PageFaqRes>;
