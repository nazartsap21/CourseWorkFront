import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import {AppDispatch} from "../../../store/store.config.ts";
import {useDispatch} from "react-redux";
import {checkAuth} from "../../../store/authSlice.ts";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        dispatch(checkAuth())
            .then((result) => {
                console.log(result);
                setIsAuthenticated(result.payload.data.isAuth);
            })
            .catch(() => {
                setIsAuthenticated(false);
            });


    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        localStorage.setItem('redirectAfterLogin', location.pathname + location.search);
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;