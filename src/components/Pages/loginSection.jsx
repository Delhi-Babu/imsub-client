import {useFormik} from 'formik';
import {classNames} from 'primereact/utils';

import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Password} from 'primereact/password';

import {useSelector, useDispatch} from 'react-redux';

import {userLogin} from '../../redux/actions/authAction';

function LoginSection() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const msg = useSelector(state => state.error.msg);
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
      dispatch(userLogin(data));
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
        <div className='card p-shadow-5'>
          <h1 className='p-text-center'>Login</h1>
          {isAuthenticated ? (
            ''
          ) : (
            <h4 className='error p-text-center'>{msg}</h4>
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
