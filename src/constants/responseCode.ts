export enum RESPONSE_CODE {
  SUCCESS = '00',
  HTTP_METHOD_ERROR = '22',
  INVALID_FORMAT = '24',
  NOT_FOUND = '25',
  FILE_UPLOAD_ERROR = '26',
  DB_ERROR = '51',
}

export type ResponseCodeType =
  (typeof RESPONSE_CODE)[keyof typeof RESPONSE_CODE];

// 코드에 대한 메시지 매핑
export const RESPONSE_MESSAGE: { [key in RESPONSE_CODE]: string } = {
  [RESPONSE_CODE.SUCCESS]: 'SUCCESS',
  [RESPONSE_CODE.HTTP_METHOD_ERROR]: 'HTTP Method Error',
  [RESPONSE_CODE.INVALID_FORMAT]: '요청한 값이 올바른 형식이 아닙니다.',
  [RESPONSE_CODE.NOT_FOUND]: '요청한 값을 찾을 수 없습니다.',
  [RESPONSE_CODE.FILE_UPLOAD_ERROR]: 'File Upload Error',
  [RESPONSE_CODE.DB_ERROR]: 'DB Error',
};
