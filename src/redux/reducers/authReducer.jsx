import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../actions/types';

import {stringToBool} from '../../components/utils/stringToBool';

const initState = {
  token: '',
  isAuthenticated: stringToBool(localStorage.getItem('isAuthenticated')),
  user: null,
  isLoading: false,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      localStorage.setItem('isAuthenticated', true);
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        isAuthenticated: true,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('isAuthenticated', true);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        token: action.payload,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.setItem('isAuthenticated', false);
      return {
        ...state,
        token: '',
        isLoading: false,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
