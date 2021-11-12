import React from "react";
import ReactDOM from 'react-dom'
import { Provider } from "react-redux";
import store from "./bll/store";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./App";

ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>,
    document.getElementById("root")
);
