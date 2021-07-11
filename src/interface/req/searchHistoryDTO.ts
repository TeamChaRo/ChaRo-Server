import mapSearchDTO from "./mapSearchDTO";

type mapSearchCollectionDTO = mapSearchDTO[];

export default interface searchHistoryDTO{
    userId: string;
    searchHistory: mapSearchDTO;
}