import { AppPageNames, AppRoute, NameSpace } from '../../consts/const';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { getFakeCamera } from '../../mock/mock';
import { Breadcrumbs } from './breadcrumbs';
import { screen } from '@testing-library/react';

const fakeCamera = getFakeCamera();

const mockState = {
  [NameSpace.Cameras]: {
    selectedCamera: fakeCamera,
  }

};

describe('Breadcrumbs component', () => {
  it('should render correctly when user navigate to "Catalog page"', () => {
    renderFakeApp(<Breadcrumbs pageName={AppPageNames.Catalog} />, {
      initialRoute: AppRoute.Catalog,
      initialState: mockState
    });

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
    expect(screen.getByText('Каталог')).toBeInTheDocument();
  });

  it('should render correctly when user navigate to "Product page"', () => {
    renderFakeApp(<Breadcrumbs pageName={AppPageNames.Product} productName={fakeCamera.name} />, {
      initialRoute: AppRoute.Product,
      initialState: mockState
    });


    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.name)).toBeInTheDocument();
  });
});
