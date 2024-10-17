import { combineReducers } from 'redux';
import scholarReducer from './scholarReducer';

export default combineReducers({
  scholar: scholarReducer,
});