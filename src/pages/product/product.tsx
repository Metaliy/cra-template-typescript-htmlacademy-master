import FocusLock from 'react-focus-lock';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { IconContainer } from '../../components/icon-container/icon-container';
import { Loader } from '../../components/loading-screen/loading-screen';
import { ProductSimilarSlider } from '../../components/product-similar-slider/product-similar-slider';
import { ProductTabs } from '../../components/product-tabs/product-tabs';
import { Rating } from '../../components/rating/rating';
import { ReviewBlock } from '../../components/review-block/review-block';
import { ReviewModal } from '../../components/review-block/review-modal/review-modal';
import { AppPageNames, LoadingStatus, MAX_RATING } from '../../consts/const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getPriceWitchSpaces } from '../../utils/utils';
import { RemoveScroll } from 'react-remove-scroll';

import { fetchSelectedCameraAction, fetchSimilarCamerasAction, fetchCamerasReviewsAction } from '../../store/api-actions/product-api/product-api';
import { getSelectedCamera, getSelectedCameraLoadingStatus, getSimilarCameras, getSimilarCamerasListLoadingStatus } from '../../store/cameras-slice/selectors';
import { getReviewSentStatus, getReviewsList, getReviewsListLoadingStatus } from '../../store/reviews-slice/selectors';
import { getReviewModalOpenedStatus } from '../../store/product-slice/selectors';

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
  const similarCamerasList = useAppSelector(getSimilarCameras);
  const reviewsList = useAppSelector(getReviewsList);
  const reviewSentStatus = useAppSelector(getReviewSentStatus);

  const reviewModalOpenedStatus = useAppSelector(getReviewModalOpenedStatus);

  const selectedCameraLoadingStatus = useAppSelector(getSelectedCameraLoadingStatus);
  const similarCamerasListLoadingStatus = useAppSelector(getSimilarCamerasListLoadingStatus);
  const reviewsListLoadingStatus = useAppSelector(getReviewsListLoadingStatus);


  if(selectedCameraLoadingStatus === LoadingStatus.Initial || selectedCameraLoadingStatus === LoadingStatus.Pending ||
    similarCamerasListLoadingStatus === LoadingStatus.Pending || similarCamerasListLoadingStatus === LoadingStatus.Initial ||
    reviewsListLoadingStatus === LoadingStatus.Initial || reviewsListLoadingStatus === LoadingStatus.Pending) {
    return (
      <Loader />
    );
  }


  return (
    <>
      <IconContainer />
      <div className="wrapper">
        <Header/>
        <main>
          <div className="page-content">
            <Breadcrumbs pageName={AppPageNames.Product} productName={selectedCamera.name} />
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
                    <Rating maxRating={MAX_RATING} rating={selectedCamera.rating} reviewCount={selectedCamera.reviewCount} />
                    <p className="product__price"><span className="visually-hidden">Цена:</span>{getPriceWitchSpaces(selectedCamera.price)} ₽</p>
                    <button className="btn btn--purple" type="button">
                      <svg width="24" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-add-basket"></use>
                      </svg>Добавить в корзину
                    </button>
                    <ProductTabs selectedCamera={selectedCamera} />
                  </div>
                </div>
              </section>
            </div>
            <div className="page-content__section">
              <section className="product-similar">
                <div className="container">
                  <ProductSimilarSlider similarCamerasList={similarCamerasList} />
                </div>
              </section>
            </div>
            <div className="page-content__section">
              <ReviewBlock reviewsList={reviewsList}/>
            </div>
          </div>
        </main>
        <a className="up-btn" href="#header">
          <svg width="12" height="18" aria-hidden="true">
            <use xlinkHref="#icon-arrow2"></use>
          </svg>
        </a>
        <FocusLock returnFocus={{ preventScroll: false }}>
          {reviewModalOpenedStatus ?
            <RemoveScroll>
              <ReviewModal reviewModalOpenedStatus={reviewModalOpenedStatus} reviewSentStatus={reviewSentStatus} cameraId={selectedCamera.id} />
            </RemoveScroll>
            :
            <ReviewModal reviewModalOpenedStatus={reviewModalOpenedStatus} reviewSentStatus={reviewSentStatus} cameraId={selectedCamera.id}/>}

        </FocusLock>
        <Footer />
      </div>
    </>
  );
}
