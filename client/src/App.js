import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AnnualDataProvider } from "./contexts/AnnualDataContext";
import Navigation from "./components/menus/Navigation";
import Landing from "./views/Landing";
import AdminView from "./views/AdminView";
import OfficerView from "./views/OfficerView";
import ClinicianView from "./views/ClinicianView";
import SystemView from "./views/SystemView";

function App() {
  return (
    <AnnualDataProvider>
      <Router>
        <Navigation />
        <Route exact path="/" component={Landing} />
        <Route exact path="/admin-view" component={AdminView} />
        <Route exact path="/officer-view" component={OfficerView} />
        <Route exact path="/clinician-view" component={ClinicianView} />
        <Route exact path="/system-view" component={SystemView} />
      </Router>
    </AnnualDataProvider>
  );
}

export default App;
