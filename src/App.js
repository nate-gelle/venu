import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import LoginPage from './components/LoginPage/LoginPage';
import WelcomePage from './components/WelcomePage/WelcomePage';
import RegisterPatron from './components/RegisterPatron/RegisterPatron';
import RegisterVenue from './components/RegisterVenue/RegisterVenue';
import PatronProfile from './components/PatronProfile/PatronProfile';
import PatronListView from './components/PatronListView/PatronListView';
import VenueProfile from './components/VenueProfile/VenueProfile';
import VenueEditor from './components/VenueEditor/VenueEditor';
import InfoPage from './components/InfoPage/InfoPage';

import './styles/main.css';
import 'typeface-roboto';

const App = () => (
  <div>
    <Router>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route
          path="/login"
          component={LoginPage}
        />
        <Route
          path="/welcome"
          component={WelcomePage}
        />  
        <Route
          path="/regpatron"
          component={RegisterPatron}
        />
        <Route
          path="/regvenue"
          component={RegisterVenue}
        />
        <Route
          path="/plistview"
          component={PatronListView}
        />
        <Route
          path="/pprofile"
          component={PatronProfile}
        />
        <Route
          path="/vprofile"
          component={VenueProfile}
        />
        <Route
          path="/editvenue"
          component={VenueEditor}
        />
        <Route
          path="/info"
          component={InfoPage}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
