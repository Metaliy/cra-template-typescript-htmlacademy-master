import { Link } from 'react-router-dom';
import { AppPageNames } from '../../consts/const';
import { LoaderComponent } from '../loading-screen/loading-screen';

type BreadcrumbsComponentProps = {
  pageName: {name: string; path: string;},
  productName?: string
}


function BreadcrumbsComponent({pageName, productName}:BreadcrumbsComponentProps):JSX.Element {

  const generatePath = () => {
    const pathNames = [AppPageNames.Main];
    if (pageName.name && pageName.name !== AppPageNames.Product.name) {
      pathNames.push(pageName);
    }
    if(pageName.name === AppPageNames.Product.name && productName) {
      pathNames.push(AppPageNames.Catalog, AppPageNames.Product);
    }

    return pathNames;
  };

  if(!pageName) {
    return (
      <LoaderComponent />
    );
  }

  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          {generatePath().map((product, i, array) => (
            i !== array.length - 1 ?
              <li className="breadcrumbs__item" key={product.name}>
                <Link className="breadcrumbs__link" to={product?.path}>{product.name}
                  <svg width="5" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini"></use>
                  </svg>
                </Link>
              </li>
              :
              <li className="breadcrumbs__item" key={productName ? productName : product.name}>
                <span className="breadcrumbs__link breadcrumbs__link--active">{product.name}</span>
              </li>))}
        </ul>
      </div>
    </div>
  );
}

export {BreadcrumbsComponent};
