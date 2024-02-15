/* eslint-disable react/prop-types */
import { isAuthenticated } from "./auth";
import React, { useEffect, useState } from "react";
import {  Navigate } from "react-router-dom";

// REFACTOR LATER

export const Protected = ({children}, admin = false) => {
    const [isUser, setIsUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    console.log("Protected")
    useEffect(() => {
        setIsLoading(true);
        async function checkIfAuthenticated() {
            const user = await isAuthenticated(admin)
                if (user) {
                    setIsUser(true);
                }
                else {
                    setIsUser(false);
                }
                console.log(`Is user: ${isUser}`)
                setIsLoading(false);
      
            
        }
        
        checkIfAuthenticated();
    }, []);

    console.log(`Is loading ${isLoading}`)
    
    if (isLoading || isUser === null) {
        return <h1>Loading...</h1>
    }

    if (isUser) {
        console.log("loading children")
        return children
    }
    else {
        console.log("navigating to login")
        return <Navigate to="/login" replace />
    }
};
