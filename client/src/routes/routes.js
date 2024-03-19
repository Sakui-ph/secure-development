import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Signup from '../components/pages/signupPage';
import Login from '../components/pages/loginPage';
import Home from '../components/pages/homePage';
import Admin from '../components/pages/adminPage';
import { Protected } from '../utils/protected_route';
import { UserType } from '../models/user';
import Inquiries from '../components/pages/inquiriesPage';
import ReservationForm from '../components/pages/roomReservationPage';
import AmenitiesReservationForm from '../components/pages/amenitiesReservationPage';
import ViewReservations from '../components/pages/viewReservationPage';
import Feedback from '../components/pages/shareFeedback';
import AdminAnnouncement from '../components/pages/adminAnnouncment';
import AdminReply from '../components/pages/adminReply';
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

                    <Route path="/inquiries" element={<Inquiries />} />
                    <Route path="/reply" element={<AdminReply />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route
                        path="/roomreservation"
                        element={<ReservationForm />}
                    />
                    <Route
                        path="/viewreservations"
                        element={<ViewReservations />}
                    />
                    <Route
                        path="/amenitiesreservation"
                        element={<AmenitiesReservationForm />}
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
