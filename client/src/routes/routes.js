import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Signup from '../components/pages/signupPage';
import Login from '../components/pages/loginPage';
import Home from '../components/pages/homePage';
import Admin from '../components/pages/adminPage';
import { Protected } from '../utils/protected_route';
import { UserType } from '../models/user';

const ADMIN = [UserType.ADMIN];
// eslint-disable-next-line no-unused-vars
const USER = [UserType.USER];
const NONE = [UserType.NONE];
const ALL = [UserType.ADMIN, UserType.USER];

export const Router = () => (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/home"
                    element={
                        <Protected allowedTypes={ALL}>
                            <Home />
                        </Protected>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <Protected allowedTypes={ADMIN}>
                            <Admin />
                        </Protected>
                    }
                />
            </Routes>
        </BrowserRouter>
    </div>
);
