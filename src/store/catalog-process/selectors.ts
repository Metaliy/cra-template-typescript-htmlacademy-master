import { NameSpace } from '../../consts/const';
import { State } from '../../types/state-types';


export const getCurrentPage = (state: State): number => state[NameSpace.CatalogProcess].currentPage;
