import { useState } from 'react';
import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';
import { BasketItem } from '../../components/basket-item/basket-item';
import { BasketRemoveModal } from '../../components/basket-remove-modal/basket-remove-modal';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { IconContainer } from '../../components/icon-container/icon-container';
import { AppPageNames } from '../../consts/const';
import { useAppSelector } from '../../hooks/hooks';
import { getAddedOnBasketItems, getRemovedCamera } from '../../store/slices/basket-slice/selectors';


export function BasketPage():JSX.Element {

  const addedCamerasList = useAppSelector(getAddedOnBasketItems);
  const removedCamera = useAppSelector(getRemovedCamera);

  const [removeCameraModalOpenStatus, onSetRemoveCameraModalOpenStatus] = useState(false);

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
                <div className="basket__summary">
                  <div className="basket__promo">
                    <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
                    <div className="basket-form">
                      <form action="#">
                        <div className="custom-input">
                          <label><span className="custom-input__label">Промокод</span>
                            <input type="text" name="promo" placeholder="Введите промокод"></input>
                          </label>
                          <p className="custom-input__error">Промокод неверный</p>
                          <p className="custom-input__success">Промокод принят!</p>
                        </div>
                        <button className="btn" type="submit">Применить
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="basket__summary-order">
                    <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">111 390 ₽</span></p>
                    <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className="basket__summary-value basket__summary-value--bonus">0 ₽</span></p>
                    <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">111 390 ₽</span></p>
                    <button className="btn btn--purple" type="submit">Оформить заказ
                    </button>
                  </div>
                </div>
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
        </FocusLock>
        <Footer />
      </div>
    </>
  );
}
