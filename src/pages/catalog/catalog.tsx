
import { BannerComponent } from '../../components/banner/banner';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs';
import { CatalogFilterComponent } from '../../components/catalog-filter/catalog-filter';
import { CatalogSortComponent } from '../../components/catalog-sort/catalog-sort';
import { FooterComponent } from '../../components/footer/footer';
import { HeaderComponent } from '../../components/header/header';
import { IconContainerComponent } from '../../components/icon-container/icon-container';

import { PaginationComponent } from '../../components/pagination/pagination';
import { ProductCardListComponent } from '../../components/product-card-list/product-card-list';
import { AppPageNames } from '../../consts/const';
import { useAppSelector } from '../../hooks/hooks';
import { getCameras } from '../../store/camera-data/selectors';

function CatalogPage():JSX.Element {

  const camerasList = useAppSelector(getCameras);

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
