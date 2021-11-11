import React from "react";
import { withRouter} from "react-router-dom";
import "./Home.css";

const Home = (props) => {
    let tags = props.match.params.tags;
    tags = tags && tags.split("+");

    console.log("TAGS", tags);

    return (
        <>
            <div>Home</div>
        </>
    );
}

export default withRouter(Home);
