
import { useEffect, useRef } from 'react';
import { BannerComponent } from '../../components/banner/banner';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs';
import { CatalogFilterComponent } from '../../components/catalog-filter/catalog-filter';
import { CatalogSortComponent } from '../../components/catalog-sort/catalog-sort';
import { FooterComponent } from '../../components/footer/footer';
import { HeaderComponent } from '../../components/header/header';
import { IconContainerComponent } from '../../components/icon-container/icon-container';
import { LoaderComponent } from '../../components/loading-screen/loading-screen';

import { PaginationComponent } from '../../components/pagination/pagination';
import { ProductCardListComponent } from '../../components/product-card-list/product-card-list';
import { AppPageNames, LoadingStatus } from '../../consts/const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchCamerasAction, fetchPromoCameraAction } from '../../store/api-actions/catalog-api/catalog-api';
import { getCameras, getCamerasListLoadingStatus, getPromoCameraListLoadingStatus } from '../../store/catalog-data/selectors';
import { getCurrentPage } from '../../store/catalog-process/selectors';

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

  const isCamerasLoading = useAppSelector(getCamerasListLoadingStatus);
  const isPromoCameraLoading = useAppSelector(getPromoCameraListLoadingStatus);


  if((isPromoCameraLoading === LoadingStatus.Initial ||
    isCamerasLoading === LoadingStatus.Initial ||
    isPromoCameraLoading === LoadingStatus.Pending ||
    isCamerasLoading === LoadingStatus.Pending) &&
    !isRendered.current) {
    return (
      <LoaderComponent />
    );
  }

  isRendered.current = true;

  return (
    <>
      <IconContainerComponent />
      <div className="wrapper">

        <HeaderComponent />

        <main>

          <BannerComponent />

          <div className="page-content">
            <BreadcrumbsComponent pageName={AppPageNames.Catalog} />
            <section className="catalog">
              <div className="container">
                <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
                <div className="page-content__columns">

                  <CatalogFilterComponent />

                  <div className="catalog__content">

                    <CatalogSortComponent />

                    <ProductCardListComponent camerasList={camerasList}/>

                    <PaginationComponent />

                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <FooterComponent />
      </div>
    </>
  );
}

export {CatalogPage};
