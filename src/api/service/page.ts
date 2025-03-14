import { QueryObserverOptions, useQuery } from '@tanstack/react-query';
import { endpoints, instance, request } from '@/api/endpoint';
import {
  PageDetailResDto,
  PageFaqResDto,
  PageFaqType,
  PagePromotionResDto,
  PagePromotionType,
  PageReq,
  PageResDto,
  PageReviewResDto,
  PageReviewType,
  PageType,
} from '@/api/types/pageType';
import { MODE_CODE, PAGE_FAQ_TYPE } from '@/constants/page';
import { RESPONSE_CODE } from '@/constants/responseCode';

// Page
export const getPage = async ({
  mode = MODE_CODE.PRIVATE,
}: Pick<PageReq, 'mode'>): Promise<PageResDto> => {
  request();
  return instance
    .get(endpoints.page.replace('{mode}', mode))
    .then((res) => res.data);
};

export const useGetPage = ({
  mode = MODE_CODE.PRIVATE,
  options,
}: Pick<PageReq, 'mode'> & {
  options?: Partial<QueryObserverOptions<PageResDto, Error, PageType[]>>;
}) => {
  return useQuery({
    queryKey: [endpoints.page, mode],
    queryFn: () => getPage({ mode }),
    select: (data) => {
      if (data.resultCode === RESPONSE_CODE.SUCCESS) {
        return data.body?.page;
      }
      return undefined;
    },
    ...options,
  });
};

// PageDetail
export const getPageDetail = async ({
  pageNum = '1',
  mode = MODE_CODE.PRIVATE,
}: PageReq): Promise<PageDetailResDto> => {
  request();
  return instance
    .get(
      endpoints.pageDetail.replace('{pageNum}', pageNum).replace('{mode}', mode)
    )
    .then((res) => res.data);
};

export const useGetPageDetail = ({
  pageNum = '1',
  mode = MODE_CODE.PRIVATE,
  options,
}: PageReq & {
  options?: Partial<QueryObserverOptions<PageDetailResDto, Error, PageType>>;
}) => {
  return useQuery({
    queryKey: [endpoints.pageDetail, pageNum, mode],
    queryFn: () => getPageDetail({ pageNum, mode }),
    select: (data) => {
      if (data.resultCode === RESPONSE_CODE.SUCCESS) {
        return data.body?.page;
      }
      return undefined;
    },
    ...options,
  });
};

// PagePromotion
export const getPagePromotion = async ({
  pageNum = '1',
  mode = MODE_CODE.PRIVATE,
}: PageReq): Promise<PagePromotionResDto> => {
  request();
  return instance
    .get(
      endpoints.pagePromotion
        .replace('{pageNum}', pageNum)
        .replace('{mode}', mode)
    )
    .then((res) => res.data);
};

export const useGetPagePromotion = ({
  pageNum,
  mode = MODE_CODE.PRIVATE,
  options,
}: PageReq & {
  options?: Partial<
    QueryObserverOptions<PagePromotionResDto, Error, PagePromotionType[]>
  >;
}) => {
  return useQuery({
    queryKey: [endpoints.pagePromotion, pageNum, mode],
    queryFn: () => getPagePromotion({ pageNum, mode }),
    select: (data) => {
      if (data.resultCode === RESPONSE_CODE.SUCCESS) {
        return data.body?.pagePromotion;
      }
      return undefined;
    },
    ...options,
  });
};

// PageReview
export const getPageReview = async ({
  pageNum = '1',
  mode = MODE_CODE.PRIVATE,
}: PageReq): Promise<PageReviewResDto> => {
  request();
  return instance
    .get(
      endpoints.pageReview.replace('{pageNum}', pageNum).replace('{mode}', mode)
    )
    .then((res) => res.data);
};

export const useGetPageReview = ({
  pageNum = '1',
  mode = MODE_CODE.PRIVATE,
  options,
}: PageReq & {
  options?: Partial<
    QueryObserverOptions<PageReviewResDto, Error, PageReviewType[]>
  >;
}) => {
  return useQuery({
    queryKey: [endpoints.pageReview, pageNum, mode],
    queryFn: () => getPageReview({ pageNum, mode }),
    select: (data) => {
      if (data.resultCode === RESPONSE_CODE.SUCCESS) {
        return data.body?.pageReview;
      }
      return undefined;
    },
    ...options,
  });
};

// PageFaq
export const getPageFaq = async ({
  pageNum = '1',
  mode = MODE_CODE.PRIVATE,
}: PageReq): Promise<PageFaqResDto> => {
  request();
  return instance
    .get(
      endpoints.pageFaq.replace('{pageNum}', pageNum).replace('{mode}', mode)
    )
    .then((res) => res.data);
};

export const useGetPageFaq = ({
  pageNum = '1',
  mode = MODE_CODE.PRIVATE,
  options,
}: PageReq & {
  options?: Partial<
    QueryObserverOptions<
      PageFaqResDto,
      Error,
      {
        question: PageFaqType[];
        notice: PageFaqType[];
      }
    >
  >;
}) => {
  return useQuery({
    queryKey: [endpoints.pageFaq, pageNum, mode],
    queryFn: () => getPageFaq({ pageNum, mode }),
    select: (data) => {
      if (data.resultCode === RESPONSE_CODE.SUCCESS) {
        return {
          question:
            data.body?.pageFaq.filter(
              (item) => item.pageFaqType === PAGE_FAQ_TYPE.QUESTION
            ) ?? [],
          notice:
            data.body?.pageFaq.filter(
              (item) => item.pageFaqType === PAGE_FAQ_TYPE.NOTICE
            ) ?? [],
        };
      }
      return undefined;
    },
    ...options,
  });
};
