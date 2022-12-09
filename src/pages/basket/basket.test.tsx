import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { BasketPage } from './basket';

describe('Footer component', () => {
  it('should render "Footer component"', () => {
    renderFakeApp(<BasketPage />, {});

    expect(screen.getByTestId('basket')).toBeInTheDocument();
  });
});
