import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { CatalogSort } from './catalog-sort';

describe('Catalog sort component', () => {
  it('should render "Catalog sort component"', () => {
    renderFakeApp(<CatalogSort />, {});

    expect(screen.getByTestId('catalog-sort')).toBeInTheDocument();
  });
});
