import FocusLock from 'react-focus-lock';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Banner } from '../../components/banner/banner';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { CatalogFilter } from '../../components/catalog-filter/catalog-filter';
import { CatalogSort } from '../../components/catalog-sort/catalog-sort';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { IconContainer } from '../../components/icon-container/icon-container';
import { Loader } from '../../components/loading-screen/loading-screen';
import { Pagination } from '../../components/pagination/pagination';
import EmptyProductListMessage from '../../components/product-card-list/empty-product-list-message/empty-product-list-message';
import { ProductCardList } from '../../components/product-card-list/product-card-list';
import { AppPageNames, LoadingStatus } from '../../consts/const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchCamerasAction } from '../../store/api-actions/cameras-api/cameras-api';
import { fetchPromoCameraAction } from '../../store/api-actions/promo-api/promo-api';
import { fetchMinMaxPriceCamerasAction } from '../../store/api-actions/min-max-cameras-price-api/min-max-cameras-price-api';
import { getCameras, getTotalCamerasCount, getCamerasListLoadingStatus, getMinCamerasPrice, getMaxCamerasPrice } from '../../store/slices/cameras-slice/selectors';
import { getCurrentPage, getFiltersParameters, getSortParameters } from '../../store/slices/catalog-slice/selectors';
import { getPromoCamera, getPromoCameraLoadingStatus } from '../../store/slices/promo-slice/selectors';
import { filtersInitialState } from '../../store/slices/catalog-slice/catalog-slice';
import { RemoveScroll } from 'react-remove-scroll';
import { AddItemModal } from '../../components/add-item-modal/add-item-modal';
import { getAddedItem, getAddItemModalOpenedStatus } from '../../store/slices/add-item-modal-slice/selectors';
import { addItemModalOpenedStatus } from '../../store/slices/add-item-modal-slice/add-item-modal-slice';
import { getaddedOnBasketItemsId } from '../../store/slices/basket-slice/selectors';


function CatalogPage():JSX.Element {

  const camerasList = useAppSelector(getCameras);
  const currentPage = useAppSelector(getCurrentPage);
  const promoCamera = useAppSelector(getPromoCamera);
  const camerasCount = useAppSelector(getTotalCamerasCount);
  const minCamerasPrice = useAppSelector(getMinCamerasPrice);
  const maxCamerasPrice = useAppSelector(getMaxCamerasPrice);
  const camerasIdInTheCart = useAppSelector(getaddedOnBasketItemsId);
  const isRendered = useRef(false);


  const dispatch = useAppDispatch();

  const sortParameters = useAppSelector(getSortParameters);
  const filterParameters = useAppSelector(getFiltersParameters);
  const isAddItemModalOpened = useAppSelector(getAddItemModalOpenedStatus);

  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(fetchCamerasAction({currentPage, sort:{...sortParameters}, filters:{...filterParameters}}));
    dispatch(fetchMinMaxPriceCamerasAction(filterParameters));
    setSearchParams(({...sortParameters, ...filterParameters}));
  }, [dispatch, currentPage, sortParameters, setSearchParams, filterParameters]);

  useEffect(() => {
    dispatch(fetchPromoCameraAction());
    dispatch(filtersInitialState());
    dispatch(addItemModalOpenedStatus(false));
  }, [dispatch]);

  const camerasLoadingStatus = useAppSelector(getCamerasListLoadingStatus);
  const promoCameraLoadingStatus = useAppSelector(getPromoCameraLoadingStatus);

  const addedOnBasketCamera = useAppSelector(getAddedItem);

  if((promoCameraLoadingStatus === LoadingStatus.Initial ||
    camerasLoadingStatus === LoadingStatus.Initial ||
    promoCameraLoadingStatus === LoadingStatus.Pending ||
    camerasLoadingStatus === LoadingStatus.Pending) &&
    !isRendered.current) {
    return (
      <Loader />
    );
  }

  isRendered.current = true;

  return (
    <>
      <IconContainer />
      <div className="wrapper">

        <Header />

        <main>

          <Banner promoCamera={promoCamera} />

          <div className="page-content">
            <Breadcrumbs pageName={AppPageNames.Catalog} />
            <section className="catalog" data-testid="catalog">
              <div className="container">
                <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
                <div className="page-content__columns">

                  <CatalogFilter filters={filterParameters} minCamerasPrice={minCamerasPrice} maxCamerasPrice={maxCamerasPrice} />

                  <div className="catalog__content">

                    <CatalogSort type={sortParameters.sortType} order={sortParameters.order}/>

                    {camerasList.length !== 0 ? <ProductCardList camerasList={camerasList} camerasIdInTheBasket={camerasIdInTheCart}/> : <EmptyProductListMessage />}


                    {camerasCount !== 0 ? <Pagination camerasCount={camerasCount} currentPage={currentPage} /> : ''}


                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <FocusLock returnFocus={{ preventScroll: false }}>

          {isAddItemModalOpened && addedOnBasketCamera ?
            <RemoveScroll>
              <AddItemModal addedCamera={addedOnBasketCamera} />
            </RemoveScroll>
            :
            ''}
        </FocusLock>
        <Footer />
      </div>
    </>
  );
}

export {CatalogPage};
