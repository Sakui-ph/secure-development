import React from "react";
import { userEndpoints } from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

function Read() {
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
		Read();
	};	

    return (
        <div>
            <h1>User</h1>
            <button onClick={test}>
                GET USER TEST
            </button>
        </div>
    );
}
