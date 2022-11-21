import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../../../mock/fake-app/fake-app';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { LoadingStatus, NameSpace } from '../../../../consts/const';
import { createAPI } from '../../../../services/api';
import { ReviewModalWithForm } from './review-modal-with-form';
import { getFakeCamera, getFakeCamerasReview } from '../../../../mock/mock';

const fakeReviewList = [getFakeCamerasReview(), getFakeCamerasReview(), getFakeCamerasReview(), getFakeCamerasReview()];

const reviewModalOpenedStatus = true;
const cameraId = getFakeCamera().id;
const reviewSentStatus = LoadingStatus.Initial;

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  [NameSpace.Reviews]: {
    reviewsList: fakeReviewList,
  },
  [NameSpace.Cameras]: {
    selectedCamera: getFakeCamera().id
  },
  [NameSpace.Product]: {
    reviewModalOpenedStatus: true
  },
});

describe('Review modal form component', () => {
  it('should render "Review modal form component"', () => {
    renderFakeApp(<ReviewModalWithForm reviewSentStatus={reviewSentStatus} reviewModalStatus={reviewModalOpenedStatus} cameraId={cameraId}/>, {});

    expect(screen.getByTestId('review-modal')).toBeInTheDocument();
  });

  it('should close review modal if user clicks on cross-btn', async () => {
    renderFakeApp(<ReviewModalWithForm reviewSentStatus={reviewSentStatus} reviewModalStatus={reviewModalOpenedStatus} cameraId={cameraId} />, {});

    await userEvent.click(screen.getByTestId('cross-btn'));

  });

  it('should close review modal if user clicks on modal-overlay not sended', async () => {
    renderFakeApp(<ReviewModalWithForm reviewSentStatus={reviewSentStatus} reviewModalStatus={reviewModalOpenedStatus} cameraId={cameraId}/>, {});


    await userEvent.click(screen.getByTestId('modal-overlay'));

  });

  it('should send empty review', async () => {
    renderFakeApp(<ReviewModalWithForm reviewSentStatus={reviewSentStatus} reviewModalStatus={reviewModalOpenedStatus} cameraId={cameraId}/>, {
      mockStore: store
    });

    expect(screen.getAllByTestId('initial-input')[3]).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('submit'));
    await userEvent.click(screen.getByTestId('submit'));
    expect(screen.getAllByTestId('input-invalid')[3]).toBeInTheDocument();
  });


  it('should close review modal if user press on esc button and rerivew sended', async () => {
    renderFakeApp(<ReviewModalWithForm reviewSentStatus={reviewSentStatus} reviewModalStatus={reviewModalOpenedStatus} cameraId={cameraId}/>, {});

    await userEvent.type(screen.getByPlaceholderText(/Введите ваше имя/i), 'testtesttest');
    await userEvent.type(screen.getByPlaceholderText(/Главные недостатки товара/i), 'testtesttest');
    await userEvent.type(screen.getByPlaceholderText(/Основные преимущества товара/i), 'testtesttest');
    await userEvent.type(screen.getByPlaceholderText(/Поделитесь своим опытом покупки/i), 'testtesttest');
    await userEvent.click(screen.getByTestId('rate-bar-input-3'));
    await userEvent.click(screen.getByTestId('submit'));
    await userEvent.click(screen.getByTestId('submit'));
    await userEvent.keyboard('{Escape}');
  });

  it('should review correctly sended', async () => {
    renderFakeApp(<ReviewModalWithForm reviewSentStatus={reviewSentStatus} reviewModalStatus={reviewModalOpenedStatus} cameraId={cameraId} />, {
      mockStore:store
    });

    await userEvent.type(screen.getByPlaceholderText(/Введите ваше имя/i), 'testtesttest');
    await userEvent.type(screen.getByPlaceholderText(/Главные недостатки товара/i), 'testtesttest');
    await userEvent.type(screen.getByPlaceholderText(/Основные преимущества товара/i), 'testtesttest');
    await userEvent.type(screen.getByPlaceholderText(/Поделитесь своим опытом покупки/i), 'testtesttest');
    await userEvent.click(screen.getByTestId('rate-bar-input-3'));
    await userEvent.click(screen.getByTestId('submit'));

    const [action] = store.getActions();
    expect(action.type).toBe('data/postCameraReviewAction/pending');
  });

});
