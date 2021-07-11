export interface detailInformationDTO{
    title: string,
    author: string,
    profileImage: string,
    postingYear: string,
    postingMonth: string,
    postingDay: string,
    likesCount: number,
    isFavorite: boolean,
    isStored: boolean,
    themes: string[],
    
    province: string,
    city: string,

    isParking: boolean,
    parkingDesc: string,

    courseDesc: string,

    source: string,
    wayPoint: string[],
    longtitude: string[],
    latitude: string[],
    destination: string,

    images: string[],
    warnings: boolean[]
}