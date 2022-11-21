import { SortOrderParameter, SortTypeParameter } from '../../consts/const';
import { useAppDispatch } from '../../hooks/hooks';
import { sortOrder, sortType } from '../../store/catalog-slice/catalog-slice';

type CatalogSortProps = {
  type: string,
  order: string
}


function CatalogSort ({type, order}: CatalogSortProps) {

  const dispatch = useAppDispatch();

  return (
    <div className="catalog-sort" data-testid="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input type="radio" id="sortPrice" name="sort" checked={type === SortTypeParameter.Price} onChange={() => dispatch(sortType(SortTypeParameter.Price))}></input>
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input type="radio" id="sortPopular" name="sort" checked={type === SortTypeParameter.Rating} onChange={() => dispatch(sortType(SortTypeParameter.Rating))}></input>
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up" >
              <input type="radio" id="up" name="sort-icon" aria-label="По возрастанию" checked={order === SortOrderParameter.LowToHigh} onChange={() => dispatch(sortOrder(SortOrderParameter.LowToHigh))}></input>
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down" >
              <input type="radio" id="down" name="sort-icon" aria-label="По убыванию" checked={order === SortOrderParameter.HighToLow} onChange={() => dispatch(sortOrder(SortOrderParameter.HighToLow))}></input>
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );

}

export {CatalogSort};
