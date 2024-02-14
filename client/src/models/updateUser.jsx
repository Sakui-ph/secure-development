import React from "react";
import { userEndpoints } from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

function Update() {
    userEndpoints(ENDPOINTS.patch).patch({
        first_name: "Naruto",
        last_name: "Sasuke",
        email: "throwaway@gmail.com",
        password: "KLFJiof98jfd", // hash this
        phone_number: "09992322323",
        profile_picture: "This is a picture of me",
    })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export default function UpdateUser() {
    const test = (e) => {
		e.preventDefault();
		Update();
	};	



    return (
        <div>
            <h1>User</h1>
            <button onClick={test}>
                UPDATE USER TEST
            </button>
        </div>
    );
}
