import briefInformationDTO from './briefInformationDTO';

type briefCollectionDTO = briefInformationDTO[];

export interface showMoreDTO {
  post: briefCollectionDTO;
  totalCount: number;
}
