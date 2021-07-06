import briefInformationDTO from "./briefInformationDTO";

interface bannerDTO{
    bannerTitle: string,
    bannerImage: string,
    bannerTags: [string]
}

type briefCollectionDTO = briefInformationDTO[];

export interface mainDTO {
    banner: bannerDTO,
    localTitle: string,
    local : briefCollectionDTO,
    seasonTitle: string,
    season: briefCollectionDTO
}