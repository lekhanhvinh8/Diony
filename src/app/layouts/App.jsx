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

function App() {
  return (
    <Provider store={configureAppStore()}>
      <ToastContainer />
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute path="/admin" component={Admin} />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
