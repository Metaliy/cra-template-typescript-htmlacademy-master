

export enum NameSpace {
  Cameras = 'Cameras',
  Promo = 'Promo',
  Reviews = 'Reviews',
  Catalog = 'Catalog',
  Product = 'Product'
}

export const CAMERAS_ON_PAGE = '9';

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

export const AppPageNames = {
  Main: {
    name: 'Главная' as string,
    path: '/' as string
  },
  Catalog: {
    name: 'Каталог',
    path: '/catalog/page_1'
  },
  Product: {
    name: 'Камера',
    path: '/product/:id'
  },
  Basket: {
    name: 'Корзина',
    path: '/basket'
  },
  NotFound: {
    name: 'Not Found',
    path: '*'
  }
} as const;

export enum ToastMessages {
  CamerasListLoadError = 'Произошла ошибка загрузки списка камер, попробуйте снова',
  SelectedCamerasLoadError = 'Произошла ошибка загрузки выбранной камеры, попробуйте снова',
  SimilarCamerasLoadError = 'Произошла ошибка загрузки списка похожих камер, попробуйте снова',
  PromoCameraLoadError = 'Произошла ошибка загрузки промо камеры, попробуйте снова',
  ReviewsLoadError = 'Произошла ошибка загрузки комментариев, попробуйте снова',
  PostError = 'Произошла ошибка отправки комментария, попробуйте снова',
}

export const enum LoadingStatus {
  Initial = 'Initial',
  Pending = 'Pending',
  Fulfilled = 'Fulfilled',
  Rejected = 'Rejected',
}
