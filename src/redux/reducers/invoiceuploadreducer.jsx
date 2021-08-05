import {
  INVOICE_FAILED,
  INVOICE_SUCCESS,
  INVOICE_UPLOAD,
  SAVE_INVOICE,
} from '../actions/types';

const initState = {
  sent: false,
  data: {},
};

const invoiceUploadReduer = (state = initState, action) => {
  switch (action.type) {
    case SAVE_INVOICE:
      return {
        ...state,
        data: action.payload,
      };
    case INVOICE_SUCCESS:
      return {
        ...state,
        sent: true,
      };
    case INVOICE_FAILED:
      return {
        ...state,
        sent: false,
      };
    default:
      return state;
  }
};

export default invoiceUploadReduer;
