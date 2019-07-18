import React from 'react';
import { withFormik, Form, Field } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import './MyForm.css';

function MyForm({ values, errors, touched, isSubmitting }) {
    console.log(isSubmitting);
    return(
        <Form>
            <div className="login-group">
                <label>Name</label> 
                {touched.name && errors.name && <p>{errors.name}</p>}
                <Field 
                    type='text' 
                    name='name' 
                    placeholder='Name' 
                    value={values.name}
                />
            </div>
            <div className="login-group">
                <label>Email</label>
                {touched.email && errors.email && <p>{errors.email}</p>}
                <Field 
                    type='email' 
                    name='email' 
                    placeholder='Email' 
                    value={values.email}
                />
            </div>
            <div className="login-group">
                <label>Password</label>
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field
                    autoComplete='off'
                    type='password' 
                    name='password' 
                    placeholder='Password' 
                    value={values.password}
                />
            </div>
            <div className='login-group'>
                <label>User Type</label>
                <Field 
                    component='select' 
                    name='role'
                >
                    <option value='Editor'>Editor</option>
                    <option value='Reviewer'>Reviewer</option>
                    <option value='Admin'>Admin</option>
                </Field>
            </div>
            <div className='login-group-2'>
                <label>Terms of Service</label>
                {isSubmitting && <p>Loading...</p>}
                <Field 
                    type='checkbox'
                    name='terms'
                    id='terms' 
                    checked={values.terms} 
                />
            </div>
            <div className='login-group'>
                <button
                    disabled={isSubmitting}
                    type='submit'
                >
                    Submit    
                </button>
            </div>
        </Form>
    );
}

export default withFormik({
    mapPropsToValue: ({name, password, email, terms, role}) => {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            terms: terms,
            role: role || 'Editor'
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required('Name is required.'),
        password: Yup.string()
            .min(8, 'Passwords must be 8-18 characters.')
            .max(18)
            .required('Password is required.'),
        email: Yup.string()
            .email()
            .required('Email is required.')
    }),

    handleSubmit(values, {resetForm, setErrors, setSubmitting}) {
        if (values.email === 'dummy@gmail.com') {
            setErrors({email: 'Email is already taken.'});
        } else {
            axios
                .post('https://reqres.in/api/users', values)
                .then(response => {
                console.log('URL', response);
                alert('Your registered email is: ' + response.data.email);
                resetForm();
                setSubmitting(false);
                })
                .catch(error => console.log(error))
        }
    }

})(MyForm);
