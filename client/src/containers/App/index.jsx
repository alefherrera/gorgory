import React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import Route from 'react-router/Route';
import { store, persistor } from '../../store';
import history from '../../history';
import AppHeader from '../AppHeader';
import Body from '../Body';
// import CodeEditor from '../CodeEditor';
import CodeEditor from '../CodeUploader';
import Login from '../Login';
import AddGuidePage from '../Guide/AddGuidePage';
import DisplayNotification from '../DisplayNotification';
import GuidesPage from '../Guide/GuidesPage';
import Home from '../Home';

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
          <div>
            <AppHeader>
              <Body>
                <Route path="/" exact component={Home} />
                <Route path="/editor" exact component={CodeEditor} />
                <Route path="/login" component={Login} />
                <Route path="/guide" component={AddGuidePage} />
                <Route path="/guides" component={GuidesPage} />
              </Body>
            </AppHeader>
            <DisplayNotification />
          </div>
        </ConnectedRouter>
      </MuiThemeProvider>
    </PersistGate>
  </Provider>
);

export default App;
