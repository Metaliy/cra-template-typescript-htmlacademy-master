import { MockStore } from '@jedmao/redux-mock-store';
import { createStore } from '../../store';
import { InitialEntry } from 'history';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

type Options = {
  initialState?: Record<string, unknown>
  initialRoute?: InitialEntry;
  mockStore?: MockStore
}

const renderFakeApp = (component: JSX.Element, {initialRoute = '/', initialState = {}, mockStore}: Options) => {


  function Wrapper() {
    return (
      <Provider store={mockStore ? mockStore : createStore(initialState)}>
        <MemoryRouter initialEntries={[initialRoute]}>
          {component}
        </MemoryRouter>
      </Provider>
    );
  }
  return render(<Wrapper />);
};

export {
  renderFakeApp
};
