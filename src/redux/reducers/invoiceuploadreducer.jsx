import {
  INVOICE_FAILED,
  INVOICE_SUCCESS,
  SAVE_INVOICE,
  CLEAR_SAVE,
} from '../actions/types';

const initState = {
  sent: false,
  data: {},
  isSent: false,
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
    case CLEAR_SAVE:
      return {
        ...state,
        isSent: false,
      };
    default:
      return state;
  }
};

export default invoiceUploadReduer;
