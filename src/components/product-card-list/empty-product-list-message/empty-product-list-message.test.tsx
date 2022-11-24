import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../../mock/fake-app/fake-app';
import EmptyProductListMessage from './empty-product-list-message';


describe('Footer component', () => {
  it('should render "Footer component"', () => {
    renderFakeApp(<EmptyProductListMessage />, {});

    expect(screen.getByTestId('empty-product-list-message')).toBeInTheDocument();
  });
});
