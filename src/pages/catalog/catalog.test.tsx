import { screen } from '@testing-library/react';
import { LoadingStatus, NameSpace } from '../../consts/const';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { CatalogPage } from './catalog';

const mockState = {
  [NameSpace.Catalog]: {
    isCamerasListLoading: LoadingStatus.Pending,
  }

};
describe('Review card component', () => {
  it('should render "Review card component"', () => {
    renderFakeApp(<CatalogPage/>, {
      initialState: mockState
    });

    expect(screen.getByTestId('loader-component')).toBeInTheDocument();
  });
});
