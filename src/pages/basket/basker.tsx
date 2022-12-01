import { BasketItem } from '../../components/basket-item/basket-item';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { Header } from '../../components/header/header';
import { IconContainer } from '../../components/icon-container/icon-container';
import { AppPageNames } from '../../consts/const';


export function BasketPage():JSX.Element {
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
                  <BasketItem/>
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
        <footer className="footer">
          <div className="container">
            <div className="footer__info">
              <a className="footer__logo" href="index.html" aria-label="Переход на главную">
                <svg width="100" height="36" aria-hidden="true">
                  <use xlinkHref="#icon-logo-mono"></use>
                </svg>
              </a>
              <p className="footer__description">Интернет-магазин фото- и видеотехники</p>
              <ul className="social">
                <li className="social__item">
                  <a className="link" href="#" aria-label="Переход на страницу вконтатке">
                    <svg width="20" height="20" aria-hidden="true">
                      <use xlinkHref="#icon-vk"></use>
                    </svg>
                  </a>
                </li>
                <li className="social__item">
                  <a className="link" href="#" aria-label="Переход на страницу pinterest">
                    <svg width="20" height="20" aria-hidden="true">
                      <use xlinkHref="#icon-pinterest"></use>
                    </svg>
                  </a>
                </li>
                <li className="social__item">
                  <a className="link" href="#" aria-label="Переход на страницу reddit">
                    <svg width="20" height="20" aria-hidden="true">
                      <use xlinkHref="#icon-reddit"></use>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <ul className="footer__nav">
              <li className="footer__nav-item">
                <p className="footer__title">Навигация</p>
                <ul className="footer__list">
                  <li className="footer__item">
                    <a className="link" href="#">Каталог
                    </a>
                  </li>
                  <li className="footer__item">
                    <a className="link" href="#">Гарантии
                    </a>
                  </li>
                  <li className="footer__item">
                    <a className="link" href="#">Доставка
                    </a>
                  </li>
                  <li className="footer__item">
                    <a className="link" href="#">О компании
                    </a>
                  </li>
                </ul>
              </li>
              <li className="footer__nav-item">
                <p className="footer__title">Ресурсы</p>
                <ul className="footer__list">
                  <li className="footer__item">
                    <a className="link" href="#">Курсы операторов
                    </a>
                  </li>
                  <li className="footer__item">
                    <a className="link" href="#">Блог
                    </a>
                  </li>
                  <li className="footer__item">
                    <a className="link" href="#">Сообщество
                    </a>
                  </li>
                </ul>
              </li>
              <li className="footer__nav-item">
                <p className="footer__title">Поддержка</p>
                <ul className="footer__list">
                  <li className="footer__item">
                    <a className="link" href="#">FAQ
                    </a>
                  </li>
                  <li className="footer__item">
                    <a className="link" href="#">Задать вопрос
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
}
