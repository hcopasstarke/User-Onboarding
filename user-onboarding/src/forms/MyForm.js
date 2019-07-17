import React from 'react';
import { withFormik, Form, Field } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

function MyForm({ values, errors, touched, isSubmitting }) {
    console.log(isSubmitting);
    return(
        <Form>
            <div>
                <label>Name</label>
                {touched.name && errors.name && <p>{errors.name}</p>}
                <Field type='text' name='name' placeholder='Name' />
            </div>
            <div>
                <label>Email</label>
                {touched.email && errors.email && <p>{errors.email}</p>}
                <Field type='email' name='email' placeholder='Email' />
            </div>
            <div>
                <label>Password</label>
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field type='password' name='password' placeholder='Password' />
            </div>
            <div>
                <label>Terms of Service</label>
                <Field type='checkbox' name='terms' placeholder='Terms of Service' />
            </div>
            <button>Submit</button>
        </Form>
    );
}

export default withFormik({
    mapPropsToValue: () => {
        return {
            name: '',
            email: '',
            password: '',
            checkbox: ''
        };
    },

    handleSubmit: (values) => {
        console.log(values);
        const url = 'https://reqres.in/api/users';

        axios
        .post(url, values)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    },

    validationSchema: Yup.object().shape({
        name: Yup.string()
            .min(3, 'Name must be at least 3 characters long')
            .max(12, 'Name must be less than 12 characters')
            .required('Name is required'),
        password: Yup.string()
            .min(8)
            .max(18)
            .required('Password is required'),
        email: Yup.string()
            .min(10)
            .max(25)
            .required('Email is required')
    })
})(MyForm);
