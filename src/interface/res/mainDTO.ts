import briefInformationDTO from "./briefInformationDTO";

interface bannerDTO{
    bannerTitle: string,
    bannerImage: string,
    bannerTags: string
}

type briefCollectionDTO = briefInformationDTO[];

export interface mainDTO {
    banner: bannerDTO,
    todayCharoDrive: briefCollectionDTO,
    trendDrive: briefCollectionDTO,
    seasonTitle: string,
    seasonDrive: briefCollectionDTO,
    localTitle: string,
    localDrive : briefCollectionDTO
}