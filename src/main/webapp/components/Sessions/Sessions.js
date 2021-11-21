import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Button, Nav, Table, Form, Modal } from "react-bootstrap";
import { NavLink, withRouter } from "react-router-dom";
import { userGetters } from "../../bll/reducers/reducerUser";
import {  scriptGetters } from "../../bll/reducers/reducerScript";
import { sessionGetters, getSessionsThisDate, getSessionsThisMonth } from "../../bll/reducers/reducerSession";
import { format } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'

const Sessions = (props) => {
    useEffect(() => {
        setTimeSessions()
    }, []);

    useEffect(() => {
        setTimeSessions()
    }, [props.match.params]);

    
    const [activeSort, setActiveSort] = useState(props.match.params.sessionsTime);

    const [addSessionModal, setAddSessionModal] = useState(false);
    const [deleteSessionModal, setDeleteSessionModal] = useState(false);

    const setTimeSessions = () => {
        setActiveSort(props.match.params.sessionsTime);
        switch (props.match.params.sessionsTime) {
            case "today":
                props.getSessionsThisDate(new Date());
                break;
            case "now":
                props.getSessionsThisMonth();
                break;
            case "date":
                
                break;
            default:
                break;
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();

    }

    const loadAddingModal = () => {
        // props.getScripts();
        setAddSessionModal(true);
    }

    const deleteCurrentPlays = () => {

    }

    let sessions = props.sessions.map((session) => <tr key={session.idSession}><td>{session.idSession}</td>
        <td>{session.playByPlayIdPlay.scriptByScriptIdScript.title}</td>
        <td>{format(new Date(session.date), "Pp", {
            locale: ruLocale
})}</td>
        <td>{session.hallNumber}</td>
        <td><Form.Check type="checkbox" sessionid={session.idSession} /></td></tr>)

    let scriptsOptions = props.scripts.map((script) => <option key={script.idScript} value={script.idScript}>{script.title}</option>)

    return (
        <>
            <div className="plays-container d-lg-grid d-md-flex d-sm-flex album overflow-hidden border bg-light rounded mx-auto h-100">
                <Nav variant="pills" className="bg-white border m-4 nav nav-pills p-3 rounded d-flex justify-content-between">
                    <div className="d-flex flex-column flex-lg-row mx-auto mx-lg-0">
                        <Nav.Item>
                            <NavLink to="/sessions/today" className={activeSort == "today" ? "me-3 nav-link active" : "me-3 nav-link"}>Сегодня</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink to="/sessions/now" className={activeSort == "now" ? "me-3 nav-link active" : "me-3 nav-link"}>В этом месяце</NavLink>
                        </Nav.Item>
                        {/* <Nav.Item >
                            <NavLink to="/plays/future" className={activeSort == "date" ? "me-3 nav-link active" : "me-3 nav-link"}>Скоро</NavLink>
                        </Nav.Item> */}
                    </div>
                    {props.authorization ? <div><Button variant="outline-secondary" onClick={loadAddingModal}>Создать сессию</Button> <Button
                        variant="outline-danger">Удалить</Button> </div> : null}
                </Nav>

                <div className="overflow-auto h-100 bg-white border m-4 p-3 rounded">
                    {props.sessions ? <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Сценарий</th>
                                <th>Время</th>
                                <th>Номер зала</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {sessions}
                        </tbody>
                    </Table> : null}

                </div>
            </div>


            <Modal show={addSessionModal} onHide={() => setAddSessionModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Создание представления</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex">
                    <form
                        onSubmit={onSubmit}
                        action="#"
                        className="w-75"
                    >
                        <Form.Select className="m-4 p-2" name="scriptId" onLoad={() => { alert("meow") }}>{scriptsOptions}</Form.Select>

                        <div className="login__form-element mb-2 ms-4">
                            <Button className="m-3 px-3" variant="dark" type="submit">Создать</Button>

                            <Button variant="secondary" onClick={() => setAddSessionModal(false)}>
                                Отмена
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={deleteSessionModal} onHide={() => setDeleteSessionModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Предупреждение</Modal.Title>
                </Modal.Header>
                <Modal.Body>Вы уверены, что хотите удалить выбранные пьесы?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={deleteCurrentPlays}>
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
    sessions: sessionGetters.getSessions(state),
    scripts: scriptGetters.getScripts(state)
});


export default compose(connect(mapStateToProps, {
    getSessionsThisMonth,
    getSessionsThisDate
}),
    withRouter)(Sessions);
