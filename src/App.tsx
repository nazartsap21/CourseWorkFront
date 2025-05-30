import './App.css'
import {Route, Routes} from "react-router-dom";
import Layout from "./components/layouts/Layouts.tsx";
import HomePage from "./components/pages/HomePage/HomePage.tsx";
import LoginPage from "./components/pages/LoginPage/LoginPage.tsx";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage.tsx";
import ErrorPage from "./components/pages/ErrorPage/ErrorPage.tsx";
import RegisterPage from "./components/pages/RegisterPage/RegisterPage.tsx";
import ProtectedRoute from "./components/entities/ProtectedRoute/ProtectedRoute.tsx";

function App() {

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
                path={'profile'}
                element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
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
