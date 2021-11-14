import React, { useEffect } from "react";
import { actorGetters, getActors, setActors } from "../../bll/reducers/reducerActor";
import { connect } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import "./Actors.css";

const Actors = (props) => {
    useEffect(() => {
        props.setDataActors();
    }, []);


    let actors = props.actors.map((actor) => <div className="shadow-sm list-group-item list-group-item-action py-3 lh-tight" key={actor.idActor}>{actor.name}</div>)

    return (
        <>
            <div>
                <div className="album border bg-light rounded mx-auto actors-block">
                        <Row style={{height: "100%"}}>
                            <Col xs={4}>
                                <div className="actors-container d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                                    <div className="list-group list-group-flush border-bottom scrollarea">
                                        {actors}
                                    </div>
                                </div></Col>
                            <Col xs={8}>
                                <div>Контент</div>
                            </Col>
                        </Row>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    actors: actorGetters.getActors(state)
});

const mapDispatchToProps = (dispatch) => ({
    setDataActors() {
        dispatch(getActors());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Actors);
