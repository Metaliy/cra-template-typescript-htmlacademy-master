import FocusLock from 'react-focus-lock';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs';
import { FooterComponent } from '../../components/footer/footer';
import { HeaderComponent } from '../../components/header/header';
import { IconContainerComponent } from '../../components/icon-container/icon-container';
import { LoaderComponent } from '../../components/loading-screen/loading-screen';
import { ProductSimilarSlider } from '../../components/product-similar-slider/product-similar-slider';
import { ProductTabsComponent } from '../../components/product-tabs/product-tabs';
import { RatingComponent } from '../../components/rating/rating';
import { ReviewBlockComponent } from '../../components/review-block/review-block';
import { ReviewModalComponent } from '../../components/review-block/review-modal/review-modal';
import { AppPageNames, MAX_RATING } from '../../consts/const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchSelectedCameraAction, fetchSimilarCamerasAction } from '../../store/api-actions';
import { getReviewsList, getSelectedCamera, getSelectedCameraLoadingStatus, getSimilarCameras, getSimilarCamerasListLoadingStatus } from '../../store/camera-data/selectors';
import { getPriceWitchSpaces } from '../../utils/utils';
import { RemoveScroll } from 'react-remove-scroll';

export function ProductPage():JSX.Element {

  const {id} = useParams();

  const dispatch = useAppDispatch();

  const isSelectedCameraLoading = useAppSelector(getSelectedCameraLoadingStatus);
  const isSimilarCamerasListLoading = useAppSelector(getSimilarCamerasListLoadingStatus);

  useEffect(() => {
    dispatch(fetchSelectedCameraAction(Number(id)));
    dispatch(fetchSimilarCamerasAction(Number(id)));
  }, [dispatch, id]);


  const {name, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, price, rating, vendorCode, category, type, level, description} = useAppSelector(getSelectedCamera);

  const similarCamerasList = useAppSelector(getSimilarCameras);

  const [isReviewModalOpenStatus, setIsReviewModalOpen] = useState(false);

  const reviewCount = useAppSelector(getReviewsList).length;


  if(isSelectedCameraLoading || isSimilarCamerasListLoading) {
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
            <BreadcrumbsComponent pageName={AppPageNames.Product} productName={name} />
            <div className="page-content__section">
              <section className="product">
                <div className="container">
                  <div className="product__img">
                    <picture>
                      <source type="image/webp" srcSet={`../${previewImgWebp}, ../${previewImgWebp2x} 2x`}></source>
                      <img src={previewImg} srcSet={`${previewImg2x} 2x`} width="560" height="480" alt="Ретрокамера Das Auge IV"></img>
                    </picture>
                  </div>
                  <div className="product__content">
                    <h1 className="title title--h3">{name}</h1>
                    <RatingComponent maxRating={MAX_RATING} rating={rating} reviewCount={reviewCount} />
                    <p className="product__price"><span className="visually-hidden">Цена:</span>{getPriceWitchSpaces(price)} ₽</p>
                    <button className="btn btn--purple" type="button">
                      <svg width="24" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-add-basket"></use>
                      </svg>Добавить в корзину
                    </button>
                    <ProductTabsComponent vendorCode={vendorCode} category={category} type={type} level={level} description={description} />
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
              <ReviewBlockComponent cameraId={id} modalStatusHandler={setIsReviewModalOpen} isReviewModalOpenStatus={isReviewModalOpenStatus}/>
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
              <ReviewModalComponent cameraId={Number(id)} isOpen={isReviewModalOpenStatus} modalStatusHandler={setIsReviewModalOpen}/>
            </RemoveScroll>
            :
            <ReviewModalComponent cameraId={Number(id)} isOpen={isReviewModalOpenStatus} modalStatusHandler={setIsReviewModalOpen}/>}

        </FocusLock>
        <FooterComponent />
      </div>
    </>
  );
}
