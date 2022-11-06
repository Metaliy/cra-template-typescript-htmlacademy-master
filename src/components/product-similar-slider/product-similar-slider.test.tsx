import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoadingStatus, NameSpace } from '../../consts/const';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { getUidCamerasList } from '../../mock/mock';
import { ProductSimilarSlider } from './product-similar-slider';

const similarCameras = getUidCamerasList(4);


const mockState = {
  [NameSpace.Cameras]: {
    similarCameras: similarCameras,
    isSimilarCamerasListLoading: LoadingStatus.Fulfilled
  }

};


describe('Product similar slider component', () => {
  it('should render "Product similar slider component"', () => {
    renderFakeApp(<ProductSimilarSlider />, {
      initialState: mockState
    });

    expect(screen.getByTestId('product-similar-slider')).toBeInTheDocument();
    expect(screen.getByText(similarCameras[0].name)).toBeInTheDocument();
  });

  it('should click on next-button', async () => {
    renderFakeApp(<ProductSimilarSlider />, {
      initialState: mockState
    });

    await userEvent.click(screen.getByTestId('next-button'));

    expect(screen.queryByTestId(`active-product-card-${similarCameras[0].id}`)).not.toBeInTheDocument();

    expect(screen.getByTestId(`active-product-card-${similarCameras[3].id}`)).toBeInTheDocument();
  });

  it('should click on prev-button after click on next-button', async () => {
    renderFakeApp(<ProductSimilarSlider />, {
      initialState: mockState
    });

    expect(screen.getByTestId(`active-product-card-${similarCameras[0].id}`)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('next-button'));
    expect(screen.queryByTestId(`active-product-card-${similarCameras[0].id}`)).not.toBeInTheDocument();

    await userEvent.click(screen.getByTestId('prev-button'));
    expect(screen.queryByTestId(`active-product-card-${similarCameras[3].id}`)).not.toBeInTheDocument();
  });
});
