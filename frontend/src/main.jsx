import "babel-polyfill";
import React from "react";
import {render} from "react-dom";
import {Router, browserHistory} from "react-router";
import {Provider} from "react-redux";
import configureStore from "./store/configureStore";
import {routes} from "./routes.jsx";
import moment from "moment";
import "moment/locale/uk";
import momentLocalizer from "react-widgets/lib/localizers/moment";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./common-assets/styles/AdminLTE.min.css";
import "./common-assets/styles/skin-blue.min.css";
import "react-widgets/lib/less/react-widgets.less";
import "./main.less";

//require.context("./common-assets/", true, /.*/);  //перетащити всі common-assets у папку з білдом

//налаштовуємо локалізацію у react-widgets
moment.locale('uk');
momentLocalizer(moment);

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('mount-point')
);
