import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Admin from "./admin";
import { Provider } from "react-redux";
import configureAppStore from "../store/store";
import "./style.css?v=1.10.0";

function App() {
  return (
    <Provider store={configureAppStore()}>
      <BrowserRouter>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
