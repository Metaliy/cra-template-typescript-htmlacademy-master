import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { getFakeCamera } from '../../mock/mock';
import { screen } from '@testing-library/react';
import { ProductCard } from './product-card';
import { NameSpace, LoadingStatus } from '../../consts/const';

const fakeCamera = getFakeCamera();

const mockState = {
  [NameSpace.Catalog]: {
    camerasListLoadingStatus: LoadingStatus.Pending,
  },
};


describe('Product card component', () => {
  it('should render "Product card component"', () => {
    renderFakeApp(<ProductCard camera={fakeCamera}/>, {
      initialState: mockState
    });

    expect(screen.getByTestId('product-card')).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.name)).toBeInTheDocument();
  });
  it('should render "Product card component" if isActive', () => {
    renderFakeApp(<ProductCard camera={fakeCamera} isActive/>, {
      initialState: mockState
    });

    expect(screen.getByTestId(`active-product-card-${fakeCamera.id}`)).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.name)).toBeInTheDocument();
  });
});
