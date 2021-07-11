import briefInformationDTO from "./briefInformationDTO";

type briefCollectionDTO = briefInformationDTO[];

export default interface previewDTO{
    totalCourse: number,
    drive : briefCollectionDTO
}
