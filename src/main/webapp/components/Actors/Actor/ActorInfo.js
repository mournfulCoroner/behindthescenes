import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { compose } from "redux";
import { actorGetters, getRoles, removeRoles, deleteActor, getActor, createRole, deleteRole } from "../../../bll/reducers/reducerActor";
import { Button, Form, Modal } from "react-bootstrap"
import { userGetters } from "../../../bll/reducers/reducerUser";
import { getScripts, scriptGetters } from "../../../bll/reducers/reducerScript";

const ActorInfo = (props) => {

    useEffect(() => {
        checkParams()
    }, [props.match.params]);

    const [deleteActorRole, setdeleteActorRole] = useState(false);
    const [emptyChose, setEmptyChose] = useState(true);
    const [addRoleModal, setAddRoleModal] = useState(false)
    const [deleteRoleModal, setDeleteRoleModal] = useState(false);


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
    <option key={script.idScript} value={script.title}>{script.title}</option> :
    <option key={script.idScript} disabled value={script.title}>{script.title}</option>), rolesOptions = null;
    const formAdding = () => {
        props.getScripts();
    //     scriptsOptions = props.scripts.map((script) => props.scripts.rolesByIdScript.length > 0 ?
    // <option key={script.scriptId} value={script.title}>{script.title}</option> :
    // <option key={script.scriptId} disabled value={script.title}>{script.title}</option>)
        setAddRoleModal(true);
        // rolesOptions = props.scripts.rolesByIdScript.map((role) => {
        //     let check = props.roles.find((actorRole) => actorRole.roleId == role.roleId ? true : false);
        //     if(check){
        //         return <option key={role.roleId} disabled value={role.roleName}>{role.roleName}</option>
        //     }
        //     else{
        //         return <option key={role.roleId} value={role.roleName}>{role.roleName}</option>
        //     }
        // })
    }


    const onSubmit = () => {
        alert("yup")
    }
    

    const deleteActor = () => {
        if (props.match.params.actorId) {
            props.deleteActor(props.authorization, props.match.params.actorId);
        }
        setdeleteActorRole(false)
        props.history.push("/actors")
    }

    let roles = props.roles.map((role) => <div key={role.idRole}>{role.roleName}</div>)
    return (
        <>{!emptyChose ?
        <div className="h-100 w-100 bg-white">
            {props.actor ? props.actor.name : null}
            {props.roles.length !== 0 ?
                <div>
                    {roles}
                </div> : null}
            {props.authorization ? <Button onClick={() => { setdeleteActorRole(true) }}
             variant="outline-danger">Удалить актёра</Button> :null}
             {props.authorization ? <Button onClick={formAdding} variant="outline-secondary">Добавить роль</Button> : null}
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
                <Modal.Body> 
                    <form
                        onSubmit={onSubmit}
                        action="#"
                    >
                        <Form.Select>{scriptsOptions}</Form.Select>

                        <Form.Select>{rolesOptions}</Form.Select>

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
