import actionTypes from '../actionsTypes';
export const setDefaultActionCreator = (payload) => {
  return {type: actionTypes.SET_DEFAULT, payload: payload};
};