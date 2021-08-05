import {INVOICE_LOADING, INVOICE_LOADED, AUTH_ERROR} from '../actions/types';
const initState = {
  invoices: [],
  isLoading: false,
  count: 0,
};

const invoiceReducer = (state = initState, action) => {
  switch (action.type) {
    case INVOICE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case INVOICE_LOADED:
      return {
        ...state,
        isLoading: false,
        invoices: action.payload,
        count: action.count,
      };
    case AUTH_ERROR:
      return {
        ...state,
        isLoading: false,
        invoices: {},
        count: 0,
      };
    default:
      return state;
  }
};

export default invoiceReducer;
