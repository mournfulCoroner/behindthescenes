import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import "./plays.css";
import { Button, Nav, Table, Form, Modal } from "react-bootstrap";
import { NavLink, withRouter } from "react-router-dom";
import { userGetters } from "../../bll/reducers/reducerUser";
import { getPlaysAfterThisMonth, getPlaysBeforeThisMonth, getPlaysThisMonth, playGetters } from "../../bll/reducers/reducerPlay";
import { getScripts, scriptGetters } from "../../bll/reducers/reducerScript";

const Plays = (props) => {
  useEffect(() => {
    setTimePlays()
  }, []);

  useEffect(() => {
    setTimePlays()
  }, [props.match.params]);

  const [activeSort, setActiveSort] = useState(props.match.params.playsTime);

  const [addPlayModal, setAddPlayModal] = useState(false);

  const setTimePlays = () => {
    setActiveSort(props.match.params.playsTime);
    switch (props.match.params.playsTime) {
      case "now":
        props.getPlaysThisMonth();
        break;
      case "past":
        props.getPlaysBeforeThisMonth();
        break;
      case "future":
        props.getPlaysAfterThisMonth();
        break;
      default:
        break;
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();

  }

  const loadAddingModal = () => {
    props.getScripts();
    setAddPlayModal(true);
  }

  let plays = props.plays.map((play) => <tr key={play.idPlay}><td>{play.idPlay}</td>
  <td>{play.scriptByScriptIdScript.title}</td>
  <td>{play.premierDate}</td>
  <td>{play.endDate}</td>
  <td><Form.Check type="checkbox" playid={play.idPlay} /></td></tr>) 

  let scriptsOptions = props.scripts.map((script) => <option key={script.idScript} value={script.idScript}>{script.title}</option>)

  return (
    <>
      <div className="plays-container d-lg-grid d-md-flex d-sm-flex album overflow-hidden border bg-light rounded mx-auto h-100">
        <Nav variant="pills" className="bg-white border m-4 nav nav-pills p-3 rounded d-flex justify-content-between">
          <div className="d-flex flex-column flex-lg-row mx-auto mx-lg-0">
            <Nav.Item>
              <NavLink to="/plays/past" className={activeSort == "past" ? "me-3 nav-link active" : "me-3 nav-link"}>Прошедшие</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/plays/now" className={activeSort == "now" ? "me-3 nav-link active" : "me-3 nav-link"}>Сейчас в показе</NavLink>
            </Nav.Item>
            <Nav.Item >
              <NavLink to="/plays/future" className={activeSort == "future" ? "me-3 nav-link active" : "me-3 nav-link"}>Скоро</NavLink>
            </Nav.Item>
          </div>
          {props.authorization ? <div><Button variant="outline-secondary" onClick={loadAddingModal}>Создать представление</Button> <Button
            variant="outline-danger">Удалить</Button> </div> : null}
        </Nav>

        <div className="overflow-auto h-100 bg-white border m-4 p-3 rounded">
          {props.plays ? <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Сценарий</th>
                <th>Дата премьеры</th>
                <th>Дата окончания показа</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {plays}
            </tbody>
          </Table> : null}

        </div>
      </div>


      <Modal show={addPlayModal} onHide={() => setAddPlayModal(false)}>
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

              <Button variant="secondary" onClick={() => setAddPlayModal(false)}>
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
  authorization: userGetters.getAuthorization(state),
  plays: playGetters.getPlays(state),
  scripts: scriptGetters.getScripts(state)
});


export default compose(connect(mapStateToProps, {
  getPlaysThisMonth,
  getPlaysBeforeThisMonth,
  getPlaysAfterThisMonth,
  getScripts
}),
  withRouter)(Plays);
