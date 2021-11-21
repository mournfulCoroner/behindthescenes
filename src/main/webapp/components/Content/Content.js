import React, { useEffect } from "react";
import "./content.css";
import { Route, Switch } from "react-router-dom";
import Home from "../Home/Home";
import Actors from "../Actors/Actors";
import Scripts from "../Scripts/Scripts";
import Plays from "../Plays/Plays";
import { getScripts } from "../../bll/reducers/reducerScript";
import { connect } from "react-redux";
import Sessions from "../Sessions/Sessions";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const Content = (props) => {

    useEffect(() => {
        props.getScripts();
    }, []);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <section className="content">
                <Switch>
                    <Route path={["/home"]}><Home /></Route>
                    <Route path={["/actors/:actorId?"]}><Actors /></Route>
                    <Route path={["/scripts/:scriptId?"]}><Scripts /></Route>
                    <Route path={["/sessions/:sessionsTime?"]}><Sessions /></Route>
                    <Route path={["/plays/:playsTime?"]}><Plays /></Route>
                    <Route path="*"><div>No match</div></Route>
                </Switch>
            </section>
        </LocalizationProvider>
    );
}

export default connect(null, {
    getScripts
})(Content);
