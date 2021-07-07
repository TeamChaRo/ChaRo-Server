export interface detailInformationDTO{
    author: string,
    profileImage: string,
    date: string,
    isFavorite: boolean,
    themes: [string],
    
    province: string,
    city: string,

    isParking: boolean,
    parkingDesc: string,

    courseDesc: string,

    source: string,
    wayPoint: [string],
    longtitude: [string],
    latitude: [string],
    destination: string,

    image: [string]
}