import './RegisterPage.scss';
import RegisterForm from "../../features/RegisterForm/RegisterForm.tsx";
import {Link} from "react-router-dom";

const RegisterPage = () => {
    return (
        <div className={'register-page'}>
            <h1 className={'register-page-title'}>Register</h1>
            <RegisterForm />
            <div className={'register-page-footer'}>
                <p>Already have an account? <Link to={'/login'}>Login here</Link></p>
            </div>
        </div>
    );
};

export default RegisterPage;