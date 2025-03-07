export interface ApiResponse<T> {
  resultCode: number;
  resultMessage: string;
  resultCount: number;
  body?: T;
}

export type PageStatusType = 'Y' | 'N';
