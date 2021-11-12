import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { actorGetters, getActors, setActors } from "../../bll/reducers/reducerActor";
import { connect } from "react-redux";

const Actors = (props) => {
    useEffect(() => {
        props.setDataActors();
    }, []);

    let actors = props.actors.map((actor) => <div key={actor.actorId}>{actor.name}</div>)

    return (
        <>
           <div>
                {actors}
           </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    actors: actorGetters.getActors(state)
});

const mapDispatchToProps = (dispatch) => ({
    setDataActors() {
        dispatch(getActors());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Actors);
