import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./ScriptInfo.css"
import { compose } from "redux";
import { userGetters } from "../../../bll/reducers/reducerUser";
import { getScript, scriptGetters, getReplics } from "../../../bll/reducers/reducerScript";
import { Tabs, Tab } from "react-bootstrap";

const ScriptInfo = (props) => {

    useEffect(() => {
        checkParams()
    }, [props.match.params]);

    const [emptyChose, setEmptyChose] = useState(true);
    const [activeTab, setActiveTab] = useState("info")


    const checkParams = () => {
        setEmptyChose(true)

        if (props.match.params.scriptId) {
            props.getScript(props.match.params.scriptId)
            props.getReplics(props.match.params.scriptId)
            setEmptyChose(false)
        }
    }

    let roles = props.script.rolesByIdScript.map((role) => <li className="fs-5 fw-light m-1" key={role.idRole}>{role.roleName}</li>)
    let replics = props.replics.map((replic) =>
        <div className="replic-bubble m-1 ms-2 ps-4 py-2 rounded" key={replic.replicNumber}>
            <p className="fw-bold m-0">{replic.roleByRoleIdRole.roleName}</p>
            <p className="m-0 py-2">{replic.text}</p>
            <hr className="m-0" /></div>)

    return (
        <>
            <div className="h-100 w-100 bg-white">

                {!emptyChose ?
                    <Tabs
                        id="script-tab"
                        activeKey={activeTab}
                        onSelect={(k) => setActiveTab(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="info" title="Инфо">
                            <div className="d-grid gap-1 me-4 ms-4 p-3 text-start">
                                <p className="fs-4 fw-bold fw-light ms-0 m-2">{props.script.title}</p>
                                <p className="fs-5 fw-light m-1">Автор: {props.script.author}</p>
                                <p className="fs-5 fw-light m-1">Статус: {props.script.inUse ? "используется" : "не используется"}</p>
                                <p className="fs-5 fw-light m-1">Количество ролей: {props.script.rolesAmount}</p></div>
                        </Tab>
                        <Tab eventKey="roles" title="Роли">
                            {roles.length !== 0 ? <ul className="m-2 mt-5 text-start">
                                {roles}
                            </ul> : null}
                        </Tab>
                        <Tab eventKey="script" title="Сценарий">
                            {replics.length !== 0 ? <div className="ms-4 text-start">
                                {replics}
                            </div> : null}
                        </Tab>
                    </Tabs> : null}
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    script: scriptGetters.getScript(state),
    authorization: userGetters.getAuthorization(state),
    replics: scriptGetters.getReplics(state)
});

export default compose(connect(mapStateToProps, {
    getScript,
    getReplics
}), withRouter)(ScriptInfo);
