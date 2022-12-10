import { useEffect, useState } from 'react';
import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';
import { BasketItem } from '../../components/basket-item/basket-item';
import { BasketRemoveModal } from '../../components/basket-remove-modal/basket-remove-modal';
import { BasketSummary } from '../../components/basket-summary/basket-summary';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { IconContainer } from '../../components/icon-container/icon-container';
import { OrderSuccessModal } from '../../components/order-success-modal/order-success-modal';
import { AppPageNames, LoadingStatus } from '../../consts/const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { basketInitialState } from '../../store/slices/basket-slice/basket-slice';
import { getAddedOnBasketItems, getCouponName, getCouponStatus, getDiscountPercentage, getOrderSentStatus, getRemovedCamera } from '../../store/slices/basket-slice/selectors';


export function BasketPage():JSX.Element {

  const addedCamerasList = useAppSelector(getAddedOnBasketItems);
  const removedCamera = useAppSelector(getRemovedCamera);
  const discountPercentage = Number(useAppSelector(getDiscountPercentage));
  const couponStatus = useAppSelector(getCouponStatus);
  const couponName = useAppSelector(getCouponName);
  const orderSentStatus = useAppSelector(getOrderSentStatus);

  const dispatch = useAppDispatch();

  const [removeCameraModalOpenStatus, onSetRemoveCameraModalOpenStatus] = useState(false);
  const [orderSuccessModalStatus, onSetOrderSuccessModalStatus] = useState(false);

  useEffect(() => {
    const onEscButtonClick = (evt: { key: string; }) => {
      if(evt.key === 'Escape') {
        onSetRemoveCameraModalOpenStatus(false);
        onSetOrderSuccessModalStatus(false);
      }
    };
    window.addEventListener('keydown', onEscButtonClick);
    return () => window.removeEventListener('keydown', onEscButtonClick);
  }, [dispatch]);

  useEffect(() => {
    if(orderSentStatus === LoadingStatus.Fulfilled) {
      dispatch(basketInitialState());
    }
  }, [orderSentStatus]);

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
                    <BasketItem key={item.camera.id} {...item} setRemoveCameraModalOpenStatusHandler={onSetRemoveCameraModalOpenStatus}/>
                  ))}
                </ul>
                <BasketSummary addedCameras={addedCamerasList} discountPercentage={discountPercentage} couponStatus={couponStatus} couponName={couponName} orderSuccessModalStatus={onSetOrderSuccessModalStatus} />
              </div>
            </section>
          </div>
        </main>
        <FocusLock returnFocus={{ preventScroll: false }}>

          {removeCameraModalOpenStatus && removedCamera ?
            <RemoveScroll>
              <BasketRemoveModal camera={removedCamera} setRemoveCameraModalOpenStatusHandler={onSetRemoveCameraModalOpenStatus}/>
            </RemoveScroll>
            :
            ''}
          {orderSuccessModalStatus ?
            <RemoveScroll>
              <OrderSuccessModal orderSuccessModalStatus={onSetOrderSuccessModalStatus}/>
            </RemoveScroll>
            :
            ''}
        </FocusLock>
        <Footer />
      </div>
    </>
  );
}
