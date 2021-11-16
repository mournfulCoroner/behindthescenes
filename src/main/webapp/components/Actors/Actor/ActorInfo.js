import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { compose } from "redux";
import { actorGetters, getRoles, removeRoles, deleteActor, getActor } from "../../../bll/reducers/reducerActor";
import { Button, Modal } from "react-bootstrap"
import { userGetters } from "../../../bll/reducers/reducerUser";

const ActorInfo = (props) => {

    useEffect(() => {
        checkParams()
    }, [props.match.params]);

    const [deleteModal, setDeleteModal] = useState(false);
    const [emptyChose, setEmptyChose] = useState(true);


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
    

    const deleteActor = () => {
        if (props.match.params.actorId) {
            props.deleteActor(props.authorization, props.match.params.actorId);
        }
        setDeleteModal(false)
        props.history.push("/actors")
    }

    let roles = props.roles.map((role) => <div key={role.idRole}>{role.roleName}</div>)
    return (
        <>
        <div className="h-100 w-100 bg-white">
            {!emptyChose && props.actor ? props.actor.name : null}
            {props.roles.length !== 0 ?
                <div>
                    {roles}
                </div> : null}
            {!emptyChose && props.authorization ? <Button onClick={() => { setDeleteModal(true) }} variant="outline-danger">Удалить актёра</Button> :null
            }

        </div>

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
    authorization: userGetters.getAuthorization(state),
    actor: actorGetters.getActor(state)
});

export default compose(connect(mapStateToProps, {
    getRoles,
    removeRoles,
    deleteActor,
    getActor
}),
    withRouter)(ActorInfo);
