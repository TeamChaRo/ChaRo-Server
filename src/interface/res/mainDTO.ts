import briefInformationDTO from './briefInformationDTO';
import bannerDTO from './bannerDTO';

type briefCollectionDTO = briefInformationDTO[];
type bannerCollectionDTO = bannerDTO[];

export default interface mainDTO {
  banner: bannerCollectionDTO;
  todayCharoDrive: briefCollectionDTO;
  trendDrive: briefCollectionDTO;
  customThemeTitle: string;
  customThemeDrive: briefCollectionDTO;
  localTitle: string;
  localDrive: briefCollectionDTO;
}
