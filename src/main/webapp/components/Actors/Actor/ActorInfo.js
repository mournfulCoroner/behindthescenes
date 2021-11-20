import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter, Link } from "react-router-dom";
import { compose } from "redux";
import { actorGetters, getRoles, removeRoles, deleteActor, getActor, createRole, deleteRole } from "../../../bll/reducers/reducerActor";
import { Button, Form, Modal, CloseButton, ListGroup } from "react-bootstrap"
import { userGetters } from "../../../bll/reducers/reducerUser";
import { getScripts, scriptGetters } from "../../../bll/reducers/reducerScript";


const ActorInfo = (props) => {

    useEffect(() => {
        checkParams();
        // props.getScripts();
    }, [props.match.params]);

    const [deleteActorRole, setdeleteActorRole] = useState(false);
    const [emptyChose, setEmptyChose] = useState(true);
    const [addRoleModal, setAddRoleModal] = useState(false)
    const [deleteRoleModal, setDeleteRoleModal] = useState(false);

    const [selectRoles, setSelectRoles] = useState(null);
    const [currentRoleId, setCurrentRoleId] = useState(0);


    const checkParams = () => {
        setEmptyChose(true)
        // props.removeRoles();

        if (props.match.params.actorId) {
            setEmptyChose(false)
            props.getActor(props.match.params.actorId)
            console.log(props.actor)
            props.getRoles(props.match.params.actorId)
        }
    }

    let scriptsOptions = props.scripts.map((script) => script.rolesByIdScript.length > 0 ?
        <option key={script.idScript} value={script.idScript}>{script.title}</option> :
        <option key={script.idScript} disabled value={script.idScript}>{script.title}</option>)


    const formAdding = () => {
        let firstScript = props.scripts.find((script) => script.rolesByIdScript.length > 0);
        setSelectRoles(firstScript.rolesByIdScript.map((role => {
            let check = props.roles.find((actorRole) => actorRole.idRole == role.idRole);
            let result = check ? <option key={role.idRole} disabled value={role.roleName}>{role.roleName}</option> :
                <option key={role.idRole} value={role.idRole}>{role.roleName}</option>
            return result;
        })))
        setAddRoleModal(true);
    }

    const setActorsOptions = (e) => {
        let currentScriptId = e.currentTarget.options[e.currentTarget.selectedIndex].value;
        let currentScript = props.scripts.find((script) => script.idScript == currentScriptId)
        setSelectRoles(currentScript.rolesByIdScript.map((role => {
            let check = props.roles.find((actorRole) => actorRole.idRole == role.idRole);
            let result = check ? <option key={role.idRole} disabled value={role.roleName}>{role.roleName}</option> :
                <option key={role.idRole} value={role.idRole}>{role.roleName}</option>
            return result;
        })))
    }


    const onSubmit = (e) => {
        e.preventDefault();
        const loginForm = e.currentTarget;
        if ( props.actor.idActor && loginForm.elements.roleId.value) {
            props.createRole(props.authorization,  props.actor.idActor, loginForm.elements.roleId.value)
        }

        setAddRoleModal(false);
    }


    const deleteActor = () => {
        if (props.actor.idActor) {
            props.deleteActor(props.authorization,  props.actor.idActor);
        }
        setdeleteActorRole(false)
        props.history.push("/actors")
    }

    const initialDeleteRole = (e) => {
        setCurrentRoleId(e.currentTarget.parentNode.getAttribute("role"));
        setDeleteRoleModal(true)
    }

    const deleteCurrentRole = () => {
        if(props.actor.idActor && currentRoleId){
            props.deleteRole(props.authorization, props.actor.idActor, currentRoleId)
        }
        setDeleteRoleModal(false);
    }

    let roles = props.roles.map((role) => <ListGroup.Item key={role.idRole} role={role.idRole} className="d-flex align-items-center justify-content-between">
        <Link className="text-black text-decoration-none" to={`/scripts/${role.idScript}`}><p className="fs-5 fw-light m-1 pb-1">
        {role.roleName}</p></Link>
        <CloseButton onClick={initialDeleteRole} className="p-0 mb-0 ms-2 fs-6" /></ListGroup.Item>)
    return (
        <>{!emptyChose ?
            <div className="h-100 w-100 bg-white">
                <div className="d-grid gap-1 me-4 ms-4 p-3 text-start">
                    <p className="fs-4 fw-bold fw-light ms-0 m-2">{props.actor ? props.actor.name : null}</p>
                    {props.roles.length !== 0 ?
                        <div>
                            <p className="fs-5 fw-light m-1">Роли:</p>
                            <div className="m-2 mb-4 text-start">
                                <ListGroup variant="flush">
                                    {roles}
                                </ListGroup>
                            </div> </div> : null}
                    {props.authorization ? <div><Button onClick={formAdding} variant="outline-secondary">Добавить роль</Button> <Button onClick={() => { setdeleteActorRole(true) }}
                        variant="outline-danger">Удалить актёра</Button> </div>: null}
                </div>
            </div> : null}

            <Modal show={deleteActorRole} onHide={() => setdeleteActorRole(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Предупреждение</Modal.Title>
                </Modal.Header>
                <Modal.Body>Вы уверены, что хотите стереть данного актёра из базы?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={deleteActor}>
                        Да
                    </Button>
                    <Button variant="dark" onClick={() => setdeleteActorRole(false)}>
                        Отмена
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={addRoleModal} onHide={() => setAddRoleModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавление роли</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex">
                    <form
                        onSubmit={onSubmit}
                        action="#"
                        className="w-75"
                    >
                        <Form.Select className="m-4 p-2" name="scriptId" onLoad={() => { alert("meow") }} onChange={setActorsOptions}>{scriptsOptions}</Form.Select>

                        <Form.Select className="m-4 p-2" name="roleId">{selectRoles}</Form.Select>

                        <div className="login__form-element mb-2 ms-4">
                            <Button className="m-3 px-3" variant="dark" type="submit">Создать</Button>

                            <Button variant="secondary" onClick={() => setAddRoleModal(false)}>
                                Отмена
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={deleteRoleModal} onHide={() => setDeleteRoleModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Предупреждение</Modal.Title>
                </Modal.Header>
                <Modal.Body>Вы уверены, что хотите лишить данного актёра роли?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={deleteCurrentRole}>
                        Да
                    </Button>
                    <Button variant="dark" onClick={() => setDeleteRoleModal(false)}>
                        Отмена
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const mapStateToProps = (state) => ({
    roles: actorGetters.getRoles(state),
    authorization: userGetters.getAuthorization(state),
    actor: actorGetters.getActor(state),
    scripts: scriptGetters.getScripts(state)
});

export default compose(connect(mapStateToProps, {
    getRoles,
    removeRoles,
    deleteActor,
    getActor,
    createRole,
    deleteRole,
    getScripts
}),
    withRouter)(ActorInfo);
