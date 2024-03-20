import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Signup from '../components/pages/signupPage';
import Login from '../components/pages/loginPage';
import Home from '../components/pages/homePage';
import Admin from '../components/pages/adminPage';
import { Protected } from '../utils/protected_route';
import { UserType } from '../models/user';
import ReservationForm from '../components/pages/roomReservationPage';
import ViewReservations from '../components/pages/viewReservationPage';
import AdminAnnouncement from '../components/pages/adminAnnouncment';
import ViewAnnouncement from '../components/pages/clientAnnouncement';
import { SessionProvider } from '../utils/session_timeout';

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
                <Route element={<SessionProvider />}>
                    <Route
                        path="/home"
                        element={
                            <Protected allowedTypes={ALL}>
                                <Home />
                            </Protected>
                        }
                    />
                    <Route
                        path="/roomreservation"
                        element={
                            <Protected allowedTypes={ALL}>
                                <ReservationForm />
                            </Protected>
                        }
                    />
                    <Route
                        path="/viewreservations"
                        element={
                            <Protected allowedTypes={ALL}>
                                <ViewReservations />
                            </Protected>
                        }
                    />
                    <Route
                        path="/viewannouncement"
                        element={
                            /* <Protected allowedTypes={ALL}>
                                <ViewAnnouncement />
                            </Protected> */
                            <ViewAnnouncement />
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
                    <Route
                        path="/announcement"
                        element={<AdminAnnouncement />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
);
