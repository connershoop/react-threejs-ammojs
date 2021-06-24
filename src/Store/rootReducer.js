import {combineReducers} from 'redux';
import defaultReducer from './default/defaultReducer';

const rootReducer = combineReducers({
  default: defaultReducer,
});

export default rootReducer;