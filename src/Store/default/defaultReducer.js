import actionTypes from '../actionsTypes';
const colliderGroups = {
  plane: 1,
  sphere1: 2,
  sphere2: 4
};

const initialState = {
  default: null,
  spheres: [
    {
      position: { x: 0, y: 2, z: 0 },
      radius: 0.2,
      quaternion: { x: 0, y: 0, z: 0, w: 1 },
      mass: 1,
      colliderGroups: [colliderGroups.sphere1, colliderGroups.plane | colliderGroups.sphere2],
      color: 'salmon',
    },
    {
      position: { x: 0.2, y: 4, z: 0 },
      radius: 0.2,
      quaternion: { x: 0, y: 0, z: 0, w: 1 },
      mass: 1,
      colliderGroups: [colliderGroups.sphere2, colliderGroups.sphere1],
      color: 'lightgreen',
    },
  ]

};

const defaultReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.SET_DEFAULT:
    return { ...state, default: action.payload };
  default:
    return state;
  }
};

export default defaultReducer;