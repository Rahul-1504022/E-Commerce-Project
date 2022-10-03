import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./home/Home";
import Login from "./user/Login";
import Register from "./user/Register";
import Dashboard from "./user/Dashboard";
import PrivateRoute from "./protectedRoutes/PrivateRoute";
import AdminRoute from "./protectedRoutes/AdminRoute";
import AdminDashBoard from "./admin/AdminDashBoard";

const Main = () => {
    return (
        <Routes>
            <Route path="*" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
                path="/dashboard"
                element={(
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>)} />
            {/* use wrpper class to render dashboard conditionally */}
            <Route
                path="/admindashboard"
                element={(
                    <AdminRoute>
                        <AdminDashBoard />
                    </AdminRoute>)} />
        </Routes>
    )
}
export default Main;