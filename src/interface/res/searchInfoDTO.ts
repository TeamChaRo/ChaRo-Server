import briefInformationDTO from "./briefInformationDTO";

type briefCollectionDTO = briefInformationDTO[];

export default interface searchInfoDTO {
    selectedFilter: [string],
    totalCourse: number,
    drive : briefCollectionDTO
}
