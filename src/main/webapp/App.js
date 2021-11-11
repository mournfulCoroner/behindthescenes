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
        <div className="App" className="d-flex h-100 text-center text-dark">
            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                <Header/>
                <Login/>
                <Content/>
            </div>
        </div>
    );
}

export default withRouter(App);
