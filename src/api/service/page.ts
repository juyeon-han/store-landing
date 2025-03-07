import { QueryObserverOptions, useQuery } from '@tanstack/react-query';
import { endpoints, instance, request } from '@/api/endpoint';
import {
  PageDetailResDto,
  PageFaqResDto,
  PagePromotionResDto,
  PageReq,
  PageResDto,
  PageReviewResDto,
} from '@/api/types/pageType';
import { MODE_CODE } from '@/constants/page';

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
  options?: Partial<QueryObserverOptions<PageResDto, Error>>;
}) => {
  return useQuery({
    queryKey: [endpoints.page, mode],
    queryFn: () => getPage({ mode }),
    ...options,
  });
};

// PageDetail
export const getPageDetail = async ({
  pageNum,
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
  pageNum,
  mode = MODE_CODE.PRIVATE,
  options,
}: PageReq & {
  options?: Partial<QueryObserverOptions<PageDetailResDto, Error>>;
}) => {
  return useQuery({
    queryKey: [endpoints.pageDetail, pageNum, mode],
    queryFn: () => getPageDetail({ pageNum, mode }),
    ...options,
  });
};

// PagePromotion
export const getPagePromotion = async ({
  pageNum,
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
  options?: Partial<QueryObserverOptions<PagePromotionResDto, Error>>;
}) => {
  return useQuery({
    queryKey: [endpoints.pagePromotion, pageNum, mode],
    queryFn: () => getPagePromotion({ pageNum, mode }),
    ...options,
  });
};

// PageReview
export const getPageReview = async ({
  pageNum,
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
  pageNum,
  mode = MODE_CODE.PRIVATE,
  options,
}: PageReq & {
  options?: Partial<QueryObserverOptions<PageReviewResDto, Error>>;
}) => {
  return useQuery({
    queryKey: [endpoints.pageReview, pageNum, mode],
    queryFn: () => getPageReview({ pageNum, mode }),
    ...options,
  });
};

// PageFaq
export const getPageFaq = async ({
  pageNum,
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
  pageNum,
  mode = MODE_CODE.PRIVATE,
  options,
}: PageReq & {
  options?: Partial<QueryObserverOptions<PageFaqResDto, Error>>;
}) => {
  return useQuery({
    queryKey: [endpoints.pageFaq, pageNum, mode],
    queryFn: () => getPageFaq({ pageNum, mode }),
    ...options,
  });
};
