import React from "react";
import "./content.css";
import {Route, Switch} from "react-router-dom";
import Home from "../Home/Home";
import UserProfile from "../UserProfile/UserProfile";
import Actors from "../Actors/Actors";
import Scripts from "../Scripts/Scripts";

const Content = (props) => {
    return (
        <section className="content">
            <Switch>
                <Route path={["/home/:tags", "/home"]}><Home/></Route>
                <Route path={["/user/:nickname"]}><UserProfile /></Route>
                <Route path={["/actors"]}><Actors /></Route>
                <Route path={["/scripts"]}><Scripts /></Route>
                <Route path="*"><div>No match</div></Route>
            </Switch>
        </section>
    );
}

export default Content;
