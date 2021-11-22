import React, { useEffect, useState } from "react";
import { scriptGetters, getScripts } from "../../bll/reducers/reducerScript";
import { connect } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { userGetters } from "../../bll/reducers/reducerUser";
import ScriptInfo from "./ScriptInfo/ScriptInfo"

const Scripts = (props) => {

    useEffect(() => {
        // props.getScripts();
    }, []);

    let scripts = props.scripts.map((script) => <NavLink to={`/scripts/${script.idScript}`}
        className="border-end shadow-sm list-group-item list-group-item-action py-3 lh-tight" key={script.idScript}>{script.title}</NavLink>)
    return (
        <>
            <div className="album d-block overflow-hidden border bg-light rounded mx-auto h-100">
                <Row style={{ height: "100%" }}>
                    <Col xs={4} className="pe-0 overflow-auto">
                        <div className="actors-container d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                            <div className="overflow-auto list-group list-group-flush border-bottom scrollarea">
                                {scripts}
                            </div>
                        </div></Col>
                    <Col xs={8} className="ps-0">
                        <ScriptInfo />
                    </Col>
                </Row>
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    scripts: scriptGetters.getScripts(state),
    authorization: userGetters.getAuthorization(state)
});

export default connect(mapStateToProps, {
    getScripts
})(Scripts);
