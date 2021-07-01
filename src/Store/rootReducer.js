import { combineReducers } from 'redux';
import defaultReducer from './default/defaultReducer';
import objectsReducer from './objects/objectsReducer';

const rootReducer = combineReducers({
  default: defaultReducer,
  objects: objectsReducer,
});

export default rootReducer;