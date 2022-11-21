import { NameSpace } from '../../consts/const';
import { State } from '../../types/state-types';


export const getCurrentPage = (state: State): number => state[NameSpace.Catalog].currentPage;

export const getSortParameters = (state: State): {
  sortType: string;
  order: string;
} => state[NameSpace.Catalog].sort;

export const getFiltersParameters = (state: State): {
  priceMin: string | string[];
  priceMax: string | string[];
  category: string[];
  filterType: string[];
  level: string[];
} => state[NameSpace.Catalog].filters;
