import React from "react";
import "./content.css";
import {Route} from "react-router-dom";
import Home from "../Home/Home";
import UserProfile from "../UserProfile/UserProfile";
import Actors from "../Actors/Actors";
import Scripts from "../Scripts/Scripts";

const Content = (props) => {
    return (
        <section className="content">
            <Route path={["/home/:tags", "/home"]} component={Home}/>
            <Route path={["/user/:nickname"]} component={UserProfile}/>
            <Route path={["/actors"]} component={Actors}/>
            <Route path={["/scripts"]} remder={() => <Scripts/>}/>
        </section>
    );
}

export default Content;
