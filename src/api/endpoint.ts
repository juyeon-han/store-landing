import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const endpoints = {
  page: `${baseUrl}/api/page/page?mode={mode}`,
  pageDetail: `${baseUrl}/api/page/pageDetail?pageNum={pageNum}&mode={mode}`,
  pagePromotion: `${baseUrl}/api/page/pagePromotion?pageNum={pageNum}&mode={mode}`,
  pageReview: `${baseUrl}/api/page/pageReview?pageNum={pageNum}&mode={mode}`,
  pageFaq: `${baseUrl}/api/page/pageFaq?pageNum={pageNum}&mode={mode}`,
  serviceCategory: `${baseUrl}/api/page/serviceCategory?pageNum={pageNum}`,
  service: `${baseUrl}/api/page/service?pageNum={pageNum}&serviceCategoryCode={serviceCategoryCode}`,
  serviceList: `${baseUrl}/api/page/serviceList?pageNum={pageNum}`,
  serviceSub: `${baseUrl}/api/page/serviceSub?pageNum={pageNum}&serviceCategoryCode={serviceCategoryCode}&serviceCode={serviceCode}`,
};

export const instance = axios.create({
  baseURL: 'https://devapi.yaksonhc.com',
  headers: {
    Accept: 'text/html,application/json;q=0.9,*/*;q=0.8', // 선호하는 응답 형식 명시
    'Content-Type': 'application/json', // PHP 서버에 맞춘 content-type
  },
});

export const request = (token?: string) => {
  instance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
