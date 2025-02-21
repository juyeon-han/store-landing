export interface ServiceInfoType {
  round: number; // 회차
  origin_price: number; // 가격
  discount_price: number; // 할인 가격
  discount_rate: number; // 할인율
}

export interface ServiceCareType {
  title: string; // 제목
  description: string; // 설명
  img_url: string; // 이미지 URL
  service_info: ServiceInfoType[]; // 서비스 정보
}

export interface ServiceType {
  id: string;
  name: string;
}

export interface ServiceCategoryType {
  id: string;
  name: string;
}
