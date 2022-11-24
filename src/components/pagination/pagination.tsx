import { useAppDispatch } from '../../hooks/hooks';
import { ITEMS_PER_PAGE } from '../../consts/const';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { currenCatalogPage } from '../../store/slices/catalog-slice/catalog-slice';


type PaginationProps = {
  currentPage: number,
  camerasCount: number
}

function Pagination ({currentPage, camerasCount}: PaginationProps) {

  const getPages = (pagesCount:number, checkedPage: number): JSX.Element[] =>{
    const paginationItems = [];
    for (let i = 1; i <= pagesCount; i++) {
      paginationItems.push(
        <li className="pagination__item" key={i}>
          <Link className={i !== checkedPage ? 'pagination__link' : 'pagination__link pagination__link--active'} data-testid="page-buttons" to={`/catalog/page_${i}`} onClick={() => (dispatch(currenCatalogPage(i)))}>{i}</Link>
        </li>
      );
    }
    return paginationItems;
  };


  const dispatch = useAppDispatch();

  const id = Number(useParams().id?.replace(/.*page_/, ''));
  const pageCount = Math.ceil(camerasCount / ITEMS_PER_PAGE);


  useEffect(() => {
    dispatch(currenCatalogPage(id <= pageCount ? id : pageCount));
  }, [id, currentPage, dispatch, pageCount]);


  return (
    <div className="pagination" data-testid="pagination-component">
      <ul className="pagination__list">
        {currentPage !== 1 ?
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text" to={`/catalog/page_${currentPage - 1}`} data-testid="back-button" onClick={() => (dispatch(currenCatalogPage(currentPage - 1)))}>Назад</Link>
          </li> : ''}
        {getPages(pageCount, currentPage)}
        {currentPage !== pageCount ?
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text" to={`/catalog/page_${currentPage + 1}`} data-testid="next-button" onClick={() => (dispatch(currenCatalogPage(currentPage + 1)))}>Далее</Link>
          </li> : ''}
      </ul>
    </div>
  );
}
export {Pagination};
