import {combineReducers} from 'redux';
import authReducer from './auth';
import dataReducer from './itemdata'

export default combineReducers({
  authReducer,
  dataReducer
});
