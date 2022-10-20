

export enum NameSpace {
  Cameras = 'CAMERAS',
  Catalog = 'CATALOG',
  Review = 'REVIEW'
}

export const CAMERAS_COUNT = 40;

export const MAX_RATING = 5;

export const ITEMS_PER_PAGE = 9;

export enum AppRoute {
  Main = '/',
  Catalog = '/catalog/:id',
  Product = '/product/:id',
  Basket = '/basket',
  NotFound = '*',
}

export enum TabName {
  Description = 'Description',
  Features = 'Features'
}
export const VISIBLE_CARD_COUNT = 3;

export const VISIBLE_REVIEWS_COUNT = 3;
