import React, { useEffect, useState } from "react";
import { actorGetters, getActors, setActors } from "../../bll/reducers/reducerActor";
import { connect } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import "./Actors.css";
import { NavLink } from "react-router-dom";
import { compose } from "redux";
import ActorInfo from "./Actor/ActorInfo";
import { userGetters } from "../../bll/reducers/reducerUser";

const Actors = (props) => {
    useEffect(() => {
        props.setDataActors();
    }, []);


    let actors = props.actors.map((actor) => <NavLink to={`/actors/${actor.idActor}`} className="shadow-sm list-group-item list-group-item-action py-3 lh-tight" key={actor.idActor}>{actor.name}</NavLink>)

    const clickAddActor = (e) => {
        alert("Добавление актера")
        console.log(e.target)
    }

    return (
        <>
            <div>
                <div className="album border bg-light rounded mx-auto actors-block">
                        <Row style={{height: "100%"}}>
                            <Col xs={4}>
                                <div className="actors-container d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                                    <div className="list-group list-group-flush border-bottom scrollarea">
                                    {props.authorization ? <div onClick={clickAddActor} className="add-actor-button shadow-sm list-group-item list-group-item-action py-3 lh-tight">Добавить актёра</div> : null}
                                        {actors}
                                    </div>
                                </div></Col>
                            <Col xs={8}>
                                <ActorInfo />
                            </Col>
                        </Row>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    actors: actorGetters.getActors(state),
    authorization: userGetters.getAuthorization(state)
});

const mapDispatchToProps = (dispatch) => ({
    setDataActors() {
        dispatch(getActors());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Actors);
