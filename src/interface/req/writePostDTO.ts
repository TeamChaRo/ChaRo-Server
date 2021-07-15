interface locationDTO {
  address: string[];
  latitude: string[]; // 위도
  longtitude: string[]; // 경도
}

export default interface requestDTO {
  title: string;
  userId: string;

  courseImage: string[]; // 파일객체인데

  province: string;
  region: string;

  theme: string[];
  warning: boolean[];

  isParking: boolean;
  parkingDesc: string;

  courseDesc: string;
  course: locationDTO;
}
