import React from "react";
import { userEndpoints } from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

function Create() {
    userEndpoints(ENDPOINTS.create).post({
            first_name: "Ethan Jared",
            last_name: "Saquilayan",
            email: "throwaway@gmail.com",
            password: "KLFJiof98jfd", // hash this
            phone_number: "09950135422",
            profile_picture: "This is a picture of me",
        }
    )
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export default function CreateUser() {
    const test = (e) => {
		e.preventDefault();
		Create();
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
