
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
import { ProductCardList } from '../../components/product-card-list/product-card-list';
import { AppPageNames, LoadingStatus } from '../../consts/const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchCamerasAction } from '../../store/api-actions/cameras-api/cameras-api';
import { fetchPromoCameraAction } from '../../store/api-actions/promo-api/promo-api';
import { getCameras, getTotalCamerasCount, getCamerasListLoadingStatus, getMinCamerasPrice, getMaxCamerasPrice } from '../../store/cameras-slice/selectors';
import { getCurrentPage, getFiltersParameters, getSortParameters } from '../../store/catalog-slice/selectors';
import { getPromoCamera, getPromoCameraLoadingStatus } from '../../store/promo-slice/selectors';


function CatalogPage():JSX.Element {

  const camerasList = useAppSelector(getCameras);
  const currentPage = useAppSelector(getCurrentPage);
  const promoCamera = useAppSelector(getPromoCamera);
  const camerasCount = useAppSelector(getTotalCamerasCount);
  const minCamerasPrice = useAppSelector(getMinCamerasPrice);
  const maxCamerasPrice = useAppSelector(getMaxCamerasPrice);
  const isRendered = useRef(false);

  const dispatch = useAppDispatch();

  const sortParameters = useAppSelector(getSortParameters);
  const filterParameters = useAppSelector(getFiltersParameters);

  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(fetchCamerasAction({currentPage, sort:{...sortParameters}, filters:{...filterParameters}}));
    setSearchParams(({...sortParameters, ...filterParameters}));
  }, [dispatch, currentPage, sortParameters, setSearchParams, filterParameters]);

  useEffect(() => {
    dispatch(fetchPromoCameraAction());
  }, [dispatch]);

  const camerasLoadingStatus = useAppSelector(getCamerasListLoadingStatus);
  const promoCameraLoadingStatus = useAppSelector(getPromoCameraLoadingStatus);


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

                    <ProductCardList camerasList={camerasList}/>

                    <Pagination camerasCount={camerasCount} currentPage={currentPage} />

                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export {CatalogPage};
