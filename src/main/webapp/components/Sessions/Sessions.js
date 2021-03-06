import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Button, Nav, Table, Form, Modal } from "react-bootstrap";
import { NavLink, withRouter } from "react-router-dom";
import { userGetters } from "../../bll/reducers/reducerUser";
import { scriptGetters } from "../../bll/reducers/reducerScript";
import { sessionGetters, getSessionsThisDate, getSessionsThisMonth, createSession, deleteSession } from "../../bll/reducers/reducerSession";
import { format } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'

import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import "./session.css";


const Sessions = (props) => {
    useEffect(() => {
        setTimeSessions()
    }, []);

    useEffect(() => {
        setTimeSessions()
    }, [props.match.params]);


    const [activeSort, setActiveSort] = useState(props.match.params.sessionsTime);
    const [value, setValue] = useState(null);

    const [deleteSessionModal, setDeleteSessionModal] = useState(false);

    const setTimeSessions = () => {
        setActiveSort(props.match.params.sessionsTime);
        switch (props.match.params.sessionsTime) {
            case "today":
                props.getSessionsThisDate(new Date());
                setValue(null);
                break;
            case "now":
                props.getSessionsThisMonth();
                setValue(null);
                break;
            case "date":
                if (!value) {
                    props.history.push("/sessions/today")
                }
                break;
            default:
                break;
        }
    }


    const deleteCurrentSessions = () => {
        let checkers = document.querySelectorAll(".session-check");
        let ids = [];
        for (let checker of checkers) {
            checker.checked ? ids.push(checker.attributes.sessionid.value) : null
        }
        if (ids.length) {
            props.deleteSession(props.authorization, ids);
        }
        else{
            alert("???????????? ???? ????????????????")
        }
        setDeleteSessionModal(false);
    }


    const handleChange = (newValue) => {
        props.getSessionsThisDate(newValue);
        setValue(newValue);
        props.history.push("/sessions/date");
    }

    let sessions = props.sessions.map((session) => <tr key={session.id ? session.id : session.idSession}><td>{session.id}</td>
        <td>{session.playByPlayIdPlay?.scriptByScriptIdScript.title}</td>
        <td>{format(new Date(session.date), "Pp", {
            locale: ruLocale
        })}</td>
        <td>{session.hallNumber}</td>
        <td><input type="checkbox" className="session-check form-check-input" sessionid={session.id} /></td></tr>)

    return (
        <>

            <div className="d-flex flex-column d-md-flex d-sm-flex album overflow-hidden border bg-light rounded mx-auto h-100">
                <Nav variant="pills" className="pills-container align-items-center bg-white border m-4 nav nav-pills p-3 rounded d-flex flex-column flex-lg-row justify-content-between">
                    <div className="d-flex align-items-center flex-column mt-1 flex-lg-row mx-auto mx-lg-0">
                        <Nav.Item className="mb-3 mb-lg-0">
                            <NavLink to="/sessions/today" className={activeSort == "today" ? "me-3 nav-link active" : "me-3 nav-link"}>??????????????</NavLink>
                        </Nav.Item>
                        <Nav.Item className="mb-3 mb-lg-0">
                            <NavLink to="/sessions/now" className={activeSort == "now" ? "me-3 nav-link active" : "me-3 nav-link"}>?? ???????? ????????????</NavLink>
                        </Nav.Item>
                        <Nav.Item className="mb-3 mb-lg-0">
                        <DesktopDatePicker
                            label="???????????????? ????????"
                            inputFormat="dd/MM/yyyy"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        /></Nav.Item>
                    </div>
                    {props.authorization ? <div className="mt-1"><Button
                        variant="outline-danger" onClick={() => setDeleteSessionModal(true)}>??????????????</Button> </div> : null}
                </Nav>

                <div className="overflow-auto h-100 bg-white border m-4 p-3 rounded">
                    {props.sessions ? <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>????????????????</th>
                                <th>??????????</th>
                                <th>?????????? ????????</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {sessions}
                        </tbody>
                    </Table> : null}

                </div>
            </div>

            <Modal show={deleteSessionModal} onHide={() => setDeleteSessionModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>????????????????????????????</Modal.Title>
                </Modal.Header>
                <Modal.Body>???? ??????????????, ?????? ???????????? ?????????????? ?????????????????? ?????????????</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={deleteCurrentSessions}>
                        ????
                    </Button>
                    <Button variant="dark" onClick={() => setDeleteSessionModal(false)}>
                        ????????????
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

const mapStateToProps = (state) => ({
    authorization: userGetters.getAuthorization(state),
    sessions: sessionGetters.getSessions(state),
    scripts: scriptGetters.getScripts(state)
});


export default compose(connect(mapStateToProps, {
    getSessionsThisMonth,
    getSessionsThisDate,
    createSession,
    deleteSession
}),
    withRouter)(Sessions);
