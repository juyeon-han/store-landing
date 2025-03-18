export const MODE_CODE = {
  PUBLIC: 'public',
  PRIVATE: 'private',
};

export type ModeType = (typeof MODE_CODE)[keyof typeof MODE_CODE];

export const PAGE_FAQ_TYPE = {
  QUESTION: 'I',
  NOTICE: 'P',
};

export type FaqType = (typeof PAGE_FAQ_TYPE)[keyof typeof PAGE_FAQ_TYPE];

export const PAGE_STATUS_TYPE = {
  ACTIVE: 'Y',
  INACTIVE: 'N',
};

export type PageStatusType =
  (typeof PAGE_STATUS_TYPE)[keyof typeof PAGE_STATUS_TYPE];
