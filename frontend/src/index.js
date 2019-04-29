import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from './App';
import Curriculum from "./components/Curriculum/Curriculum";
import Admin from "./components/Admin/Admin";

import "./index.css";

ReactDOM.render( (
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path="/" component={Curriculum} />
        <Route exact path="/admin" component={Admin} />
      </Switch>
    </App>
  </BrowserRouter>
),
  document.getElementById( 'root' ) );
