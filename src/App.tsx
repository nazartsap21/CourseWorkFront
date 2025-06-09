import './App.css'
import {Route, Routes} from "react-router-dom";
import Layout from "./components/layouts/Layouts.tsx";
import HomePage from "./components/pages/HomePage/HomePage.tsx";
import LoginPage from "./components/pages/LoginPage/LoginPage.tsx";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage.tsx";
import ErrorPage from "./components/pages/ErrorPage/ErrorPage.tsx";
import RegisterPage from "./components/pages/RegisterPage/RegisterPage.tsx";
import ProtectedRoute from "./components/entities/ProtectedRoute/ProtectedRoute.tsx";
import DevicePage from "./components/pages/DevicePage/DevicePage.tsx";
import QRCodeHandlePage from "./components/pages/QRCodeHandlePage/QRCodeHandlePage.tsx";
import { useEffect } from 'react';
import { checkAuth } from './store/authSlice.ts';
import {useDispatch} from "react-redux";
import {AppDispatch} from "./store/store.config.ts";

function App() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
      dispatch(checkAuth());
    }, [dispatch]);
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route
                    index
                    element={<HomePage />}
                />
                <Route
                    path={'login'}
                    element={<LoginPage />}
                />
                <Route
                    path={'register'}
                    element={<RegisterPage />}
                />
                <Route
                    path={'/add-device/:deviceId'}
                    element={<ProtectedRoute><QRCodeHandlePage /></ProtectedRoute>}
                />
                <Route
                    path={'profile'}
                    element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
                />
                <Route
                    path={'/profile/device/:id'}
                    element={<ProtectedRoute><DevicePage /></ProtectedRoute>}
                />
            </Route>
            <Route
                path={'*'}
                element={<ErrorPage />}
            />
        </Routes>
    )
}

export default App
