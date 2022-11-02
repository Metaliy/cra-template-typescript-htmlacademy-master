import { AppPageNames, AppRoute, NameSpace } from '../../consts/const';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { getFakeCamera } from '../../mock/mock';
import { BreadcrumbsComponent } from './breadcrumbs';
import { screen } from '@testing-library/react';

const fakeCamera = getFakeCamera();

const mockState = {
  [NameSpace.ProductData]: {
    selectedCamera: fakeCamera,
  }

};

describe('Breadcrumbs Component', () => {
  it('should render correctly when user navigate to "Catalog page"', () => {
    renderFakeApp(<BreadcrumbsComponent pageName={AppPageNames.Catalog} />, {
      initialRoute: AppRoute.Catalog,
      initialState: mockState
    });

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
    expect(screen.getByText('Каталог')).toBeInTheDocument();
  });

  it('should render correctly when user navigate to "Product page"', () => {
    renderFakeApp(<BreadcrumbsComponent pageName={AppPageNames.Product} productName={fakeCamera.name} />, {
      initialRoute: AppRoute.Product,
      initialState: mockState
    });


    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.name)).toBeInTheDocument();
  });
});
