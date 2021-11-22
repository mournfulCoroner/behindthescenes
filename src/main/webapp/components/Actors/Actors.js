import React, { useEffect, useState } from "react";
import { actorGetters, getActors, createActor } from "../../bll/reducers/reducerActor";
import { connect } from "react-redux";
import { Col,  Row } from "react-bootstrap";
import "./Actors.css";
import { NavLink } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { Modal, Button } from "react-bootstrap";
import ActorInfo from "./Actor/ActorInfo";
import { userGetters } from "../../bll/reducers/reducerUser";

const Actors = (props) => {
    useEffect(() => {
        props.setDataActors();
    }, []);


    const [addActorModal, setAddActorModal] = useState(false);

    let actors = props.actors.map((actor) => <NavLink to={`/actors/${actor.idActor}`}
    className="shadow-sm list-group-item list-group-item-action py-3 lh-tight" key={actor.idActor}>{actor.name}</NavLink>)

    const onSubmit = (e) => {
        e.preventDefault();
        const loginForm = e.currentTarget;
        props.addActor(props.authorization, loginForm.elements.name.value);
        setAddActorModal(false);
    }


    return (
        <>
                <div className="album overflow-hidden border bg-light rounded mx-auto h-100">
                    <Row style={{ height: "100%" }}>
                    <Col xs={4} className="pe-0 overflow-auto">
                            <div className="actors-container d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                                <div className="border-end list-group list-group-flush border-bottom scrollarea">
                                    {props.authorization ? <div onClick={() => setAddActorModal(true)} 
                                        className="add-actor-button text-secondary shadow-sm list-group-item list-group-item-action py-3 lh-tight">Добавить актёра</div> : null}
                                    {actors}
                                </div>
                            </div></Col>
                        <Col xs={8} className="ps-0">
                            <ActorInfo />
                        </Col>
                    </Row>
                </div>
            

            <Modal show={addActorModal} onHide={() => setAddActorModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавление актёра</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={onSubmit}
                        action="#"
                    >
                        <TextField
                            label="Имя"
                            name="name"
                        />

                        <div className="login__form-element">
                            <Button className="m-3 px-3" variant="dark" type="submit">Создать</Button>

                            <Button variant="secondary" onClick={() => setAddActorModal(false)}>
                                Отмена
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
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
    },
    addActor(authorization, name) {
        dispatch(createActor(authorization, name))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Actors);
