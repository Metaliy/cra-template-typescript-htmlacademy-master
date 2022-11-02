import FocusLock from 'react-focus-lock';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs';
import { FooterComponent } from '../../components/footer/footer';
import { HeaderComponent } from '../../components/header/header';
import { IconContainerComponent } from '../../components/icon-container/icon-container';
import { LoaderComponent } from '../../components/loading-screen/loading-screen';
import { ProductSimilarSliderComponent } from '../../components/product-similar-slider/product-similar-slider';
import { ProductTabsComponent } from '../../components/product-tabs/product-tabs';
import { RatingComponent } from '../../components/rating/rating';
import { ReviewBlockComponent } from '../../components/review-block/review-block';
import { ReviewModalComponent } from '../../components/review-block/review-modal/review-modal';
import { AppPageNames, LoadingStatus, MAX_RATING } from '../../consts/const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getPriceWitchSpaces } from '../../utils/utils';
import { RemoveScroll } from 'react-remove-scroll';
import { getReviewsListLoadingStatus, getSelectedCamera, getSelectedCameraLoadingStatus, getSimilarCamerasListLoadingStatus } from '../../store/product-data/selectors';
import { fetchSelectedCameraAction, fetchSimilarCamerasAction, fetchCamerasReviewsAction } from '../../store/api-actions/product-api/product-api';

export function ProductPage():JSX.Element {

  const {id} = useParams();
  const dispatch = useAppDispatch();
  const productId = Number(id);


  useEffect(() => {
    dispatch(fetchSelectedCameraAction(productId));
    dispatch(fetchSimilarCamerasAction(productId));
    dispatch(fetchCamerasReviewsAction(productId));
  }, [dispatch, productId]);

  const selectedCamera = useAppSelector(getSelectedCamera);


  const [isReviewModalOpenStatus, setIsReviewModalOpen] = useState(false);

  const isSelectedCameraLoading = useAppSelector(getSelectedCameraLoadingStatus);
  const isSimilarCamerasListLoading = useAppSelector(getSimilarCamerasListLoadingStatus);
  const isReviewsListLoading = useAppSelector(getReviewsListLoadingStatus);

  if(isSelectedCameraLoading === LoadingStatus.Initial || isSelectedCameraLoading === LoadingStatus.Pending ||
    isSimilarCamerasListLoading === LoadingStatus.Pending || isSimilarCamerasListLoading === LoadingStatus.Initial ||
    isReviewsListLoading === LoadingStatus.Initial || isReviewsListLoading === LoadingStatus.Pending) {
    return (
      <LoaderComponent />
    );
  }


  return (
    <>
      <IconContainerComponent />
      <div className="wrapper">
        <HeaderComponent/>
        <main>
          <div className="page-content">
            <BreadcrumbsComponent pageName={AppPageNames.Product} productName={selectedCamera.name} />
            <div className="page-content__section">
              <section className="product">
                <div className="container">
                  <div className="product__img">
                    <picture>
                      <source type="image/webp" srcSet={`../${selectedCamera.previewImgWebp}, ../${selectedCamera.previewImgWebp2x} 2x`}></source>
                      <img src={selectedCamera.previewImg} srcSet={`${selectedCamera.previewImg2x} 2x`} width="560" height="480" alt="Ретрокамера Das Auge IV"></img>
                    </picture>
                  </div>
                  <div className="product__content">
                    <h1 className="title title--h3">{selectedCamera.name}</h1>
                    <RatingComponent maxRating={MAX_RATING} rating={selectedCamera.rating} reviewCount={selectedCamera.reviewCount} />
                    <p className="product__price"><span className="visually-hidden">Цена:</span>{getPriceWitchSpaces(selectedCamera.price)} ₽</p>
                    <button className="btn btn--purple" type="button">
                      <svg width="24" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-add-basket"></use>
                      </svg>Добавить в корзину
                    </button>
                    <ProductTabsComponent selectedCamera={selectedCamera} />
                  </div>
                </div>
              </section>
            </div>
            <div className="page-content__section">
              <section className="product-similar">
                <div className="container">
                  <ProductSimilarSliderComponent />
                </div>
              </section>
            </div>
            <div className="page-content__section">
              <ReviewBlockComponent modalStatusHandler={setIsReviewModalOpen} isReviewModalOpenStatus={isReviewModalOpenStatus}/>
            </div>
          </div>
        </main>
        <a className="up-btn" href="#header">
          <svg width="12" height="18" aria-hidden="true">
            <use xlinkHref="#icon-arrow2"></use>
          </svg>
        </a>
        <FocusLock returnFocus={{ preventScroll: false }}>
          {isReviewModalOpenStatus ?
            <RemoveScroll>
              <ReviewModalComponent cameraId={productId} isOpen={isReviewModalOpenStatus} modalStatusHandler={setIsReviewModalOpen}/>
            </RemoveScroll>
            :
            <ReviewModalComponent cameraId={productId} isOpen={isReviewModalOpenStatus} modalStatusHandler={setIsReviewModalOpen}/>}

        </FocusLock>
        <FooterComponent />
      </div>
    </>
  );
}
