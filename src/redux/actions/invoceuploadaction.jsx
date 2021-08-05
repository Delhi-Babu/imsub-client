import {SAVE_INVOICE, INVOICE_SUCCESS, INVOICE_FAILED} from './types';
import {returnErrors, clearErrors} from './errorAction';
import {url} from '../../components/utils/url';
import axios from 'axios';

export const uploadInvocie = formData => async dispatch => {
  try {
    const res = await axios.post(url('operations/'), formData, {
      withCredentials: true,
    });
    dispatch(clearErrors());
    dispatch({type: INVOICE_SUCCESS});
  } catch (error) {
    dispatch(returnErrors(error.response.data.error, error.response.status));
    dispatch({type: INVOICE_FAILED});
  }
};

export const saveInvoice = formData => async dispatch => {
  dispatch({
    type: SAVE_INVOICE,
    payload: formData,
  });
};
