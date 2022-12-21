import { useEffect, useState } from 'react';
import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';
import { generatePath } from 'react-router';
import browserHistory from '../../browser-history';
import { BasketItem } from '../../components/basket-item/basket-item';
import { BasketRemoveModal } from '../../components/basket-remove-modal/basket-remove-modal';
import { BasketSummary } from '../../components/basket-summary/basket-summary';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { IconContainer } from '../../components/icon-container/icon-container';
import { OrderSuccessModal } from '../../components/order-success-modal/order-success-modal';
import { AppPageNames, AppRoute, LoadingStatus } from '../../consts/const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { basketInitialState, removedCamera, removedItemConfirm } from '../../store/slices/basket-slice/basket-slice';
import { getAddedOnBasketItems, getRemovedCamera } from '../../store/slices/basket-slice/selectors';
import { couponInitialState } from '../../store/slices/coupon-slice/coupon-slice';
import { getDiscountPercentage, getCouponStatus, getCouponName } from '../../store/slices/coupon-slice/selectors';
import { orderInitialState } from '../../store/slices/order-slice/order-slice';
import { getOrderSentStatus } from '../../store/slices/order-slice/selectors';
import { CameraType } from '../../types/server-data-types';


export function BasketPage():JSX.Element {

  const redirectToCatalog = () => browserHistory.push(generatePath(AppRoute.Catalog, {id: '1'}));

  const addedCamerasList = useAppSelector(getAddedOnBasketItems);
  const discountPercentage = useAppSelector(getDiscountPercentage);
  const couponStatus = useAppSelector(getCouponStatus);
  const couponName = useAppSelector(getCouponName);
  const orderSentStatus = useAppSelector(getOrderSentStatus);

  const dispatch = useAppDispatch();

  const [isOpenCameraModal , setOpenCameraModal] = useState(false);
  const [isOrderSuccessModal, setOrderSuccessModal] = useState(false);

  const openRemoveModal = (camera: CameraType) => {
    setOpenCameraModal(true);
    dispatch(removedCamera(camera));
  };

  const deteleCamera = (cameraId: number) => {
    setOpenCameraModal(false);
    dispatch(removedItemConfirm(cameraId));
  };

  const handleEscButtonClick = () => {
    const onEscButtonClick = (evt: { key: string; }) => {
      if(evt.key === 'Escape') {
        setOpenCameraModal(false);
        setOrderSuccessModal(false);
      }
    };
    window.addEventListener('keydown', onEscButtonClick);
    return () => window.removeEventListener('keydown', onEscButtonClick);
  };

  handleEscButtonClick();

  useEffect(() => {
    if(orderSentStatus === LoadingStatus.Fulfilled) {
      dispatch(basketInitialState());
      dispatch(couponInitialState());
      dispatch(orderInitialState());
    }
  }, [orderSentStatus]);

  const removedItem = useAppSelector(getRemovedCamera);

  return (
    <>
      <IconContainer />
      <div className="wrapper" data-testid="basket">

        <Header />

        <main>
          <div className="page-content">
            <Breadcrumbs pageName={AppPageNames.Basket} />
            <section className="basket">
              <div className="container">
                <h1 className="title title--h2">Корзина</h1>
                <ul className="basket__list">
                  {addedCamerasList.map((item) => (
                    <BasketItem key={item.camera.id} {...item} onDeleteButtonClick={openRemoveModal}/>
                  ))}
                </ul>
                <BasketSummary addedCameras={addedCamerasList} discountPercentage={discountPercentage} couponStatus={couponStatus} couponName={couponName} onOrderSent={setOrderSuccessModal} />
              </div>
            </section>
          </div>
        </main>
        <FocusLock returnFocus={{ preventScroll: false }}>

          {isOpenCameraModal && removedItem ?
            <RemoveScroll>
              <BasketRemoveModal camera={removedItem} onCloseButtonClick={setOpenCameraModal} onSubmitButtonClick={deteleCamera}/>
            </RemoveScroll>
            :
            ''}
          {isOrderSuccessModal ?
            <RemoveScroll>
              <OrderSuccessModal onCloseClick={setOrderSuccessModal} onBackButtonClick={redirectToCatalog}/>
            </RemoveScroll>
            :
            ''}
        </FocusLock>
        <Footer />
      </div>
    </>
  );
}
