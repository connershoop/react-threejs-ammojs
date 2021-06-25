import actionTypes from '../actionsTypes';
import { createSphere } from '../../physicsWorld';
import { baseSphere } from '../../Objects/objects';

export const addSphereActionCreator = (payload) => {
  createSphere(baseSphere);
  return { type: actionTypes.ADD_SPHERE, payload: baseSphere };
};

export const setSpheres = (payload) => {
  return { type: actionTypes.SET_DEFAULT, payload: payload };
};