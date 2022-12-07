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
import { ReviewBlock } from '../../components/review-block/review-block';
import { ReviewModal } from '../../components/review-block/review-modal/review-modal';
import { AppPageNames, LoadingStatus, MAX_RATING } from '../../consts/const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getPriceWitchSpaces } from '../../utils/utils';
import { RemoveScroll } from 'react-remove-scroll';
import { getReviewModalOpenedStatus } from '../../store/slices/product-slice/selectors';
import { ProductRating } from '../../components/rating/product-rating/product-rating';
import { getReviewsList, getReviewsListLoadingStatus } from '../../store/slices/reviews-slice/selectors';
import { getSelectedCamera, getSelectedCameraLoadingStatus } from '../../store/slices/selected-camera-slice/selectors';
import { getReviewSentStatus } from '../../store/slices/sended-review-slice/selectors';
import { getSimilarCameras, getSimilarCamerasListLoadingStatus } from '../../store/slices/similar-cameras-slice/selectors';
import { fetchCamerasReviewsAction } from '../../store/api-actions/reviews-api/reviews-api';
import { fetchSelectedCameraAction } from '../../store/api-actions/selected-camera-api/selected-camera-api';
import { fetchSimilarCamerasAction } from '../../store/api-actions/similar-cameras-api/similar-cameras-api';
import { getAddItemModalOpenedStatus } from '../../store/slices/add-item-modal-slice/selectors';
import { AddItemModal } from '../../components/add-item-modal/add-item-modal';
import { addItemModalOpenedStatus } from '../../store/slices/add-item-modal-slice/add-item-modal-slice';


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
  const isAddItemModalOpened = useAppSelector(getAddItemModalOpenedStatus);

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
                    <ProductRating maxRating={MAX_RATING} rating={selectedCamera.rating} reviewCount={selectedCamera.reviewCount} />
                    <p className="product__price"><span className="visually-hidden">Цена:</span>{getPriceWitchSpaces(selectedCamera.price)} ₽</p>
                    <button className="btn btn--purple" type="button" onClick={() => dispatch(addItemModalOpenedStatus(true))}>
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

          {isAddItemModalOpened ?
            <RemoveScroll>
              <AddItemModal addedCamera={selectedCamera} />
            </RemoveScroll>
            :
            ''}
        </FocusLock>
        <Footer />
      </div>
    </>
  );
}
