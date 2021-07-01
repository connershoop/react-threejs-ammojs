import actionsTypes from '../actionsTypes';

export const loadConvexHullActionCreator = (payload) => {
  console.log('load convex hull');
  return { type: actionsTypes.SET_CONVEX_HULL, payload: payload };
};


export const setInitializeLoadingState = (payload) => {
  return { type: actionsTypes.SET_INITIALIZE_LOADING_STATE, payload: payload };
};
