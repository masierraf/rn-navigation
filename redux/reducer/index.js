// Imports: Dependencies
import {combineReducers} from 'redux';
// Imports: Reducers
import authReducer from './auth';

// Redux: Root Reducer
const rootReducer = combineReducers({
  auth: authReducer,
});
// Exports
export default rootReducer;
