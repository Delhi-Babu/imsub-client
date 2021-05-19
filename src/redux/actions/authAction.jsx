import {url} from '../../components/utils/url';
import axios from 'axios';
import {returnErrors, clearErrors} from './errorAction';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  // LOGOUT_SUCCESS,
  // REGISTER_SUCCESS,
  // REGISTER_FAIL,
} from '../actions/types';

export const loadUser = () => async dispatch => {
  dispatch({type: USER_LOADING});
  try {
    const res = await axios.get(url('auth/me'), {
      withCredentials: true,
    });
    dispatch({
      type: USER_LOADED,
      payload: res.data.data,
    });
    dispatch(clearErrors());
  } catch (error) {
    dispatch(returnErrors(error.response.data.error, error.response.status));
    dispatch({type: AUTH_ERROR});
  }
};

export const userLogin = formData => async dispatch => {
  dispatch({type: USER_LOADING});
  try {
    const res = await axios.post(url('auth/login'), formData, {
      withCredentials: true,
    });
    dispatch(clearErrors());
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.token,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data.error, error.response.status));
    dispatch({type: LOGIN_FAIL});
  }
};
