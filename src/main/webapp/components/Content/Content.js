import React from "react";
import "./content.css";
import {Route, Switch} from "react-router-dom";
import Home from "../Home/Home";
import Actors from "../Actors/Actors";
import Scripts from "../Scripts/Scripts";

const Content = (props) => {
    return (
        <section className="content">
            <Switch>
                <Route path={["/home"]}><Home/></Route>
                <Route path={["/actors/:actorId?"]}><Actors /></Route>
                <Route path={["/scripts/:scriptId?"]}><Scripts /></Route>
                <Route path="*"><div>No match</div></Route>
            </Switch>
        </section>
    );
}

export default Content;
