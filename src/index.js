import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { Layout } from "./utility/context/Layout";
import { store } from "./redux/storeConfig/store";
import Fallback from "./components/fallback/Fallback.js";

import "./@fake-db";
import "./assets/styles/theme.scss";

const LazyApp = lazy(() => import("./App"));

// configureDatabase()
ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<Fallback />}>
      <Layout>
        <LazyApp />
      </Layout>
    </Suspense>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
