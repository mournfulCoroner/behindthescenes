import React, {useEffect, useState} from "react";
import { useParams } from "react-router";
import apiUser from "../../api/apiUser";

import "./UserProfile.css";

function UserProfile() {
    // даннные о польователе
    const { nickname } = useParams();

    useEffect(() => {
    }, []);

    return (
        <div>
            <div>
                <div>{nickname}</div>
            </div>
        </div>
    )
}

export default UserProfile;
