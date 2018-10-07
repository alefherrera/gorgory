import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../../store';
import AppHeader from '../AppHeader';
import Body from '../Body';
// import CodeEditor from '../CodeEditor';
import Login from '../Login';

const App = () => (
  <Provider store={store}>
    <AppHeader>
      <Body>
        <Login />
      </Body>
    </AppHeader>
  </Provider>
);

export default App;
