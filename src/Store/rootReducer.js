import { combineReducers } from 'redux';
import defaultReducer from './default/defaultReducer';
import spheresReducer from './spheres/spheresReducer';

const rootReducer = combineReducers({
  default: defaultReducer,
  spheres: spheresReducer,
});

export default rootReducer;