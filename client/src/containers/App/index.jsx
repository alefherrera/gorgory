import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Provider } from 'react-redux';
import Route from 'react-router/Route';
import { PersistGate } from 'redux-persist/integration/react';
import { STUDENT, TEACHER } from '../../constants/roles';
import history from '../../history';
import { persistor, store } from '../../store';
import AppHeader from '../AppHeader';
import Body from '../Body';
// import CodeEditor from '../CodeEditor';
import CodeEditor from '../CodeUploader';
import CourseListPage from '../Course/CourseListPage';
import DisplayNotification from '../DisplayNotification';
import ShowExercisePage from '../Exercise/ShowExercisePage';
import AddExercisePage from '../Guide/AddExercisePage';
import AddGuidePage from '../Guide/AddGuidePage';
import EditGuidePage from '../Guide/EditGuidePage';
import GuidePage from '../Guide/GuidePage';
import GuidesPage from '../Guide/GuidesPage';
import MyGuidesPage from '../Guide/MyGuidesPage';
import SearchGuidePage from '../Guide/SearchGuidePage';
import authWrapper from '../HOC/authWrapper';
import Home from '../Home';
import Login from '../Login';
import CourseView from '../Course/CourseView';
import User from '../User';
import Signature from '../Signature';
import EditExercisePage from '../Guide/EditExercisePage';
import AddGuideDecorator from '../Guide/AddGuideDecorator';
import GuideReportPage from '../Guide/GuideReportPage';

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
                <Route path="/user" component={User} />
                <Route path="/signature" component={Signature} />
                <Route path="/guide/new" component={AddGuideDecorator} />
                <Route path="/guide/add" exact component={AddGuidePage} />
                <Route path="/guide/edit/:guideId" exact component={EditGuidePage} />
                <Route path="/guide/report/:guideId" exact component={GuideReportPage} />
                <Route path="/guide/add/exercise" exact component={AddExercisePage} />
                <Route path="/guide/edit/:guideId/:exerciseId" exact component={EditExercisePage} />
                <Route path="/guide/add/exercise/:exerciseId" exact component={EditExercisePage} />
                <Route path="/guide/list" component={authWrapper(() => [TEACHER])(GuidesPage)} />
                <Route path="/guide/list" component={authWrapper(() => [STUDENT])(MyGuidesPage)} />
                <Route path="/guide/view/:guideId" exact component={GuidePage} />
                <Route path="/guide/view/exercise/:exerciseId" component={ShowExercisePage} />
                <Route path="/guide/search" component={SearchGuidePage} />
                <Route path="/course/list" component={CourseListPage} />
                <Route path="/course/view/:courseId" exact component={CourseView} />
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
