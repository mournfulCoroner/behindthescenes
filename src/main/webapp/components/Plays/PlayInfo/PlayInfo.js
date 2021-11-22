import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import "./../plays.css";
import { Button,  Modal, ListGroup, CloseButton } from "react-bootstrap";
import { NavLink, withRouter } from "react-router-dom";
import { userGetters } from "../../../bll/reducers/reducerUser";

import { format } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'

import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';
import { createSession, deletePlaySession, getPlaySessions, sessionGetters } from "../../../bll/reducers/reducerSession";
import { getPlay, playGetters } from "../../../bll/reducers/reducerPlay";

const PlayInfo = (props) => {
    useEffect(() => {
        props.getPlay(props.match.params.playId);
    }, []);
    useEffect(() => {
        props.play ? props.getPlaySessions(props.play.sessionsByIdPlay) : null
    }, [props.play]);


    const [value, setValue] = useState(null);

    const [currentSessionId, setCurrentSessionId] = useState(null);

    const [deleteSessionModal, setDeleteSessionModal] = useState(false);


    const addSession = () => {
        let hallNumber = document.querySelector("#session-hall");
        if(value && hallNumber && value >= new Date(props.play.premierDate) && value <= new Date(props.play.endDate)){
            props.createSession(props.authorization, value, hallNumber.value, props.match.params.playId)
        }
        setValue(null);
        hallNumber.value = null;
    }

    const deleteCurrentSession = () => {
        let ids = [];
        ids.push(currentSessionId);
        props.deletePlaySession(props.authorization, ids);
        setDeleteSessionModal(false);
    }

    const initialSessionId = (e) => {
        setCurrentSessionId(e.currentTarget.parentNode.getAttribute("sessionid"));
        setDeleteSessionModal(true);
    }

    let sessions = props.playSessions.map((session) => <ListGroup.Item key={session.idSession}
    className="fs-5 d-flex justify-content-between"><p className="m-1 p-2">Время: {format(new Date(session.date), "Pp", {
        locale: ruLocale
    })} </p> <div sessionid={session.idSession} className="d-flex align-items-center">
        <p className="m-1 p-2">Номер зала: {session.hallNumber}</p>
        <CloseButton onClick={initialSessionId} /></div></ListGroup.Item>)
    return (
        <>
            <div className="d-flex flex-column d-md-flex d-sm-flex album overflow-hidden border bg-light rounded mx-auto h-100">
                
                    <div className="bg-white border m-2 p-3 rounded">
                        {props.play ? <div className="d-flex align-items-baseline flex-column flex-lg-row mx-auto mx-lg-0">
                        <h3 className="m-2">{props.play.scriptByScriptIdScript.title}</h3> 
                        <p className="fs-5 m-2 mx-3">{props.play.premierDate}</p> 
                        <p className="fs-5 m-2 mx-3">{props.play.endDate}</p></div> : null}
                    </div>
                

                <div className="align-items-center bg-white border d-flex justify-content-between m-2 p-3 rounded">
                    <div>
                    <DateTimePicker
                        id="session-date"
                        className="mx-2"
                        label="Выберите время"
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <TextField
                        className="mx-2 m-25"
                        style={{"width": "246px"}}
                        id="session-hall"
                        label="Номер зала"
                        type="number"
                        inputProps={{
                            min: 1,
                            max: 6
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    </div>

                    {props.authorization ? <div><Button variant="outline-secondary" onClick={addSession}>Создать сессию</Button> </div> : null}
                </div>

                <div className="overflow-auto h-100 bg-white border m-2 p-3 rounded">
                    {props.play && props.play.sessionsByIdPlay ? <ListGroup>
                        {sessions}
                    </ListGroup> : null}

                </div>
            </div>

            <Modal show={deleteSessionModal} onHide={() => setDeleteSessionModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Предупреждение</Modal.Title>
                </Modal.Header>
                <Modal.Body>Вы уверены, что хотите удалить сессию?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={deleteCurrentSession}>
                        Да
                    </Button>
                    <Button variant="dark" onClick={() => setDeleteSessionModal(false)}>
                        Отмена
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const mapStateToProps = (state) => ({
    authorization: userGetters.getAuthorization(state),
    play: playGetters.getPlay(state),
    playSessions: sessionGetters.getPlaySessions(state)
});


export default compose(connect(mapStateToProps, {
    createSession,
    deletePlaySession,
    getPlaySessions,
    getPlay
}),
    withRouter)(PlayInfo);
