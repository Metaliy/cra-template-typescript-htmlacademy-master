import { screen } from '@testing-library/react';
import { LoadingStatus, NameSpace } from '../../consts/const';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { ProductPage } from './product';


const mockState = {
  [NameSpace.Cameras]: {
    selectedCameraLoadingStatus: LoadingStatus.Pending,
  }

};
describe('Review card component', () => {
  it('should render "Review card component"', () => {
    renderFakeApp(<ProductPage/>, {
      initialState: mockState
    });

    expect(screen.getByTestId('loader-component')).toBeInTheDocument();
  });
});
