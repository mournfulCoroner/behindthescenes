import React from "react";
import './App.css';
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import { Redirect, withRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = (props) => {
    if (props.location.pathname === "/") {
        return <Redirect to={"/home"}/>
    }

    return (
        <div className="App" className="d-flex h-100 text-center text-dark">
            <div className="cover-container d-grid w-100 h-100 p-3 mx-auto content-container">
                <Header/>
                <Content/>
            </div>
        </div>
    );
}

export default withRouter(App);
