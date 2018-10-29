import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Provider } from 'react-redux';
import Route from 'react-router/Route';
import { PersistGate } from 'redux-persist/integration/react';
import history from '../../history';
import { persistor, store } from '../../store';
import AppHeader from '../AppHeader';
import Body from '../Body';
// import CodeEditor from '../CodeEditor';
import CodeEditor from '../CodeUploader';
import DisplayNotification from '../DisplayNotification';
import AddGuidePage from '../Guide/AddGuidePage';
import GuidesPage from '../Guide/GuidesPage';
import SearchGuidePage from '../Guide/SearchGuidePage';
import Home from '../Home';
import Login from '../Login';
import authWrapper from '../HOC/authWrapper';
import { TEACHER, STUDENT } from '../../constants/roles';
import MyGuidesPage from '../Guide/MyGuidesPage';
import GuidePage from '../Guide/GuidePage';
import ShowExercisePage from '../Exercise/ShowExercisePage';

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
                <Route path="/guide/add" component={AddGuidePage} />
                <Route path="/guide/list" component={authWrapper(() => [TEACHER])(GuidesPage)} />
                <Route path="/guide/list" component={authWrapper(() => [STUDENT])(MyGuidesPage)} />
                <Route path="/guide/view/:guideId" component={GuidePage} />
                <Route path="/guide/view/exercise/:exerciseId" component={ShowExercisePage} />
                <Route path="/guide/search" component={SearchGuidePage} />
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
