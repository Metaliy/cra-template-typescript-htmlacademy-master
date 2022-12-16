import { useState } from 'react';
import { Link, generatePath } from 'react-router-dom';
import { AppRoute } from '../../../consts/const';
import { useAppDispatch } from '../../../hooks/hooks';
import { fetchSearchedCamerasAction } from '../../../store/api-actions/searched-cameras-api/searched-cameras-api';
import { emptySearchedCameraList } from '../../../store/slices/searched-cameras-slice/searched-cameras-slice';
import { CameraType } from '../../../types/server-data-types';

type SearchFormProps = {
  searchedCamerasList: CameraType[]
}

function SearchForm ({searchedCamerasList}: SearchFormProps) {

  const dispatch = useAppDispatch();

  const [isResetButtonVisible, setIsResetButtonVisible] = useState(false);

  const userTextValidation = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    if(evt.target.value) {
      setIsResetButtonVisible(true);
    }

    if(evt.target.value.trim()) {
      await dispatch(fetchSearchedCamerasAction(evt.target.value.trim()));
    }

    if(!evt.target.value) {
      dispatch(emptySearchedCameraList());
      setIsResetButtonVisible(false);
    }
  };

  const onFormReset = () => {
    dispatch(emptySearchedCameraList());
    setIsResetButtonVisible(false);
  };

  return (
    <div className={searchedCamerasList.length ? 'form-search list-opened' : 'form-search'}>
      <form data-testid="search-form" onReset={() => onFormReset()}>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input className="form-search__input" type="text" autoComplete="off" placeholder="Поиск по сайту" onChange={(evt) => userTextValidation(evt)} data-testid="search-form-input"></input>
        </label>
        <ul className="form-search__select-list scroller" >
          {
            searchedCamerasList.map((camera) =>
              (
                <li className="form-search__select-item" tabIndex={1} key={camera.id} data-testid="search-form-list-item">
                  <Link to={generatePath(AppRoute.Product, {id: String(camera.id)})} onClick={() => dispatch(emptySearchedCameraList())}>
                    {camera.name}
                  </Link>
                </li>
              )
            )
          }
        </ul>
        {
          isResetButtonVisible ?
            <button className="form-search__reset" type="reset" data-testid="search-form-reset-button">
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg><span className="visually-hidden">Сбросить поиск</span>
            </button> :
            ''
        }

      </form>
    </div>
  );
}

export {SearchForm};
