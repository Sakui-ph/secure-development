import { isAuthenticated } from "./auth";
import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";

export const Protected = (redirect = '/login') => {
    const location = useLocation();
    const [user, setUser] = useState(false);

    console.log("Protected route")
    useEffect(() => {
        const checkIfAuthenticated = async () => {
            const user = await isAuthenticated();
            setUser(user);
        };
        checkIfAuthenticated();
    }, [location]);

    
    console.log(user)
    if (!user) {
        console.log("Redirecting")
        useNavigate(redirect);
    }
    
    return user ? <Outlet /> : <Navigate to={redirect} />;
};