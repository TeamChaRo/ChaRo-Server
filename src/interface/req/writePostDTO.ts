interface locationDTO{
    address: string,
    latitude: string, // 위도
    longtitude: string // 경도
}

type locationCollectionDTO = locationDTO[];

export interface writePostDTO{
    title: string,
    userId: string,
    
    courseImage: [string] // 파일객체인데

    province: string,
    city: string,

    theme: [string],
    warning: [string],

    isParking: boolean,
    parkingDesc: string,

    courseDesc: string,
    location: locationCollectionDTO
}