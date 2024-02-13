import React from "react";
import { userEndpoints } from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

function GetUser() {
    userEndpoints(ENDPOINTS.read).fetch('JohnDoe')
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export default function ReadUser() {
    const test = (e) => {
		e.preventDefault();
		GetUser();
	};	



    return (
        <div>
            <h1>User</h1>
            <button onClick={test}>
                TEST
            </button>
        </div>
    );
}
