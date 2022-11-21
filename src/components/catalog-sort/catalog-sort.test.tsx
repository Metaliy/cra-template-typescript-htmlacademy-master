import { screen } from '@testing-library/react';
import { SortOrderParameter, SortTypeParameter } from '../../consts/const';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { CatalogSort } from './catalog-sort';

const sortType = SortTypeParameter.Price;
const sortOrder = SortOrderParameter.LowToHigh;

describe('Catalog sort component', () => {
  it('should render "Catalog sort component"', () => {
    renderFakeApp(<CatalogSort type={sortType} order={sortOrder} />, {});

    expect(screen.getByTestId('catalog-sort')).toBeInTheDocument();
  });
});
