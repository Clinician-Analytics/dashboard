import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import { AnnualDataProvider } from "./contexts/AnnualDataContext";
import Navigation from "./components/menus/Navigation";
import Landing from "./views/Landing";
import AdminView from "./views/AdminView";
import OfficerView from "./views/OfficerView";
import ClinicianView from "./views/ClinicianView";
import SystemView from "./views/SystemView";
import Login from "./views/Login";

// redux
import { Provider } from "react-redux";
import store from "./store";

const App = () => (
  <Provider store={store}>
    <Router>
      <Navigation />
      <Route exact path="/" component={Login} />
      <Route exact path="/admin-view" component={AdminView} />
      <Route exact path="/officer-view" component={OfficerView} />
      <Route exact path="/clinician-view" component={ClinicianView} />
      <Route exact path="/system-view" component={SystemView} />
    </Router>
  </Provider>
);

export default App;
