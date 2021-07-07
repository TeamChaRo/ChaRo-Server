
interface searchDTO{
    keyword: string,
    date : string
}

type searchCollectionDTO = searchDTO[];

export interface searchHistoryDTO{
    searchHistory: searchCollectionDTO;
}
