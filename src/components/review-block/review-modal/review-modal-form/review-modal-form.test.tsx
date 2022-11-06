import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../../../mock/fake-app/fake-app';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { LoadingStatus, NameSpace } from '../../../../consts/const';
import { createAPI } from '../../../../services/api';
import { ReviewModalForm } from './review-modal-form';
import { getFakeCamerasReview } from '../../../../mock/mock';

const fakeReviewList = [getFakeCamerasReview(), getFakeCamerasReview(), getFakeCamerasReview(), getFakeCamerasReview()];


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  [NameSpace.Reviews]: {
    reviewSentStatus: LoadingStatus.Initial,
    reviewsList: fakeReviewList,
  },
  [NameSpace.Cameras]: {
    selectedCamera: getFakeCamerasReview().id
  },
  [NameSpace.Product]: {
    reviewModalOpenedStatus: true
  },
});

describe('Review modal form component', () => {
  it('should render "Review modal form component"', () => {
    renderFakeApp(<ReviewModalForm/>, {});

    expect(screen.getByTestId('review-modal')).toBeInTheDocument();
  });

  it('should close review modal if user clicks on cross-btn', async () => {
    renderFakeApp(<ReviewModalForm />, {});

    await userEvent.click(screen.getByTestId('cross-btn'));

  });

  it('should close review modal if user clicks on modal-overlay not sended', async () => {
    renderFakeApp(<ReviewModalForm />, {});


    await userEvent.click(screen.getByTestId('modal-overlay'));

  });

  it('should send empty review', async () => {
    renderFakeApp(<ReviewModalForm/>, {
      mockStore: store
    });

    expect(screen.getAllByTestId('initial-input')[3]).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('submit'));
    await userEvent.click(screen.getByTestId('submit'));
    expect(screen.getAllByTestId('input-invalid')[3]).toBeInTheDocument();
  });


  it('should close review modal if user press on esc button and rerivew sended', async () => {
    renderFakeApp(<ReviewModalForm />, {});

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
    renderFakeApp(<ReviewModalForm />, {
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
