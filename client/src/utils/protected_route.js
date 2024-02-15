/* eslint-disable react/prop-types */
import { isAuthenticated } from "./auth";
import React, { useEffect, useState } from "react";
import {  Navigate } from "react-router-dom";

// REFACTOR LATER

export const Protected = ({children, allowedTypes, redirect = "/login"}) => {
    const [isUser, setIsUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const redir = redirect;

    useEffect(() => {
        setIsLoading(true);
        async function checkIfAuthenticated() {
            const user = await isAuthenticated(allowedTypes)
                if (user) {
                    setIsUser(true);
                }
                else {
                    setIsUser(false);
                }
                setIsLoading(false);
        }
        checkIfAuthenticated();
    }, []);

    
    if (isLoading || isUser === null) {
        return <h1>Loading...</h1>
    }

    if (isUser) {
        return children
    }
    else if (!isUser) {
        return <Navigate to={redir} replace />
    }
};
