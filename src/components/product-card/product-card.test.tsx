import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { getFakeCamera } from '../../mock/mock';
import { screen } from '@testing-library/react';
import { ProductCardComponent } from './product-card';

const fakeCamera = getFakeCamera();


describe('Breadcrumbs Component', () => {
  it('should render "Product card component"', () => {
    renderFakeApp(<ProductCardComponent camera={fakeCamera}/>, {});

    expect(screen.getByTestId('product-card')).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.name)).toBeInTheDocument();
  });
  it('should render "Product card component" if isActive', () => {
    renderFakeApp(<ProductCardComponent camera={fakeCamera} isActive/>, {});

    expect(screen.getByTestId(`active-product-card-${fakeCamera.id}`)).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.name)).toBeInTheDocument();
  });
});
