import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { CAMERAS_COUNT, ITEMS_PER_PAGE } from '../../consts/const';
import { getCurrentPage } from '../../store/catalog-process/selectors';
import { changePage } from '../../store/catalog-process/catalog-process';
import { store } from '../../store';
import { Link, useParams } from 'react-router-dom';


const pageCount = Math.ceil(CAMERAS_COUNT / ITEMS_PER_PAGE);
const getPages = (pagesCount:number, checkedPage: number): JSX.Element[] =>{
  const paginationItems = [];
  for (let i = 1; i <= pagesCount; i++) {
    paginationItems.push(
      <li className="pagination__item" key={i}>
        <Link className={i !== checkedPage ? 'pagination__link' : 'pagination__link pagination__link--active'} to={`/catalog/page_${i}`} onClick={() => (store.dispatch(changePage(i)))}>{i}</Link>
      </li>
    );
  }
  return paginationItems;
};

function PaginationComponent () {

  const dispatch = useAppDispatch();

  const currentPage = useAppSelector(getCurrentPage);

  const id = Number(useParams().id?.replace(/.*page_/, ''));

  // eslint-disable-next-line no-console
  console.log(id, currentPage);

  if(id !== currentPage && id) {
    dispatch(changePage(id));
  }


  return (
    <div className="pagination">
      <ul className="pagination__list">
        {currentPage !== 1 ?
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text" to={`/catalog/page_${currentPage - 1}`} onClick={() => (store.dispatch(changePage(currentPage - 1)))}>Назад</Link>
          </li> : ''}
        {getPages(pageCount, currentPage)}
        {currentPage !== pageCount ?
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text" to={`/catalog/page_${currentPage + 1}`} onClick={() => (store.dispatch(changePage(currentPage + 1)))}>Далее</Link>
          </li> : ''}
      </ul>
    </div>
  );
}
export {PaginationComponent};
