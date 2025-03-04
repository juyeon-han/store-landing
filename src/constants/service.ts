export const BRAND_CODE = {
  YAKSON: '001',
  YEORIHAN: '002',
  DALIA: '003',
};

export type BrandCode = (typeof BRAND_CODE)[keyof typeof BRAND_CODE];
