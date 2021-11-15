import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { compose } from "redux";
import { actorGetters, getRoles, removeRoles, deleteActor } from "../../../bll/reducers/reducerActor";
import { Button, Modal } from "react-bootstrap"
import { userGetters } from "../../../bll/reducers/reducerUser";

const ActorInfo = (props) => {

    useEffect(() => {
        checkParams()
    }, [ props.match.params]);

    const [deleteModal, setDeleteModal] = useState(false);
    const [emptyChose, setEmptyChose] = useState(true);


    const checkParams = () => {
        setEmptyChose(true)
        props.removeRoles();

        if(props.match.params.actorId){
            props.getRoles(props.match.params.actorId)
            setEmptyChose(false)
        }
    }

    const deleteActor = () => {
        if(props.match.params.actorId){
            props.deleteActor(props.authorization, props.match.params.actorId);
        }
        setDeleteModal(false)
        props.history.push("/actors")
    }

    let roles = props.roles.map((role) => <div key={role.idRole}>{role.roleName}</div>)
    return (
        <>
        {props.roles.length !== 0 ? 
        <div>
            {roles}
        </div> : null}
        { !emptyChose && props.authorization ? <Button onClick={() => {setDeleteModal(true)}} variant="outline-danger">Удалить актёра</Button> : null }

        <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Предупреждение</Modal.Title>
            </Modal.Header>
            <Modal.Body>Вы уверены, что хотите стереть данного актёра из базы?</Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={deleteActor}>
                Да
            </Button>
            <Button variant="secondary" onClick={() => setDeleteModal(false)}>
                Отмена
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

const mapStateToProps = (state) => ({
    roles: actorGetters.getRoles(state),
    authorization: userGetters.getAuthorization(state)
});

export default compose(connect(mapStateToProps, {
        getRoles,
        removeRoles,
        deleteActor
    }),
    withRouter)(ActorInfo);
