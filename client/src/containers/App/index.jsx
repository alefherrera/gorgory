import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { store } from '../../store';
import AppHeader from '../AppHeader';
import Body from '../Body';
import CodeEditor from '../CodeEditor';

class App extends Component {
  state = { age: 2 };
  render() {
    return (
      <Provider store={store}>
        <div>
          <AppHeader>
            <Body>
              <CodeEditor />
            </Body>
          </AppHeader>
        </div>
      </Provider>
    );
  }
}

export default App;
