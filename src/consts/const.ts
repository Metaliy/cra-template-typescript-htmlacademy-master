

export enum NameSpace {
  Cameras = 'Cameras',
  SelectedCamera = 'SelectedCamera',
  SimilarCameras = 'SimilarCameras',
  Promo = 'Promo',
  Reviews = 'Reviews',
  SendedReview = 'SendedReview',
  Catalog = 'Catalog',
  Product = 'Product',
  SearchedCameras = 'SearchedCameras',
  Basket = 'Basket',
  AddItemModal = 'AddItemModal'
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
  PostCouponError = 'Введённый промокод не верен',
  PostOrderError = 'Произошла ошибка отправки заказа, попробуйте снова'
}

export const enum LoadingStatus {
  Initial = 'Initial',
  Pending = 'Pending',
  Fulfilled = 'Fulfilled',
  Rejected = 'Rejected',
}

export enum QueryParameter {
  SortType = '_sort',
  Order = '_order',
  Limit = '_limit',
  Page = '_page',
  Category = 'category',
  Type = 'type',
  Level = 'level',
  PriceMin = 'price_gte',
  PriceMax = 'price_lte'
}

export const enum SortOrderParameter {
  LowToHigh = 'asc',
  HighToLow = 'desc'
}

export const enum SortTypeParameter {
  Price = 'price',
  Rating = 'rating'
}

export const enum FilterCategoryParameter {
  Photocamera = 'Фотоаппарат',
  Videocamera = 'Видеокамера'
}

export const enum FilterTypeParameter {
  Digital = 'Цифровая',
  Film = 'Плёночная',
  Snapshot = 'Моментальная',
  Collection = 'Коллекционная'
}

export const enum FilterLevelParameter {
  Zero = 'Нулевой',
  NonProfessional = 'Любительский',
  Professional = 'Профессиональный'
}
