import { ResponseCodeType } from '@/constants/responseCode';

export interface ApiResponse<T> {
  resultCode: ResponseCodeType;
  resultMessage: string;
  resultCount: number;
  body?: T;
}
