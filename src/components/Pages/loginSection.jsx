import {useFormik} from 'formik';
import {classNames} from 'primereact/utils';

import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Password} from 'primereact/password';

import {useState} from 'react';

const axios = require('axios');
axios.defaults.withCredentials = true;

const host = 'http://localhost:5000';
const version = 'v1';
const url = `${host}/api/${version}/auth/login`;

function LoginSection() {
  const [status, setStatus] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: data => {
      let errors = {};

      if (!data.email) {
        errors.email = 'Email is required.';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email = 'Invalid email address. E.g. example@email.com';
      }

      if (!data.password) {
        errors.password = 'Password is required.';
      }

      return errors;
    },
    onSubmit: data => {
      axios
        .post(url, data, {withCredentials: true})
        .then(function (response) {
          console.log('see the cookie section');
          // const loginData = useContext(UserContext)
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            setStatus(true);
          }
        });
    },
  });

  const isFormFieldValid = name =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = name => {
    return (
      isFormFieldValid(name) && (
        <small className='p-error'>{formik.errors[name]}</small>
      )
    );
  };

  return (
    <div className='center-box'>
      <div className='form p-d-flex p-jc-center'>
        <div className='card p-shadow-4'>
          <h1 className='p-text-center'>Login</h1>
          {status ? (
            <h4 className='error p-text-center'>Invalid credentials</h4>
          ) : (
            ''
          )}
          <form onSubmit={formik.handleSubmit} className='p-fluid'>
            <div className='p-field'>
              <span className='p-float-label p-input-icon-right'>
                <i className='pi pi-envelope' />
                <InputText
                  id='email'
                  name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className={classNames({
                    'p-invalid': isFormFieldValid('email'),
                  })}
                />
                <label
                  htmlFor='email'
                  className={classNames({
                    'p-error': isFormFieldValid('email'),
                  })}>
                  Email*
                </label>
              </span>
              {getFormErrorMessage('email')}
            </div>
            <div className='p-field'>
              <span className='p-float-label'>
                <Password
                  id='password'
                  name='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  toggleMask
                  feedback={false}
                  className={classNames({
                    'p-invalid': isFormFieldValid('password'),
                  })}
                />
                <label
                  htmlFor='password'
                  className={classNames({
                    'p-error': isFormFieldValid('password'),
                  })}>
                  Password*
                </label>
              </span>
              {getFormErrorMessage('password')}
            </div>
            <Button type='submit' label='Submit' className='p-mt-2' />
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginSection;
