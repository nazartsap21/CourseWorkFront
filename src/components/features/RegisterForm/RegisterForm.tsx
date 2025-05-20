import './RegisterForm.scss';

import * as Yup from 'yup';
import {Field, Form, Formik} from "formik";
import {login} from "../../../store/authSlice.ts";
import AuthService from "../../../services/AuthService.ts";
import {AppDispatch} from "../../../store/store.config.ts";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const RegisterForm = () => {
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
        firstName:  Yup.string()
            .required('Required'),
        lastName: Yup.string()
            .required('Required'),
    });

    const handleSubmit = (values: {email: string, password: string, firstName: string, lastName: string}) => {
        AuthService.register(values.email, values.password, values.firstName, values.lastName).then(async () => {
            await dispatch(login(values));
            navigate('/profile');
        })
    }

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                firstName: '',
                lastName: ''
            }}
            validationSchema={checkoutSchema}
            onSubmit={(values, {resetForm}) => {
                handleSubmit(values);
                resetForm();
            }}>
            {({errors, touched}) => (
                <Form className={'register-form'}>
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
                    <div className={'form-label'}>
                        <label htmlFor={'firstName'}>First Name</label>
                        <Field name={'firstName'} type={'text'} placeholder={'First Name'} />
                        {errors.firstName && touched.firstName && (
                            <div className={'error-message'}>{errors.firstName}</div>
                        )}
                    </div>
                    <div className={'form-label'}>
                        <label htmlFor={'lastName'}>Last Name</label>
                        <Field name={'lastName'} type={'text'} placeholder={'Last Name'} />
                        {errors.lastName && touched.lastName && (
                            <div className={'error-message'}>{errors.lastName}</div>
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

export default RegisterForm;