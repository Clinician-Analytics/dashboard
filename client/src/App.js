import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import { AnnualDataProvider } from "./contexts/AnnualDataContext";
// import Navigation from "./components/menus/Navigation";
import Navbar from "./components/menus/Navbar";
import AdminView from "./views/AdminView";
import OfficerView from "./views/OfficerView";
import ClinicianView from "./views/ClinicianView";
import NewSystemView from "./views/NewSystemView";
import Login from "./views/Login";
import Alert from "./views/Alert";
import Register from "./views/Register";
import PrivateRoute from "./components/routing/PrivateRoute";
import Landing from "./views/Landing";

// redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { Fragment } from "react";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Alert />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/landing" component={Landing} />
          <PrivateRoute exact path="/admin-view" component={AdminView} />
          <PrivateRoute exact path="/officer-view" component={OfficerView} />
          <PrivateRoute
            exact
            path="/clinician-view"
            component={ClinicianView}
          />
          <PrivateRoute exact path="/system-view" component={NewSystemView} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
