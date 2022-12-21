import { NameSpace } from '../../consts/const';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import 'react-intersection-observer/test-utils';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { getFakeCamera } from '../../mock/mock';
import { BasketItem } from './basket-item';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';

const fakeCamera = getFakeCamera();

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [NameSpace.Basket]: {
    addedItems: [],
    numberOfItemsAdded: 1,
    removedCamera: null
  }
});

const fakeOrderSuccessModalStatus = jest.fn();

describe('BasketItem component', () => {
  it('should render BasketItem', () => {
    renderFakeApp(<BasketItem camera={fakeCamera} camerasCount={2} onDeleteButtonClick={fakeOrderSuccessModalStatus}/>, {
      mockStore: store
    });
  });

  it('should click on plus-item-button', async () => {
    renderFakeApp(<BasketItem camera={fakeCamera} camerasCount={2} onDeleteButtonClick={fakeOrderSuccessModalStatus}/>, {
      mockStore: store
    });

    await userEvent.click(screen.getByTestId('plus-item-button'));

  });

  it('should click on minus-item-button', async () => {
    renderFakeApp(<BasketItem camera={fakeCamera} camerasCount={2} onDeleteButtonClick={fakeOrderSuccessModalStatus}/>, {
      mockStore: store
    });

    await userEvent.click(screen.getByTestId('minus-item-button'));

  });

  it('should click on open-confirm-delete-item-modal-button', async () => {
    renderFakeApp(<BasketItem camera={fakeCamera} camerasCount={2} onDeleteButtonClick={fakeOrderSuccessModalStatus}/>, {
      mockStore: store
    });

    await userEvent.click(screen.getByTestId('open-confirm-delete-item-modal-button'));

    expect(fakeOrderSuccessModalStatus).toBeCalledTimes(1);

  });
});

