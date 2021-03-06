import React from 'react';
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import WelcomePage from './components/WelcomePage/WelcomePage';
import RegisterPatron from './components/RegisterPatron/RegisterPatron';
import RegisterVenue from './components/RegisterVenue/RegisterVenue';
import PatronHome from './components/PatronHome/PatronHome';
import VenueProfile from './components/VenueProfile/VenueProfile';
import VenueEditor from './components/VenueEditor/VenueEditor';
import VenueSettings from './components/VenueSettings/VenueSettings';
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
          path="/phome"
          component={PatronHome}
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
          path="/vsettings"
          component={VenueSettings}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />
      </Switch>
    </Router>
  </div>
);

export default App;
