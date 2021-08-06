import {
  INVOICE_LOADING,
  INVOICE_LOADED,
  AUTH_ERROR,
  CLEAR_SAVE,
} from '../actions/types';
import {url} from '../../components/utils/url';
import {returnErrors, clearErrors} from './errorAction';
import axios from 'axios';

export const loadInvoices = () => async dispatch => {
  dispatch({type: INVOICE_LOADING});
  try {
    const res = await axios.get(url('operations/invoices'), {
      withCredentials: true,
    });
    dispatch({
      type: INVOICE_LOADED,
      payload: res.data.data,
      count: res.data.count,
    });
    dispatch({
      type: CLEAR_SAVE,
    });
    dispatch(clearErrors());
  } catch (error) {
    dispatch(returnErrors(error.response.data.error, error.response.status));
    dispatch({type: AUTH_ERROR});
  }
};
