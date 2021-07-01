import { initialSpheres } from '../../Objects/objects';
import actionTypes from '../actionsTypes';


const initialState = {
  initializeLoadingState: 'idle',
  spheres: initialSpheres
};

const defaultReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.SET_INITIALIZE_LOADING_STATE:
    return { ...state, initializeLoadingState: action.payload };
  default:
    return state;
  }
};

export default defaultReducer;