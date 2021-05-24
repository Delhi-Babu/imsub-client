import {combineReducers} from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import invoiceReducer from './invoiceReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  invoice: invoiceReducer,
});

export default rootReducer;
