import briefInformationDTO from "./briefInformationDTO";

interface bannerDTO{
    bannerTitle: string,
    bannerImage: string,
    bannerTags: string
}

type briefCollectionDTO = briefInformationDTO[];
type bannerCollectionDTO = bannerDTO[];

export interface mainDTO {
    banner: bannerCollectionDTO,
    todayCharoDrive: briefCollectionDTO,
    trendDrive: briefCollectionDTO,
    seasonTitle: string,
    seasonDrive: briefCollectionDTO,
    localTitle: string,
    localDrive : briefCollectionDTO
}