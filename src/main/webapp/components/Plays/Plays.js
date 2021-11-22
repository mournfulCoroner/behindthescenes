import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import "./plays.css";
import { Button, Nav, Table, Form, Modal } from "react-bootstrap";
import { Link, NavLink, withRouter } from "react-router-dom";
import { userGetters } from "../../bll/reducers/reducerUser";
import { createPlay, deletePlay, getPlaysAfterThisMonth, getPlaysBeforeThisMonth, getPlaysThisMonth, playGetters } from "../../bll/reducers/reducerPlay";
import { getScripts, scriptGetters } from "../../bll/reducers/reducerScript";

import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TextField from '@mui/material/TextField';

const Plays = (props) => {
  useEffect(() => {
    setTimePlays()
  }, []);

  useEffect(() => {
    setTimePlays()
  }, [props.match.params]);

  const [activeSort, setActiveSort] = useState(props.match.params.playsTime);

  const [addPlayModal, setAddPlayModal] = useState(false);
  const [premierDate, setPremierDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [deletePlaysModal, setDeletePlaysModal] = useState(false);

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
    if (endDate && premierDate) {
      if (endDate >= premierDate) {
        if (premierDate.getMonth() > new Date().getMonth()) {
          props.history.push("/plays/future");
        }
        else if (endDate.getMonth() < new Date().getMonth()) {
          props.history.push("/plays/past");
        }
        else {
          props.history.push("/plays/now");
        }
        props.createPlay(props.authorization, premierDate, endDate, e.currentTarget.elements.scriptId.value)
        setAddPlayModal(false);
      }
      else {
        alert("Дата окончания раньше даты премьеры")
      }
    }
    else {
      alert("Остались незаполненные поля");
    }
  }

  const loadAddingModal = () => {
    // props.getScripts();
    setAddPlayModal(true);
  }

  const deleteCurrentPlays = () => {
    let checkers = document.querySelectorAll(".play-check");
    let ids = [];
    for (let checker of checkers) {
      checker.checked ? ids.push(checker.attributes.playid.value) : null
    }
    if (ids.length) {
      props.deletePlay(props.authorization, ids);
    }
    setDeletePlaysModal(false);
  }

  let plays = props.plays.map((play) => <tr key={play.idPlay}><td>{play.idPlay}</td>
    <td><Link className="text-black text-decoration-none" to={`/play/${play.idPlay}`}><div className="w-100"> {play.scriptByScriptIdScript.title}</div></Link></td>
    <td>{play.premierDate}</td>
    <td>{play.endDate}</td>
    <td><input type="checkbox" className="play-check form-check-input" playid={play.idPlay} /></td></tr>)

  let scriptsOptions = props.scripts.map((script) => <option key={script.idScript} value={script.idScript}>{script.title}</option>)

  return (
    <>
      <div className="d-flex flex-column d-md-flex d-sm-flex album overflow-hidden border bg-light rounded mx-auto h-100">
        <Nav variant="pills" className="align-items-center bg-white border m-4 nav nav-pills p-3 rounded d-flex flex-column flex-lg-row justify-content-between">
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
          {props.authorization ? <div className="d-flex d-lg-block flex-column"><Button variant="outline-secondary" className="mb-2 mb-lg-0" onClick={loadAddingModal}>Создать представление</Button> <Button
            onClick={() => setDeletePlaysModal(true)}
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
            className="align-items-center d-flex flex-column p-3 w-100 w-75"
          >
            <Form.Select className="m-4 p-3" name="scriptId" onLoad={() => { alert("meow") }}>{scriptsOptions}</Form.Select>

            <div className="mb-4 w-100 d-flex justify-content-center">
              <DesktopDatePicker
                label="Выберите дату премьеры"
                inputFormat="dd/MM/yyyy"
                value={premierDate}
                onChange={(newValue) => setPremierDate(newValue)}
                renderInput={(params) => <TextField className="w-100" {...params} />}
              /></div>

            <div className="w-100 d-flex justify-content-center">
              <DesktopDatePicker
                label="Выберите дату окончания показа"
                inputFormat="dd/MM/yyyy"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                renderInput={(params) => <TextField className="w-100" {...params} />}
              /></div>

            <div className="align-self-baseline login__form-element mt-3">
              <Button className="m-3 px-3" variant="dark" type="submit">Создать</Button>
              <Button className="px-3" variant="secondary" onClick={() => setAddPlayModal(false)}>
                Отмена
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={deletePlaysModal} onHide={() => setDeletePlaysModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Предупреждение</Modal.Title>
        </Modal.Header>
        <Modal.Body>Вы уверены, что хотите удалить выбранные пьесы?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={deleteCurrentPlays}>
            Да
          </Button>
          <Button variant="dark" onClick={() => setDeletePlaysModal(false)}>
            Отмена
          </Button>
        </Modal.Footer>
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
  getScripts,
  createPlay,
  deletePlay
}),
  withRouter)(Plays);
