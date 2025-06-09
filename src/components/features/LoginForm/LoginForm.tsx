import * as Yup from 'yup';
import './LoginForm.scss';
import {Field, Form, Formik} from "formik";
import {AppDispatch} from "../../../store/store.config.ts";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {login} from "../../../store/authSlice.ts";
// import {unwrapResult} from "@reduxjs/toolkit";


const LoginForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const checkoutSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Required')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    });

    const handleSubmit = async (values: {email: string, password: string}) => {
        try {
            await dispatch(login(values));
            // const result = unwrapResult(resultAction);

            const redirectAfterLogin = localStorage.getItem('redirectAfterLogin');
            if (redirectAfterLogin) {
                localStorage.removeItem('redirectAfterLogin');
                navigate(redirectAfterLogin);
                return;
            }
            navigate('/profile');
        } catch (error) {
            alert('Invalid email or password');
        }
    }

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={checkoutSchema}
            onSubmit={(values, {resetForm}) => {
                handleSubmit(values);
                resetForm();
            }}>
            {({errors, touched}) => (
                <Form className={'login-form'}>
                    <div className={'form-label'}>
                        <label htmlFor={'email'}>Email</label>
                        <Field name={'email'} type={'email'} placeholder={'Email'} />
                        {errors.email && touched.email && (
                            <div className={'error-message'}>{errors.email}</div>
                        )}
                    </div>
                    <div className={'form-label'}>
                        <label htmlFor={'password'}>Password</label>
                        <Field name={'password'} type={'password'} placeholder={'Password'} />
                        {errors.password && touched.password && (
                            <div className={'error-message'}>{errors.password}</div>
                        )}
                    </div>
                    <button type={'submit'} className={'submit-button'}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>

    );
};

export default LoginForm;