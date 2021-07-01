import { initialSpheres } from '../../Objects/objects';
import actionTypes from '../actionsTypes';



const initialState = {
  spheres: initialSpheres,
  convexHull: null,
};

const objectsReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.ADD_SPHERE: {
    const updatedSpheres = [...state.spheres];
    updatedSpheres.push(action.payload);
    return { ...state, spheres: updatedSpheres };
  }
  case actionTypes.SET_CONVEX_HULL: {
    return { ...state, convexHull: action.payload };
  }
  default:
    return state;
  }
};

export default objectsReducer;