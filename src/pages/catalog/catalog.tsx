
import { useEffect, useRef } from 'react';
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
import { fetchCamerasAction, fetchPromoCameraAction } from '../../store/api-actions/catalog-api/catalog-api';
import { getCameras, getCamerasListLoadingStatus } from '../../store/cameras-slice/selectors';
import { getCurrentPage } from '../../store/catalog-slice/selectors';
import { getPromoCameraListLoadingStatus } from '../../store/promo-slice/selectors';


function CatalogPage():JSX.Element {

  const camerasList = useAppSelector(getCameras);
  const currentPage = useAppSelector(getCurrentPage);
  const isRendered = useRef(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCamerasAction(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch(fetchPromoCameraAction());
  }, [dispatch]);

  const camerasLoadingStatus = useAppSelector(getCamerasListLoadingStatus);
  const promoCameraLoadingStatus = useAppSelector(getPromoCameraListLoadingStatus);


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

          <Banner />

          <div className="page-content">
            <Breadcrumbs pageName={AppPageNames.Catalog} />
            <section className="catalog">
              <div className="container">
                <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
                <div className="page-content__columns">

                  <CatalogFilter />

                  <div className="catalog__content">

                    <CatalogSort />

                    <ProductCardList camerasList={camerasList}/>

                    <Pagination />

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
