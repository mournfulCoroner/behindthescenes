import React from "react";
import './App.css';
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Content from "./components/Content/Content";
import { Redirect, withRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = (props) => {
    if (props.location.pathname === "/") {
        return <Redirect to={"/home"}/>
    }

    return (
        <div className="App">
            <Header/>
            <Login/>
            <Content/>
        </div>
    );
}

export default withRouter(App);
