import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Admin from "./admin";
import { Provider } from "react-redux";
import configureAppStore from "../store/store";
import "./style.css?v=1.10.0";
import Login from "../../views/authentication/login";
import ProtectedRoute from "./common/protectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { roleNames } from "../../config.json";
import Shipper from "./shipper";

function App() {
  return (
    <Provider store={configureAppStore()}>
      <ToastContainer />
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute
            path="/admin"
            role={roleNames.admin}
            component={Admin}
          />
          <ProtectedRoute
            path="/shipper"
            role={roleNames.shipper}
            component={Shipper}
          />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
