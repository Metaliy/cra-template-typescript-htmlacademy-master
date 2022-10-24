import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../consts/const';
import './main.css';

function MainPage () {
  return (
    <>
      <header className="top-header">
      </header>
      <div>
        <div className="starsec"></div>
        <div className="starthird"></div>
        <div className="starfourth"></div>
        <div className="starfifth"></div>
      </div>
      <div className="lamp__wrap">
        <div className="lamp">
          <div className="cable"></div>
          <div className="cover"></div>
          <div className="in-cover">
            <div className="bulb"></div>
          </div>
          <div className="light"></div>
        </div>
      </div>
      <section className="error">
        <div className="error__content">
          <div className="error__message message">
            <h1 className="message__title">Упс...</h1>
            <p className="message__text">Главная страница сейчас в разработке, загляните позднее, а пока, можете посмотреть каталог камер</p>
          </div>
          <div className="error__nav e-nav">
            <Link to={generatePath(AppRoute.Catalog, {id: 'page_1'})} target="_blanck" className="e-nav-main__link"></Link>
          </div>
        </div>
      </section>
    </>

  );
}

export {MainPage};
