import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { getUidCamerasList } from '../../mock/mock';
import { ProductSimilarSlider } from './product-similar-slider';

const fakesimilarCameras = getUidCamerasList(4);
const camerasId = [1,2,3,4];


describe('Product similar slider component', () => {
  it('should render "Product similar slider component"', () => {
    renderFakeApp(<ProductSimilarSlider similarCamerasList={fakesimilarCameras} camerasIdInTheBasket={camerasId}/>, {});

    expect(screen.getByTestId('product-similar-slider')).toBeInTheDocument();
    expect(screen.getByText(fakesimilarCameras[0].name)).toBeInTheDocument();
  });

  it('should click on next-button', async () => {
    renderFakeApp(<ProductSimilarSlider similarCamerasList={fakesimilarCameras} camerasIdInTheBasket={camerasId} />, {
    });

    await userEvent.click(screen.getByTestId('next-button'));

    expect(screen.queryByTestId(`active-product-card-${fakesimilarCameras[0].id}`)).not.toBeInTheDocument();

    expect(screen.getByTestId(`active-product-card-${fakesimilarCameras[3].id}`)).toBeInTheDocument();
  });

  it('should click on prev-button after click on next-button', async () => {
    renderFakeApp(<ProductSimilarSlider similarCamerasList={fakesimilarCameras} camerasIdInTheBasket={camerasId} />, {
    });

    expect(screen.getByTestId(`active-product-card-${fakesimilarCameras[0].id}`)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('next-button'));
    expect(screen.queryByTestId(`active-product-card-${fakesimilarCameras[0].id}`)).not.toBeInTheDocument();

    await userEvent.click(screen.getByTestId('prev-button'));
    expect(screen.queryByTestId(`active-product-card-${fakesimilarCameras[3].id}`)).not.toBeInTheDocument();
  });
});
