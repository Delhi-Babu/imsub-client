import {combineReducers} from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import invoiceReducer from './invoiceReducer';
import invoiceUploadReducer from './invoiceuploadreducer.jsx';

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  invoice: invoiceReducer,
  sync: invoiceUploadReducer,
});

export default rootReducer;
