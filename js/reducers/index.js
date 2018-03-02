'use strict';

import { combineReducers } from 'redux';
import loginIn from './loginReducer';
import counter from './counterReducer';
import customerDo from './customerReducer';

const rootReducer = combineReducers({
  loginIn: loginIn,
  counter: counter,
  customerDo:customerDo,
});

export default rootReducer;
