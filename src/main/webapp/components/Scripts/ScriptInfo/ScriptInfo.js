import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { compose } from "redux";
import { userGetters } from "../../../bll/reducers/reducerUser";
import { getScript, scriptGetters } from "../../../bll/reducers/reducerScript";

const ScriptInfo = (props) => {

    useEffect(() => {
        checkParams()
    }, [props.match.params]);

    const [emptyChose, setEmptyChose] = useState(true);


    const checkParams = () => {
        setEmptyChose(true)

        if (props.match.params.scriptId) {
            props.getScript(props.match.params.scriptId)
            setEmptyChose(false)
        }
    }

    let roles = props.script.rolesByIdScript.map((role) => <div key={role.idRole}>{role.roleName}</div>)

    return (
        <>
            <div className="h-100 w-100 bg-white">
                {!emptyChose ? props.script.title : null}
                {roles.length !== 0 ?
                    <div>
                        {roles}
                    </div> : null}
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    script: scriptGetters.getScript(state),
    authorization: userGetters.getAuthorization(state)
});

export default compose(connect(mapStateToProps, {
    getScript
}), withRouter)(ScriptInfo);
