import './LoginPage.scss';
import LoginForm from "../../features/LoginForm/LoginForm.tsx";
import {Link} from "react-router-dom";

const LoginPage = () => {
    return (
        <div className={'login-page'}>
            <h1 className={'login-page-title'}>Login</h1>
            <LoginForm />
            <div className={'login-page-footer'}>
                <p>Don't have an account? <Link to={'/register'}>Register here</Link></p>
            </div>
        </div>
    );
};

export default LoginPage;