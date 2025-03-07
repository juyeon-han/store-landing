export const MODE_CODE = {
  PUBLIC: 'public',
  PRIVATE: 'private',
};

export type ModeType = (typeof MODE_CODE)[keyof typeof MODE_CODE];
