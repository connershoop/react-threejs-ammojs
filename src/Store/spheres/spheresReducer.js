import { initialSpheres } from '../../Objects/objects';
import actionTypes from '../actionsTypes';



const initialState = {
  spheres: initialSpheres

};

const spheresReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.ADD_SPHERE: {
    const updatedSpheres = [...state.spheres];
    updatedSpheres.push(action.payload);
    return { ...state, spheres: updatedSpheres };
  }
  default:
    return state;
  }
};

export default spheresReducer;