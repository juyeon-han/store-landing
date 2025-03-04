import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const endpoints = {
  serviceCategory: `${baseUrl}/api/page/serviceCategory?brandCode={brandCode}&branchCode={branchCode}`,
  service: `${baseUrl}/api/page/service?brandCode={brandCode}&branchCode={branchCode}&serviceCategoryCode={serviceCategoryCode}`,
  serviceSub: `${baseUrl}/api/page/serviceSub?brandCode={brandCode}&branchCode={branchCode}&serviceCategoryCode={serviceCategoryCode}&serviceCode={serviceCode}`,
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
