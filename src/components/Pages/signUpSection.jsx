import React from 'react';
import {useFormik} from 'formik';
import {classNames} from 'primereact/utils';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Password} from 'primereact/password';
import {Divider} from 'primereact/divider';
import {userRegister} from '../../redux/actions/authAction';
import {useDispatch} from 'react-redux';

function SignUpSection() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      secondName: '',
      companyName: '',
      email: '',
      password: '',
      confirmPassword: '',
      gst: '',
    },
    validate: data => {
      let errors = {};

      if (!data.firstName) {
        errors.firstName = 'First name is required.';
      }
      if (!data.secondName) {
        errors.secondName = 'Second name is required.';
      }

      if (!data.companyName) {
        errors.companyName = 'company Name is required.';
      }
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
      if (!data.confirmPassword) {
        errors.confirmPassword = 'Confirm Password is required.';
      }
      if (data.password !== data.confirmPassword) {
        errors.confirmPassword = 'Password is not matched';
        data.confirmPassword = '';
      }

      if (!data.gst) {
        errors.gst = 'GST-IN is required.';
      } else if (
        !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i.test(
          data.gst
        )
      ) {
        errors.gst = 'Invlaid GST number';
        data.gst = '';
      }

      return errors;
    },
    onSubmit: data => {
      dispatch(userRegister(data));
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

  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className='p-mt-2'>Suggestions</p>
      <ul className='p-pl-2 p-ml-2 p-mt-0' style={{lineHeight: '1.5'}}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );
  return (
    <div className='center-box signUp'>
      <div className='form p-d-flex p-jc-center'>
        <div className='card p-shadow-5'>
          <h1 className='p-text-center'>Sign Up</h1>
          <form onSubmit={formik.handleSubmit} className='p-fluid'>
            <div className='p-field'>
              <span className='p-float-label p-input-icon-right'>
                <i className='pi pi-user' />
                <InputText
                  id='firstName'
                  name='firstName'
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  className={classNames({
                    'p-invalid': isFormFieldValid('firstName'),
                  })}
                />
                <label
                  htmlFor='firstName'
                  className={classNames({
                    'p-error': isFormFieldValid('firstName'),
                  })}>
                  First Name*
                </label>
              </span>
              {getFormErrorMessage('firstName')}
            </div>

            <div className='p-field'>
              <span className='p-float-label p-input-icon-right'>
                <i className='pi pi-user' />
                <InputText
                  id='secondName'
                  name='secondName'
                  value={formik.values.secondName}
                  onChange={formik.handleChange}
                  className={classNames({
                    'p-invalid': isFormFieldValid('secondName'),
                  })}
                />
                <label
                  htmlFor='secondName'
                  className={classNames({
                    'p-error': isFormFieldValid('secondName'),
                  })}>
                  Second Name*
                </label>
              </span>
              {getFormErrorMessage('secondName')}
            </div>

            <div className='p-field'>
              <span className='p-float-label p-input-icon-right'>
                <i className='pi pi-user' />
                <InputText
                  id='companyName'
                  name='companyName'
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  className={classNames({
                    'p-invalid': isFormFieldValid('companyName'),
                  })}
                />
                <label
                  htmlFor='companyName'
                  className={classNames({
                    'p-error': isFormFieldValid('companyName'),
                  })}>
                  Company Name*
                </label>
              </span>
              {getFormErrorMessage('companyName')}
            </div>
            <div className='p-field'>
              <span className='p-float-label p-input-icon-right'>
                <i className='pi pi-pencil' />
                <InputText
                  id='gst'
                  name='gst'
                  value={formik.values.gst}
                  onChange={formik.handleChange}
                  className={classNames({
                    'p-invalid': isFormFieldValid('gst'),
                  })}
                />
                <label
                  htmlFor='gst'
                  className={classNames({'p-error': isFormFieldValid('gst')})}>
                  GST*
                </label>
              </span>
              {getFormErrorMessage('gst')}
            </div>
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
                  className={classNames({
                    'p-invalid': isFormFieldValid('password'),
                  })}
                  header={passwordHeader}
                  footer={passwordFooter}
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
            <div className='p-field'>
              <span className='p-float-label'>
                <Password
                  id='confirmPassword'
                  name='confirmPassword'
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  toggleMask
                  feedback={false}
                  className={classNames({
                    'p-invalid': isFormFieldValid('confirmPassword'),
                  })}
                />
                <label
                  htmlFor='confirmPassword'
                  className={classNames({
                    'p-error': isFormFieldValid('confirmPassword'),
                  })}>
                  Confirm Password*
                </label>
              </span>
              {getFormErrorMessage('confirmPassword')}
            </div>
            <Button type='submit' label='Submit' className='p-mt-2' />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpSection;
