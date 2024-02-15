import React from 'react'
import { Route, BrowserRouter, Routes} from 'react-router-dom'
import Signup from '../components/signup'
import Login from '../components/login'
import Home from '../components/home'
import Admin from '../components/admin'
import {Protected} from '../utils/protected_route'

export const Router = () => {
  return(
  <div>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<Protected />}>
            <Route path="/home" element={<Home />} />
          </Route>

          <Route path="/admin" component={Admin} redirect="/login" />
      </Routes>
    </BrowserRouter>
  </div>
  )
}
