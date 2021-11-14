import React from "react";
import "./Actors.css";
import { NavLink } from "react-router-dom";

const ActorElement = (props) => {

    return (
        <>
            <NavLink className="shadow-sm rounded list-group-item list-group-item-action py-3 lh-tight" to="`/actors/${props.id}`">{props.name}</NavLink>
        </>
    );
}

export default ActorElement;
