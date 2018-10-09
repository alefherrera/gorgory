import React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Route from 'react-router/Route';
import { store, persistor } from '../../store';
import history from '../../history';
import AppHeader from '../AppHeader';
import Body from '../Body';
// import CodeEditor from '../CodeEditor';
import CodeEditor from '../CodeUploader';
import Login from '../Login';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#FFCCBC',
      main: '#FF5722',
      dark: '#E64A19',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#F5F5F5',
      main: '#9E9E9E',
      dark: '#616161',
      contrastText: '#000000',
    },
  },
});

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <MuiThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <AppHeader>
            <Body>
              {/* <Route path="/" exact component={CodeEditor} />
              <Route path="/login" component={Login} /> */}
              <div style={{ display: 'flex' }}>
                <Login />
                <CodeEditor />
              </div>
            </Body>
          </AppHeader>
        </ConnectedRouter>
      </MuiThemeProvider>
    </PersistGate>
  </Provider>
);

export default App;
