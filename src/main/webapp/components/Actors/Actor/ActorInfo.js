import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { compose } from "redux";
import { actorGetters, getRoles } from "../../../bll/reducers/reducerActor";

const ActorInfo = (props) => {

    useEffect(() => {
        checkParams()
    }, [ props.match.params]);

    const checkParams = () => {
        props.getRoles(props.match.params.actorId)

    }

    let roles = props.roles.map((role) => <div key={role.idRole}>{role.roleName}</div>)
    return (
        <>
        {roles ? roles : null}
        </>
    );
}

const mapStateToProps = (state) => ({
    roles: actorGetters.getRoles(state)
});

export default compose(connect(mapStateToProps, {
        getRoles
    }),
    withRouter)(ActorInfo);
